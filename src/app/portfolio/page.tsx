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
      <section className="bg-warm-gray text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll type="fade-up">
            <h1 className="text-5xl font-bold mb-6">Our <span className="text-terracotta">Portfolio</span></h1>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={200}>
            <p className="text-lg text-gray-light/80">A showcase of our finest work</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <AnimateOnScroll type="fade-up">
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {categories.map((cat) => (
                  <span key={cat} className="px-4 py-2 bg-white text-warm-gray text-sm font-semibold rounded-full border border-gray/20 transition-all duration-300 hover:bg-terracotta hover:text-white hover:border-terracotta cursor-default">
                    {cat}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
          )}

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((p, i) => (
                <AnimateOnScroll key={p.id} type="scale-in" delay={i * 100}>
                  <div className="card group">
                    <div className="aspect-[4/3] image-placeholder flex items-center justify-center text-gray overflow-hidden">
                      <svg className="w-12 h-12 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-lg font-bold text-warm-gray mt-1">{p.title}</h3>
                      <p className="text-gray text-sm mt-2">{p.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray">
              <p className="text-xl mb-4 animate-pulse-soft">Portfolio coming soon</p>
              <p className="text-sm">We are currently updating our gallery with our latest projects.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
