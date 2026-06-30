import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import SamplesGallery from './samples-gallery'

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id: Number(id) },
    include: { samples: { orderBy: { order: 'asc' } } },
  })
  if (!service) notFound()

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute top-0 -right-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative">
          <AnimateOnScroll type="fade-up">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-gray-light/50 hover:text-terracotta transition-colors mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All Services
            </Link>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-terracotta/15 flex items-center justify-center text-4xl shrink-0">{service.icon}</div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">{service.title}</h1>
                <p className="text-lg text-gray-light/60 mt-3 max-w-2xl leading-relaxed">{service.description}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-mesh">
        <div className="section-container">
          <AnimateOnScroll type="fade-up">
            <div className="flex items-center gap-4 mb-10">
              <span className="section-eyebrow mb-0">Sample Works</span>
              <hr className="flex-1 border-sand-light" />
              <span className="text-xs text-gray font-mono">{service.samples.length} item{service.samples.length !== 1 ? 's' : ''}</span>
            </div>
          </AnimateOnScroll>
          {service.samples.length === 0 ? (
            <div className="card-modern shadow-soft p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-terracotta/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              <p className="text-gray text-sm">No samples yet. Check back soon or contact us for examples.</p>
            </div>
          ) : (
            <SamplesGallery samples={service.samples} />
          )}
        </div>
      </section>

      <section className="relative bg-warm-gray text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pattern-dots" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[120px]" />
        <div className="section py-20 text-center relative">
          <div className="max-w-xl mx-auto">
            <AnimateOnScroll type="scale-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Interested in {service.title}?</h2>
              <p className="text-gray-light/60 mb-8">Let&apos;s discuss your project and create something remarkable.</p>
              <Link href="/contact" className="btn btn-primary btn-lg group">
                Get in Touch
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
