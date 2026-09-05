import { CollectionAfterDeleteHook, CollectionBeforeDeleteHook, FieldHook } from 'payload'
import { Attendant } from '@/payload-types'

export const generateFullName: FieldHook = ({ data }) => {
  if (!data) return
  const record = data as Partial<Attendant>
  return `${record.firstName} ${record.lastName ?? ''}`.trim()
}

export const generateAge: FieldHook = ({ data }) => {
  if (!data) return
  const record = data as Partial<Attendant>
  if (record.birthDate) {
    const age = new Date().getFullYear() - new Date(record.birthDate).getFullYear()
    return Math.abs(age)
  }
}

export const deleteTrainings: CollectionBeforeDeleteHook = async ({ id, req }) => {

  await req.payload.delete({
    collection: 'attendant-trainings',
    where: { attendant: { equals: id } },
    req
  })
}
