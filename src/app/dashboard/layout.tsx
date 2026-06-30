import { redirect } from 'next/navigation'
import { getClientSession } from '@/lib/client-session'
import ClientNav from './client-nav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientSession()
  if (!session?.clientId) redirect('/login')

  return (
    <div className="min-h-screen bg-cream pt-20">
      <ClientNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
