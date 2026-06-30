import prisma from '@/lib/prisma'

export async function seedAdmin() {
  const existing = await prisma.admin.findFirst()
  if (existing) return

  const bcrypt = await import('bcryptjs')
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)

  await prisma.admin.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@mgl.com',
      password: hashedPassword,
      name: 'Admin',
    },
  })

  await prisma.service.createMany({
    data: [
      { title: 'Architectural Design', description: 'Custom house plans, elevations, and 3D renderings tailored to your vision and lot.', icon: '🏛️', order: 1 },
      { title: 'Interior Design', description: 'Complete interior fit-out including spatial planning, finishes, furniture, and lighting.', icon: '🪑', order: 2 },
      { title: 'Drafting Services', description: 'Professional CAD drafting, permit sets, and construction documentation.', icon: '📐', order: 3 },
      { title: 'Renovation & Remodeling', description: 'Full or partial home renovations — kitchens, bathrooms, basements, and more.', icon: '🔨', order: 4 },
      { title: 'Structural Engineering', description: 'Structural analysis, foundation design, and engineering certifications.', icon: '🏗️', order: 5 },
      { title: 'Project Management', description: 'End-to-end project oversight from concept to completion — on time and on budget.', icon: '📋', order: 6 },
    ],
  })

  const existingSettings = await prisma.siteSetting.findFirst()
  if (existingSettings) return

  await prisma.siteSetting.createMany({
    data: [
      { key: 'company_name', value: 'MGL Construction & Interior' },
      { key: 'company_email', value: 'info@mglconstruction.com' },
      { key: 'company_phone', value: '(123) 456-7890' },
      { key: 'company_address', value: '123 Construction Ave, Building City' },
      { key: 'hero_title', value: 'Building Your Vision From the Ground Up' },
      { key: 'hero_subtitle', value: 'MGL Construction & Interior brings together draftsmen, architects, and engineers to deliver exceptional residential and commercial spaces.' },
      { key: 'about_content', value: '<h2>Who We Are</h2><p>MGL Construction & Interior has been delivering exceptional building and design solutions for over a decade. Our team of draftsmen, architects, and engineers work collaboratively to bring your vision to life.</p><h3>Our Mission</h3><p>To provide high-quality construction and interior design services that exceed client expectations through innovation, integrity, and attention to detail.</p><h3>Why Choose Us</h3><ul><li><strong>Experienced Team:</strong> Over 12 years of industry experience</li><li><strong>Integrated Services:</strong> From drafting to construction, we handle it all</li><li><strong>Client-Focused:</strong> Your vision drives every decision we make</li><li><strong>Quality Assurance:</strong> Rigorous quality control at every stage</li></ul>' },
      { key: 'stats_projects', value: '150' },
      { key: 'stats_years', value: '12' },
      { key: 'stats_clients', value: '50' },
      { key: 'stats_team', value: '20' },
    ],
  })

  await prisma.testimonial.createMany({
    data: [
      { clientName: 'Sarah Johnson', role: 'Homeowner', content: 'MGL transformed our outdated house into our dream home. The attention to detail was incredible. Every room feels thoughtfully designed.', rating: 5 },
      { clientName: 'Mark Rivera', role: 'Business Owner', content: 'Professional, punctual, and perfectionists. Our commercial space was delivered on time and under budget. Highly recommend.', rating: 5 },
      { clientName: 'Emily Chen', role: 'Architect', content: 'Working alongside MGL on multiple projects has been a pleasure. Their drafting precision and project management are top-tier.', rating: 5 },
    ],
  })
}
