import prisma from '@/lib/prisma'
import { seedAdmin } from '@/lib/seed'
import { NextResponse } from 'next/server'

export async function GET() {
  await seedAdmin()
  const count = await prisma.admin.count()
  return NextResponse.json({ seeded: count > 0 })
}
