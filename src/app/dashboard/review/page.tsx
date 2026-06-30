'use client'

import { useActionState } from 'react'
import { submitReview } from './actions'
import AnimateOnScroll from '@/components/AnimateOnScroll'

const initialState = { error: '', success: '' }

export default function ReviewPage() {
  const [state, action, pending] = useActionState(submitReview, initialState)

  if (state.success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="card-modern shadow-soft p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-warm-gray mb-2">Review Submitted!</h2>
          <p className="text-sm text-gray-dark">{state.success}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <AnimateOnScroll type="fade-up">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-warm-gray">Leave a Review</h1>
          <p className="text-sm text-gray-dark mt-1">Share your experience working with us</p>
        </div>
        <div className="card-modern shadow-soft p-8">
          <form action={action} className="space-y-5">
            <div className="input-group">
              <label className="input-label" htmlFor="clientName">Your Name *</label>
              <input id="clientName" name="clientName" required className="input-field" placeholder="Sarah Johnson" />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="rating">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="cursor-pointer">
                    <input type="radio" name="rating" value={star} defaultChecked={star === 5} className="sr-only peer" />
                    <svg className="w-8 h-8 text-gray/20 peer-checked:text-amber-400 hover:text-amber-300 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </label>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="content">Your Review *</label>
              <textarea id="content" name="content" rows={5} required className="input-field" placeholder="Tell us about your experience..." />
            </div>
            {state.error && <p className="text-sm text-red-500 text-center">{state.error}</p>}
            <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
              {pending ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
