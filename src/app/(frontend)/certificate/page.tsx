import { NoMatch } from '../_components/not-match'
import { Download } from '../_components/download'
import { getAttendantByCode } from '@/lib/data'
import { Verifyform } from '../_components/verify-form'

export default async function CertificatePage({ searchParams }: PageProps<'/certificate'>) {
  const { code } = (await searchParams) as { code: string }
  if (!code) return <Verifyform />
  const attendant = await getAttendantByCode(code)
  return attendant ? <Download certificate={attendant} /> : <NoMatch code={code} />
}
