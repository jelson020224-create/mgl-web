'use client'

import { useState, useRef } from 'react'
import { addServiceSample } from '@/lib/admin-crud-actions'

interface ServiceWithSampleCount {
  id: number
  title: string
  description: string
  icon: string
  order: number
  _count: { samples: number }
}

export function AdminEditServicesClient({ services }: { services: ServiceWithSampleCount[] }) {
  const [uploadingId, setUploadingId] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({})

  async function handleFileSelect(serviceId: number, file: File) {
    setUploadingId(serviceId)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed')

      const result = await addServiceSample(serviceId, data.url)
      if (result.success) {
        setToast('Sample added')
      } else {
        setToast(result.error || 'Failed to add sample')
      }
    } catch {
      setToast('Upload failed')
    } finally {
      setUploadingId(null)
    }
  }

  return (
    <>
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
          <button className="ml-3 text-white/80 hover:text-white" onClick={() => setToast(null)}>&times;</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card-modern shadow-soft p-6 flex items-start gap-4">
            <span className="text-3xl shrink-0">{service.icon}</span>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-black text-base">{service.title}</h2>
              <p className="text-sm text-gray mt-1">{service.description}</p>
              <a
                href={`/admin/services/${service.id}/samples`}
                className="text-xs text-orange hover:underline mt-2 inline-block"
              >
                {service._count.samples} Sample{service._count.samples !== 1 ? 's' : ''} &rarr;
              </a>
              <div className="mt-3">
                {uploadingId === service.id ? (
                  <span className="text-xs text-gray">Uploading...</span>
                ) : (
                  <>
                    <button
                      type="button"
                      className="text-xs px-3 py-1.5 rounded-lg bg-terracotta text-white hover:bg-terracotta-dark transition-colors"
                      onClick={() => fileRefs.current[service.id]?.click()}
                    >
                      Upload Image
                    </button>
                    <input
                      ref={(el) => { fileRefs.current[service.id] = el }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileSelect(service.id, file)
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
