import prisma from '@/lib/prisma'
import { AdminApproachForm } from './form'

export default async function AdminApproachPage() {
  const steps = await prisma.approachStep.findMany({ orderBy: { order: 'asc' } })

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">Approach Steps</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern shadow-soft p-8">
          <h2 className="text-lg font-bold text-black mb-4">Add / Edit Approach Step</h2>
          <AdminApproachForm />
        </div>

        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.id} className="card-modern shadow-soft p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-terracotta-50 flex items-center justify-center text-sm font-bold font-serif shrink-0">{s.step}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-black">{s.title}</h3>
                <p className="text-xs text-gray mt-1">Order: {s.order}</p>
              </div>
              <form action={async () => {
                'use server'
                const { deleteApproachStep } = await import('@/lib/admin-crud-actions')
                await deleteApproachStep(s.id)
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
