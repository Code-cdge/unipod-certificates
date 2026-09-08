'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAttendantByCode } from './data'

export async function verificarCodigo(code: string) {
  const attendant = await getAttendantByCode(code)
  if (!attendant) redirect('/verificar?error=no-encontrado')

  // Solo guardamos el código, no los datos del certificado —
  // page.tsx los vuelve a pedir a Payload en cada carga.
  const cookieStore = await cookies()
  cookieStore.set('certificado_codigo', code, {
    httpOnly: true, // JavaScript del navegador no puede leerla
    secure: true, // solo viaja por HTTPS
    sameSite: 'lax', // otro sitio no puede hacer que se envíe sin querer
    maxAge: 300, // 5 minutos, lo ajustamos en un paso posterior
  })

  redirect('/certificado')
}
