'use client'

import { useActionState, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SiteLogo } from '@/components/site-logo'
import { verifyEmail } from './actions'

const initialState = { error: '' }

function VerifyForm() {
  const [state, formAction, pending] = useActionState(verifyEmail, initialState)
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [code, setCode] = useState('')

  if (!email) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-warm-gray mb-2">No email provided</h1>
          <p className="text-sm text-gray-dark mb-6">Please start the registration process again.</p>
          <Link href="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-20 pb-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <SiteLogo variant="mark" size={40} />
          </Link>
          <h1 className="text-2xl font-bold text-warm-gray">Check your email</h1>
          <p className="text-sm text-gray-dark mt-1">
            We sent a 6-digit code to <span className="font-medium text-warm-gray">{email}</span>
          </p>
        </div>

        <div className="card-modern shadow-soft p-6">
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="email" value={email} />
            <div className="input-group">
              <label className="input-label" htmlFor="code">Verification Code</label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                maxLength={6}
                className="input-field text-center text-2xl tracking-[0.3em] font-mono"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>
            {state.error && <p className="form-error text-center">{state.error}</p>}
            <button type="submit" disabled={pending || code.length !== 6} className="btn btn-primary w-full justify-center">
              {pending && <span className="spinner" />}
              {pending ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray mt-6">
          Didn&apos;t get the code?{' '}
          <Link href="/register" className="text-terracotta hover:underline font-medium">Register again</Link>
        </p>
      </div>
    </div>
  )
}

import { Suspense } from 'react'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="skeleton w-80 h-96 rounded-xl" /></div>}>
      <VerifyForm />
    </Suspense>
  )
}
