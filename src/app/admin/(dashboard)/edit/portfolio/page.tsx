import prisma from '@/lib/prisma'
import { AdminEditPortfolioClient } from './client'

export default async function AdminEditPortfolioPage() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Portfolio</h1>
      <AdminEditPortfolioClient items={items} />
    </div>
  )
}
