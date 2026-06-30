import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { verifyOtpFromCookie } from '@/lib/phone-otp'
import { createClientSession } from '@/lib/client-session'

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json()

  if (!phone || !code) {
    return NextResponse.json({ error: 'Phone and code are required.' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const otpCookie = cookieStore.get('otp_verify')?.value
  cookieStore.delete('otp_verify')

  const valid = await verifyOtpFromCookie(otpCookie, phone, code)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid or expired code.' }, { status: 400 })
  }

  let client = await prisma.client.findUnique({ where: { phone } })

  if (!client) {
    client = await prisma.client.create({
      data: { name: 'Client', phone },
    })
  }

  await createClientSession(client.id)
  return NextResponse.json({ redirect: '/dashboard' })
}
