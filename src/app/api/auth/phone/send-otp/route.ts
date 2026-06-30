import { NextRequest, NextResponse } from 'next/server'
import { generateAndStoreOtp, sendSms } from '@/lib/phone-otp'

export async function POST(req: NextRequest) {
  const { phone } = await req.json()

  if (!phone || !/^\+[1-9]\d{6,14}$/.test(phone)) {
    return NextResponse.json({ error: 'Invalid phone number. Use international format (e.g. +1234567890).' }, { status: 400 })
  }

  const code = generateAndStoreOtp(phone)
  const sent = await sendSms(phone, code)

  if (!sent) {
    return NextResponse.json({ error: 'Failed to send verification code. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
