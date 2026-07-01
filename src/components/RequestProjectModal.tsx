'use client'

import { useState, useActionState } from 'react'
import { createProjectInquiry } from '@/lib/site-actions'

const initialState = { error: '', success: '' }

export default function RequestProjectModal({ projectTitle }: { projectTitle: string }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(createProjectInquiry, initialState)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 w-full text-xs font-semibold py-2 px-3 rounded-lg bg-terracotta text-white hover:bg-terracotta-dark transition-colors"
      >
        Request This Project
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { if (!pending) setOpen(false) }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray hover:text-black text-xl leading-none"
            >&times;</button>

            <h3 className="text-lg font-bold text-black mb-1">Request This Project</h3>
            <p className="text-xs text-gray mb-4">Interested in &ldquo;{projectTitle}&rdquo;? Send us a message and we&rsquo;ll get back to you.</p>

            {state.success ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-green-700 font-semibold text-sm">Request sent!</p>
                <p className="text-xs text-gray mt-1">We&rsquo;ll contact you shortly.</p>
                <button type="button" onClick={() => setOpen(false)} className="mt-4 text-sm text-terracotta hover:underline">Close</button>
              </div>
            ) : (
              <form action={formAction} className="space-y-3">
                <input type="hidden" name="projectTitle" value={projectTitle} />
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Name *</label>
                  <input name="name" required className="w-full px-3 py-2 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Email *</label>
                  <input name="email" type="email" required className="w-full px-3 py-2 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Phone</label>
                  <input name="phone" type="tel" className="w-full px-3 py-2 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">Message</label>
                  <textarea name="message" rows={3} className="w-full px-3 py-2 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange text-sm" placeholder="Tell us about your requirements..." />
                </div>
                {state.error && <p className="text-red-500 text-xs">{state.error}</p>}
                <button type="submit" disabled={pending} className="w-full btn btn-primary py-2 text-sm disabled:opacity-50">
                  {pending ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
