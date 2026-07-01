'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addServiceSample(serviceId: number, imageUrl: string) {
  try {
    await prisma.serviceSample.create({
      data: { serviceId, imageUrl, order: 0 },
    })
    revalidatePath(`/admin/services/${serviceId}/samples`)
    revalidatePath('/admin/edit/services')
    return { success: true }
  } catch {
    return { error: 'Failed to add sample' }
  }
}
