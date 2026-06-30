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
      <section className="relative bg-warm-gray text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#2C2C2C_0%,#3D3D3D_50%,#2C2C2C_100%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 w-full">
          <div className="max-w-3xl">
            <AnimateOnScroll type="fade-up">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {settings.hero_title?.replace(/<br\s*\/?>/g, ' ').includes('From the Ground Up')
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
              <p className="text-xl text-gray-light/80 mb-8 leading-relaxed">
                {settings.hero_subtitle || 'MGL Construction & Interior brings together draftsmen, architects, and engineers to deliver exceptional residential and commercial spaces.'}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll type="fade-up" delay={400}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary text-lg">Get a Free Quote</Link>
                <Link href="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-warm-gray text-lg">View Portfolio</Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
        <AnimateOnScroll type="fade-up" delay={600}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: (settings.stats_projects || '150') + '+', label: 'Projects Completed' },
                { num: (settings.stats_years || '12') + '+', label: 'Years Experience' },
                { num: (settings.stats_clients || '50') + '+', label: 'Happy Clients' },
                { num: (settings.stats_team || '20') + '+', label: 'Expert Team' },
              ].map((s) => (
                <div key={s.label} className="group">
                  <div className="text-3xl md:text-4xl font-bold text-terracotta transition-all duration-300 group-hover:scale-110">{s.num}</div>
                  <div className="text-sm text-gray-light mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll type="fade-up">
            <div className="text-center mb-16">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-playfair), serif' }}>Our Services</h2>
              <p className="section-subtitle">Comprehensive solutions for every stage of your project</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.id} type="fade-up" delay={i * 100}>
                <div className="card card-shine p-8 text-center group">
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
                  <h3 className="text-xl font-bold text-warm-gray mb-3">{s.title}</h3>
                  <p className="text-gray text-sm leading-relaxed">{s.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll type="fade-up">
            <div className="text-center mt-12">
              <Link href="/services" className="btn-primary">View All Services</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll type="fade-up">
              <div className="text-center mb-16">
                <h2 className="section-title" style={{ fontFamily: 'var(--font-playfair), serif' }}>What Our Clients Say</h2>
                <p className="section-subtitle">Trusted by homeowners and businesses alike</p>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <AnimateOnScroll key={t.id} type="fade-up" delay={i * 150}>
                  <div className="card p-8 text-center group h-full flex flex-col">
                    <div className="text-terracotta text-lg mb-2">
                      {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                    </div>
                    <p className="text-gray text-sm leading-relaxed flex-1 italic">&ldquo;{t.content}&rdquo;</p>
                    <div className="mt-6 pt-4 border-t border-gray/10">
                      <p className="font-semibold text-warm-gray">{t.clientName}</p>
                      {t.role && <p className="text-xs text-gray">{t.role}</p>}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll type="fade-up">
            <div className="text-center mb-16">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-playfair), serif' }}>Recent Projects</h2>
              <p className="section-subtitle">A glimpse of our work</p>
            </div>
          </AnimateOnScroll>
          {portfolio.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((p, i) => (
                <AnimateOnScroll key={p.id} type="scale-in" delay={i * 100}>
                  <div className="card group">
                    <div className="aspect-[4/3] image-placeholder flex items-center justify-center text-gray overflow-hidden">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-lg font-bold text-warm-gray mt-1">{p.title}</h3>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray animate-pulse-soft">Portfolio coming soon. Check back for updates.</p>
          )}
          <AnimateOnScroll type="fade-up">
            <div className="text-center mt-12">
              <Link href="/portfolio" className="btn-outline">View Full Portfolio</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-warm-gray text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 75% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <AnimateOnScroll type="scale-in">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-light/80 mb-8 max-w-2xl mx-auto">
              Whether you need a full construction, interior design, or renovation — we bring your vision to life.
            </p>
            <Link href="/contact" className="btn-primary text-lg animate-pulse-soft inline-block">Get in Touch</Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  )
}
