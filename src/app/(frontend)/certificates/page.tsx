import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { NoMatch } from '../_components/not-match'
import { CertificatesView } from '../_components/certificates-view'
import { getAttendantByCode, getAttendantTrainings } from '@/app/(frontend)/_server/data'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HeroPattern } from '@/components/shared/hero-pattern'

function CertificatesSkeleton() {
  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroPattern className="absolute inset-0 opacity-5" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent" />
        </div>
        <div className="relative z-10 border-b border-border/50 py-16 pt-32">
          <div className="container mx-auto px-4 space-y-4 text-center">
            <div className="inline-flex items-center justify-center text-center animate-pulse">
              <Skeleton className="h-12 w-48 rounded-lg" />
            </div>
            <div className="max-w-2xl mx-auto space-y-2">
              <Skeleton className="h-8 w-3/4 mx-auto rounded-lg" />
              <Skeleton className="h-5 w-full mx-auto rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="rounded-lg gap-0">
                <CardContent className="gap-3 pt-5">
                  <Skeleton className="size-10 rounded-full mb-1" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-5 w-24" />
                </CardContent>
                <CardFooter className="gap-2 pt-4">
                  <Skeleton className="h-9 flex-1" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function CertificatesPage() {
  const cookieStore = await cookies()
  const code = cookieStore.get('attendant_code')?.value
  if (!code) redirect('/verify')

  const attendant = await getAttendantByCode(code)
  if (!attendant) return <NoMatch />

  const response = getAttendantTrainings(attendant.id)
  return (
    <Suspense fallback={<CertificatesSkeleton />}>
      <CertificatesView attendant={attendant} certificatesResponse={response} />
    </Suspense>
  )
}
