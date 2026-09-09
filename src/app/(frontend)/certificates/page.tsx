import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NoMatch } from '../_components/not-match'
import { CertificatesView } from '../_components/certificates-view'
import { getAttendantByCode, getAttendantTrainings } from '@/app/(frontend)/_server/data'

export default async function CertificatesPage() {
  const cookieStore = await cookies()
  const code = cookieStore.get('attendant_code')?.value
  if (!code) redirect('/verify')

  const attendant = await getAttendantByCode(code)
  if (!attendant) return <NoMatch />

  const certificates = await getAttendantTrainings(attendant.id)
  return <CertificatesView attendant={attendant} certificates={certificates} />
}
