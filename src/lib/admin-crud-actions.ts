'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

export async function createProject(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const clientName = formData.get('clientName') as string
    const clientPassword = formData.get('clientPassword') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string || 'in-progress'
    const clientId = formData.get('clientId') ? Number(formData.get('clientId')) : null

    if (!clientName || !clientPassword) return { error: 'Name and password are required.', success: '' }

    const hashedPassword = await bcrypt.hash(clientPassword, 10)

    await prisma.project.create({
      data: { clientName, clientPassword: hashedPassword, description, status, clientId },
    })

    revalidatePath('/admin/projects')
    redirect('/admin/projects')
  } catch {
    return { error: 'Failed to create project.', success: '' }
  }
}

export async function updateProject(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const projectId = Number(formData.get('projectId'))
    const clientName = formData.get('clientName') as string
    const clientPassword = formData.get('clientPassword') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string
    const clientId = formData.get('clientId') ? Number(formData.get('clientId')) : null

    if (!clientName) return { error: 'Name is required.', success: '' }

    const data: any = { clientName, description, status, clientId }
    if (clientPassword) {
      data.clientPassword = await bcrypt.hash(clientPassword, 10)
    }

    await prisma.project.update({ where: { id: projectId }, data })
    revalidatePath(`/admin/projects/${projectId}`)
    revalidatePath('/admin/projects')
    return { error: '', success: 'Project updated.' }
  } catch {
    return { error: 'Failed to update project.', success: '' }
  }
}

export async function addUpdate(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const projectId = Number(formData.get('projectId'))
    const content = formData.get('content') as string

    if (!content) return { error: 'Content is required.', success: '' }

    await prisma.projectUpdate.create({ data: { projectId, content } })
    revalidatePath(`/admin/projects/${projectId}`)
    return { error: '', success: 'Update added.' }
  } catch {
    return { error: 'Failed to add update.', success: '' }
  }
}

export async function deleteProject(projectId: string) {
  try {
    await prisma.project.delete({ where: { id: Number(projectId) } })
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
  } catch {
    return { error: 'Failed to delete project.', success: '' }
  }
}

export async function updateService(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const icon = formData.get('icon') as string
    const order = parseInt(formData.get('order') as string) || 0

    if (!title) return { error: 'Title is required.', success: '' }

    if (id) {
      await prisma.service.update({ where: { id: Number(id) }, data: { title, description, icon, order } })
    } else {
      await prisma.service.create({ data: { title, description, icon, order } })
    }

    revalidatePath('/admin/services')
    return { error: '', success: 'Service saved.' }
  } catch {
    return { error: 'Failed to save service.', success: '' }
  }
}

export async function deleteService(id: number) {
  try {
    await prisma.service.delete({ where: { id } })
    revalidatePath('/admin/services')
  } catch {
    return { error: 'Failed to delete service.', success: '' }
  }
}

export async function addPortfolioItem(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const type = formData.get('type') as string || 'image'
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const imageUrl = type === 'image' ? (formData.get('imageUrl') as string) : '/placeholder.jpg'
    const videoUrl = type === 'video' ? (formData.get('videoUrl') as string || null) : null
    const videoCaption = type === 'video' ? (formData.get('videoCaption') as string || null) : null

    if (!title) return { error: 'Title is required.', success: '' }

    await prisma.portfolioItem.create({
      data: { type, title, category, description, imageUrl: imageUrl || '/placeholder.jpg', videoUrl, videoCaption },
    })
    revalidatePath('/admin/edit/portfolio')
    revalidatePath('/admin/portfolio')
    revalidatePath('/portfolio')
    return { error: '', success: 'Portfolio item added.' }
  } catch {
    return { error: 'Failed to add portfolio item.', success: '' }
  }
}

export async function deletePortfolioItem(id: number) {
  try {
    await prisma.portfolioItem.delete({ where: { id } })
    revalidatePath('/admin/portfolio')
    revalidatePath('/admin/edit/portfolio')
    revalidatePath('/portfolio')
  } catch (e) {
    console.error('Failed to delete portfolio item:', e)
  }
}

export async function markMessageRead(id: number) {
  try {
    await prisma.contactMessage.update({ where: { id }, data: { read: true } })
    revalidatePath('/admin/messages')
  } catch {
    return { error: 'Failed to mark message as read.', success: '' }
  }
}

export async function deleteMessage(id: number) {
  try {
    await prisma.contactMessage.delete({ where: { id } })
    revalidatePath('/admin/messages')
  } catch {
    return { error: 'Failed to delete message.', success: '' }
  }
}

export async function saveTeamMember(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const icon = formData.get('icon') as string
    const order = parseInt(formData.get('order') as string) || 0
    if (!title) return { error: 'Title is required.', success: '' }
    if (id) {
      await prisma.teamMember.update({ where: { id: Number(id) }, data: { title, description, icon, order } })
    } else {
      await prisma.teamMember.create({ data: { title, description, icon, order } })
    }
    revalidatePath('/admin/team')
    return { error: '', success: 'Team member saved.' }
  } catch {
    return { error: 'Failed to save team member.', success: '' }
  }
}

export async function deleteTeamMember(id: number) {
  try {
    await prisma.teamMember.delete({ where: { id } })
    revalidatePath('/admin/team')
  } catch {
    return { error: 'Failed to delete team member.', success: '' }
  }
}

export async function saveApproachStep(prevState: { error: string; success: string }, formData: FormData) {
  try {
    const id = formData.get('id') as string
    const step = formData.get('step') as string
    const title = formData.get('title') as string
    const order = parseInt(formData.get('order') as string) || 0
    if (!step || !title) return { error: 'Step and title are required.', success: '' }
    if (id) {
      await prisma.approachStep.update({ where: { id: Number(id) }, data: { step, title, order } })
    } else {
      await prisma.approachStep.create({ data: { step, title, order } })
    }
    revalidatePath('/admin/approach')
    return { error: '', success: 'Approach step saved.' }
  } catch {
    return { error: 'Failed to save approach step.', success: '' }
  }
}

export async function deleteApproachStep(id: number) {
  try {
    await prisma.approachStep.delete({ where: { id } })
    revalidatePath('/admin/approach')
  } catch {
    return { error: 'Failed to delete approach step.', success: '' }
  }
}

export async function addServiceSample(serviceId: number, imageUrl: string) {
  'use server'
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
