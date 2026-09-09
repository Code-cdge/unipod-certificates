import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Attendant, AttendantTraining } from '@/lib/types'

export async function getAttendantByCode(code: string): Promise<Attendant | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'attendants',
    where: { code: { equals: code } },
    limit: 1,
  })
  const attendant = result.docs[0]
  if (!attendant) return null

  return {
    id: attendant.id,
    fullName: attendant.fullName!,
  }
}

export async function getAttendantTrainings(attendantId: string): Promise<AttendantTraining[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'attendant-trainings',
    where: { attendant: { equals: attendantId } },
    depth: 1,
  })

  throw new Error('Failed to fetch certificates')

  return result.docs.map((c: any) => ({
    title: c.training.title,
    description: c.training.description,
    workload: c.training.workload,
    certificateUrl: c.certificate.url,
  }))
}
