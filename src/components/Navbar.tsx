'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-warm-gray/95 backdrop-blur-md shadow-lg' : 'bg-warm-gray'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/mgl-logo.jpg"
              alt="MGL Logo"
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:inline text-sm text-gray">{settings.company_name || 'Construction & Interior'}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link text-sm font-medium text-gray-light hover:text-terracotta transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <button className="md:hidden text-white p-2 hover:text-terracotta transition-colors" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-warm-gray-soft border-t border-white/10 px-4 pb-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm text-gray-light hover:text-terracotta transition-colors" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
