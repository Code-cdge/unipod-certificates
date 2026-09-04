import { CollectionAfterDeleteHook, CollectionBeforeDeleteHook } from 'payload'
import { Training } from '@/payload-types'

export const deleteAttendants: CollectionBeforeDeleteHook = async ({id, req}) => {

  await req.payload.delete({
    collection: 'attendant-trainings',
    where: { training: { equals: id } },
    req
  })

}

export const deleteSignatures: CollectionAfterDeleteHook<Training> = async ({doc, req}) => {

  const signatures = doc.signatories;

  if (signatures && signatures.length > 0) {

    const ids = signatures.map(s => {
      return typeof  s.signature === 'string' ? s.signature : s.signature.id
    })

    await req.payload.delete({
      collection: 'media',
      where: { id: { in: ids } },
      req
    })

  }

}