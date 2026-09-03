import { addDataAndFileToRequest, PayloadHandler } from 'payload'
import * as XLSX from 'xlsx'
import { Attendant } from '@/payload-types'
import { randomId } from '@/payload/lib/utils'

/**
 * Procesa un archivo excel/csv para importar registros de participantes
 * @param req
 */
export const importHandler: PayloadHandler = async (req) => {
  await addDataAndFileToRequest(req)

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

    try {
      await req.payload.create({
        collection: 'attendants',
        data: data,
        req,
      })
      results.created++
    } catch (err: any) {
      results.failed++
      results.errors.push(err.message)
    }
  }

  return Response.json(results)
}
