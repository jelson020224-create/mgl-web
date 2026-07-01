import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { exchangeCodeForTokens, getGoogleUser } from '@/lib/google-auth'
import { createSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code || !state) {
    return NextResponse.redirect(new URL('/admin/login?error=oauth_failed', req.url))
  }

  const cookieStore = await cookies()
  const savedState = cookieStore.get('google_admin_oauth_state')?.value
  cookieStore.delete('google_admin_oauth_state')

  if (state !== savedState) {
    return NextResponse.redirect(new URL('/admin/login?error=oauth_state_mismatch', req.url))
  }

  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const redirectUri = `${origin}/api/auth/google/admin-callback`
    const tokens = await exchangeCodeForTokens(code, redirectUri)
    const googleUser = await getGoogleUser(tokens.access_token)

    if (!googleUser.email) {
      return NextResponse.redirect(new URL('/admin/login?error=oauth_no_email', req.url))
    }

    const admin = await prisma.admin.findUnique({
      where: { email: googleUser.email },
    })

    if (!admin) {
      return NextResponse.redirect(new URL('/admin/login?error=google_not_admin', req.url))
    }

    if (!admin.googleId) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: { googleId: googleUser.id },
      })
    }

    await createSession(admin.id)
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  } catch {
    return NextResponse.redirect(new URL('/admin/login?error=oauth_error', req.url))
  }
}
