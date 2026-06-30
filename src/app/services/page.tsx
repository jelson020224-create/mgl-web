import prisma from '@/lib/prisma'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'

async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: 'asc' },
    include: { samples: { orderBy: { order: 'asc' }, take: 3 } },
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <section className="bg-warm-gray text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll type="fade-up">
            <h1 className="text-5xl font-bold mb-6">Our <span className="text-terracotta">Services</span></h1>
          </AnimateOnScroll>
          <AnimateOnScroll type="fade-up" delay={200}>
            <p className="text-lg text-gray-light/80 max-w-3xl mx-auto">
              Everything you need under one roof — from concept to completion.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <AnimateOnScroll key={s.id} type="fade-up" delay={i * 100}>
                <Link href={`/services/${s.id}`} className="card card-shine p-8 flex flex-col gap-6 group block hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-6 items-start">
                    <div className="text-5xl shrink-0 transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-warm-gray mb-3">{s.title}</h2>
                      <p className="text-gray leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                  {s.samples.length > 0 && (
                    <div className="flex gap-2 -mx-1">
                      {s.samples.map((sample) => (
                        <div key={sample.id} className="flex-1 aspect-video rounded-lg overflow-hidden bg-gray-light">
                          <img
                            src={sample.imageUrl}
                            alt={sample.caption || ''}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray">{s.samples.length} sample{s.samples.length !== 1 ? 's' : ''}</span>
                    <span className="text-sm text-terracotta font-medium group-hover:underline">View Samples &rarr;</span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-gray text-white text-center">
        <AnimateOnScroll type="scale-in">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Not Sure What You Need?</h2>
            <p className="text-gray-light/80 mb-8">
              We offer free consultations to discuss your project and recommend the best approach.
            </p>
            <a href="/contact" className="btn-primary text-lg">Book a Consultation</a>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  )
}
