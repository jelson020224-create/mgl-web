'use client'

import { useState } from 'react'
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
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    if (variant === 'admin-mark') return <BrandMark size={size} variant="admin" />
    if (variant === 'mark') return <MLogo size={size} className={className} />
    return <BrandMark size={size} />
  }

  if (variant === 'full') {
    return (
      <img
        src={logoUrl}
        alt="MGL Logo"
        className={`h-10 w-auto object-contain ${className}`}
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <img
      src={logoUrl}
      alt="MGL"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setImgError(true)}
    />
  )
}
