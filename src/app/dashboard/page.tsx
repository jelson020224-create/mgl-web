import prisma from '@/lib/prisma'
import { getClientSession } from '@/lib/client-session'
import Link from 'next/link'
import AccountDanger from './account-danger'

export default async function DashboardPage() {
  const session = await getClientSession()
  const client = await prisma.client.findUnique({
    where: { id: session!.clientId },
    include: { projects: { orderBy: { updatedAt: 'desc' } } },
  })

  if (!client) return null

  const projects = client.projects
  const activeProjects = projects.filter((p) => p.status !== 'completed')
  const completedProjects = projects.filter((p) => p.status === 'completed')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-warm-gray">Welcome, {client.name}</h1>
        <p className="text-sm text-gray-dark mt-1">Track your project progress and updates</p>
      </div>

      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card-modern shadow-soft p-5">
            <div className="text-2xl font-bold text-terracotta">{projects.length}</div>
            <div className="text-sm text-gray-dark mt-0.5">Total Projects</div>
          </div>
          <div className="card-modern shadow-soft p-5">
            <div className="text-2xl font-bold text-blue-600">{activeProjects.length}</div>
            <div className="text-sm text-gray-dark mt-0.5">Active</div>
          </div>
          <div className="card-modern shadow-soft p-5">
            <div className="text-2xl font-bold text-emerald-600">{completedProjects.length}</div>
            <div className="text-sm text-gray-dark mt-0.5">Completed</div>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="card-modern shadow-soft p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-terracotta-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-warm-gray mb-2">No projects assigned yet</p>
          <p className="text-sm text-gray-dark max-w-sm mx-auto">
            Once an admin assigns a project to your account, it will appear here. In the meantime, you can track a project using your project ID.
          </p>
          <Link href="/track" className="btn btn-outline btn-sm mt-6">Track a Project</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <Link key={p.id} href={`/track/${p.id}?authed=1`} className="card-modern shadow-soft p-5 block hover:border-terracotta/30 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-warm-gray truncate">{p.clientName || 'Project'}</h2>
                  {p.description && <p className="text-sm text-gray-dark mt-1 line-clamp-2">{p.description}</p>}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray">
                    <span>Started {new Date(p.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>Updated {new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                <span className={`badge shrink-0 ${p.status === 'completed' ? 'badge-green' : p.status === 'on-hold' ? 'badge-yellow' : 'badge-terracotta'}`}>{p.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <AccountDanger />
    </div>
  )
}
