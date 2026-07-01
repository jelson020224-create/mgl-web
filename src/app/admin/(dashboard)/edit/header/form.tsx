'use client'

import { useState, useActionState } from 'react'
import { saveSettings } from '@/lib/admin-actions'
import { SiteLogo } from '@/components/site-logo'

export function EditHeaderForm({ settings }: { settings: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, { error: '', success: '' })
  const [logoUrl, setLogoUrl] = useState(settings.logo_url || '')
  const [uploading, setUploading] = useState(false)

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) setLogoUrl(data.image.url)
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">Header</h1>
      <form action={action} className="max-w-2xl space-y-6">
        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Brand Text (beside logo)</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Primary (e.g. MGL)</label>
              <input name="brand_primary" defaultValue={settings.brand_primary || 'MGL'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Secondary (e.g. Construction & Interior)</label>
              <input name="brand_secondary_text" defaultValue={settings.brand_secondary_text || 'Construction & Interior'} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Logo</legend>
          <div className="flex items-start gap-6">
            <div className="w-32 h-16 rounded-lg border border-sand-light bg-white flex items-center justify-center overflow-hidden shrink-0">
              <SiteLogo settings={{ ...settings, logo_url: logoUrl }} variant="full" />
            </div>
            <div className="flex-1 space-y-2">
              <input type="hidden" name="logo_url" value={logoUrl} />
              <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading}
                className="block w-full text-sm text-gray-dark file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-terracotta-50 file:text-terracotta hover:file:bg-terracotta/10 cursor-pointer" />
              {uploading && <p className="text-xs text-gray">Uploading...</p>}
              <p className="text-xs text-gray">Recommended: PNG or SVG, max 200px wide.</p>
            </div>
          </div>
        </fieldset>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? 'Saving...' : 'Save Header Settings'}
        </button>
      </form>
    </div>
  )
}
