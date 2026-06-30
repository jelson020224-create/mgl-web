'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie_consent')
    if (!accepted) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4">
      <div className="max-w-3xl mx-auto glass-dark rounded-2xl p-5 shadow-2xl border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-light/80 leading-relaxed">
          This website uses cookies to enhance your experience, authenticate users, and analyze traffic.{' '}
          <a href="/privacy#cookies" className="text-terracotta hover:underline whitespace-nowrap">Learn more</a>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={accept} className="btn btn-primary btn-sm whitespace-nowrap">
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
