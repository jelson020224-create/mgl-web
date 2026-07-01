'use client'

import Link from 'next/link'
import { SiteLogo } from '@/components/site-logo'

export default function ClientNav() {
  return (
    <nav className="bg-white border-b border-sand-light shadow-sm sticky top-0 z-40">
      <div className="section-container flex items-center justify-between h-16">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <SiteLogo variant="mark" size={30} className="rounded-lg" />
          <span className="text-sm font-bold text-terracotta group-hover:text-terracotta-dark transition-colors">Client Dashboard</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard/review"
            className="text-sm text-gray-dark hover:text-terracotta transition-colors flex items-center gap-1.5 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Leave a Review
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-dark hover:text-warm-gray transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Visit Site
          </Link>
          <form action="/api/client/logout" method="POST">
            <button type="submit" className="text-sm text-gray-dark hover:text-red-500 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
