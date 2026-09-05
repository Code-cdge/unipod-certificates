import { APIError, Endpoint } from 'payload'
import { checkAdminCredentials } from '@/payload/lib/utils/access-control'
import {
  findAttendantById,
  updateAttendantTrainingCertificate,
  updateAttendantTrainingCertificateById,
  uploadAttendantCertificate,
} from '@/payload/collections/attendants/queries'
import { generateCertificate } from '@/payload/lib/services/generate-certificate'

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
    const result = await updateAttendantTrainingCertificateById(attendantTrainingId, uploaded.id, req)

    if (result.errors.length > 0) {
      throw new APIError('Se ha producido un error inesperado', 500, result)
    }

    return Response.json(result)
  }
}