import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: { updates: { orderBy: { createdAt: 'desc' } } },
  })
  if (!project) return NextResponse.json(null, { status: 404 })
  return NextResponse.json(project)
}
