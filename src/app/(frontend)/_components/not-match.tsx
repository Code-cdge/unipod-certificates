import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { SectionTitle } from '@/components/shared/section-title'
import { HeroPattern } from '@/components/shared/hero-pattern'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'

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
          <div className="flex justify-center">
            <Link href="/verify" className={cn(buttonVariants({ variant: 'outline' }), 'border')}>
              Verificar de nuevo
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
