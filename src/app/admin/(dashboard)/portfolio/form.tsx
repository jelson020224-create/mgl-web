'use client'

import { useActionState } from 'react'
import { addPortfolioItem } from '@/lib/admin-crud-actions'

const initialState = { error: '', success: '' }

export function AdminPortfolioForm() {
  const [state, formAction, pending] = useActionState(addPortfolioItem, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Title *</label>
        <input name="title" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Category</label>
        <input name="category" placeholder="e.g., Interior, Renovation, New Build" className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Description</label>
        <textarea name="description" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-1">Image URL</label>
        <input name="imageUrl" placeholder="/uploads/project.jpg" className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
      </div>
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
        {pending ? 'Adding...' : 'Add to Portfolio'}
      </button>
    </form>
  )
}
