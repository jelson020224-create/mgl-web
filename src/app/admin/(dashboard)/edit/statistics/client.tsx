'use client'

import { markProjectDone } from '@/lib/statistics-actions'

interface ProjectSummary {
  id: number
  clientName: string
  status: string
  startDate: string
  createdAt: string
}

interface Props {
  projects: ProjectSummary[]
  completedCount: number
  totalProjects: number
  totalClients: number
  teamCount: number
  yearsActive: number
}

export function AdminStatisticsClient({
  projects,
  completedCount,
  totalProjects,
  totalClients,
  teamCount,
  yearsActive,
}: Props) {
  const stats = [
    { value: `${completedCount}+`, label: 'Projects Completed' },
    { value: `${yearsActive}+`, label: 'Years Experience' },
    { value: `${totalClients}+`, label: 'Happy Clients' },
    { value: `${teamCount}+`, label: 'Expert Team' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-warm-gray">Statistics</h1>
        <p className="text-sm text-gray-dark mt-1">Manage your site statistics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6 shadow-soft text-center">
            <div className="text-4xl font-bold font-serif text-terracotta">{s.value}</div>
            <div className="text-sm text-gray mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-light">
          <h2 className="font-bold text-warm-gray">All Projects ({totalProjects})</h2>
        </div>
        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray text-sm">No projects yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-light text-left text-xs text-gray uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Created</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-sand-light/50 hover:bg-warm-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-warm-gray">{p.clientName}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${p.status === 'completed' ? 'badge-green' : 'badge-terracotta'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray">
                      {new Date(p.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {p.status === 'in-progress' && (
                        <form action={markProjectDone.bind(null, p.id)}>
                          <button
                            type="submit"
                            className="text-xs font-semibold px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer"
                          >
                            Mark as Done
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
