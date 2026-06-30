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
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-24">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Client Login</h1>
          <p className="text-gray text-sm mt-2">Sign in to track your projects</p>
        </div>
        {registered && (
          <p className="text-green-600 text-sm text-center mb-4 bg-green-50 py-2 rounded-lg">
            Account created successfully. Please sign in.
          </p>
        )}
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Email</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Password</label>
            <input name="password" type="password" required className="input-field" />
          </div>
          {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
          <button type="submit" disabled={pending} className="btn-primary w-full text-center disabled:opacity-50">
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
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
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-24"><div className="text-gray">Loading...</div></div>}>
      <LoginFormInner />
    </Suspense>
  )
}

export default function LoginPage() {
  return <LoginForm />
}
