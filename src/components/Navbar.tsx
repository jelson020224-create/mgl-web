'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SiteLogo } from './site-logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/track', label: 'Track' },
  { href: '/contact', label: 'Contact' },
  { href: '/dashboard', label: 'Dashboard' },
]

interface NavbarProps {
  settings: Record<string, string>
}

export default function Navbar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-warm-gray/92 backdrop-blur-xl shadow-lg' : 'bg-warm-gray'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0">
            <SiteLogo settings={settings} variant="full" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-gray-light/70 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06] relative group"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0 h-0.5 bg-terracotta rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-light hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[0.375rem]' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[0.375rem]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="border-t border-white/5 bg-warm-gray/95 backdrop-blur-xl px-4 pb-4 pt-2 space-y-0.5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-2.5 text-sm font-medium text-gray-light/70 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
