import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Separator } from '../ui/separator'

const FOOTER_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/certificado', label: 'Certificado' },
  { href: '/admin', label: 'Administración' },
]

export const CONTACT_INFO = [
  { icon: Mail, label: 'Correo electrónico', value: '[EMAIL_ADDRESS]' },
  { icon: Phone, label: 'Teléfono', value: '[PHONE_NUMBER]' },
  { icon: MapPin, label: 'Dirección', value: '[ADDRESS]' },
]
export function AppFooter() {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 mb-10">
          {/* Logo y descripción */}
          <div className="space-y-4 md:pr-[25%]">
            <img src="/assets/images/Unipod-Logo.png" className="h-10" alt="UniPod" />
            <p className="text-sm text-foreground/70 md:max-w-xs">
              Una iniciativa del gobierno de Guinea Ecuatorial y el PNUD, porte de la plataforma
              panafricana Timbuktoo
            </p>
          </div>
          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Enlaces</h3>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 transition-colors hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contacto</h3>
            <ul className="flex flex-col gap-4">
              {CONTACT_INFO.map((contact) => (
                <li key={contact.value} className="flex gap-2">
                  <div className="grid place-items-center size-9 bg-foreground/5 rounded-lg border border-foreground/30">
                    <contact.icon className="size-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs">{contact.label}</h3>
                    <p className="text-xs text-foreground/80">{contact.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Separator />
        <section className="pt-10">
          <p className="text-sm text-foreground/60 text-center">
            &copy; {new Date().getFullYear()} UniPod. Todos los derechos reservados.
          </p>
        </section>
      </div>
    </footer>
  )
}
