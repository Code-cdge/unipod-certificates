"use client"

import Link from 'next/link'
import { Award, Home, ShieldUser } from 'lucide-react'
import { Separator } from '../ui/separator'
import { ThemeNav } from '../shared/theme-nav'
import { MobileMenu } from './app-mobile-menu'

export const NAVLINKS = [
  { href: '/', title: 'Inicio', icon: Home },
  { href: '/certificate', title: 'Certificado', icon: Award },
  { href: '/admin', title: 'Administracion', icon: ShieldUser },
]

export function AppHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Titulo */}
        <Link href="/">
          <img src="/assets/images/Unipod-Logo.png" className="h-6" alt="UniPod" />
        </Link>
        <section className="flex items-center gap-2 max-md:hidden">
          {/* Navegacion */}
          <nav className="flex-1 hidden md:flex items-center justify-center gap-8 px-2">
            {NAVLINKS.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <Separator orientation="vertical" className="my-1 mx-2" />
          <ThemeNav />
        </section>
        <MobileMenu/>
      </div>
    </header>
  )
}
