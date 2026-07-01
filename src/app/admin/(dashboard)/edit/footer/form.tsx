'use client'

import { useActionState } from 'react'
import { saveSettings } from '@/lib/admin-actions'

export function EditFooterForm({ settings }: { settings: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, { error: '', success: '' })

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Footer</h1>
      <form action={action} className="max-w-2xl space-y-6">
        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Footer Content</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Description</label>
              <textarea name="footer_description" rows={3} defaultValue={settings.footer_description || ''} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Company Name</label>
              <input name="footer_company_name" defaultValue={settings.footer_company_name || 'MGL Construction'} className="input-field" />
            </div>
          </div>
        </fieldset>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? 'Saving...' : 'Save Footer Settings'}
        </button>
      </form>
    </div>
  )
}
