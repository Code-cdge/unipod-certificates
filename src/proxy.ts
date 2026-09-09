import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ATTENDANT_COOKIE_NAME, ATTENDANT_COOKIE_MAX_AGE_SECONDS } from './lib/constants'

export function proxy(request: NextRequest) {
  const code = request.cookies.get(ATTENDANT_COOKIE_NAME)?.value
  const response = NextResponse.next()

  // Sesión deslizante: cada visita a /certificates renueva la cookie.
  // Solo expira por inactividad real, no por un cronómetro fijo
  // desde el momento en que se verificó el código.
  if (code) {
    response.cookies.set(ATTENDANT_COOKIE_NAME, code, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ATTENDANT_COOKIE_MAX_AGE_SECONDS,
    })
  }

  return response
}

export const config = {
  matcher: ['/certificates/:path*'],
}
