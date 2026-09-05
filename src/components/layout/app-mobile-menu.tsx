'use client'

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'
import { cn } from '@/lib/utils'
import { NAVLINKS } from './app-header'
import { Button } from '../ui/button'
import { ButtonGroup } from '../ui/button-group'
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useMobileMenu } from '@/hooks/use-mobile-menu'
import Link from 'next/link'

const THEMES = [
  { key: 'light', name: 'Claro', icon: Sun },
  { key: 'dark', name: 'Oscuro', icon: Moon },
  { key: 'system', name: 'Sistema', icon: Monitor },
]

export function MobileMenu() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { open, setOpen, close } = useMobileMenu()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" className="md:hidden" size="sm" />}>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false}>
        <SheetHeader
          className={cn(
            'container mx-auto p-0 px-4 h-16 flex-row',
            'justify-between items-center border-b border-border/50',
          )}
        >
          {/* Titulo */}
          <img src="/assets/images/Unipod-Logo.png" className="h-6" alt="UniPod" />
          {/* Close Button */}
          <Button variant="ghost" onClick={close} size="sm">
            <X />
          </Button>
        </SheetHeader>
        <div className="container mx-auto px-4 py-4">
          {/* Navegacion */}
          <nav className="flex flex-col gap-2">
            {NAVLINKS.map(({ title, href, icon: Icon }, idx) => (
              <Button
                key={idx}
                nativeButton={false}
                render={<Link href={href} />}
                className="w-full justify-start gap-4 h-10"
                variant={href === pathname ? 'default' : 'ghost'}
              >
                <Icon />
                {title}
              </Button>
            ))}
          </nav>
        </div>
        <SheetFooter
          className={cn(
            'container mx-auto px-4 border-t border-border/50',
            'flex-row gap-3 items-center justify-between',
          )}
        >
          <h2>Tema</h2>
          <ButtonGroup className="flex items-center">
            {THEMES.map(({ key, icon: Icon }) => {
              return (
                <Button
                  key={key}
                  onClick={() => setTheme(key)}
                  variant={theme === key ? 'default' : 'outline'}
                >
                  <Icon />
                </Button>
              )
            })}
          </ButtonGroup>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
