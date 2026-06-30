import { getSiteSettings } from '@/lib/queries'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default async function AboutPage() {
  const settings = await getSiteSettings()

  const team = [
    { role: 'Architects', desc: 'Licensed architects who transform your ideas into buildable, beautiful designs.', icon: '🏛️' },
    { role: 'Draftsmen', desc: 'Precision CAD drafters who create detailed construction documents and permit sets.', icon: '📐' },
    { role: 'Engineers', desc: 'Structural and civil engineers ensuring safety, stability, and code compliance.', icon: '🏗️' },
    { role: 'Interior Designers', desc: 'Creative designers crafting spaces that are both functional and stunning.', icon: '🪑' },
    { role: 'Project Managers', desc: 'Dedicated managers keeping your project on time, on budget, and on point.', icon: '📋' },
    { role: 'Construction Team', desc: 'Skilled tradesmen and laborers bringing every detail to life on site.', icon: '🔨' },
  ]

  return (
    <>
      <section className="bg-warm-gray text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll type="fade-up">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              About <span className="text-terracotta">MGL</span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={200}>
            <div className="text-lg text-gray-light/80 max-w-3xl mx-auto leading-relaxed prose prose-invert"
              dangerouslySetInnerHTML={{ __html: settings.about_content || '<p>We are a full-service construction and interior design firm built on craftsmanship, creativity, and collaboration.</p>' }} />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll type="fade-up">
            <div className="text-center mb-16">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-playfair), serif' }}>Our Team</h2>
              <p className="section-subtitle">Experts in every discipline, working as one</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <AnimateOnScroll key={m.role} type="fade-up" delay={i * 100}>
                <div className="card card-shine p-8 text-center group">
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{m.icon}</div>
                  <h3 className="text-xl font-bold text-warm-gray mb-3">{m.role}</h3>
                  <p className="text-gray text-sm leading-relaxed">{m.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll type="fade-up">
            <h2 className="section-title" style={{ fontFamily: 'var(--font-playfair), serif' }}>Our Approach</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[
              { step: '01', title: 'Consult' },
              { step: '02', title: 'Design' },
              { step: '03', title: 'Approve' },
              { step: '04', title: 'Build' },
            ].map((s, i) => (
              <AnimateOnScroll key={s.step} type="fade-up" delay={i * 150}>
                <div className="group">
                  <div className="text-4xl font-bold text-terracotta/30 mb-2 transition-all duration-300 group-hover:text-terracotta group-hover:scale-110">{s.step}</div>
                  <div className="text-xl font-semibold text-warm-gray">{s.title}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
