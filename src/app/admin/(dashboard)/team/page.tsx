import prisma from '@/lib/prisma'
import { AdminTeamForm } from './form'

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">Team Members</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern shadow-soft p-8">
          <h2 className="text-lg font-bold text-black mb-4">Add / Edit Member</h2>
          <AdminTeamForm />
        </div>
        <div className="space-y-4">
          {members.map((m) => (
            <div key={m.id} className="card-modern shadow-soft p-6 flex items-start gap-4">
              <span className="text-3xl">{m.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-black">{m.title}</h3>
                <p className="text-sm text-gray">{m.description}</p>
                <p className="text-xs text-gray/50 mt-1">Order: {m.order}</p>
              </div>
              <form action={async () => {
                'use server'
                const { deleteTeamMember } = await import('@/lib/admin-crud-actions')
                await deleteTeamMember(m.id)
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
