import prisma from '@/lib/prisma'
import { AdminServiceForm } from './form'

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">Services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-8">
          <h2 className="text-lg font-bold text-black mb-4">Add / Edit Service</h2>
          <AdminServiceForm />
        </div>

        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="card p-6 flex items-start gap-4">
              <span className="text-3xl">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-black">{s.title}</h3>
                <p className="text-sm text-gray">{s.description}</p>
              </div>
              <form action={async () => {
                'use server'
                const { deleteService } = await import('@/lib/admin-crud-actions')
                await deleteService(s.id)
              }}>
                <button type="submit" className="text-sm text-red-500 hover:underline">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
