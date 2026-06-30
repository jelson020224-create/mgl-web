import prisma from '@/lib/prisma'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'

async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: 'asc' },
    include: { samples: { orderBy: { order: 'asc' }, take: 3 } },
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative text-center">
          <AnimateOnScroll type="fade-up">
            <span className="section-eyebrow text-terracotta/80">Our Expertise</span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-5">Our <span className="gradient-text">Services</span></h1>
            <p className="text-lg text-gray-light/60 max-w-2xl mx-auto font-light">
              Everything you need under one roof — from concept to completion.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-mesh relative">
        <div className="section-container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.id} type="fade-up" delay={i * 80}>
                <Link href={`/services/${s.id}`} className="group block">
                  <div className="card-modern shadow-soft p-8 h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta to-terracotta-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="flex gap-6 items-start">
                      <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center text-3xl shrink-0 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                        {s.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-warm-gray mb-3 group-hover:text-terracotta transition-colors">{s.title}</h2>
                        <p className="text-sm text-gray-dark leading-relaxed">{s.description}</p>
                        {s.samples.length > 0 && (
                          <div className="flex gap-2 mt-5 -mx-1">
                            {s.samples.map((sample) => (
                              <div key={sample.id} className="flex-1 aspect-video rounded-lg overflow-hidden bg-gray-light">
                                <img
                                  src={sample.imageUrl}
                                  alt={sample.caption || ''}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-xs text-gray">{s.samples.length} sample{s.samples.length !== 1 ? 's' : ''}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-terracotta font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                            View details
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-warm-gray text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pattern-dots" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[120px]" />
        <div className="section py-20 text-center relative">
          <div className="max-w-xl mx-auto">
            <AnimateOnScroll type="scale-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Not Sure What You Need?</h2>
              <p className="text-gray-light/60 mb-8">We offer free consultations to discuss your project.</p>
              <Link href="/contact" className="btn btn-primary btn-lg group">
                Book a Consultation
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
