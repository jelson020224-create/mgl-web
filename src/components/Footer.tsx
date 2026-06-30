import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-warm-gray border-t border-white/5">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/mgl-logo.jpg" alt="MGL Logo" width={40} height={40} className="rounded-lg ring-2 ring-white/10" />
              <span className="text-terracotta font-bold text-lg">{settings.company_name || 'MGL Construction'}</span>
            </div>
            <p className="text-sm text-gray leading-relaxed max-w-xs">
              Building dreams with precision and passion. From concept to completion, we deliver excellence in every project.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-gray hover:text-white transition-colors">Architectural Design</Link></li>
              <li><Link href="/services" className="text-sm text-gray hover:text-white transition-colors">Interior Design</Link></li>
              <li><Link href="/services" className="text-sm text-gray hover:text-white transition-colors">Drafting Services</Link></li>
              <li><Link href="/services" className="text-sm text-gray hover:text-white transition-colors">Renovation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-sm text-gray hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/track" className="text-sm text-gray hover:text-white transition-colors">Track Project</Link></li>
              <li><Link href="/contact" className="text-sm text-gray hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray hover:text-white transition-colors">Client Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray">
              <li>
                <span className="block text-xs text-gray/60 uppercase tracking-wider mb-0.5">Email</span>
                <a href={`mailto:${settings.company_email || 'info@mglconstruction.com'}`} className="hover:text-white transition-colors">
                  {settings.company_email || 'info@mglconstruction.com'}
                </a>
              </li>
              <li>
                <span className="block text-xs text-gray/60 uppercase tracking-wider mb-0.5">Phone</span>
                <a href={`tel:${settings.company_phone || '(123) 456-7890'}`} className="hover:text-white transition-colors">
                  {settings.company_phone || '(123) 456-7890'}
                </a>
              </li>
              <li>
                <span className="block text-xs text-gray/60 uppercase tracking-wider mb-0.5">Address</span>
                <span>{settings.company_address || '123 Construction Ave, Building City'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray/60">
            &copy; {new Date().getFullYear()} {settings.company_name || 'MGL Construction & Interior Designs'}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-xs text-gray/60 hover:text-white transition-colors">Services</Link>
            <Link href="/privacy" className="text-xs text-gray/60 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
