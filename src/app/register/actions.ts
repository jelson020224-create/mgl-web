'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function registerClient(prevState: { error: string }, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) return { error: 'All fields are required.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

  const existing = await prisma.client.findUnique({ where: { email } })
  if (existing) return { error: 'An account with this email already exists.' }

  const bcrypt = await import('bcryptjs')
  const hashed = await bcrypt.hash(password, 10)

  await prisma.client.create({ data: { name, email, password: hashed } })

  redirect('/login?registered=1')
}
