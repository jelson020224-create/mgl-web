import prisma from '@/lib/prisma'
import { getSiteSettings } from '@/lib/queries'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import RequestProjectModal from '@/components/RequestProjectModal'

function youtubeEmbedUrl(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/)
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null
}

function facebookEmbedUrl(url: string): string | null {
  const isReel = /facebook\.com\/(share\/r\/|reel\/)/.test(url)
  if (isReel) return null
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=600`
}

function facebookReelUrl(url: string): string | null {
  const m = url.match(/facebook\.com\/(?:share\/r\/|reel\/)([^\/?#]+)/)
  return m ? `https://www.facebook.com/reel/${m[1]}` : null
}

async function getPortfolio() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })
  const categories = [...new Set(items.map((i) => i.category))]
  return { items, categories }
}

export default async function PortfolioPage() {
  const [{ items, categories }, settings] = await Promise.all([getPortfolio(), getSiteSettings()])

  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative text-center">
          <AnimateOnScroll type="fade-up">
            <span className="section-eyebrow text-terracotta/80">{settings.portfolio_hero_eyebrow || 'Our Work'}</span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-[1.05] mb-5">
              {settings.portfolio_hero_title || (<>Our <span className="gradient-text">Portfolio</span></>)}
            </h1>
            <p className="text-lg text-gray-light/60 font-light">{settings.portfolio_hero_subtitle || 'A showcase of our finest work'}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
              {items.map((p, i) => {
                const ytSrc = p.type === 'video' && p.videoPlatform === 'youtube' && p.videoUrl ? youtubeEmbedUrl(p.videoUrl) : null
                const fbSrc = p.type === 'video' && p.videoPlatform === 'facebook' && p.videoUrl ? facebookEmbedUrl(p.videoUrl) : null
                const reelUrl = p.type === 'video' && p.videoPlatform === 'facebook' && p.videoUrl ? facebookReelUrl(p.videoUrl) : null

                return (
                  <AnimateOnScroll key={p.id} type="scale-in" delay={i * 80}>
                    <div className="card-modern shadow-soft group overflow-hidden">
                      {ytSrc ? (
                        <div className="aspect-[4/3] overflow-hidden bg-black">
                          <iframe
                            src={ytSrc}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      ) : fbSrc ? (
                        <div className="aspect-[4/3] overflow-hidden bg-black">
                          <iframe
                            src={fbSrc}
                            className="w-full h-full"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      ) : reelUrl ? (
                        <a href={reelUrl} target="_blank" rel="noopener noreferrer" className="block aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 group/link">
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M9.525 8.772V15.228L15 12L9.525 8.772ZM22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12ZM20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12Z" /></svg>
                            <span className="text-xs font-semibold opacity-80 group-hover/link:opacity-100 transition-opacity">Watch on Facebook</span>
                          </div>
                        </a>
                      ) : (
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
                      )}
                      <div className="p-5 relative">
                        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
                        <span className="badge badge-terracotta text-[10px] uppercase tracking-widest font-semibold">{p.category}</span>
                        <h3 className="text-base font-bold text-warm-gray mt-2.5 mb-1">{p.title}</h3>
                        {p.description && <p className="text-xs text-gray-dark leading-relaxed">{p.description}</p>}
                        <RequestProjectModal projectTitle={p.title} />
                      </div>
                    </div>
                  </AnimateOnScroll>
                )
              })}
            </div>
          ) : (
            <div className="card-modern shadow-soft p-16 text-center">
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
