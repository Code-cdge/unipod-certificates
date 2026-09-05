import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = '(min-width: 768px)'

export function useMobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    close()
  }, [pathname])

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) close()
    }

    // Verificación inicial por si el componente monta en desktop
    if (mediaQuery.matches) close()

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, []) // Sin dependencia en `open`: matchMedia no la necesita

  return { open, setOpen, close }
}
