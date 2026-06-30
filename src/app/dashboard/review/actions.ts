'use server'

import prisma from '@/lib/prisma'
import { getClientSession } from '@/lib/client-session'
import { revalidatePath } from 'next/cache'

export async function submitReview(_prevState: { error: string; success: string }, formData: FormData) {
  const session = await getClientSession()
  if (!session?.clientId) return { error: 'You must be logged in.', success: '' }

  const clientName = formData.get('clientName') as string
  const content = formData.get('content') as string
  const rating = parseInt(formData.get('rating') as string) || 5

  if (!clientName || !content) return { error: 'Name and review are required.', success: '' }

  await prisma.testimonial.create({
    data: { clientName, content, rating, active: false },
  })

  revalidatePath('/dashboard')
  return { error: '', success: 'Thank you! Your review has been submitted and is pending admin approval.' }
}
