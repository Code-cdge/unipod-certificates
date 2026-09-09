'use client'

import type { Attendant, AttendantTraining } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { CloudAlert } from 'lucide-react'
import { HeroPattern } from '@/components/shared/hero-pattern'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { use } from 'react'
import { CertificateCard } from './certificate-card'

type CertificatesViewProps = {
  attendant: Attendant
  certificatesResponse: Promise<AttendantTraining[]>
}

export function CertificatesView({ attendant, certificatesResponse }: CertificatesViewProps) {
  const certificates = use(certificatesResponse)
  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroPattern className="absolute inset-0 opacity-5" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent" />
        </div>
        <div className="relative z-10 py-16 pt-28 border-b border-border/50">
          <div className="container mx-auto px-4 space-y-6">
            <div className="max-w-5xl text-center md:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">¡Mis certificados!</h1>
              <p className="text-muted-foreground max-w-2xl">
                Hola <span className="text-primary">{attendant.fullName}</span>, aquí puedes
                descargar tus certificados.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          {certificates.length === 0 ? (
            <Empty className="border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CloudAlert className="size-12" />
                </EmptyMedia>
                <EmptyTitle>No se encontraron certificados</EmptyTitle>
                <EmptyDescription></EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline">Recargar</Button>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {certificates.map((certificate, idx) => (
                <CertificateCard
                  key={idx}
                  attendantName={attendant.fullName}
                  training={certificate}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
