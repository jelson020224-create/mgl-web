import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getGoogleAuthUrl } from '@/lib/google-auth'

export async function GET() {
  const state = crypto.randomUUID()
  const cookieStore = await cookies()
  cookieStore.set('google_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  })

  const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const redirectUri = `${origin}/api/auth/google/callback`
  const url = getGoogleAuthUrl(state, redirectUri)

  return NextResponse.redirect(url)
}
