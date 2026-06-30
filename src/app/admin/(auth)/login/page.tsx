'use client'

import { useActionState } from 'react'
import { adminLogin } from './actions'
import { SiteLogo } from '@/components/site-logo'

const initialState = { error: '' }

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState)

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
