'use client'

import { useActionState } from 'react'
import { saveSettings } from '@/lib/admin-actions'

export function EditContactForm({ settings }: { settings: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, { error: '', success: '' })

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Contact Page</h1>
      <form action={action} className="max-w-2xl space-y-6">
        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Company Info</legend>
          <div className="space-y-4">
            <input type="hidden" name="company_name" value={settings.company_name || ''} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Email</label>
                <input name="company_email" defaultValue={settings.company_email || ''} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Phone</label>
                <input name="company_phone" defaultValue={settings.company_phone || ''} className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Address</label>
              <input name="company_address" defaultValue={settings.company_address || ''} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Page Hero</legend>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Eyebrow</label>
              <input name="contact_hero_eyebrow" defaultValue={settings.contact_hero_eyebrow || 'Get in Touch'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title</label>
              <input name="contact_hero_title" defaultValue={settings.contact_hero_title || 'Contact Us'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Subtitle</label>
              <input name="contact_hero_subtitle" defaultValue={settings.contact_hero_subtitle || "Let's bring your vision to life"} className="input-field" />
            </div>
          </div>
        </fieldset>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? 'Saving...' : 'Save Contact Settings'}
        </button>
      </form>
    </div>
  )
}
