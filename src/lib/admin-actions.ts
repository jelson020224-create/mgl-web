'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTestimonial(id: number) {
  return prisma.testimonial.findUnique({ where: { id } })
}

export async function saveTestimonial(prevState: { error: string; success: string }, formData: FormData) {
  const id = formData.get('id') as string
  const clientName = formData.get('clientName') as string
  const role = formData.get('role') as string
  const content = formData.get('content') as string
  const rating = parseInt(formData.get('rating') as string) || 5
  const active = formData.get('active') === 'on'

  if (!clientName || !content) return { error: 'Name and content are required.', success: '' }

  if (id) {
    await prisma.testimonial.update({ where: { id: Number(id) }, data: { clientName, role, content, rating, active } })
  } else {
    await prisma.testimonial.create({ data: { clientName, role, content, rating, active } })
  }

  revalidatePath('/admin/testimonials')
  return { error: '', success: 'Testimonial saved.' }
}

export async function approveTestimonial(id: number) {
  await prisma.testimonial.update({ where: { id }, data: { active: true } })
  revalidatePath('/admin/testimonials')
}

export async function deleteTestimonial(id: number) {
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/testimonials')
}

export async function getSettings() {
  const settings = await prisma.siteSetting.findMany()
  return Object.fromEntries(settings.map(s => [s.key, s.value]))
}

export async function saveSettings(prevState: { error: string; success: string }, formData: FormData) {
  const keys = ['company_name', 'company_email', 'company_phone', 'company_address',
    'hero_title', 'hero_subtitle', 'about_content',
    'stats_projects', 'stats_years', 'stats_clients', 'stats_team',
    'logo_url']

  for (const key of keys) {
    const value = formData.get(key) as string
    if (value !== null) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    }
  }

  revalidatePath('/admin/settings')
  return { error: '', success: 'Settings saved.' }
}

export async function getUploads() {
  return prisma.uploadedImage.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function deleteUpload(id: number) {
  await prisma.uploadedImage.delete({ where: { id } })
  revalidatePath('/admin/media')
}
