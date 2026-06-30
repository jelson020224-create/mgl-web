'use client'

import { useActionState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { clientLogin } from './actions'

const initialState = { error: '' }

function LoginFormInner() {
  const [state, formAction, pending] = useActionState(clientLogin, initialState)
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-20 pb-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center text-white font-bold text-sm">M</div>
          </Link>
          <h1 className="text-2xl font-bold text-warm-gray">Welcome back</h1>
          <p className="text-sm text-gray-dark mt-1">Sign in to your client dashboard</p>
        </div>

        <div className="card p-6">
          {registered && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 text-center">
              Account created. Please sign in.
            </div>
          )}
          <form action={formAction} className="space-y-4">
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="input-field" placeholder="you@example.com" />
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

        <p className="text-center text-sm text-gray mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-terracotta hover:underline font-medium">Create one</Link>
        </p>
      </div>
    </div>
  )
}

function LoginForm() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="skeleton w-80 h-80 rounded-xl" /></div>}>
      <LoginFormInner />
    </Suspense>
  )
}

export default function LoginPage() {
  return <LoginForm />
}
