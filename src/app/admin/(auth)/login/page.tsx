'use client'

import { useActionState } from 'react'
import { adminLogin } from './actions'

const initialState = { error: '' }

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState)

  return (
    <div className="min-h-screen bg-warm-gray flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-terracotta flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">M</div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-gray/60 mt-1">MGL Construction & Interior</p>
        </div>
        <div className="bg-white rounded-xl p-6">
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
