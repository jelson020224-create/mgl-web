'use server'

import prisma from '@/lib/prisma'
import { getClientSession } from '@/lib/client-session'

export async function getProjectForAuthedClient(id: number) {
  const session = await getClientSession()
  if (!session?.clientId) return null

  const project = await prisma.project.findFirst({
    where: { id, clientId: session.clientId },
    include: { updates: { orderBy: { createdAt: 'desc' } } },
  })

  if (!project) return null

  return {
    clientName: project.clientName,
    status: project.status,
    description: project.description,
    updates: project.updates,
  }
}

export async function verifyProjectPassword(id: number, password: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { updates: { orderBy: { createdAt: 'desc' } } },
  })

  if (!project) return { error: 'Project not found.' }

  const bcrypt = await import('bcryptjs')
  const match = await bcrypt.compare(password, project.clientPassword)
  if (!match) return { error: 'Incorrect password.' }

  return {
    clientName: project.clientName,
    status: project.status,
    description: project.description,
    updates: project.updates,
  }
}
