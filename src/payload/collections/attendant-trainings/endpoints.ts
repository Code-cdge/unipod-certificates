import { APIError, Endpoint } from 'payload'
import { checkAdminCredentials } from '@/payload/lib/utils/access-control'
import {
  findAttendantById,
  updateAttendantTrainingCertificateById,
  uploadAttendantCertificate,
} from '@/payload/collections/attendants/queries'
import { generateCertificate } from '@/payload/lib/services/generate-certificate'
import z from 'zod'
import { ZipArchive } from 'archiver'
import { PassThrough } from 'node:stream'
import { fetchAndZipCertificates } from '@/payload/lib/services/fetch-and-zip-certificates'

export const generateCertificateEndpoint: Endpoint = {
  path: '/:id/generate-certificate/:attendantId',
  method: 'post',
  handler: async (req) => {
    checkAdminCredentials(req)
    const attendantTrainingId = req.routeParams?.id as string
    const attendantId = req.routeParams?.attendantId as string
    const attendant = await findAttendantById(req, attendantId, attendantTrainingId)
    const certificateBuffer = await generateCertificate(attendant.docs[0]).getBuffer()
    const uploaded = await uploadAttendantCertificate(attendant.docs[0], certificateBuffer, req)
    const result = await updateAttendantTrainingCertificateById(
      attendantTrainingId,
      uploaded.id,
      req,
    )

    if (result.errors.length > 0) {
      throw new APIError('Se ha producido un error inesperado', 500, result)
    }

    return Response.json(result)
  },
}

export const downloadCertificatesEndpoint: Endpoint = {
  path: '/download-certificates',
  method: 'get',
  handler: async (req) => {
    checkAdminCredentials(req)

    const schema = z.array(z.uuid())
    const ids = req.searchParams.get('ids')

    if (!ids) {
      throw new APIError('No se ha encontrado el parámetro ids en la url', 400)
    }

    const { error, success } = schema.safeParse(ids.split(','))

    if (!success) {
      throw new APIError('La lista de ids proporcionada no es válida', 400, error)
    }

    const query = await req.payload.find({
      collection: 'attendant-trainings',
      where: { id: { in: ids }, certificate: { exists: true } },
      select: { certificate: true },
      populate: { media: { createdBy: false, updatedBy: false } },
      limit: 0,
    })

    const archive = new ZipArchive({ zlib: { level: 9 } })
    const passthrough = new PassThrough()
    archive.pipe(passthrough)
    fetchAndZipCertificates({
      docs: query.docs,
      archive,
      passthrough,
      payload: req.payload,
    }).catch()

    // Convert the Node PassThrough into a Web ReadableStream for the Response
    const webStream = new ReadableStream({
      start(controller) {
        passthrough.on('data', (chunk) => controller.enqueue(chunk))
        passthrough.on('end', () => controller.close())
        passthrough.on('error', (err) => controller.error(err))
      },
      cancel() {
        passthrough.destroy()
      },
    })

    return new Response(webStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="certificados.zip"`,
      },
    })
  },
}
