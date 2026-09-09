import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NoMatch } from '../_components/not-match'
import { CertificatesView } from '../_components/certificates-view'
import { getAttendantByCode, getAttendantTrainings } from '@/app/(frontend)/_server/data'
import { Suspense } from 'react'

export default async function CertificatesPage() {
  const cookieStore = await cookies()
  const code = cookieStore.get('attendant_code')?.value
  if (!code) redirect('/verify')

  const attendant = await getAttendantByCode(code)
  if (!attendant) return <NoMatch />

  const response = getAttendantTrainings(attendant.id)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CertificatesView attendant={attendant} certificatesResponse={response} />
    </Suspense>
  )
}
