'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiteLogo } from '@/components/site-logo'

interface NavSidebarProps {
  pathname: string
  settings: Record<string, string>
  children?: React.ReactNode
}

const linkBase = 'flex items-center gap-3 px-3 py-2.5 rounded-r-lg text-sm transition-all border-l-2'

function cn(classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function isActive(href: string, pathname: string) {
  return pathname.startsWith(href)
}

function NavLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const active = isActive(href, pathname)
  return (
    <Link
      href={href}
      className={cn([
        linkBase,
        active
          ? 'border-terracotta bg-terracotta/5 text-white'
          : 'border-transparent text-gray-light/60 hover:text-white hover:border-terracotta/50 hover:bg-white/[0.03]',
      ])}
    >
      {children}
    </Link>
  )
}

export default function NavSidebar({ pathname, settings, children }: NavSidebarProps) {
  const [editExpanded, setEditExpanded] = useState(true)
  const editActive = isActive('/admin/edit/', pathname)

  const editChildren = [
    { label: 'Services', href: '/admin/edit/services', icon: 'edit' },
    { label: 'Portfolio', href: '/admin/edit/portfolio', icon: 'portfolio' },
    { label: 'Contact', href: '/admin/edit/contact', icon: 'contact' },
    { label: 'Header', href: '/admin/edit/header', icon: 'header' },
    { label: 'Footer', href: '/admin/edit/footer', icon: 'footer' },
    { label: 'About', href: '/admin/edit/about', icon: 'about' },
    { label: 'Statistics', href: '/admin/edit/statistics', icon: 'statistics' },
  ]

  return (
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
      {/* Dashboard */}
      <NavLink href="/admin/dashboard" pathname={pathname}>
        <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </NavLink>

      {/* Edit (collapsible parent) */}
      <div>
        <button
          onClick={() => setEditExpanded((v) => !v)}
          className={cn([
            'w-full',
            linkBase,
            editActive
              ? 'border-terracotta bg-terracotta/5 text-white'
              : 'border-transparent text-gray-light/60 hover:text-white hover:border-terracotta/50 hover:bg-white/[0.03]',
          ])}
        >
          <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="flex-1 text-left">Edit</span>
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${editExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {editExpanded && (
          <div className="mt-0.5 space-y-0.5">
            {editChildren.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn([
                  'flex items-center gap-3 pl-10 pr-3 py-2 rounded-r-lg text-xs transition-all border-l-2',
                  isActive(child.href, pathname)
                    ? 'border-terracotta bg-terracotta/5 text-white'
                    : 'border-transparent text-gray-light/60 hover:text-white hover:border-terracotta/50 hover:bg-white/[0.03]',
                ])}
              >
                {child.icon === 'edit' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )}
                {child.icon === 'portfolio' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {child.icon === 'contact' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {child.icon === 'header' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {child.icon === 'footer' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                )}
                {child.icon === 'about' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {child.icon === 'statistics' && (
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Approach */}
      <NavLink href="/admin/approach" pathname={pathname}>
        <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Approach
      </NavLink>

      {/* Messages */}
      <NavLink href="/admin/messages" pathname={pathname}>
        <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Messages
      </NavLink>

      {children}
    </nav>
  )
}
