import Link from 'next/link'
import { getTestimonials } from '@/lib/queries'
import { deleteTestimonial } from '@/lib/admin-actions'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-warm-gray">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn-primary text-sm">+ Add Testimonial</Link>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-warm-gray">{t.clientName}</h3>
                {t.role && <p className="text-sm text-gray">{t.role}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-terracotta text-sm">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                {!t.active && <span className="text-xs bg-gray/20 px-2 py-0.5 rounded">Inactive</span>}
              </div>
            </div>
            <p className="text-sm text-gray mt-3">&ldquo;{t.content}&rdquo;</p>
            <div className="flex gap-3 mt-4">
              <Link href={`/admin/testimonials/${t.id}`} className="text-sm text-terracotta hover:underline">Edit</Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <button type="submit" className="text-sm text-red-500 hover:underline">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-gray text-center py-12">No testimonials yet.</p>
        )}
      </div>
    </div>
  )
}
