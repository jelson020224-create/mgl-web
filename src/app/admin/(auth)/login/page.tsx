'use client'

import { useActionState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { adminLogin } from './actions'
import { SiteLogo } from '@/components/site-logo'

const initialState = { error: '' }

function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState)
  const searchParams = useSearchParams()
  const oauthError = searchParams.get('error')

  return (
    <div className="min-h-screen bg-warm-gray flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-terracotta/5 rounded-full blur-[100px]" />
      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <SiteLogo variant="admin-mark" size={48} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-gray/50 mt-1">MGL Construction & Interior</p>
        </div>
        <div className="bg-white rounded-2xl p-7 shadow-2xl">
          {oauthError && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 text-center">
              {oauthError === 'oauth_failed' && 'Google sign-in failed.'}
              {oauthError === 'oauth_state_mismatch' && 'Security check failed. Try again.'}
              {oauthError === 'oauth_no_email' && 'Google account has no email.'}
              {oauthError === 'google_not_admin' && 'This Google account is not authorized as an admin.'}
              {oauthError === 'oauth_error' && 'Could not sign in with Google.'}
              {!['oauth_failed', 'oauth_state_mismatch', 'oauth_no_email', 'google_not_admin', 'oauth_error'].includes(oauthError) && 'Something went wrong.'}
            </div>
          )}

          <a
            href="/api/auth/google/admin"
            className="w-full mb-4 inline-flex items-center justify-center gap-3 px-4 py-2.5 border border-gray/30 rounded-xl bg-white hover:bg-warm-gray-50/20 transition-colors text-sm font-medium text-warm-gray"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Sign in with Google
          </a>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray/20" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray">or sign in with password</span></div>
          </div>

          <form action={formAction} className="space-y-4">
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="input-field" placeholder="admin@mgl.com" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required autoComplete="current-password" className="input-field" placeholder="Enter your password" />
            </div>
            {state.error && <p className="form-error text-center">{state.error}</p>}
            <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
              {pending && <span className="spinner" />}
              {pending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-gray flex items-center justify-center px-4">
        <div className="w-full max-w-sm"><div className="skeleton h-80 rounded-2xl" /></div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}
