import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET environment variable is not set')
const encodedKey = new TextEncoder().encode(secretKey)

interface OtpPayload {
  phone: string
  code: string
  expiresAt: number
}

export async function createOtpCookie(phone: string, code: string): Promise<string> {
  const expiresAt = Date.now() + 5 * 60_000
  return new SignJWT({ phone, code, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(encodedKey)
}

export async function verifyOtpFromCookie(cookie: string | undefined, phone: string, code: string): Promise<boolean> {
  if (!cookie) return false
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, { algorithms: ['HS256'] })
    const data = payload as unknown as OtpPayload
    if (data.phone !== phone) return false
    if (data.expiresAt < Date.now()) return false
    if (data.code !== code) return false
    return true
  } catch {
    return false
  }
}

export async function sendSms(phone: string, code: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    console.log(`[DEV OTP] ${phone}: ${code}`)
    return true
  }

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          To: phone,
          From: fromNumber,
          Body: `Your MGL Construction verification code is: ${code}. Valid for 5 minutes.`,
        }),
      }
    )
    return res.ok
  } catch {
    return false
  }
}
