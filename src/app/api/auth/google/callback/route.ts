import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { exchangeCodeForTokens, getGoogleUser } from '@/lib/google-auth'
import { createClientSession } from '@/lib/client-session'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code || !state) {
    return NextResponse.redirect(new URL('/login?error=oauth_failed', req.url))
  }

  const cookieStore = await cookies()
  const savedState = cookieStore.get('google_oauth_state')?.value
  cookieStore.delete('google_oauth_state')

  if (state !== savedState) {
    return NextResponse.redirect(new URL('/login?error=oauth_state_mismatch', req.url))
  }

  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const redirectUri = `${origin}/api/auth/google/callback`
    const tokens = await exchangeCodeForTokens(code, redirectUri)
    const googleUser = await getGoogleUser(tokens.access_token)

    let client = await prisma.client.findFirst({
      where: {
        OR: [{ googleId: googleUser.id }, { email: googleUser.email }],
      },
    })

    if (client) {
      if (!client.googleId) {
        await prisma.client.update({
          where: { id: client.id },
          data: { googleId: googleUser.id },
        })
      }
    } else {
      client = await prisma.client.create({
        data: {
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.id,
        },
      })
    }

    await createClientSession(client.id)
    return NextResponse.redirect(new URL('/dashboard', req.url))
  } catch {
    return NextResponse.redirect(new URL('/login?error=oauth_error', req.url))
  }
}
