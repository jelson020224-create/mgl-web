'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function markProjectDone(projectId: number) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: 'completed' },
    })
    revalidatePath('/admin/edit/statistics')
    revalidatePath('/admin/projects')
  } catch (e) {
    console.error('Failed to mark project done:', e)
  }
}
