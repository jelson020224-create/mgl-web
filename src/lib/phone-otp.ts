const otpStore = new Map<string, { code: string; expiresAt: number }>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, val] of otpStore) {
    if (val.expiresAt < now) otpStore.delete(key)
  }
}

export function generateAndStoreOtp(phone: string): string {
  cleanup()
  const code = String(Math.floor(100000 + Math.random() * 900000))
  otpStore.set(phone, { code, expiresAt: Date.now() + 5 * 60_000 })
  return code
}

export function verifyOtp(phone: string, code: string): boolean {
  cleanup()
  const entry = otpStore.get(phone)
  if (!entry) return false
  if (entry.expiresAt < Date.now()) {
    otpStore.delete(phone)
    return false
  }
  if (entry.code !== code) return false
  otpStore.delete(phone)
  return true
}

export async function sendSms(phone: string, code: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    // Dev mode: log instead of sending
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
