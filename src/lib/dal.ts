import 'server-only'
import { getSession } from './session'
import prisma from './prisma'
import { cache } from 'react'

export const verifyAdmin = cache(async () => {
  const session = await getSession()
  if (!session?.adminId) return null
  const admin = await prisma.admin.findUnique({ where: { id: session.adminId } })
  return admin
})
