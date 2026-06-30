import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session?.adminId) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-warm-gray text-white shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-terracotta">MGL Admin</h2>
          <p className="text-xs text-gray-light mt-1">Construction & Interior</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
            { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
            { href: '/admin/services', label: 'Services', icon: '🔧' },
            { href: '/admin/portfolio', label: 'Portfolio', icon: '🖼️' },
            { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
            { href: '/admin/media', label: 'Media', icon: '📁' },
            { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
            { href: '/admin/messages', label: 'Messages', icon: '✉️' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-light hover:bg-white/10 hover:text-white transition-colors">
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="block text-sm text-gray-light hover:text-white">← View Site</Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-sm text-gray-light hover:text-white w-full text-left">Logout</button>
          </form>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray/20 px-6 py-4 flex md:hidden items-center justify-between">
          <span className="font-bold text-terracotta">MGL Admin</span>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-gray hover:text-black">Dashboard</Link>
          </nav>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
