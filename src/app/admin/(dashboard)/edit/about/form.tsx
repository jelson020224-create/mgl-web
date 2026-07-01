'use client'

import { useState, useActionState } from 'react'
import { saveSettings } from '@/lib/admin-actions'
import dynamic from 'next/dynamic'

const RichEditor = dynamic(() => import('@/components/ui/rich-editor'), { ssr: false })

export function EditAboutForm({ settings }: { settings: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, { error: '', success: '' })
  const [aboutContent, setAboutContent] = useState(settings.about_content || '')

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">About Page</h1>
      <form action={action} className="max-w-3xl space-y-6">
        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Page Hero</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Eyebrow</label>
              <input name="about_hero_eyebrow" defaultValue={settings.about_hero_eyebrow || 'Who We Are'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title</label>
              <input name="about_hero_title" defaultValue={settings.about_hero_title || 'About MGL'} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-black px-2">Content</legend>
          <div>
            <label className="block text-sm font-medium text-black mb-2">About Content (Rich Text)</label>
            <input type="hidden" name="about_content" value={aboutContent} />
            <RichEditor content={aboutContent} onChange={setAboutContent} />
          </div>
        </fieldset>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? 'Saving...' : 'Save About Settings'}
        </button>
      </form>
    </div>
  )
}
