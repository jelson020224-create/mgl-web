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
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold font-serif text-warm-gray">Welcome back, {client.name}</h1>
        <p className="text-sm text-gray-dark mt-1.5">Here&rsquo;s an overview of your project activity.</p>
      </header>

      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="card-modern shadow-soft p-6">
            <p className="text-3xl font-bold text-terracotta">{projects.length}</p>
            <p className="text-sm text-gray-dark mt-1 font-medium">Total Projects</p>
          </div>
          <div className="card-modern shadow-soft p-6">
            <p className="text-3xl font-bold text-blue-600">{activeProjects.length}</p>
            <p className="text-sm text-gray-dark mt-1 font-medium">In Progress</p>
          </div>
          <div className="card-modern shadow-soft p-6">
            <p className="text-3xl font-bold text-emerald-600">{completedProjects.length}</p>
            <p className="text-sm text-gray-dark mt-1 font-medium">Completed</p>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="card-modern shadow-soft p-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-warm-gray mb-2">No projects assigned yet</h2>
          <p className="text-sm text-gray-dark max-w-sm mx-auto leading-relaxed">
            Once an admin assigns a project to your account, it will appear here. You can also track a project using your project ID.
          </p>
          <Link href="/track" className="btn btn-outline btn-sm mt-6">Track a Project</Link>
        </div>
      ) : (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold font-serif text-warm-gray">Your Projects</h2>
            <Link href="/track" className="text-xs text-terracotta hover:underline font-medium">Track by ID &rarr;</Link>
          </div>
          <div className="space-y-4">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/track/${p.id}?authed=1`}
                className="card-modern shadow-soft p-6 block hover:border-terracotta/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-warm-gray truncate group-hover:text-terracotta transition-colors">
                        {p.clientName || 'Project'}
                      </h3>
                      <span className={`badge shrink-0 text-[11px] ${
                        p.status === 'completed' ? 'badge-green' :
                        p.status === 'on-hold' ? 'badge-yellow' :
                        'badge-terracotta'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    {p.description && (
                      <p className="text-sm text-gray-dark leading-relaxed line-clamp-2">{p.description}</p>
                    )}
                    <div className="flex items-center gap-5 text-xs text-gray pt-1">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Started {new Date(p.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                        </svg>
                        Updated {new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray/30 group-hover:text-terracotta/50 transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-sand-light pt-8">
        <AccountDanger />
      </section>
    </div>
  )
}
