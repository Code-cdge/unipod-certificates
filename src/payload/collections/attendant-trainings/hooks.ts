import { CollectionAfterDeleteHook } from 'payload'
import { AttendantTraining } from '@/payload-types'

export const deleteCertificateFile: CollectionAfterDeleteHook<AttendantTraining> = async ({
  doc,
  req,
}) => {
  if (doc.certificate) {
    const mediaId = typeof doc.certificate === 'string' ? doc.certificate : doc.certificate.id

    await req.payload.delete({
      collection: 'media',
      where: { id: { equals: mediaId } },
      req,
    })
  }
}
