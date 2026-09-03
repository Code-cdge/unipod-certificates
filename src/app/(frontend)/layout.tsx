import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Descarga tu certificado de finalización de formaciones de uniPod',
  title: 'Obtén tu certificado de uniPod',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
