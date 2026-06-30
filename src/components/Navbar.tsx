'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const stagger = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const slideIn = {
  open: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 28 } },
  closed: { x: 40, opacity: 0, transition: { duration: 0.2 } },
}

export default function Navbar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-dark shadow-xl' : 'bg-warm-gray'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <SiteLogo settings={settings} variant="full" className="h-10" />
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block text-sm font-bold tracking-tight text-white">MGL</span>
              <span className="block text-[9px] tracking-[0.15em] uppercase text-gray-light/60 leading-snug">Construction<br />&amp; Interior</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-light/70 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.06] group"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0 h-0.5 bg-terracotta rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          <button
            className={`md:hidden relative w-10 h-10 flex items-center justify-center text-gray-light hover:text-white transition-colors z-50 ${open ? 'hidden' : ''}`}
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

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm glass-dark md:hidden"
            >
              <div className="flex items-center justify-end h-16 px-4">
                <button
                  className="w-10 h-10 flex items-center justify-center text-gray-light hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <motion.div
                variants={stagger}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-1 px-4"
              >
                {navLinks.map((l) => (
                  <motion.div key={l.href} variants={slideIn}>
                    <Link
                      href={l.href}
                      className="block px-4 py-3 text-base font-medium text-gray-light/70 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
