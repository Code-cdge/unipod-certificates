'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/shared/section-title'
import { HeroPattern } from '@/components/shared/hero-pattern'

export default function CertificatesError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="relative">
      <div className="absolute inset-0">
        <HeroPattern className="absolute inset-0 bg-repeat opacity-4" />
      </div>
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto size-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
          <SectionTitle
            className="text-destructive"
            title="Algo salió mal"
            description="No pudimos cargar sus certificados. Intente de nuevo."
          />
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => reset()}>
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
