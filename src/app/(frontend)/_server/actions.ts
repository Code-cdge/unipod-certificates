'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAttendantByCode } from '@/app/(frontend)/_server/data'
import { codeSchema } from '@/lib/schemas'
import { ATTENDANT_COOKIE_MAX_AGE_SECONDS, ATTENDANT_COOKIE_NAME } from '@/lib/constants'

type FieldErrors = Record<string, { message: string }>
type VerifyResult = { success: true } | { success: false; fieldErrors: FieldErrors }

function fieldError(field: string, message: string): VerifyResult {
  return { success: false, fieldErrors: { [field]: { message } } }
}

export async function verifyCode(code: string): Promise<VerifyResult> {
  const parsed = codeSchema.safeParse({ code })
  if (!parsed.success) {
    return fieldError('code', parsed.error.issues[0]?.message ?? 'El código es inválido.')
  }

  const attendant = await getAttendantByCode(parsed.data.code)
  if (!attendant) {
    return fieldError('code', 'No encontramos ningún participante con ese código.')
  }

  const cookieStore = await cookies()
  cookieStore.set(ATTENDANT_COOKIE_NAME, parsed.data.code, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: ATTENDANT_COOKIE_MAX_AGE_SECONDS, // ahora coincide con lo que renueva proxy.ts
  })

  redirect('/certificates')
}
