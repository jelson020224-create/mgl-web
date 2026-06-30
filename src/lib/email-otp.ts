import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET environment variable is not set')
const encodedKey = new TextEncoder().encode(secretKey)

interface EmailOtpPayload {
  email: string
  code: string
  name: string
  hashedPassword: string
  expiresAt: number
}

export async function createEmailOtpCookie(name: string, email: string, hashedPassword: string, code: string): Promise<string> {
  const expiresAt = Date.now() + 10 * 60_000
  return new SignJWT({ name, email, code, hashedPassword, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(encodedKey)
}

export async function verifyEmailOtpFromCookie(cookie: string | undefined, email: string, code: string): Promise<{ name: string; email: string; hashedPassword: string } | null> {
  if (!cookie) return null
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, { algorithms: ['HS256'] })
    const data = payload as unknown as EmailOtpPayload
    if (data.email !== email) return null
    if (data.expiresAt < Date.now()) return null
    if (data.code !== code) return null
    return { name: data.name, email: data.email, hashedPassword: data.hashedPassword }
  } catch {
    return null
  }
}

export function generateOtpCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}
