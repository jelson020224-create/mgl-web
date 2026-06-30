'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { saveSettings } from '@/lib/admin-actions'
import dynamic from 'next/dynamic'
import { SiteLogo } from '@/components/site-logo'

const RichEditor = dynamic(() => import('@/components/ui/rich-editor'), { ssr: false })

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, { error: '', success: '' })
  const [aboutContent, setAboutContent] = useState(settings.about_content || '')
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
      if (data.success) {
        setLogoUrl(data.image.url)
      }
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-warm-gray mb-8">Site Settings</h1>

      <form action={action} className="max-w-3xl space-y-6">
        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Logo</legend>
          <div className="flex items-start gap-6">
            <div className="w-32 h-16 rounded-lg border border-sand-light bg-white flex items-center justify-center overflow-hidden shrink-0">
              <SiteLogo settings={{ ...settings, logo_url: logoUrl }} variant="full" />
            </div>
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-warm-gray">Upload Logo</label>
              <input type="hidden" name="logo_url" value={logoUrl} />
              <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading}
                className="block w-full text-sm text-gray-dark file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-terracotta-50 file:text-terracotta hover:file:bg-terracotta/10 cursor-pointer" />
              {uploading && <p className="text-xs text-gray">Uploading...</p>}
              <p className="text-xs text-gray">Recommended: PNG or SVG, max 200px wide. Falls back to default logo if empty.</p>
            </div>
          </div>
        </fieldset>

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
          <legend className="text-sm font-semibold text-warm-gray px-2">Brand Text (beside logo)</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Primary (e.g. MGL)</label>
              <input name="brand_primary" defaultValue={settings.brand_primary || 'MGL'} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Secondary (e.g. Construction & Interior)</label>
              <input name="brand_secondary_text" defaultValue={settings.brand_secondary_text || 'Construction & Interior'} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
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

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Section Titles</legend>
          <div className="space-y-4">
            <p className="text-xs text-gray mb-2 font-medium">Services Section</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Services Eyebrow</label>
                <input name="services_eyebrow" defaultValue={settings.services_eyebrow || 'What We Do'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Services Title</label>
                <input name="services_title" defaultValue={settings.services_title || 'Our Services'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Services Subtitle</label>
                <input name="services_subtitle" defaultValue={settings.services_subtitle || 'Comprehensive solutions for every stage of your project'} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">Testimonials Section</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Testimonials Eyebrow</label>
                <input name="testimonials_eyebrow" defaultValue={settings.testimonials_eyebrow || 'Testimonials'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Testimonials Title</label>
                <input name="testimonials_title" defaultValue={settings.testimonials_title || 'What Our Clients Say'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Testimonials Subtitle</label>
                <input name="testimonials_subtitle" defaultValue={settings.testimonials_subtitle || 'Trusted by homeowners and businesses alike'} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">Portfolio Section</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Portfolio Eyebrow</label>
                <input name="portfolio_eyebrow" defaultValue={settings.portfolio_eyebrow || 'Portfolio'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Portfolio Title</label>
                <input name="portfolio_title" defaultValue={settings.portfolio_title || 'Recent Projects'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Portfolio Subtitle</label>
                <input name="portfolio_subtitle" defaultValue={settings.portfolio_subtitle || 'A glimpse of our work \u2014 each project tells a story'} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">CTA Section</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">CTA Eyebrow</label>
                <input name="cta_eyebrow" defaultValue={settings.cta_eyebrow || "Let's Build Together"} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">CTA Title</label>
                <input name="cta_title" defaultValue={settings.cta_title || 'Ready to Start Your Project?'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">CTA Subtitle</label>
                <input name="cta_subtitle" defaultValue={settings.cta_subtitle || 'Whether you need a full construction, interior design, or renovation \u2014 we bring your vision to life.'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">CTA Button</label>
                <input name="cta_button" defaultValue={settings.cta_button || 'Get in Touch'} className="input-field" />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Hero Content</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Hero Eyebrow</label>
              <input name="hero_eyebrow" defaultValue={settings.hero_eyebrow || 'MGL Construction & Interior'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Hero CTA Text</label>
              <input name="hero_cta_text" defaultValue={settings.hero_cta_text || 'Get a Free Quote'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Hero Secondary CTA Text</label>
              <input name="hero_secondary_cta_text" defaultValue={settings.hero_secondary_cta_text || 'View Portfolio'} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Stats Labels</legend>
          <p className="text-xs text-gray mb-4 ml-1">Labels shown below each stat counter on the homepage.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Label for Projects</label>
              <input name="stats_label_projects" defaultValue={settings.stats_label_projects || 'Projects Completed'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Label for Years</label>
              <input name="stats_label_years" defaultValue={settings.stats_label_years || 'Years Experience'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Label for Clients</label>
              <input name="stats_label_clients" defaultValue={settings.stats_label_clients || 'Happy Clients'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Label for Team</label>
              <input name="stats_label_team" defaultValue={settings.stats_label_team || 'Expert Team'} className="input-field" />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Page Hero Titles</legend>
          <div className="space-y-4">
            <p className="text-xs text-gray mb-2 font-medium">About Page</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">About Hero Eyebrow</label>
                <input name="about_hero_eyebrow" defaultValue={settings.about_hero_eyebrow || 'Who We Are'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">About Hero Title</label>
                <input name="about_hero_title" defaultValue={settings.about_hero_title || 'About MGL'} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">Services Page</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Services Hero Eyebrow</label>
                <input name="services_hero_eyebrow" defaultValue={settings.services_hero_eyebrow || 'Our Expertise'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Services Hero Title</label>
                <input name="services_hero_title" defaultValue={settings.services_hero_title || 'Our Services'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Services Hero Subtitle</label>
                <input name="services_hero_subtitle" defaultValue={settings.services_hero_subtitle || 'Everything you need under one roof \u2014 from concept to completion.'} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">Portfolio Page</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Portfolio Hero Eyebrow</label>
                <input name="portfolio_hero_eyebrow" defaultValue={settings.portfolio_hero_eyebrow || 'Our Work'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Portfolio Hero Title</label>
                <input name="portfolio_hero_title" defaultValue={settings.portfolio_hero_title || 'Our Portfolio'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Portfolio Hero Subtitle</label>
                <input name="portfolio_hero_subtitle" defaultValue={settings.portfolio_hero_subtitle || 'A showcase of our finest work'} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">Contact Page</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Contact Hero Eyebrow</label>
                <input name="contact_hero_eyebrow" defaultValue={settings.contact_hero_eyebrow || 'Get in Touch'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Contact Hero Title</label>
                <input name="contact_hero_title" defaultValue={settings.contact_hero_title || 'Contact Us'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Contact Hero Subtitle</label>
                <input name="contact_hero_subtitle" defaultValue={settings.contact_hero_subtitle || "Let's bring your vision to life"} className="input-field" />
              </div>
            </div>
            <hr className="border-gray/10" />
            <p className="text-xs text-gray mb-2 font-medium">Track Page</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Track Hero Title</label>
                <input name="track_hero_title" defaultValue={settings.track_hero_title || 'Track Your Project'} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-1">Track Hero Subtitle</label>
                <input name="track_hero_subtitle" defaultValue={settings.track_hero_subtitle || 'Enter your name to find your project and view the latest updates.'} className="input-field" />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray/20 rounded-lg p-6">
          <legend className="text-sm font-semibold text-warm-gray px-2">Footer</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Footer Description</label>
              <textarea name="footer_description" rows={3} defaultValue={settings.footer_description || 'Building dreams with precision and passion. From concept to completion, we deliver excellence in every project.'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-1">Footer Company Name</label>
              <input name="footer_company_name" defaultValue={settings.footer_company_name || 'MGL Construction'} className="input-field" />
            </div>
          </div>
        </fieldset>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-500 text-sm">{state.success}</p>}

        <button type="submit" disabled={pending} className="btn btn-primary flex items-center gap-2">
          {pending && <span className="spinner" />}
          Save Settings
        </button>
      </form>
    </div>
  )
}
