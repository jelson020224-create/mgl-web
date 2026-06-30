'use client'

import { useEffect } from 'react'

interface LightboxImage {
  src: string
  alt: string
}

interface GalleryLightboxProps {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

interface SingleLightboxProps {
  src: string
  alt: string
  onClose: () => void
  images?: never
  currentIndex?: never
  onNavigate?: never
}

type LightboxProps = GalleryLightboxProps | SingleLightboxProps

function isGallery(props: LightboxProps): props is GalleryLightboxProps {
  return 'images' in props
}

export default function Lightbox(props: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose()
      if (isGallery(props)) {
        if (e.key === 'ArrowRight' && props.currentIndex < props.images.length - 1) props.onNavigate(props.currentIndex + 1)
        if (e.key === 'ArrowLeft' && props.currentIndex > 0) props.onNavigate(props.currentIndex - 1)
      }
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [props])

  const currentSrc = isGallery(props) ? props.images[props.currentIndex].src : props.src
  const currentAlt = isGallery(props) ? props.images[props.currentIndex].alt : props.alt

  return (
    <div className="lightbox-overlay" onClick={props.onClose}>
      <img src={currentSrc} alt={currentAlt} onClick={(e) => e.stopPropagation()} className="max-w-[90vw] max-h-[90vh] object-contain" />
      {isGallery(props) && (
        <>
          {props.currentIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); props.onNavigate(props.currentIndex - 1) }} className="fixed left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          {props.currentIndex < props.images.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); props.onNavigate(props.currentIndex + 1) }} className="fixed right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
            {props.currentIndex + 1} / {props.images.length}
          </div>
        </>
      )}
    </div>
  )
}
