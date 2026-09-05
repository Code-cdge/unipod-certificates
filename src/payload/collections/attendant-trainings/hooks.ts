import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { AttendantTraining } from '@/payload-types'

export const deleteCertificateFileAfterDelete: CollectionAfterDeleteHook<AttendantTraining> = async ({
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

export const deleteCertificateFileAfterChange: CollectionAfterChangeHook<AttendantTraining> = async ({previousDoc, doc, req}) => {

  if (previousDoc) {

    const previousCertificateId = typeof  previousDoc.certificate === 'string' ? previousDoc.certificate : previousDoc.certificate?.id
    const newCertificateId = typeof doc.certificate === 'string' ? doc.certificate : doc.certificate?.id;

    if (previousCertificateId && (previousCertificateId !== newCertificateId)) {
      await req.payload.delete({
        collection: 'media',
        where: { id: { equals: previousCertificateId } },
        req,
      })
    }

  }

}
