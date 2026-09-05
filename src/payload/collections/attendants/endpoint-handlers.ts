import { addDataAndFileToRequest, APIError, PayloadHandler } from 'payload'
import * as XLSX from 'xlsx'
import { Attendant, AttendantTraining, Media, Training } from '@/payload-types'
import { randomId } from '@/payload/lib/utils'
import { generateCertificate } from '@/payload/lib/services/generate-certificate'
import {
  findAttendantByCode,
  updateAttendantTrainingCertificate,
  uploadAttendantCertificate,
} from '@/payload/collections/attendants/queries'
import { checkAdminCredentials } from '@/payload/lib/utils/access-control'

/**
 * Procesa un archivo excel/csv para importar registros de participantes
 * @param req
 */
export const importHandler: PayloadHandler = async (req) => {
  await addDataAndFileToRequest(req)

  checkAdminCredentials(req)

  if (!req.file) {
    return Response.json({ error: 'No se ha proporcionado un archivo' }, { status: 400 })
  }

  const ALLOWED_MIME_TYPES = [
    'text/csv',
    'application/vnd.ms-excel', // older .xls, and sometimes .csv from Excel
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  ]

  if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
    return Response.json({ error: 'El archivo proporcionado no es válido' }, { status: 400 })
  }

  const workbook = XLSX.read(req.file.data, { type: 'buffer' })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet) // works for CSV and XLSX

  const results = { created: 0, skipped: 0, failed: 0, errors: [] as string[] }

  for (const row of rows) {
    const data: Partial<Omit<Attendant, 'firstName' | 'code'>> &
      Pick<Attendant, 'firstName' | 'code'> = {
      firstName: row['nombre'] ?? row['NOMBRE'] ?? row['Nombre'],
      code: randomId(),
    }

    if (!data.firstName) continue

    data.lastName = row['apellidos'] ?? row['APELLIDOS'] ?? row['Apellidos']
    data.sex = (row['sexo'] || row['SEXO'] || row['Sexo']) as 'M' | 'F'
    data.birthDate =
      row['fecha de nacimiento'] || row['FECHA DE NACIMIENTO'] || row['Fecha de nacimiento']
    data.phone = row['telefono'] || row['TELEFONO'] || row['Telefono']
    data.email = row['email'] || row['EMAIL'] || row['Email']

    const exist = await req.payload.db.findOne({
      collection: 'attendants',
      where: { firstName: { equals: data.firstName }, lastName: { equals: data.lastName } },
    })

    if (!!exist) {
      results.skipped++
      continue
    }

    const attendant = await req.payload.create({ collection: 'attendants', data: data, req })
    const trainingCode = row['formacion'] || row['Formacion'] || row['FORMACION']
    if (trainingCode) {
      const training = await req.payload.db.findOne<Training>({
        collection: 'trainings',
        where: { code: { equals: trainingCode.trim() } },
      })
      if (training) {
        await req.payload.create({
          collection: 'attendant-trainings',
          data: {
            attendant: attendant.id,
            training: training.id,
          },
          req,
        })
        const newAttendant = await findAttendantByCode(attendant.code, req)
        const certificate = await generateCertificate(newAttendant.docs[0]).getBuffer()
        const uploaded = await uploadAttendantCertificate(attendant, certificate, req)
        await updateAttendantTrainingCertificate(attendant.id, training.id, uploaded.id, req)
      }
    }
    results.created++
  }

  return Response.json(results)
}

/**
 * Descarga el certificado del participante con el código proporcionado. Si el certificado no
 * existe se genera uno.
 * @param req
 */
export const downloadCertificate: PayloadHandler = async (req) => {
  if (!req.user) {
    throw new APIError('No estás autorizado a realizar esta acción', 401)
  }

  const attendantCode = req.routeParams?.code as string

  const find = await findAttendantByCode(attendantCode, req)

  if (find.docs.length === 0) {
    throw new APIError(
      'No se ha localizado el participante. Asegúrese de que el código esté bien escrito',
      404,
    )
  }

  const attendant = find.docs[0]

  if (!attendant.trainings?.docs?.length) {
    throw new APIError(
      'Esta persona no está registrado como participante en ninguna formación',
      422,
    )
  }

  const attendantTraining = attendant.trainings.docs[0] as AttendantTraining

  if (!attendantTraining.certificate) {
    const certificate = generateCertificate(attendant)
    const buffer = await certificate.getBuffer()
    const uploaded = await uploadAttendantCertificate(attendant, buffer, req)
    const training = attendantTraining.training as Training
    await updateAttendantTrainingCertificate(attendant.id, training.id, uploaded.id, req)

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificado.pdf"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } else {
    const certificate = attendantTraining.certificate as Media
    return Response.redirect(certificate.url!)
  }
}
