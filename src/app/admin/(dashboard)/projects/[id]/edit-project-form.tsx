'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { updateProject, addUpdate, deleteProject } from '@/lib/admin-crud-actions'

interface Client {
  id: number
  name: string
  email: string | null
}

export default function EditProjectForm({ clients }: { clients: Client[] }) {
  const [id, setId] = useState('')
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [updateState, updateAction, updatePending] = useActionState(
    async (prev: any, formData: FormData) => {
      formData.set('projectId', id)
      return updateProject(prev, formData)
    },
    { error: '', success: '' }
  )

  const [addState, addAction, addPending] = useActionState(
    async (prev: any, formData: FormData) => {
      formData.set('projectId', id)
      return addUpdate(prev, formData)
    },
    { error: '', success: '' }
  )

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const pathParts = window.location.pathname.split('/')
    const projectId = pathParts[pathParts.length - 1]
    setId(projectId)

    fetch(`/api/admin/projects/${projectId}`)
      .then((r) => r.json())
      .then((data) => { setProject(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray">Loading...</p>
  if (!project) return <p className="text-gray">Project not found.</p>

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">{project.clientName}</h1>
        <form action={async () => { await deleteProject(id); window.location.href = '/admin/projects' }}>
          <button type="submit" className="text-sm text-red-500 hover:underline">Delete Project</button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern shadow-soft p-8">
          <h2 className="text-lg font-bold text-black mb-4">Project Details</h2>
          <form action={updateAction} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Client Name</label>
              <input name="clientName" defaultValue={project.clientName} required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Assign to Registered Client</label>
              <select name="clientId" defaultValue={project.clientId || ''} className="input-field bg-white">
                <option value="">— None (standalone) —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}{c.email ? ` (${c.email})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Client Password</label>
              <input name="clientPassword" type="password" placeholder="Leave blank to keep current" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Description</label>
              <textarea name="description" rows={3} defaultValue={project.description} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Status</label>
              <select name="status" defaultValue={project.status} className="input-field bg-white">
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            {updateState.error && <p className="text-red-500 text-sm">{updateState.error}</p>}
            {updateState.success && <p className="text-green-600 text-sm">{updateState.success}</p>}
            <button type="submit" disabled={updatePending} className="btn btn-primary disabled:opacity-50">
              {updatePending ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="card-modern shadow-soft p-8">
          <h2 className="text-lg font-bold text-black mb-4">Add Update</h2>
          <form action={addAction} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Update Content *</label>
              <textarea name="content" rows={5} required className="input-field" placeholder="Describe the progress made..." />
            </div>
            {addState.error && <p className="text-red-500 text-sm">{addState.error}</p>}
            {addState.success && <p className="text-green-600 text-sm">{addState.success}</p>}
            <button type="submit" disabled={addPending} className="btn btn-primary disabled:opacity-50">
              {addPending ? 'Adding...' : 'Add Update'}
            </button>
          </form>

          <div className="mt-8">
            <h3 className="font-bold text-black mb-4">Update History ({project.updates?.length || 0})</h3>
            {(!project.updates || project.updates.length === 0) ? (
              <p className="text-gray text-sm">No updates yet.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {[...project.updates].reverse().map((u: any) => (
                  <div key={u.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray mb-1">{new Date(u.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-black whitespace-pre-line">{u.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
