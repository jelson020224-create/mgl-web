'use client'

import { useActionState } from 'react'
import { createProject } from '@/lib/admin-crud-actions'

const initialState = { error: '', success: '' }

interface Client {
  id: number
  name: string
  email: string | null
}

export default function NewProjectForm({ clients }: { clients: Client[] }) {
  const [state, formAction, pending] = useActionState(createProject, initialState)

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">New Project</h1>
      <div className="card-modern shadow-soft p-8 max-w-2xl">
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Client Name *</label>
            <input name="clientName" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Assign to Registered Client</label>
            <select name="clientId" className="input-field bg-white">
              <option value="">— None (standalone project) —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}{c.email ? ` (${c.email})` : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Client Password *</label>
            <input name="clientPassword" type="password" required className="input-field" />
            <p className="text-xs text-gray mt-1">Share this password with the client so they can view project updates.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description</label>
            <textarea name="description" rows={3} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Status</label>
            <select name="status" className="input-field bg-white">
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
          {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
          <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-50">
            {pending ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </>
  )
}
