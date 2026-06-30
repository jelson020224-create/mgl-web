'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addSample(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const serviceId = Number(formData.get('serviceId'))
    const imageUrl = formData.get('imageUrl') as string
    const caption = formData.get('caption') as string
    const order = parseInt(formData.get('order') as string) || 0

    if (!imageUrl) return { error: 'Image URL is required.', success: '' }

    await prisma.serviceSample.create({ data: { serviceId, imageUrl, caption, order } })

    revalidatePath(`/admin/services/${serviceId}/samples`)
    return { error: '', success: 'Sample added.' }
  } catch {
    return { error: 'Failed to add sample.', success: '' }
  }
}

export async function deleteSample(sampleId: number) {
  try {
    const sample = await prisma.serviceSample.findUnique({ where: { id: sampleId } })
    if (!sample) return { error: 'Sample not found.', success: '' }
    await prisma.serviceSample.delete({ where: { id: sampleId } })
    revalidatePath(`/admin/services/${sample.serviceId}/samples`)
    return { error: '', success: 'Sample deleted.' }
  } catch {
    return { error: 'Failed to delete sample.', success: '' }
  }
}

export async function updateSample(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const id = Number(formData.get('id'))
    const caption = formData.get('caption') as string
    const order = parseInt(formData.get('order') as string) || 0

    await prisma.serviceSample.update({ where: { id }, data: { caption, order } })

    const sample = await prisma.serviceSample.findUnique({ where: { id } })
    revalidatePath(`/admin/services/${sample!.serviceId}/samples`)
    return { error: '', success: 'Sample updated.' }
  } catch {
    return { error: 'Failed to update sample.', success: '' }
  }
}
