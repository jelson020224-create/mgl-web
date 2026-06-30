'use server'

import prisma from '@/lib/prisma'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { rateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export async function adminLogin(prevState: { error: string }, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const ip = (await headers()).get('x-forwarded-for') || 'unknown'
  const rl = rateLimit(`login:${ip}`, 5, 60000)
  if (!rl.allowed) {
    return { error: 'Too many login attempts. Please try again later.' }
  }

  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) return { error: 'Invalid email or password.' }

  const bcrypt = await import('bcryptjs')
  const match = await bcrypt.compare(password, admin.password)
  if (!match) return { error: 'Invalid email or password.' }

  await createSession(admin.id)
  redirect('/admin/dashboard')
}
