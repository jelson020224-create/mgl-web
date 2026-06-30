'use client'

import { BrandMark, MLogo } from './brand-mark'

interface SiteLogoProps {
  settings?: Record<string, string> | null
  src?: string
  variant?: 'full' | 'admin-mark' | 'mark'
  size?: number
  className?: string
}

export function SiteLogo({ settings, src, variant = 'full', size = 32, className = '' }: SiteLogoProps) {
  const logoUrl = src || settings?.logo_url || '/LOGO-MGL.png'

  if (variant === 'full') {
    return (
      <span className="inline-flex items-center">
        <img src={logoUrl} alt="MGL Logo" className={`h-10 w-auto object-contain ${className}`} />
      </span>
    )
  }

  return (
    <span className="inline-flex items-center" style={{ width: size, height: size }}>
      <img src={logoUrl} alt="MGL" width={size} height={size} className={`object-contain ${className}`} />
    </span>
  )
}
