'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyEmailOtpFromCookie } from '@/lib/email-otp'

export async function verifyEmail(prevState: { error: string }, formData: FormData) {
  try {
    const email = formData.get('email') as string
    const code = formData.get('code') as string

    if (!email || !code) return { error: 'Email and code are required.' }

    const cookieStore = await cookies()
    const cookie = cookieStore.get('email_verify')?.value

    const data = await verifyEmailOtpFromCookie(cookie, email, code)
    if (!data) return { error: 'Invalid or expired code. Please try registering again.' }

    cookieStore.delete('email_verify')

    await prisma.client.create({
      data: { name: data.name, email: data.email, password: data.hashedPassword },
    })

    redirect('/login?verified=1')
  } catch {
    return { error: 'Something went wrong. Please try again.' }
  }
}
