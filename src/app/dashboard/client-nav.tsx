'use client'

import Link from 'next/link'

export default function ClientNav() {
  return (
    <div className="bg-white border-b border-sand-light shadow-sm">
      <div className="section-container flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold text-terracotta">
            <div className="w-7 h-7 rounded-lg bg-terracotta flex items-center justify-center text-white text-[10px] font-bold">M</div>
            My Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-gray-dark hover:text-warm-gray transition-colors flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Site
          </Link>
          <form action="/api/client/logout" method="POST">
            <button type="submit" className="text-xs text-gray-dark hover:text-red-500 transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
