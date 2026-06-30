'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addSample(prevState: { error: string; success: string }, formData: FormData) {
  const serviceId = Number(formData.get('serviceId'))
  const imageUrl = formData.get('imageUrl') as string
  const caption = formData.get('caption') as string
  const order = parseInt(formData.get('order') as string) || 0

  if (!imageUrl) return { error: 'Image URL is required.', success: '' }

  await prisma.serviceSample.create({ data: { serviceId, imageUrl, caption, order } })

  revalidatePath(`/admin/services/${serviceId}/samples`)
  return { error: '', success: 'Sample added.' }
}

export async function deleteSample(sampleId: number) {
  const sample = await prisma.serviceSample.findUnique({ where: { id: sampleId } })
  if (!sample) return
  await prisma.serviceSample.delete({ where: { id: sampleId } })
  revalidatePath(`/admin/services/${sample.serviceId}/samples`)
}

export async function updateSample(prevState: { error: string; success: string }, formData: FormData) {
  const id = Number(formData.get('id'))
  const caption = formData.get('caption') as string
  const order = parseInt(formData.get('order') as string) || 0

  await prisma.serviceSample.update({ where: { id }, data: { caption, order } })

  const sample = await prisma.serviceSample.findUnique({ where: { id } })
  revalidatePath(`/admin/services/${sample!.serviceId}/samples`)
  return { error: '', success: 'Sample updated.' }
}
