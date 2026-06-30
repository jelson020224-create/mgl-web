import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import SamplesManager from './samples-manager'

export default async function ServiceSamplesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id: Number(id) },
    include: { samples: { orderBy: { order: 'asc' } } },
  })
  if (!service) notFound()
  return <SamplesManager service={service} />
}
