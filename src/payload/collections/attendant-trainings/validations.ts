import { RelationshipFieldSingleValidation } from 'payload'
import { AttendantTraining } from '@/payload-types'

export const validateAttendantTrainingUniqueness: RelationshipFieldSingleValidation = async (_, {data, req, operation}) => {

  const record = data as Partial<AttendantTraining>

  if (operation === 'create' && record.attendant && record.training) {
    const foud = await req.payload.db.findOne({
      collection: 'attendant-trainings',
      where: {
        attendant: { equals: record.attendant },
        training: { equals: record.training },
      }
    })
    if (!!foud) {
      return `Este participante ya está registrado para esta formación`
    }
  }

  return true

}