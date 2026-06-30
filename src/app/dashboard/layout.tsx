import { redirect } from 'next/navigation'
import { getClientSession } from '@/lib/client-session'
import ClientNav from './client-nav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientSession()
  if (!session?.clientId) redirect('/login')

  return (
    <div className="min-h-screen bg-cream pt-20">
      <ClientNav />
      <main className="section-container py-8">{children}</main>
    </div>
  )
}
