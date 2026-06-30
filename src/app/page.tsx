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

function StatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <AnimateOnScroll type="fade-up" delay={delay}>
      <div className="glass-dark text-center p-6 rounded-2xl shadow-glass border border-white/[0.06]">
        <div className="text-3xl md:text-4xl font-bold gradient-text mb-1.5">{num}</div>
        <div className="text-[11px] text-gray-light/50 uppercase tracking-[0.15em] font-medium">{label}</div>
      </div>
    </AnimateOnScroll>
  )
}

export default async function HomePage() {
  const { services, portfolio, settings, testimonials } = await getData()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-warm-gray text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        {/* Large gradient orb decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-accent rounded-full blur-[150px] opacity-20 animate-glow" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />

        <div className="relative w-full">
          <div className="section-container py-32 md:py-48">
            <div className="max-w-3xl">
              <AnimateOnScroll type="fade-up">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta/80 mb-5 bg-terracotta/10 px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse-soft" />
                  MGL Construction & Interior
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 font-serif tracking-tight">
                  Building Your{' '}
                  <span className="gradient-text">Vision</span>
                  <br />From the Ground Up
                </h1>
              </AnimateOnScroll>
              <AnimateOnScroll type="fade-up" delay={200}>
                <p className="text-lg md:text-xl text-gray-light/60 mb-10 leading-relaxed max-w-xl font-light">
                  {settings.hero_subtitle || 'Bringing together draftsmen, architects, and engineers to deliver exceptional residential and commercial spaces.'}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll type="fade-up" delay={400}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn btn-primary btn-lg group">
                    Get a Free Quote
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/portfolio" className="btn btn-lg text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-xl px-7 py-3 font-semibold transition-all backdrop-blur-sm bg-white/[0.03]">
                    View Portfolio
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <div className="section-container pb-20 md:pb-28">
            <div className="divider-dash mb-12">
              <span className="divider-dash-dot" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <StatCard num={(settings.stats_projects || '150') + '+'} label="Projects Completed" delay={600} />
              <StatCard num={(settings.stats_years || '12') + '+'} label="Years Experience" delay={700} />
              <StatCard num={(settings.stats_clients || '50') + '+'} label="Happy Clients" delay={800} />
              <StatCard num={(settings.stats_team || '20') + '+'} label="Expert Team" delay={900} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section bg-mesh relative">
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative">
          <AnimateOnScroll type="fade-up">
            <div className="section-header">
              <span className="section-eyebrow">What We Do</span>
              <h2 className="section-title">Our Services</h2>
              <div className="divider-dash justify-center mb-4">
                <span className="divider-dash-dot" />
              </div>
              <p className="section-subtitle">Comprehensive solutions for every stage of your project</p>
            </div>
          </AnimateOnScroll>
          <div className="bento-grid">
            {services.map((s, i) => {
              const isWide = i === 0 && services.length > 2
              return (
                <AnimateOnScroll key={s.id} type="fade-up" delay={i * 80}>
                  <Link href={`/services/${s.id}`} className={`group block h-full ${isWide ? 'bento-wide' : ''}`}>
                    <div className={`glass-card border-gradient card-modern p-8 h-full relative overflow-hidden ${isWide ? 'animate-float' : ''}`}>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta to-terracotta-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="w-14 h-14 rounded-2xl bg-terracotta-50 flex items-center justify-center mb-5 text-2xl group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                        {s.icon}
                      </div>
                      <h3 className="text-lg font-bold text-warm-gray mb-3 group-hover:text-terracotta transition-colors">{s.title}</h3>
                      <p className="text-sm text-gray-dark leading-relaxed">{s.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-terracotta font-medium mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        Learn more
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              )
            })}
          </div>
          <AnimateOnScroll type="fade-up">
            <div className="text-center mt-12">
              <Link href="/services" className="btn btn-outline">View All Services</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="section bg-white relative">
          <div className="absolute inset-0 pattern-dots opacity-[0.15]" />
          <div className="section-container relative">
            <AnimateOnScroll type="fade-up">
              <div className="section-header">
                <span className="section-eyebrow">Testimonials</span>
                <h2 className="section-title">What Our Clients Say</h2>
                <div className="divider-dash justify-center mb-4">
                  <span className="divider-dash-dot" />
                </div>
                <p className="section-subtitle">Trusted by homeowners and businesses alike</p>
              </div>
            </AnimateOnScroll>
            <div className="bento-grid">
              {testimonials.slice(0, 3).map((t, i) => (
                <AnimateOnScroll key={t.id} type="fade-up" delay={i * 120}>
                  <div className={`glass card-modern p-8 flex flex-col relative ${i === 0 ? 'bento-tall' : ''}`}>
                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-terracotta/5 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-serif text-terracotta/30 leading-none">&ldquo;</span>
                    </div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg key={idx} className={`w-4 h-4 ${idx < t.rating ? 'text-amber-400' : 'text-gray/15'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-dark leading-relaxed flex-1 italic">&ldquo;{t.content}&rdquo;</p>
                    <div className="mt-6 pt-5 border-t border-sand-light">
                      <p className="font-semibold text-warm-gray text-sm">{t.clientName}</p>
                      {t.role && <p className="text-xs text-gray mt-0.5">{t.role}</p>}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Portfolio ── */}
      <section className="section bg-mesh relative">
        <div className="section-container relative">
          <AnimateOnScroll type="fade-up">
            <div className="section-header">
              <span className="section-eyebrow">Portfolio</span>
              <h2 className="section-title">Recent Projects</h2>
              <div className="divider-dash justify-center mb-4">
                <span className="divider-dash-dot" />
              </div>
              <p className="section-subtitle">A glimpse of our work — each project tells a story</p>
            </div>
          </AnimateOnScroll>
          {portfolio.length > 0 ? (
            <div className="bento-grid">
              {portfolio.map((p, i) => (
                <AnimateOnScroll key={p.id} type="scale-in" delay={i * 80}>
                  <div className={`glass-card card-modern group overflow-hidden ${i === 0 ? 'bento-lg' : ''}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-[0.5deg]"
                      />
                    </div>
                    <div className="p-5 relative">
                      <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
                      <span className="tag tag-terracotta text-[10px] uppercase tracking-widest font-semibold">{p.category}</span>
                      <h3 className="text-base font-bold text-warm-gray mt-2.5">{p.title}</h3>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="glass-card card-modern p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-terracotta/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              <p className="text-gray text-sm">Portfolio coming soon. Check back for updates.</p>
            </div>
          )}
          <AnimateOnScroll type="fade-up">
            <div className="text-center mt-12">
              <Link href="/portfolio" className="btn btn-outline">View Full Portfolio</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-warm-gray text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[150px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section py-24 text-center relative">
          <div className="max-w-2xl mx-auto">
            <AnimateOnScroll type="scale-in">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta/70 mb-5 bg-terracotta/10 px-4 py-1.5 rounded-full">
                Let&apos;s Build Together
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-5 font-serif leading-tight">
                Ready to Start<br />Your <span className="gradient-text">Project</span>?
              </h2>
              <p className="text-gray-light/60 mb-10 text-lg max-w-lg mx-auto font-light">
                Whether you need a full construction, interior design, or renovation — we bring your vision to life.
              </p>
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
