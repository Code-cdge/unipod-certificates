import { validateTurnstileToken } from 'next-turnstile'

export async function verifyHuman(token: string): Promise<boolean> {
  if (!token) return false
  try {
    const result = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    })
    return result.success
  } catch {
    return false
  }
}
