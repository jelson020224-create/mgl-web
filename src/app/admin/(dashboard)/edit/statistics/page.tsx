import prisma from '@/lib/prisma'
import { AdminStatisticsClient } from './client'

export default async function StatisticsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, clientName: true, status: true, startDate: true, createdAt: true },
  })

  const completedCount = projects.filter(p => p.status === 'completed').length
  const totalClients = new Set(projects.map(p => p.clientName)).size
  const teamCount = await prisma.teamMember.count()
  const oldestProject = projects.reduce((oldest, p) =>
    p.startDate < oldest ? p.startDate : oldest,
    projects.length > 0 ? projects[0].startDate : new Date()
  )
  const yearsActive = Math.max(1, new Date().getFullYear() - oldestProject.getFullYear())

  return (
    <AdminStatisticsClient
      projects={JSON.parse(JSON.stringify(projects))}
      completedCount={completedCount}
      totalProjects={projects.length}
      totalClients={totalClients}
      teamCount={teamCount}
      yearsActive={yearsActive}
    />
  )
}
