'use client'

import { useState, useEffect } from 'react'
import { verifyProjectPassword, getProjectForAuthedClient } from './actions'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default function TrackProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState('')
  const [project, setProject] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  params.then((p) => setId(p.id))

  useEffect(() => {
    getProjectForAuthedClient(Number(id)).then((data) => {
      if (data) setProject(data)
    })
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await verifyProjectPassword(Number(id), password)
      if (result.error) {
        setError(result.error)
      } else {
        setProject(result)
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!id) return null

  if (project) {
    return (
      <>
        <section className="bg-warm-gray text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll type="fade-up">
              <h1 className="text-3xl font-bold">{project.clientName}</h1>
              <span className={`text-sm font-semibold uppercase ${project.status === 'completed' ? 'text-green-400' : 'text-terracotta'}`}>
                {project.status}
              </span>
              {project.description && <p className="text-gray-light/80 mt-2">{project.description}</p>}
            </AnimateOnScroll>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll type="fade-up">
              <h2 className="text-2xl font-bold text-warm-gray mb-8">Project Updates</h2>
            </AnimateOnScroll>
            {project.updates.length === 0 ? (
              <p className="text-gray animate-pulse-soft">No updates yet. Check back soon!</p>
            ) : (
              <div className="space-y-8">
                {[...project.updates].reverse().map((u: any, i: number) => (
                  <AnimateOnScroll key={u.id} type="fade-up" delay={i * 100}>
                    <div className="card p-6 hover:border-l-4 hover:border-terracotta transition-all duration-300">
                      <p className="text-xs text-gray mb-2">{new Date(u.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-warm-gray leading-relaxed whitespace-pre-line">{u.content}</p>
                      {u.imageUrl && (
                        <div className="mt-4 aspect-video image-placeholder rounded-lg flex items-center justify-center text-gray text-sm">
                          📷 Image
                        </div>
                      )}
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  return (
    <section className="py-20 bg-cream min-h-[50vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <AnimateOnScroll type="scale-in">
          <div className="card p-8">
            <h2 className="text-xl font-bold text-warm-gray mb-2">Enter Project Password</h2>
            <p className="text-sm text-gray mb-6">Your contractor should have provided this.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300"
                required
              />
              {error && <p className="text-red-500 text-sm animate-fade-in">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full text-center disabled:opacity-50 flex items-center justify-center gap-2">
                {loading && <span className="spinner" />}
                {loading ? 'Checking...' : 'View Updates'}
              </button>
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
