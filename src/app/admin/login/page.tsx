'use client'

import { useActionState } from 'react'
import { adminLogin } from './actions'

const initialState = { error: '' }

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Admin Login</h1>
          <p className="text-gray text-sm mt-2">MGL Construction & Interior</p>
        </div>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Password</label>
            <input name="password" type="password" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
          </div>
          {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
          <button type="submit" disabled={pending} className="btn-primary w-full text-center disabled:opacity-50">
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
