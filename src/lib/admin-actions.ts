'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTestimonial(id: number) {
  try {
    return await prisma.testimonial.findUnique({ where: { id } })
  } catch {
    return null
  }
}

export async function saveTestimonial(prevState: { error: string; success: string }, formData: FormData) {
  try {
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
  } catch {
    return { error: 'Failed to save testimonial.', success: '' }
  }
}

export async function approveTestimonial(id: number) {
  try {
    await prisma.testimonial.update({ where: { id }, data: { active: true } })
    revalidatePath('/admin/testimonials')
  } catch (e) {
    console.error('Failed to approve testimonial:', e)
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/testimonials')
  } catch (e) {
    console.error('Failed to delete testimonial:', e)
  }
}

export async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany()
    return Object.fromEntries(settings.map(s => [s.key, s.value]))
  } catch {
    return {}
  }
}

export async function saveSettings(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const keys = [
      'company_name', 'company_email', 'company_phone', 'company_address',
      'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_cta_text', 'hero_secondary_cta_text',
      'stats_label_projects', 'stats_label_years', 'stats_label_clients', 'stats_label_team',
      'stats_projects', 'stats_years', 'stats_clients', 'stats_team',
      'services_eyebrow', 'services_title', 'services_subtitle',
      'testimonials_eyebrow', 'testimonials_title', 'testimonials_subtitle',
      'portfolio_eyebrow', 'portfolio_title', 'portfolio_subtitle',
      'cta_eyebrow', 'cta_title', 'cta_subtitle', 'cta_button',
      'about_hero_eyebrow', 'about_hero_title',
      'services_hero_eyebrow', 'services_hero_title', 'services_hero_subtitle',
      'portfolio_hero_eyebrow', 'portfolio_hero_title', 'portfolio_hero_subtitle',
      'contact_hero_eyebrow', 'contact_hero_title', 'contact_hero_subtitle',
      'track_hero_title', 'track_hero_subtitle',
      'footer_description', 'footer_company_name',
      'about_content',
      'logo_url',
      'brand_primary', 'brand_secondary_text'
    ]

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
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/services')
    revalidatePath('/portfolio')
    revalidatePath('/contact')
    revalidatePath('/track')
    return { error: '', success: 'Settings saved.' }
  } catch {
    return { error: 'Failed to save settings.', success: '' }
  }
}

export async function getUploads() {
  try {
    return await prisma.uploadedImage.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export async function deleteUpload(id: number) {
  try {
    await prisma.uploadedImage.delete({ where: { id } })
    revalidatePath('/admin/media')
  } catch {
    return { error: 'Failed to delete upload.', success: '' }
  }
}
