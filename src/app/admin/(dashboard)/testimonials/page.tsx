import Link from 'next/link'
import { getAllTestimonials } from '@/lib/queries'
import { approveTestimonial, deleteTestimonial } from '@/lib/admin-actions'

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-warm-gray">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn btn-primary text-sm">+ Add Testimonial</Link>
      </div>

      {testimonials.filter(t => !t.active).length > 0 && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm font-medium text-amber-800">
            {testimonials.filter(t => !t.active).length} pending review{testimonials.filter(t => !t.active).length !== 1 ? 's' : ''} awaiting approval
          </p>
        </div>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className={`card-modern shadow-soft p-6 ${!t.active ? 'border-l-4 border-amber-400' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-warm-gray">{t.clientName}</h3>
                {t.role && <p className="text-sm text-gray">{t.role}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-terracotta text-sm">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                {!t.active && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">Pending</span>}
                {t.active && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">Approved</span>}
              </div>
            </div>
            <p className="text-sm text-gray mt-3">&ldquo;{t.content}&rdquo;</p>
            <div className="flex gap-3 mt-4">
              {!t.active && (
                <form action={approveTestimonial.bind(null, t.id)}>
                  <button type="submit" className="text-sm text-emerald-600 hover:underline font-medium">Approve</button>
                </form>
              )}
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
