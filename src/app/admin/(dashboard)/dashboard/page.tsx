import prisma from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const [projectCount, messageCount, unreadCount, serviceCount] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.service.count(),
  ])

  const recentMessages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const recentProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Projects', value: projectCount, color: 'bg-orange/10 text-orange' },
          { label: 'Messages', value: messageCount, color: 'bg-blue-50 text-blue-600' },
          { label: 'Unread', value: unreadCount, color: 'bg-red-50 text-red-600' },
          { label: 'Services', value: serviceCount, color: 'bg-green-50 text-green-600' },
        ].map((s) => (
          <div key={s.label} className="card p-6">
            <div className={`text-3xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</div>
            <div className="text-sm text-gray mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-black mb-4">Recent Messages</h2>
          {recentMessages.length === 0 ? (
            <p className="text-gray text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m.id} className="flex items-start gap-3 pb-3 border-b border-gray/10 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? 'bg-gray' : 'bg-orange'}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-black truncate">{m.name}</p>
                    <p className="text-xs text-gray truncate">{m.message.substring(0, 60)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-black mb-4">Recent Projects</h2>
          {recentProjects.length === 0 ? (
            <p className="text-gray text-sm">No projects yet.</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between pb-3 border-b border-gray/10 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-black">{p.clientName}</p>
                    <span className={`text-xs font-semibold uppercase ${p.status === 'completed' ? 'text-green-600' : 'text-orange'}`}>
                      {p.status}
                    </span>
                  </div>
                  <a href={`/admin/projects/${p.id}`} className="text-sm text-orange hover:underline">Edit</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
