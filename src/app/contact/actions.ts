'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { rateLimit } from '@/lib/rate-limit'

export async function submitContact(prevState: { message: string; error?: string }, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  const rl = rateLimit(`contact:${email}`, 3, 60000)
  if (!rl.allowed) {
    return { message: '', error: 'Too many requests. Please wait before sending another message.' }
  }

  if (!name || !email || !message) {
    return { message: '', error: 'Please fill in all required fields.' }
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, phone, message },
    })
    revalidatePath('/admin/messages')
    return { message: 'Thank you! We will get back to you soon.', error: '' }
  } catch {
    return { message: '', error: 'Something went wrong. Please try again.' }
  }
}
