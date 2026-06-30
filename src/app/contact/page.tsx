'use client'

import { useActionState } from 'react'
import { submitContact } from './actions'
import AnimateOnScroll from '@/components/AnimateOnScroll'

const initialState = { message: '', error: '' }

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  return (
    <>
      <section className="bg-warm-gray text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll type="fade-up">
            <h1 className="text-5xl font-bold mb-6">Contact <span className="text-terracotta">Us</span></h1>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={200}>
            <p className="text-lg text-gray-light/80">Let us bring your vision to life</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimateOnScroll type="fade-left">
              <div>
                <h2 className="text-2xl font-bold text-warm-gray mb-6">Get in Touch</h2>
                <div className="space-y-4 text-gray">
                  {[
                    { icon: '📞', label: 'Phone', value: '(123) 456-7890' },
                    { icon: '✉️', label: 'Email', value: 'info@mglconstruction.com' },
                    { icon: '📍', label: 'Address', value: '123 Construction Ave, Building City, BC 12345' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 group">
                      <span className="text-terracotta text-xl transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-warm-gray">{item.label}</p>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll type="fade-right">
              <div>
                <form action={formAction} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-warm-gray mb-1">Name *</label>
                    <input name="name" required className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-warm-gray mb-1">Email *</label>
                    <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-warm-gray mb-1">Phone</label>
                    <input name="phone" className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-warm-gray mb-1">Message *</label>
                    <textarea name="message" rows={5} required className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300" />
                  </div>
                  {state.error && <p className="text-red-500 text-sm animate-fade-in">{state.error}</p>}
                  {state.message && <p className="text-green-600 text-sm animate-fade-in">{state.message}</p>}
                  <button type="submit" disabled={pending} className="btn-primary w-full text-center disabled:opacity-50 flex items-center justify-center gap-2">
                    {pending && <span className="spinner" />}
                    {pending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
