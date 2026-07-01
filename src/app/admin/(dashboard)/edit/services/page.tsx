import prisma from '@/lib/prisma'
import { AdminEditServicesClient } from './client'

export default async function AdminEditServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { samples: true } } },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Services</h1>
      <AdminEditServicesClient services={services} />
    </div>
  )
}
