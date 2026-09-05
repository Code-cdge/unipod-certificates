import { AppHeader } from '@/components/layout/app-header'
import './styles.css'
import { AppFooter } from '@/components/layout/app-footer'
import { ThemeProvider } from '@/components/prividers/theme-provider'

export const metadata = {
  description: 'Descarga tu certificado de finalización de formaciones de uniPod',
  title: 'Obtén tu certificado de uniPod',
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
