import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, include: { _count: { select: { updates: true } } } })

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary text-sm">+ New Project</Link>
      </div>

      {projects.length === 0 ? (
        <div className="card-modern shadow-soft p-12 text-center text-gray">
          <p className="text-lg mb-2">No projects yet</p>
          <p className="text-sm">Create your first project to start tracking client updates.</p>
        </div>
      ) : (
        <div className="card-modern shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray">Client</th>
                <th className="text-left px-6 py-3 font-semibold text-gray">Status</th>
                <th className="text-left px-6 py-3 font-semibold text-gray">Updates</th>
                <th className="text-left px-6 py-3 font-semibold text-gray">Created</th>
                <th className="text-right px-6 py-3 font-semibold text-gray">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray/10">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-black">{p.clientName}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold uppercase ${p.status === 'completed' ? 'text-green-600' : 'text-orange'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray">{p._count.updates}</td>
                  <td className="px-6 py-4 text-gray">{p.createdAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/projects/${p.id}`} className="text-orange hover:underline text-sm font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
