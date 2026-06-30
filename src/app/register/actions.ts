'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { rateLimit } from '@/lib/rate-limit'

export async function registerClient(prevState: { error: string }, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name || !email || !password) return { error: 'All fields are required.' }
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return { error: 'Please enter a valid email address.' }

    const rl = rateLimit(`register:${email}`, 3, 60000)
    if (!rl.allowed) {
      return { error: 'Too many registration attempts. Please wait before trying again.' }
    }

    const existing = await prisma.client.findUnique({ where: { email } })
    if (existing) return { error: 'An account with this email already exists.' }

    const bcrypt = await import('bcryptjs')
    const hashed = await bcrypt.hash(password, 10)

    await prisma.client.create({ data: { name, email, password: hashed } })

    redirect('/login?registered=1')
  } catch {
    return { error: 'Something went wrong. Please try again.' }
  }
}
