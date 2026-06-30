'use client'

import { useActionState } from 'react'
import { updateService } from '@/lib/admin-crud-actions'

const initialState = { error: '', success: '' }

export function AdminServiceForm() {
  const [state, formAction, pending] = useActionState(updateService, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" />
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Title *</label>
        <input name="title" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Description</label>
        <textarea name="description" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Icon (emoji)</label>
        <input name="icon" placeholder="🏛️" className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Order</label>
        <input name="order" type="number" defaultValue={0} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
        {pending ? 'Saving...' : 'Save Service'}
      </button>
    </form>
  )
}
