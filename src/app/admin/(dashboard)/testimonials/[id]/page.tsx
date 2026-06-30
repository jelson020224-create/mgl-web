import { getSettings, getTestimonial } from '@/lib/admin-actions'
import TestimonialForm from './form'

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const testimonial = id === 'new' ? null : await getTestimonial(Number(id))
  return <TestimonialForm testimonial={testimonial} />
}
