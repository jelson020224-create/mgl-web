'use server'

import prisma from '@/lib/prisma'
import { createClientSession } from '@/lib/client-session'
import { redirect } from 'next/navigation'

export async function clientLogin(prevState: { error: string }, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and password are required.' }

  const client = await prisma.client.findUnique({ where: { email } })
  if (!client || !client.password) return { error: 'Invalid email or password.' }

  const bcrypt = await import('bcryptjs')
  const match = await bcrypt.compare(password, client.password)
  if (!match) return { error: 'Invalid email or password.' }

  await createClientSession(client.id)
  redirect('/dashboard')
}
