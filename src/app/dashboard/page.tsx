import prisma from '@/lib/prisma'
import { getClientSession } from '@/lib/client-session'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getClientSession()
  const client = await prisma.client.findUnique({
    where: { id: session!.clientId },
    include: { projects: { orderBy: { updatedAt: 'desc' } } },
  })

  if (!client) return null

  const projects = client.projects

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Welcome, {client.name}</h1>
        <p className="text-gray text-sm mt-1">Here are your ongoing projects</p>
      </div>

      {projects.length === 0 ? (
        <div className="card p-12 text-center text-gray">
          <p className="text-lg mb-2">No projects assigned yet</p>
          <p className="text-sm">Once an admin assigns a project to you, it will appear here.</p>
          <p className="text-sm mt-4">
            In the meantime, you can{' '}
            <Link href="/track" className="text-terracotta hover:underline">track a project using your project ID</Link>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <Link key={p.id} href={`/track/${p.id}?authed=1`} className="card p-6 block hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-black">{p.clientName || 'Project'}</h2>
                  {p.description && <p className="text-sm text-gray mt-1 line-clamp-2">{p.description}</p>}
                </div>
                <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${p.status === 'completed' ? 'bg-green-100 text-green-700' : p.status === 'on-hold' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange/10 text-orange'}`}>
                  {p.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-gray">
                <span>Started {p.startDate.toLocaleDateString()}</span>
                <span>Last updated {p.updatedAt.toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
