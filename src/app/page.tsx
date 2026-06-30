import Link from 'next/link'
import prisma from '@/lib/prisma'
import { seedAdmin } from '@/lib/seed'
import { getSiteSettings, getTestimonials } from '@/lib/queries'
import AnimateOnScroll from '@/components/AnimateOnScroll'

async function getData() {
  await seedAdmin()
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  const portfolio = await prisma.portfolioItem.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
  const settings = await getSiteSettings()
  const testimonials = await getTestimonials()
  return { services, portfolio, settings, testimonials }
}

export default async function HomePage() {
  const { services, portfolio, settings, testimonials } = await getData()

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-warm-gray" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative w-full">
          <div className="section-container py-32 md:py-48">
            <div className="max-w-3xl">
              <AnimateOnScroll type="fade-up">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta/80 mb-4">MGL Construction & Interior</span>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-serif">
                  {settings.hero_title?.includes('From the Ground Up')
                    ? <>
                        Building Your{' '}
                        <span className="text-terracotta">Vision</span>
                        <br />From the Ground Up
                      </>
                    : settings.hero_title?.split('\n').map((line, i) => (
                        <span key={i}>{i > 0 && <br />}{line}</span>
                      )) || (
                        <>
                          Building Your{' '}
                          <span className="text-terracotta">Vision</span>
                          <br />From the Ground Up
                        </>
                      )
                  }
                </h1>
              </AnimateOnScroll>
              <AnimateOnScroll type="fade-up" delay={200}>
                <p className="text-lg text-gray-light/70 mb-8 leading-relaxed max-w-2xl">
                  {settings.hero_subtitle || 'MGL Construction & Interior brings together draftsmen, architects, and engineers to deliver exceptional residential and commercial spaces.'}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll type="fade-up" delay={400}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-primary btn-lg">Get a Free Quote</Link>
                  <Link href="/portfolio" className="btn btn-lg text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg px-6 py-3 font-semibold transition-all">View Portfolio</Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <AnimateOnScroll type="fade-up" delay={600}>
            <div className="section-container pb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { num: (settings.stats_projects || '150') + '+', label: 'Projects Completed' },
                  { num: (settings.stats_years || '12') + '+', label: 'Years Experience' },
                  { num: (settings.stats_clients || '50') + '+', label: 'Happy Clients' },
                  { num: (settings.stats_team || '20') + '+', label: 'Expert Team' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
                    <div className="text-3xl md:text-4xl font-bold text-terracotta mb-1">{s.num}</div>
                    <div className="text-xs text-gray-light/60 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="section-container">
          <AnimateOnScroll type="fade-up">
            <div className="section-header">
              <span className="section-eyebrow">What We Do</span>
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">Comprehensive solutions for every stage of your project</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.id} type="fade-up" delay={i * 80}>
                <Link href={`/services/${s.id}`} className="card card-shine card-raised p-8 text-center group block h-full">
                  <div className="w-14 h-14 rounded-xl bg-terracotta-50 flex items-center justify-center mx-auto mb-5 text-2xl transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
                  <h3 className="text-lg font-bold text-warm-gray mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-dark leading-relaxed">{s.description}</p>
                  <span className="text-xs text-terracotta font-medium mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity">Learn more &rarr;</span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll type="fade-up">
            <div className="text-center mt-10">
              <Link href="/services" className="btn btn-outline">View All Services</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section bg-white">
          <div className="section-container">
            <AnimateOnScroll type="fade-up">
              <div className="section-header">
                <span className="section-eyebrow">Testimonials</span>
                <h2 className="section-title">What Our Clients Say</h2>
                <p className="section-subtitle">Trusted by homeowners and businesses alike</p>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <AnimateOnScroll key={t.id} type="fade-up" delay={i * 120}>
                  <div className="card p-6 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg key={idx} className={`w-4 h-4 ${idx < t.rating ? 'text-amber-400' : 'text-gray/20'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-dark leading-relaxed flex-1 italic">&ldquo;{t.content}&rdquo;</p>
                    <div className="mt-5 pt-4 border-t border-sand-light">
                      <p className="font-semibold text-warm-gray text-sm">{t.clientName}</p>
                      {t.role && <p className="text-xs text-gray">{t.role}</p>}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-cream">
        <div className="section-container">
          <AnimateOnScroll type="fade-up">
            <div className="section-header">
              <span className="section-eyebrow">Portfolio</span>
              <h2 className="section-title">Recent Projects</h2>
              <p className="section-subtitle">A glimpse of our work</p>
            </div>
          </AnimateOnScroll>
          {portfolio.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((p, i) => (
                <AnimateOnScroll key={p.id} type="scale-in" delay={i * 80}>
                  <div className="card group">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-light">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <span className="badge badge-terracotta text-[10px] uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-base font-bold text-warm-gray mt-2">{p.title}</h3>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-gray text-sm">Portfolio coming soon. Check back for updates.</p>
            </div>
          )}
          <AnimateOnScroll type="fade-up">
            <div className="text-center mt-10">
              <Link href="/portfolio" className="btn btn-outline">View Full Portfolio</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="relative bg-warm-gray text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 75% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="section py-20 text-center relative">
          <div className="max-w-2xl mx-auto">
            <AnimateOnScroll type="scale-in">
              <h2 className="text-4xl font-bold mb-4 font-serif">Ready to Start Your Project?</h2>
              <p className="text-gray-light/70 mb-8 text-lg">
                Whether you need a full construction, interior design, or renovation — we bring your vision to life.
              </p>
              <Link href="/contact" className="btn btn-primary btn-lg">Get in Touch</Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
