import prisma from '@/lib/prisma'
import AnimateOnScroll from '@/components/AnimateOnScroll'

async function searchProjects(search: string) {
  if (!search) return []
  return prisma.project.findMany({
    where: { clientName: { contains: search } },
    select: { id: true, clientName: true, status: true },
    take: 20,
  })
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const results = q ? await searchProjects(q) : []

  return (
    <>
      <section className="bg-warm-gray text-white hero-section">
        <div className="section-container text-center">
          <AnimateOnScroll type="fade-up">
            <h1 className="text-5xl font-bold mb-6">Track Your <span className="text-terracotta">Project</span></h1>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={200}>
            <p className="text-lg text-gray-light/80 mb-8">
              Enter your name to find your project and view the latest updates.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={300}>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                name="q"
                defaultValue={q || ''}
                placeholder="Search your name..."
                className="flex-1 px-4 py-3 rounded-lg text-warm-gray bg-white focus:outline-none focus:ring-2 focus:ring-terracotta transition-all duration-300"
              />
              <button type="submit" className="btn-primary">Search</button>
            </form>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-cream min-h-[40vh]">
        <div className="section-container">
          {q && results.length === 0 && (
            <p className="text-center text-gray animate-fade-in">No projects found for &quot;{q}&quot;. Check the spelling or contact us.</p>
          )}
          {results.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray mb-4 animate-fade-in">{results.length} project(s) found. Click to view updates.</p>
              {results.map((p, i) => (
                <AnimateOnScroll key={p.id} type="fade-up" delay={i * 80}>
                  <a
                    href={`/track/${p.id}`}
                    className="card-modern shadow-soft p-6 flex items-center justify-between group hover:border-terracotta/50 border border-transparent"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-warm-gray group-hover:text-terracotta transition-colors">{p.clientName}</h3>
                      <span className={`text-xs font-semibold uppercase ${p.status === 'completed' ? 'text-green-600' : 'text-terracotta'}`}>
                        {p.status}
                      </span>
                    </div>
                    <span className="text-terracotta group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
