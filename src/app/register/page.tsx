'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { registerClient } from './actions'

const initialState = { error: '' }

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerClient, initialState)

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-24">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Create Account</h1>
          <p className="text-gray text-sm mt-2">Track your project updates</p>
        </div>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Full Name</label>
            <input name="name" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Email</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Password</label>
            <input name="password" type="password" required minLength={6} className="input-field" />
            <p className="text-xs text-gray mt-1">At least 6 characters</p>
          </div>
          {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
          <button type="submit" disabled={pending} className="btn-primary w-full text-center disabled:opacity-50">
            {pending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-gray mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-terracotta hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
