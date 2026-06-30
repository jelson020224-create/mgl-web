'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { saveSettings } from '@/lib/admin-actions'
import dynamic from 'next/dynamic'

const RichEditor = dynamic(() => import('@/components/ui/rich-editor'), { ssr: false })

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, { error: '', success: '' })
  const [aboutContent, setAboutContent] = useState(settings.about_content || '')

  return (
    <div>
      <h1 className="text-2xl font-bold text-warm-gray mb-8">Site Settings</h1>

      <form action={action} className="max-w-3xl space-y-6">
        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Company Info</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Company Name</label>
              <input name="company_name" defaultValue={settings.company_name || ''} className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Email</label>
                <input name="company_email" defaultValue={settings.company_email || ''} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Phone</label>
                <input name="company_phone" defaultValue={settings.company_phone || ''} className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Address</label>
              <input name="company_address" defaultValue={settings.company_address || ''} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Hero Section</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Title</label>
              <input name="hero_title" defaultValue={settings.hero_title || ''} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Subtitle</label>
              <textarea name="hero_subtitle" rows={3} defaultValue={settings.hero_subtitle || ''} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">About Page Content</legend>
          <div>
            <label className="block text-sm font-medium text-warm-gray mb-2">About Content (Rich Text)</label>
            <input type="hidden" name="about_content" value={aboutContent} />
            <RichEditor content={aboutContent} onChange={setAboutContent} />
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6 bg-terracotta-50/30">
          <legend className="text-sm font-semibold text-warm-gray px-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Stats Counter
          </legend>
          <p className="text-xs text-gray mb-4 ml-1">These display on the homepage hero. A <code className="bg-gray-light px-1 rounded text-[10px]">+</code> is appended automatically.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Projects <span className="text-gray font-normal">Completed</span></label>
              <div className="relative">
                <input name="stats_projects" defaultValue={settings.stats_projects || '150'} className="input-field pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray text-sm">+</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Years <span className="text-gray font-normal">Experience</span></label>
              <div className="relative">
                <input name="stats_years" defaultValue={settings.stats_years || '12'} className="input-field pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray text-sm">+</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Happy <span className="text-gray font-normal">Clients</span></label>
              <div className="relative">
                <input name="stats_clients" defaultValue={settings.stats_clients || '50'} className="input-field pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray text-sm">+</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Expert <span className="text-gray font-normal">Team</span></label>
              <div className="relative">
                <input name="stats_team" defaultValue={settings.stats_team || '20'} className="input-field pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray text-sm">+</span>
              </div>
            </div>
          </div>
        </fieldset>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-500 text-sm">{state.success}</p>}

        <button type="submit" disabled={pending} className="btn-primary flex items-center gap-2">
          {pending && <span className="spinner" />}
          Save Settings
        </button>
      </form>
    </div>
  )
}
