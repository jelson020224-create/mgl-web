'use client'

import { useState } from 'react'

export default function MediaUpload() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUploading(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        setMessage('Uploaded! Refresh to see.')
        form.reset()
      } else {
        setMessage(data.error || 'Upload failed')
      }
    } catch {
      setMessage('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="card-modern shadow-soft p-6 space-y-4">
      <h2 className="font-semibold text-warm-gray">Upload Image</h2>
      <input type="file" name="file" accept="image/*" required className="block w-full text-sm text-gray file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-terracotta file:text-white hover:file:bg-terracotta/90" />
      <input type="text" name="alt" placeholder="Alt text (optional)" className="input-field" />
      {message && <p className="text-sm text-gray">{message}</p>}
      <button type="submit" disabled={uploading} className="btn-primary text-sm">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}
