'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAttendantByCode } from '@/lib/data'
import { codeSchema } from '@/lib/schemas'
import { ZodError } from 'zod'

type VerifyResult =
  | { success: true }
  | {
      success: false
      fieldErrors: Record<string, string>
    }

export async function verifyCode(code: string): Promise<VerifyResult> {
  let validated: { code: string }

  try {
    validated = codeSchema.parse({ code })
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        fieldErrors: {
          code: 'El código es inválido.',
        },
      }
    }

    return {
      success: false,
      fieldErrors: {
        code: 'Ocurrió un error al verificar el código. Inténtalo de nuevo.',
      },
    }
  }

  const attendant = await getAttendantByCode(validated.code)

  if (!attendant) {
    return {
      success: false,
      fieldErrors: {
        code: 'No encontramos ningún certificado con ese código.',
      },
    }
  }

  const cookieStore = await cookies()
  cookieStore.set('attendant_code', validated.code, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 300,
  })

  redirect('/certificate')
}
