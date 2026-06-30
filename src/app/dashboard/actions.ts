'use server'

import prisma from '@/lib/prisma'
import { getClientSession } from '@/lib/client-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteAccount() {
  try {
    const session = await getClientSession()
    if (!session?.clientId) return { error: 'Not authenticated.' }

    const client = await prisma.client.findUnique({
      where: { id: session.clientId },
      include: {
        projects: {
          where: { status: { not: 'completed' } },
          select: { id: true, clientName: true, status: true },
        },
      },
    })

    if (!client) return { error: 'Account not found.' }

    if (client.projects.length > 0) {
      const names = client.projects.map(p => `${p.clientName} (${p.status})`).join(', ')
      return {
        error: `Cannot delete account — you have ${client.projects.length} active project${client.projects.length !== 1 ? 's' : ''}: ${names}. Contact the admin to reassign or complete them first.`,
      }
    }

    await prisma.client.delete({ where: { id: session.clientId } })

    const cookieStore = await cookies()
    cookieStore.set('client_session', '', { maxAge: 0, path: '/' })

    redirect('/')
  } catch {
    return { error: 'Something went wrong. Please try again.' }
  }
}
