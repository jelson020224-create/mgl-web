'use client'

import { useState, useRef, useActionState } from 'react'
import { addPortfolioItem, deletePortfolioItem } from '@/lib/admin-crud-actions'

const initialState = { error: '', success: '' }

interface PortfolioItem {
  id: number
  type: string
  title: string
  category: string
  description: string
  imageUrl: string
  videoUrl: string | null
  videoCaption: string | null
  createdAt: Date
}

export function AdminEditPortfolioClient({ items }: { items: PortfolioItem[] }) {
  const [state, formAction, pending] = useActionState(addPortfolioItem, initialState)
  const [type, setType] = useState<'image' | 'video'>('image')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoCaption, setVideoCaption] = useState('')
  const [fetchingCaption, setFetchingCaption] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileSelect(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed')
      setImageUrl(data.url)
      setToast('Image uploaded')
    } catch {
      setToast('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleFetchCaption() {
    if (!videoUrl) return
    setFetchingCaption(true)
    try {
      const res = await fetch(`https://www.facebook.com/plugins/video/oembed.json/?url=${encodeURIComponent(videoUrl)}`)
      const data = await res.json()
      if (data.title) {
        setVideoCaption(data.title)
        setToast('Caption fetched')
      } else {
        setToast('No caption found')
      }
    } catch {
      setToast('Failed to fetch caption')
    } finally {
      setFetchingCaption(false)
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern shadow-soft p-8">
          <h2 className="text-lg font-bold text-black mb-4">Add Portfolio Item</h2>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="imageUrl" value={imageUrl} />

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type-picker" checked={type === 'image'} onChange={() => setType('image')} className="accent-terracotta" />
                  <span className="text-sm text-black">Image</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type-picker" checked={type === 'video'} onChange={() => setType('video')} className="accent-terracotta" />
                  <span className="text-sm text-black">Video</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Title *</label>
              <input name="title" required className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Category *</label>
              <input name="category" required placeholder="e.g., Interior, Renovation, New Build" className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Description / Caption</label>
              <textarea name="description" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange" />
            </div>

            {type === 'image' && (
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Image Upload</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileSelect(file)
                  }}
                  className="w-full text-sm text-gray file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-terracotta file:text-white hover:file:bg-terracotta-dark"
                />
                {uploading && <p className="text-xs text-gray mt-1">Uploading & converting to WebP...</p>}
                {imageUrl && <p className="text-xs text-green-600 mt-1">Image uploaded</p>}
              </div>
            )}

            {type === 'video' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Facebook Video URL</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.facebook.com/..."
                    className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Video Caption</label>
                  <div className="flex gap-2">
                    <input
                      name="videoCaption"
                      value={videoCaption}
                      onChange={(e) => setVideoCaption(e.target.value)}
                      placeholder="Auto-fetched from FB or enter manually"
                      className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-orange"
                    />
                    <button
                      type="button"
                      onClick={handleFetchCaption}
                      disabled={!videoUrl || fetchingCaption}
                      className="shrink-0 px-3 py-2 rounded-lg bg-terracotta text-white text-sm hover:bg-terracotta-dark transition-colors disabled:opacity-50"
                    >
                      {fetchingCaption ? 'Fetching...' : 'Auto-fetch'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
            {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
            <button type="submit" disabled={pending || uploading} className="btn btn-primary disabled:opacity-50">
              {pending ? 'Adding...' : 'Add to Portfolio'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-4 content-start">
          {items.map((p) => (
            <div key={p.id} className="card-modern shadow-soft p-4 flex items-center gap-4">
              {p.type === 'video' ? (
                <div className="w-24 h-20 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-sm shrink-0">▶ Video</div>
              ) : p.imageUrl && p.imageUrl !== '/placeholder.jpg' ? (
                <img src={p.imageUrl} alt={p.title} className="w-24 h-20 object-cover rounded shrink-0" />
              ) : (
                <div className="w-24 h-20 bg-gray-light rounded-lg flex items-center justify-center text-gray text-sm shrink-0">??</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black text-sm">{p.title}</h3>
                  {p.type === 'video' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shrink-0">Video</span>
                  )}
                </div>
                <span className="text-xs text-orange">{p.category}</span>
              </div>
              <form action={deletePortfolioItem.bind(null, p.id)}>
                <button type="submit" className="text-sm text-red-500 hover:underline shrink-0">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
