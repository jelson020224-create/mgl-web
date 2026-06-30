'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { registerClient } from './actions'

const initialState = { error: '' }

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerClient, initialState)

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-20 pb-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center text-white font-bold text-sm">M</div>
          </Link>
          <h1 className="text-2xl font-bold text-warm-gray">Create account</h1>
          <p className="text-sm text-gray-dark mt-1">Track your project updates</p>
        </div>

        <div className="card p-6">
          <form action={formAction} className="space-y-4">
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name</label>
              <input id="name" name="name" required autoComplete="name" className="input-field" placeholder="John Smith" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="input-field" placeholder="you@example.com" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required minLength={6} autoComplete="new-password" className="input-field" placeholder="At least 6 characters" />
            </div>
            {state.error && <p className="form-error text-center">{state.error}</p>}
            <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
              {pending && <span className="spinner" />}
              {pending ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-terracotta hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
