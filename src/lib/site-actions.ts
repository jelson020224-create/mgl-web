'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createProjectInquiry(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = (formData.get('phone') as string) || ''
    const message = (formData.get('message') as string) || ''
    const projectTitle = formData.get('projectTitle') as string

    if (!name || !email) return { error: 'Name and email are required.', success: '' }

    const fullMessage = projectTitle
      ? `[Inquiry about: ${projectTitle}]\n\n${message}`
      : message

    await prisma.contactMessage.create({
      data: { name, email, phone, message: fullMessage },
    })

    return { error: '', success: 'Request sent!' }
  } catch {
    return { error: 'Failed to send request. Please try again.', success: '' }
  }
}
