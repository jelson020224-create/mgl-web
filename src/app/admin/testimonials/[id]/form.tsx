'use client'

import { useActionState } from 'react'
import { saveTestimonial } from '../../admin-actions'
import Link from 'next/link'

export default function TestimonialForm({ testimonial }: { testimonial: any }) {
  const [state, action, pending] = useActionState(saveTestimonial, { error: '', success: '' })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-warm-gray">{testimonial ? 'Edit Testimonial' : 'New Testimonial'}</h1>
        <Link href="/admin/testimonials" className="text-sm text-gray hover:text-warm-gray">← Back</Link>
      </div>

      <form action={action} className="max-w-2xl space-y-6">
        {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

        <div>
          <label className="block text-sm font-medium text-warm-gray mb-1">Client Name</label>
          <input name="clientName" defaultValue={testimonial?.clientName || ''} required className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-gray mb-1">Role / Title</label>
          <input name="role" defaultValue={testimonial?.role || ''} className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-gray mb-1">Testimonial Content</label>
          <textarea name="content" rows={4} defaultValue={testimonial?.content || ''} required className="input-field" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray mb-1">Rating (1-5)</label>
            <input name="rating" type="number" min={1} max={5} defaultValue={testimonial?.rating || 5} className="input-field" />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-warm-gray">
              <input name="active" type="checkbox" defaultChecked={testimonial === null || testimonial?.active} className="w-4 h-4" />
              Active
            </label>
          </div>
        </div>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-500 text-sm">{state.success}</p>}

        <button type="submit" disabled={pending} className="btn-primary flex items-center gap-2">
          {pending && <span className="spinner" />}
          {testimonial ? 'Update' : 'Create'} Testimonial
        </button>
      </form>
    </div>
  )
}
