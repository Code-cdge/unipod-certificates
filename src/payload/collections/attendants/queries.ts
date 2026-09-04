import { PayloadRequest } from 'payload'
import { Attendant, Training } from '@/payload-types'

/**
 * Encuentra un participante por su código
 * @param attendantCode
 * @param req
 */
export async function findAttendantByCode(attendantCode: string, req: PayloadRequest) {
  return req.payload.find({
    collection: 'attendants',
    where: { code: { equals: attendantCode } },
    limit: 1,
    select: { createdBy: false, updatedBy: false },
    joins: {
      trainings: {
        sort: '-createdAt', // se descarga siempre el certificado más reciente
        limit: 1,
      },
    },
    populate: {
      'attendant-trainings': { attendant: false, createdBy: false, updatedBy: false },
      trainings: { createdBy: false, updatedBy: false },
    },
  })
}

/**
 * Sube un archivo de certificado a la colección media
 * @param attendant
 * @param certificate
 * @param req
 */
export async function uploadAttendantCertificate(attendant: Attendant, certificate: Buffer<ArrayBufferLike>, req: PayloadRequest) {
  return req.payload.create({
    collection: 'media',
    data: { alt: `Certificado de ${attendant.fullName}` },
    file: {
      data: certificate,
      name: `certificado_${attendant.id}.pdf`,
      mimetype: 'application/pdf',
      size: certificate.length,
    },
    req,
  })
}

/**
 * Actualiza el registro correspondiente al asistente en la formación especificada
 * con el ID del certificado proporcionado
 * @param attendantId
 * @param trainingId
 * @param certificateId
 * @param req
 */
export async function updateAttendantTrainingCertificate(attendantId: string, trainingId: string, certificateId: string, req: PayloadRequest) {
  return req.payload.update({
    collection: 'attendant-trainings',
    where: {
      attendant: { equals: attendantId },
      training: { equals: trainingId },
    },
    data: { certificate: certificateId },
    req,
  })
}