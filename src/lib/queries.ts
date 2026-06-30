import prisma from '@/lib/prisma'

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany()
  return Object.fromEntries(settings.map(s => [s.key, s.value]))
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { order: 'asc' } })
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' } })
}

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getPortfolioItems() {
  return prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })
}
