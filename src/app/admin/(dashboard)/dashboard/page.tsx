import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const [projectCount, messageCount, unreadCount, serviceCount, clientCount, portfolioCount] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.service.count(),
    prisma.client.count(),
    prisma.portfolioItem.count(),
  ])

  const recentMessages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const recentProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { _count: { select: { updates: true } } } })

  const stats = [
    { label: 'Total Projects', value: projectCount, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'text-terracotta', bg: 'bg-terracotta-50' },
    { label: 'Clients', value: clientCount, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Messages', value: messageCount, sub: `${unreadCount} unread`, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Services', value: serviceCount, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Portfolio Items', value: portfolioCount, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-warm-gray">Dashboard</h1>
        <p className="text-sm text-gray-dark mt-1">Overview of your site activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5 hover:translate-y-0">
            <div className="flex items-start justify-between mb-3">
              <div className={`${s.bg} p-2 rounded-lg`}>
                <svg className={`w-5 h-5 ${s.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-dark mt-0.5">{s.label}</div>
            {s.sub && <div className="text-xs text-gray mt-0.5">{s.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="px-6 py-4 border-b border-sand-light flex items-center justify-between">
            <h2 className="font-bold text-warm-gray">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-terracotta hover:underline font-medium">View all</Link>
          </div>
          <div className="p-4">
            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-gray text-sm">No messages yet.</div>
            ) : (
              <div className="space-y-1">
                {recentMessages.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-warm-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${m.read ? 'bg-gray/30' : 'bg-terracotta'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-warm-gray truncate">{m.name}</span>
                        <span className="text-[10px] text-gray">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-gray truncate">{m.message.substring(0, 80)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-sand-light flex items-center justify-between">
            <h2 className="font-bold text-warm-gray">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-terracotta hover:underline font-medium">View all</Link>
          </div>
          <div className="p-4">
            {recentProjects.length === 0 ? (
              <div className="text-center py-8 text-gray text-sm">No projects yet.</div>
            ) : (
              <div className="space-y-1">
                {recentProjects.map((p) => (
                  <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-warm-gray-50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-warm-gray truncate">{p.clientName}</p>
                      <span className="text-xs text-gray">{p._count.updates} update{p._count.updates !== 1 ? 's' : ''}</span>
                    </div>
                    <span className={`badge ${p.status === 'completed' ? 'badge-green' : p.status === 'on-hold' ? 'badge-yellow' : 'badge-terracotta'}`}>{p.status}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
