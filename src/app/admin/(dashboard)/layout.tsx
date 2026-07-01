import Link from 'next/link'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getSession } from '@/lib/session'
import { getSiteSettings } from '@/lib/queries'
import { SiteLogo } from '@/components/site-logo'
import NavSidebar from '@/components/NavSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session?.adminId) redirect('/admin/login')
  const settings = await getSiteSettings()
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  return (
    <div className="min-h-screen bg-warm-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="w-64 glass-dark shrink-0 hidden md:flex flex-col shadow-soft">
        <div className="h-1 gradient-accent shrink-0" />
        <div className="px-5 py-6 border-b border-white/5">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2.5">
            <SiteLogo settings={settings} variant="admin-mark" size={28} />
            <span className="tag tag-terracotta">Admin</span>
          </Link>
        </div>
        <NavSidebar pathname={pathname} settings={settings}>
          <div className="p-3 border-t border-white/5 space-y-0.5">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-r-lg text-sm text-gray-light/50 hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent hover:border-terracotta/50 transition-all">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View Site
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-r-lg text-sm text-gray-light/50 hover:text-red-400 hover:bg-white/[0.03] border-l-2 border-transparent hover:border-red-400/50 transition-all">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </form>
          </div>
        </NavSidebar>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="glass backdrop-blur-md border-b border-white/10 px-6 py-3 flex md:hidden items-center justify-between shadow-soft">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <SiteLogo settings={settings} variant="admin-mark" size={24} />
            <span className="tag tag-terracotta">Admin</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/" className="text-gray-dark hover:text-terracotta transition-colors">Site</Link>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="text-gray-dark hover:text-red-500 transition-colors">Logout</button>
            </form>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
