'use client'

import Image from 'next/image'
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
  const [errored, setErrored] = useState(false)
  const logoUrl = src || settings?.logo_url || '/mgl-logo.png'

  if (errored) {
    if (variant === 'admin-mark') return <BrandMark size={size} variant="admin" />
    if (variant === 'mark') return <MLogo size={size} className={className} />
    return <BrandMark size={size} />
  }

  if (variant === 'full') {
    return (
      <Image
        src={logoUrl}
        alt="MGL Logo"
        width={150}
        height={45}
        className={`h-10 w-auto object-contain ${className}`}
        onError={() => setErrored(true)}
      />
    )
  }

  return (
    <Image
      src={logoUrl}
      alt="MGL"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setErrored(true)}
    />
  )
}
