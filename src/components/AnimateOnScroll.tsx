'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'fade-in'

interface Props {
  children: ReactNode
  type?: AnimationType
  delay?: number
  className?: string
  threshold?: number
}

export default function AnimateOnScroll({ children, type = 'fade-up', delay = 0, className = '', threshold = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const animClass = visible ? `animate-${type}` : `animate-hidden${type === 'fade-left' ? '-left' : type === 'fade-right' ? '-right' : ''}`

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  )
}
