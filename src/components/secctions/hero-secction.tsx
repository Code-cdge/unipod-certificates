import { cn } from '@/lib/utils'
import { Award } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { HeroPattern } from '../shared/hero-pattern'
import Link from 'next/link'

const STATS = [
  { number: '2', label: 'Sedes (Malabo y Bata)' },
  { number: '18h', label: 'de formacion intensiva' },
  { number: '100+', label: 'formadores capacitados' },
  { number: '2000+', label: 'Jovenes formados' },
]

export function HeroSection() {
  return (
    <section className="relative">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <HeroPattern className="absolute inset-0 bg-repeat opacity-8" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
      </div>
      <div className="min-h-screen relative z-10 flex flex-col">
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col flex-1">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-medium text-primary/90 bg-primary/10 p-1.5 rounded-full ring ring-primary mb-8">
              Formación en innovación - UNIPOD
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mt-10">
              Su esfuerzo <span className="text-primary">en la formación</span> merece un
              reconocimiento formal
            </h1>
            <p className="text-lg md:text-xl text-foreground my-10">
              Innovacion, emprendimiento y resolución de problemas. Has completado la formación
              intensiva de <span className="text-primary">UniPod</span> — tu reconocimiento te
              espera
            </p>
            <div className="flex items-center justify-center gap-2">
              <Link href="/certificate" className={cn(buttonVariants({ size: 'lg' }))}>
                Obtener mi sertificado
                <Award />
              </Link>
            </div>
          </div>
        </section>
        {/* Contenedor de estadísticas */}
        <section className="bg-transparent backdrop-blur-xs py-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, index) => (
              <div key={index} className="text-foreground">
                <h2 className="text-3xl font-bold mb-1">{stat.number}</h2>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
