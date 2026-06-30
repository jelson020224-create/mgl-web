import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-warm-gray border-t border-white/5">
      <div className="section-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/LOGO-MGL.png" alt="MGL Logo" width={140} height={42} className="h-9 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray/60 leading-relaxed max-w-xs">
              Building dreams with precision and passion. From concept to completion, we deliver excellence in every project.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-gray/60 hover:text-white transition-colors">Architectural Design</Link></li>
              <li><Link href="/services" className="text-sm text-gray/60 hover:text-white transition-colors">Interior Design</Link></li>
              <li><Link href="/services" className="text-sm text-gray/60 hover:text-white transition-colors">Drafting Services</Link></li>
              <li><Link href="/services" className="text-sm text-gray/60 hover:text-white transition-colors">Renovation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-sm text-gray/60 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/track" className="text-sm text-gray/60 hover:text-white transition-colors">Track Project</Link></li>
              <li><Link href="/contact" className="text-sm text-gray/60 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray/60 hover:text-white transition-colors">Client Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="block text-[10px] text-gray/40 uppercase tracking-widest mb-1">Email</span>
                <a href={`mailto:${settings.company_email || 'info@mglconstruction.com'}`} className="text-gray/60 hover:text-white transition-colors">
                  {settings.company_email || 'info@mglconstruction.com'}
                </a>
              </li>
              <li>
                <span className="block text-[10px] text-gray/40 uppercase tracking-widest mb-1">Phone</span>
                <a href={`tel:${settings.company_phone || '(123) 456-7890'}`} className="text-gray/60 hover:text-white transition-colors">
                  {settings.company_phone || '(123) 456-7890'}
                </a>
              </li>
              <li>
                <span className="block text-[10px] text-gray/40 uppercase tracking-widest mb-1">Address</span>
                <span className="text-gray/60">{settings.company_address || '123 Construction Ave, Building City'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray/40">
            &copy; {new Date().getFullYear()} {settings.company_name || 'MGL Construction'}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-xs text-gray/40 hover:text-white/60 transition-colors">Services</Link>
            <Link href="/privacy" className="text-xs text-gray/40 hover:text-white/60 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
