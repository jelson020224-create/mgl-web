'use client'

import { useState } from 'react'
import Lightbox from '@/components/ui/lightbox'

interface Sample {
  id: number
  imageUrl: string
  caption: string | null
}

export default function SamplesGallery({ samples }: { samples: Sample[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {samples.map((s, i) => (
          <button key={s.id} onClick={() => setLightboxIndex(i)} className="card-modern shadow-soft p-2 text-left group cursor-pointer hover:shadow-md transition-shadow">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-light">
              <img
                src={s.imageUrl}
                alt={s.caption || ''}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {s.caption && <p className="text-sm text-gray mt-2 px-1">{s.caption}</p>}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={samples.map((s) => ({ src: s.imageUrl, alt: s.caption || '' }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
