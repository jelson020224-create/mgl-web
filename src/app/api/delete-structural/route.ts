import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const deleted = await prisma.service.deleteMany({ where: { title: 'Structural Engineering' } })
  return NextResponse.json({ deleted: deleted.count })
}
