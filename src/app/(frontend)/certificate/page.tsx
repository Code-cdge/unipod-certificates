import { Certificate } from '@/lib/types'
import { NoMatch } from './_components/not-match'
import { Verifyform } from './_components/verify-form'
import { Download } from './_components/download'
import config from '@payload-config'
import { getPayload } from 'payload'

async function getCertificadeByCode(code: string): Promise<Certificate | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'attendants',
    where: { code: { equals: code } },
    depth: 3,
    limit: 1,
  })

  const attendant = result.docs[0]
  if (!attendant) return null

  return {
    fullName: attendant.fullName,
    trainings: (attendant.trainings?.docs ?? []).map((t: any) => ({
      title: t.training?.title,
      placement: t.training?.placement,
      certificateUrl: t.certificate?.url,
    })),
  }
}

export default async function CertificatePage({ searchParams }: PageProps<'/certificate'>) {
  const { code } = (await searchParams) as { code: string }
  if (!code) return <Verifyform />
  const certificate = await getCertificadeByCode(code)
  return certificate ? <Download certificate={certificate} /> : <NoMatch code={code} />
}
