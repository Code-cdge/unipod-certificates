import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionTitle } from '@/components/shared/section-title'
import { HeroPattern } from '@/components/shared/hero-pattern'

export function NoMatch() {
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
            title="No pudimos confirmar su identidad"
            description="Ocurrió un problema al recuperar sus datos. Vuelva a verificar su código."
          />
          <Card className="mx-auto max-w-lg w-full">
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 pt-1">
                <Button className="w-full" nativeButton={false} render={<Link href="/verify" />}>
                  Verificar de nuevo
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  nativeButton={false}
                  render={<Link href="/contacto" />}
                >
                  Contactar con soporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
