'use client'

import { useState } from 'react'
import { deleteAccount } from './actions'

export default function AccountDanger() {
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    setPending(true)
    setError('')
    const result = await deleteAccount()
    if (result?.error) {
      setError(result.error)
      setPending(false)
      setConfirming(false)
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-red-200">
      <div className="card-modern shadow-soft p-6 border-red-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-warm-gray">Danger Zone</h3>
            <p className="text-xs text-gray">Permanently delete your account and all associated data</p>
          </div>
        </div>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="mt-3 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            Delete my account
          </button>
        ) : (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-red-600 font-medium">
              Are you sure? This cannot be undone.
            </p>
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={pending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors"
              >
                {pending ? 'Deleting...' : 'Yes, delete my account'}
              </button>
              <button
                onClick={() => { setConfirming(false); setError('') }}
                disabled={pending}
                className="px-4 py-2 text-sm font-medium text-warm-gray bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
