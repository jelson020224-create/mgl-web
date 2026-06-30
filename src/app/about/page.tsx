import { getSiteSettings, getTeamMembers, getApproachSteps } from '@/lib/queries'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const team = await getTeamMembers()
  const steps = await getApproachSteps()

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative text-center">
          <AnimateOnScroll type="fade-up">
            <span className="section-eyebrow text-terracotta/80">{settings.about_hero_eyebrow || 'Who We Are'}</span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-[1.05] mb-6">
              {settings.about_hero_title || (<>About <span className="gradient-text">MGL</span></>)}
            </h1>
            <div className="text-lg text-gray-light/70 max-w-3xl mx-auto font-light"
              dangerouslySetInnerHTML={{ __html: settings.about_content || '<p>We are a full-service construction and interior design firm built on craftsmanship, creativity, and collaboration.</p>' }} />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-mesh relative">
        <div className="section-container relative">
          <AnimateOnScroll type="fade-up">
            <div className="section-header">
              <span className="section-eyebrow">Our People</span>
              <h2 className="section-title">The Team</h2>
              <div className="divider-dash justify-center mb-4">
                <span className="divider-dash-dot" />
              </div>
              <p className="section-subtitle">Experts in every discipline, working as one</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
              {team.map((m, i) => (
              <AnimateOnScroll key={m.id} type="fade-up" delay={i * 80}>
                <div className="card-modern shadow-soft p-8 text-center group h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta to-terracotta-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-5 text-3xl group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                    {m.icon}
                  </div>
                  <h3 className="text-lg font-bold text-warm-gray mb-3">{m.title}</h3>
                  <p className="text-sm text-gray-dark leading-relaxed">{m.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white relative">
        <div className="absolute inset-0 pattern-dots opacity-[0.12]" />
        <div className="section-container relative">
          <AnimateOnScroll type="fade-up">
            <div className="section-header">
              <span className="section-eyebrow">How We Work</span>
              <h2 className="section-title">Our Approach</h2>
              <div className="divider-dash justify-center mb-4">
                <span className="divider-dash-dot" />
              </div>
              <p className="section-subtitle">A streamlined process from idea to completion</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[clamp(1.5rem,3vw,3rem)] mt-4">
            {steps.map((s, i) => (
              <AnimateOnScroll key={s.id} type="fade-up" delay={i * 100}>
                <div className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                    <span className="text-lg font-bold font-serif">{s.step}</span>
                  </div>
                  <div className="text-lg font-bold text-warm-gray">{s.title}</div>
                  <div className="w-8 h-0.5 bg-terracotta/30 mx-auto mt-3 group-hover:w-12 transition-all duration-300" />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-warm-gray text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pattern-dots" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[120px]" />
        <div className="section py-[clamp(4rem,8vw,8rem)] text-center relative">
          <div className="max-w-xl mx-auto">
            <AnimateOnScroll type="scale-in">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta/70 mb-5 bg-terracotta/10 px-4 py-1.5 rounded-full">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Ready to Work With Us?</h2>
              <p className="text-gray-light/60 mb-8">Let&apos;s discuss your vision and make it a reality.</p>
              <a href="/contact" className="btn btn-primary btn-lg group">
                Contact Us
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
