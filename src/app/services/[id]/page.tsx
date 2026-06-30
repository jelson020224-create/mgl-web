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
      <section className="bg-warm-gray text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll type="fade-up">
            <Link href="/services" className="text-gray-light/60 hover:text-terracotta text-sm mb-4 inline-block">&larr; All Services</Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{service.icon}</span>
              <div>
                <h1 className="text-4xl font-bold">{service.title}</h1>
                <p className="text-gray-light/80 mt-2 max-w-2xl">{service.description}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll type="fade-up">
            <h2 className="text-2xl font-bold text-warm-gray mb-8">Sample Works</h2>
          </AnimateOnScroll>
          {service.samples.length === 0 ? (
            <div className="card p-12 text-center text-gray">
              <p className="text-lg mb-2">No samples available yet</p>
              <p className="text-sm">Check back soon or contact us for examples of our work.</p>
            </div>
          ) : (
            <SamplesGallery samples={service.samples} />
          )}
        </div>
      </section>

      <section className="py-16 bg-warm-gray text-white text-center">
        <AnimateOnScroll type="scale-in">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Interested in {service.title}?</h2>
            <p className="text-gray-light/80 mb-8">Let&apos;s discuss your project and create something remarkable.</p>
            <Link href="/contact" className="btn-primary text-lg">Get in Touch</Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  )
}
