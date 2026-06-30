import prisma from '@/lib/prisma'
import AnimateOnScroll from '@/components/AnimateOnScroll'

async function getPortfolio() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })
  const categories = [...new Set(items.map((i) => i.category))]
  return { items, categories }
}

export default async function PortfolioPage() {
  const { items, categories } = await getPortfolio()

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative text-center">
          <AnimateOnScroll type="fade-up">
            <span className="section-eyebrow text-terracotta/80">Our Work</span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-5">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-lg text-gray-light/60 font-light">A showcase of our finest work</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-mesh relative">
        <div className="section-container relative">
          {categories.length > 0 && (
            <AnimateOnScroll type="fade-up">
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {categories.map((cat) => (
                  <span key={cat} className="badge badge-terracotta text-xs px-4 py-1.5 cursor-default">{cat}</span>
                ))}
              </div>
            </AnimateOnScroll>
          )}

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p, i) => (
                <AnimateOnScroll key={p.id} type="scale-in" delay={i * 80}>
                  <div className="card group overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-light">
                      {p.imageUrl && p.imageUrl !== '/placeholder.jpg' ? (
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-[0.5deg]" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-5 relative">
                      <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
                      <span className="badge badge-terracotta text-[10px] uppercase tracking-widest font-semibold">{p.category}</span>
                      <h3 className="text-base font-bold text-warm-gray mt-2.5 mb-1">{p.title}</h3>
                      {p.description && <p className="text-xs text-gray-dark leading-relaxed">{p.description}</p>}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="card p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-terracotta/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              <p className="text-gray text-sm">Portfolio coming soon. Check back for updates.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
