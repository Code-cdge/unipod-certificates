import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { XCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { SectionTitle } from '@/components/shared/section-title'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
import { HeroPattern } from '@/components/shared/hero-pattern'

export function NoMatch({ code }: { code: string }) {
  return (
    <main className="relative">
      <div className="absolute inset-0">
        <HeroPattern className="absolute inset-0 bg-repeat opacity-4" />
      </div>
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto size-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <XCircle className="size-8 text-destructive" />
          </div>
          <SectionTitle
            className="text-destructive"
            title="No encontramos ese certificado"
            description="El código introducido no coincide con ningún registro."
          />
          <Card className="mx-auto max-w-lg w-full">
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Código introducido</span>
                <span className="font-mono text-sm font-medium text-destructive">{code}</span>
              </div>

              <Alert variant="destructive">
                <AlertTitle className="flex items-center gap-1.5">
                  <AlertCircle className="size-3.5" /> Causas más comunes
                </AlertTitle>
                <AlertDescription>
                  <ul className="mt-1.5 space-y-1">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="size-3.5 text-white" /> El código no es valido
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="size-3.5 text-white" />
                      El certificado aún no ha sido cargado por el equipo de UniPod
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex flex-col gap-2 pt-1">
                <Button
                  variant="outline"
                  className="w-full"
                  nativeButton={false}
                  render={<Link href="/certificate" />}
                >
                  Volver a intentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
