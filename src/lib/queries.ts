import prisma from '@/lib/prisma'

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSetting.findMany()
    return Object.fromEntries(settings.map(s => [s.key, s.value]))
  } catch {
    return {}
  }
}

export async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { order: 'asc' } })
  } catch {
    return []
  }
}

export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export async function getAllTestimonials() {
  try {
    return await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  } catch {
    return []
  }
}

export async function getApproachSteps() {
  try {
    return await prisma.approachStep.findMany({ orderBy: { order: 'asc' } })
  } catch {
    return []
  }
}

export async function getPortfolioItems() {
  try {
    return await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}
