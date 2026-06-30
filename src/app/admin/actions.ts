'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

export async function createProject(prevState: { error: string; success: string }, formData: FormData) {
  const clientName = formData.get('clientName') as string
  const clientPassword = formData.get('clientPassword') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string || 'in-progress'

  if (!clientName || !clientPassword) return { error: 'Name and password are required.', success: '' }

  const hashedPassword = await bcrypt.hash(clientPassword, 10)

  await prisma.project.create({
    data: { clientName, clientPassword: hashedPassword, description, status },
  })

  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function updateProject(prevState: { error: string; success: string }, formData: FormData) {
  const projectId = Number(formData.get('projectId'))
  const clientName = formData.get('clientName') as string
  const clientPassword = formData.get('clientPassword') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string

  if (!clientName) return { error: 'Name is required.', success: '' }

  const data: any = { clientName, description, status }
  if (clientPassword) {
    data.clientPassword = await bcrypt.hash(clientPassword, 10)
  }

  await prisma.project.update({ where: { id: projectId }, data })
  revalidatePath(`/admin/projects/${projectId}`)
  revalidatePath('/admin/projects')
  return { error: '', success: 'Project updated.' }
}

export async function addUpdate(prevState: { error: string; success: string }, formData: FormData) {
  const projectId = Number(formData.get('projectId'))
  const content = formData.get('content') as string

  if (!content) return { error: 'Content is required.', success: '' }

  await prisma.projectUpdate.create({ data: { projectId, content } })
  revalidatePath(`/admin/projects/${projectId}`)
  return { error: '', success: 'Update added.' }
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({ where: { id: Number(projectId) } })
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function updateService(prevState: { error: string; success: string }, formData: FormData) {
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
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } })
  revalidatePath('/admin/services')
}

export async function addPortfolioItem(prevState: { error: string; success: string }, formData: FormData) {
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('imageUrl') as string

  if (!title) return { error: 'Title is required.', success: '' }

  await prisma.portfolioItem.create({ data: { title, category, description, imageUrl: imageUrl || '/placeholder.jpg' } })
  revalidatePath('/admin/portfolio')
  return { error: '', success: 'Portfolio item added.' }
}

export async function deletePortfolioItem(id: number) {
  await prisma.portfolioItem.delete({ where: { id } })
  revalidatePath('/admin/portfolio')
}

export async function markMessageRead(id: number) {
  await prisma.contactMessage.update({ where: { id }, data: { read: true } })
  revalidatePath('/admin/messages')
}

export async function deleteMessage(id: number) {
  await prisma.contactMessage.delete({ where: { id } })
  revalidatePath('/admin/messages')
}
