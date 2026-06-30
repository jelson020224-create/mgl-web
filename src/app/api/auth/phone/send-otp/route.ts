import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createOtpCookie, sendSms } from '@/lib/phone-otp'

export async function POST(req: NextRequest) {
  const { phone } = await req.json()

  if (!phone || !/^\+[1-9]\d{6,14}$/.test(phone)) {
    return NextResponse.json({ error: 'Invalid phone number. Use international format (e.g. +1234567890).' }, { status: 400 })
  }

  const code = String(Math.floor(100000 + Math.random() * 900000))
  const jwtCookie = await createOtpCookie(phone, code)
  const sent = await sendSms(phone, code)

  if (!sent) {
    return NextResponse.json({ error: 'Failed to send verification code. Try again.' }, { status: 500 })
  }

  const cookieStore = await cookies()
  cookieStore.set('otp_verify', jwtCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 300,
  })

  const hasTwilio = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER)
  return NextResponse.json({ success: true, ...(hasTwilio ? {} : { devCode: code }) })
}
