'use client'

import { useActionState } from 'react'
import { createProject } from '../../actions'

const initialState = { error: '', success: '' }

export default function NewProjectPage() {
  const [state, formAction, pending] = useActionState(createProject, initialState)

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">New Project</h1>
      <div className="card p-8 max-w-2xl">
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Client Name *</label>
            <input name="clientName" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Client Password *</label>
            <input name="clientPassword" type="password" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
            <p className="text-xs text-gray mt-1">Share this password with the client so they can view project updates.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <textarea name="description" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Status</label>
            <select name="status" className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange bg-white">
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
          {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
          <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
            {pending ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </>
  )
}
