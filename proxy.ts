import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isAdminRoute = path.startsWith('/admin')
  const isAdminLoginRoute = path === '/admin/login'
  const isAdminApi = path.startsWith('/api/admin')

  if (isAdminRoute && !isAdminLoginRoute) {
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await decrypt(cookie) : null
    if (!session?.adminId) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
  }

  if (isAdminApi) {
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await decrypt(cookie) : null
    if (!session?.adminId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
