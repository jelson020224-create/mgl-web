import { getSiteSettings } from '@/lib/queries'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default async function AboutPage() {
  const settings = await getSiteSettings()

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
