'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { addSample, deleteSample, updateSample } from '@/lib/admin-samples-actions'

interface Sample {
  id: number
  imageUrl: string
  caption: string | null
  order: number
}

interface Service {
  id: number
  title: string
  samples: Sample[]
}

const initialState = { error: '', success: '' }

function AddSampleForm({ serviceId }: { serviceId: number }) {
  const [state, formAction, pending] = useActionState(addSample, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="serviceId" value={serviceId} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Image URL *</label>
          <input name="imageUrl" required className="input-field" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Caption</label>
          <input name="caption" className="input-field" placeholder="e.g. Living room render" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Order</label>
          <input name="order" type="number" defaultValue={0} className="input-field" />
        </div>
      </div>
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-50">
        {pending ? 'Adding...' : 'Add Sample'}
      </button>
    </form>
  )
}

function SampleCard({ sample, onDeleted }: { sample: Sample; onDeleted: () => void }) {
  const [caption, setCaption] = useState(sample.caption || '')
  const [order, setOrder] = useState(sample.order)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const fd = new FormData()
    fd.set('id', String(sample.id))
    fd.set('caption', caption)
    fd.set('order', String(order))
    await updateSample({ error: '', success: '' }, fd)
    setSaving(false)
  }

  return (
    <div className="card-modern shadow-soft p-4 flex gap-4">
      <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-light">
        <img src={sample.imageUrl} alt={sample.caption || ''} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <form onSubmit={handleSave} className="space-y-2">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="input-field text-sm"
            placeholder="Caption"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray">Order:</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="input-field text-sm w-20"
            />
            <button type="submit" disabled={saving} className="text-xs text-orange hover:underline disabled:opacity-50">
              {saving ? '...' : 'Save'}
            </button>
            <form action={async () => { await deleteSample(sample.id); onDeleted() }}>
              <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
            </form>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SamplesManager({ service }: { service: Service }) {
  const [key, setKey] = useState(0)
  const refresh = () => setKey((k) => k + 1)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/services" className="text-sm text-gray hover:text-orange mb-1 block">&larr; Back to Services</Link>
          <h1 className="text-2xl font-bold text-black">Samples: {service.title}</h1>
        </div>
      </div>

      <div className="card-modern shadow-soft p-8 mb-8">
        <h2 className="text-lg font-bold text-black mb-4">Add Sample</h2>
        <AddSampleForm serviceId={service.id} />
      </div>

      <div className="space-y-4" key={key}>
        <h2 className="text-lg font-bold text-black">{service.samples.length} Samples</h2>
        {service.samples.length === 0 ? (
          <div className="card-modern shadow-soft p-12 text-center text-gray">
            <p>No samples yet. Add your first sample above.</p>
          </div>
        ) : (
          service.samples.map((s) => <SampleCard key={s.id} sample={s} onDeleted={refresh} />)
        )}
      </div>
    </>
  )
}
