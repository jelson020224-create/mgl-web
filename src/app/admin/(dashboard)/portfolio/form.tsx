'use client'

import { useState, useActionState } from 'react'
import { addPortfolioItem } from '@/lib/admin-crud-actions'

const initialState = { error: '', success: '' }

export function AdminPortfolioForm() {
  const [state, formAction, pending] = useActionState(addPortfolioItem, initialState)
  const [type, setType] = useState<'image' | 'video'>('image')

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="type" value={type} />
      <div>
        <label className="block text-sm font-semibold text-black mb-2">Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type-picker" checked={type === 'image'} onChange={() => setType('image')} className="accent-terracotta" />
            <span className="text-sm text-black">Image</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type-picker" checked={type === 'video'} onChange={() => setType('video')} className="accent-terracotta" />
            <span className="text-sm text-black">Video</span>
          </label>
        </div>
      </div>
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
      {type === 'image' && (
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Image URL</label>
          <input name="imageUrl" placeholder="/uploads/project.jpg" className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
        </div>
      )}
      {type === 'video' && (
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Facebook Video URL</label>
          <input name="videoUrl" placeholder="https://www.facebook.com/..." className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
        </div>
      )}
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-50">
        {pending ? 'Adding...' : 'Add to Portfolio'}
      </button>
    </form>
  )
}
