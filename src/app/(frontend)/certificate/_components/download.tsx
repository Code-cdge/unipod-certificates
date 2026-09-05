'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Certificate } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SectionTitle } from '@/components/shared/section-title'
import { CheckCircle2, Download as DownloadIcon, Loader2, User } from 'lucide-react'
import { HeroPattern } from '@/components/shared/hero-pattern'

type EstadoDescarga = 'idle' | 'descargando' | 'descargado' | 'error'

export function Download({ certificate }: { certificate: Certificate }) {
  const [estados, setEstados] = useState<Record<number, EstadoDescarga>>({})
  const tieneMultiples = certificate.trainings.length > 1

  function handleDescargar(index: number) {
    const training = certificate.trainings[index]
    setEstados((prev) => ({ ...prev, [index]: 'descargando' }))
    try {
      const a = document.createElement('a')
      a.href = training.certificateUrl
      a.download = `${certificate.fullName}-${training.title}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setEstados((prev) => ({ ...prev, [index]: 'descargado' }))
    } catch {
      setEstados((prev) => ({ ...prev, [index]: 'error' }))
    }
  }

  return (
    <main className="relative">
      <div className="absolute inset-0">
        <HeroPattern className="absolute inset-0 bg-repeat opacity-4" />
      </div>
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
          <SectionTitle
            title={tieneMultiples ? 'Descargue sus certificados' : 'Descargue su certificado'}
            description={
              tieneMultiples
                ? 'Encontramos varias formaciones asociadas a su código.'
                : 'Verifique que este es su certificado antes de descargarlo.'
            }
          />
          <Card className="w-full max-w-lg mx-auto">
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-center gap-3">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Nombre del participante</p>
                  <p className="font-medium text-sm mt-0.5 truncate">{certificate.fullName}</p>
                </div>
              </div>

              <div className="space-y-3">
                {certificate.trainings.map((training, index) => {
                  const estado = estados[index] ?? 'idle'
                  return (
                    <div
                      key={training.title + training.placement}
                      className="rounded-lg border px-4 py-3 space-y-2.5"
                    >
                      <div>
                        <p className="font-medium text-sm">{training.title}</p>
                      </div>
                      {estado === 'error' && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            No se pudo generar la descarga. Inténtelo de nuevo.
                          </AlertDescription>
                        </Alert>
                      )}
                      {estado === 'descargado' && (
                        <Alert>
                          <CheckCircle2 className="size-4 text-primary" />
                          <AlertDescription>
                            La descarga se ha iniciado correctamente.
                          </AlertDescription>
                        </Alert>
                      )}
                      <Button
                        className="w-full"
                        onClick={() => handleDescargar(index)}
                        disabled={estado === 'descargando'}
                      >
                        {estado === 'descargando' ? (
                          <>
                            <Loader2 className="animate-spin" /> Preparando descarga...
                          </>
                        ) : (
                          <>
                            <DownloadIcon /> Descargar certificado
                          </>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>

              <Button
                variant="outline"
                nativeButton={false}
                className="w-full"
                render={<Link href="/certificate" />}
              >
                Verificar otro código
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
