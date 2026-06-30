'use client'

import { useActionState } from 'react'
import { submitContact } from './actions'
import AnimateOnScroll from '@/components/AnimateOnScroll'

const initialState = { message: '', error: '' }

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative text-center">
          <AnimateOnScroll type="fade-up">
            <span className="section-eyebrow text-terracotta/80">Get in Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-5">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-gray-light/60 font-light">Let&apos;s bring your vision to life</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-mesh relative">
        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <AnimateOnScroll type="fade-up" className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-warm-gray mb-2 font-serif">Let&apos;s Talk</h2>
                  <p className="text-sm text-gray-dark leading-relaxed">
                    Whether you have a specific project in mind or just want to explore possibilities, we&apos;re here to help.
                  </p>
                </div>
                <hr className="divider" />
                <div className="space-y-6">
                  {[
                    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'info@mglconstruction.com', href: 'mailto:info@mglconstruction.com' },
                    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: '(123) 456-7890', href: 'tel:+1234567890' },
                    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Address', value: '123 Construction Ave, Building City', href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-terracotta-50 flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                        <svg className="w-5 h-5 text-terracotta group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray uppercase tracking-wider">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-warm-gray hover:text-terracotta transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm text-warm-gray">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll type="fade-up" delay={150} className="lg:col-span-3">
              <div className="card p-8">
                <h3 className="text-lg font-bold text-warm-gray mb-6">Send us a message</h3>
                <form action={formAction} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="input-label" htmlFor="name">Name *</label>
                      <input id="name" name="name" required className="input-field" placeholder="Your name" />
                    </div>
                    <div className="input-group">
                      <label className="input-label" htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" required className="input-field" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label className="input-label" htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" className="input-field" placeholder="Optional" />
                  </div>
                  <div className="input-group">
                    <label className="input-label" htmlFor="message">Message *</label>
                    <textarea id="message" name="message" rows={5} required className="input-field" placeholder="Tell us about your project..." />
                  </div>
                  {state.error && <p className="form-text text-center">{state.error}</p>}
                  {state.message && <p className="text-sm text-emerald-600 text-center bg-emerald-50 py-2 px-4 rounded-lg">{state.message}</p>}
                  <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
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
