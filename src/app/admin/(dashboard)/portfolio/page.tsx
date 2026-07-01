import prisma from '@/lib/prisma'
import { AdminPortfolioForm } from './form'

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">Portfolio</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern shadow-soft p-8">
          <h2 className="text-lg font-bold text-black mb-4">Add Portfolio Item</h2>
          <AdminPortfolioForm />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((p) => (
            <div key={p.id} className="card-modern shadow-soft p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-light rounded-lg flex items-center justify-center text-gray text-sm shrink-0">📷</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black text-sm">{p.title}</h3>
                  {p.type === 'video' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Video</span>}
                </div>
                <span className="text-xs text-orange">{p.category}</span>
              </div>
              <form action={async () => {
                'use server'
                const { deletePortfolioItem } = await import('@/lib/admin-crud-actions')
                await deletePortfolioItem(p.id)
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
