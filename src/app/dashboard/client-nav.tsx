'use client'

import Link from 'next/link'

export default function ClientNav() {
  return (
    <div className="bg-white border-b border-gray/20 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-bold text-terracotta text-sm">My Dashboard</Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray hover:text-black transition-colors">View Site</Link>
          <form action="/api/client/logout" method="POST">
            <button type="submit" className="text-gray hover:text-red-500 transition-colors">Logout</button>
          </form>
        </div>
      </div>
    </div>
  )
}
