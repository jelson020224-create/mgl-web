import Link from 'next/link'
import { SiteLogo } from './site-logo'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  const linkClass = "text-sm text-gray/60 hover:text-white transition-colors duration-200"

  return (
    <footer className="relative bg-warm-gray overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-terracotta via-terracotta/50 to-transparent" />

      <div className="section-container py-[clamp(3rem,5vw,5rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(1.5rem,3vw,3rem)]">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <SiteLogo settings={settings} variant="full" className="h-10" />
            </Link>
            <p className="text-sm text-gray/60 leading-relaxed pr-4">
              Building dreams with precision and passion. From concept to completion, we deliver excellence in every project.
            </p>
          </div>

          <div>
            <h4 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta bg-terracotta/10 px-3 py-1.5 rounded-full mb-5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              Services
            </h4>
            <ul className="space-y-3">
              <li><Link href="/services" className={linkClass}>Architectural Design</Link></li>
              <li><Link href="/services" className={linkClass}>Interior Design</Link></li>
              <li><Link href="/services" className={linkClass}>Drafting Services</Link></li>
              <li><Link href="/services" className={linkClass}>Renovation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta bg-terracotta/10 px-3 py-1.5 rounded-full mb-5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className={linkClass}>Portfolio</Link></li>
              <li><Link href="/track" className={linkClass}>Track Project</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact Us</Link></li>
              <li><Link href="/dashboard" className={linkClass}>Client Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta bg-terracotta/10 px-3 py-1.5 rounded-full mb-5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${settings.company_email || 'info@mglconstruction.com'}`} className="flex items-center gap-3 text-sm text-gray/60 hover:text-white transition-colors duration-200 group">
                  <svg className="w-4 h-4 shrink-0 text-gray/40 group-hover:text-terracotta transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="truncate">{settings.company_email || 'info@mglconstruction.com'}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${settings.company_phone || '(123) 456-7890'}`} className="flex items-center gap-3 text-sm text-gray/60 hover:text-white transition-colors duration-200 group">
                  <svg className="w-4 h-4 shrink-0 text-gray/40 group-hover:text-terracotta transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{settings.company_phone || '(123) 456-7890'}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-gray/60">
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{settings.company_address || '123 Construction Ave, Building City'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray/40">&copy; {new Date().getFullYear()} {settings.company_name || 'MGL Construction'}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/services" className="text-xs text-gray/40 hover:text-white/60 transition-colors">Services</Link>
            <span className="w-1 h-1 rounded-full bg-terracotta/50" />
            <Link href="/privacy" className="text-xs text-gray/40 hover:text-white/60 transition-colors">Privacy</Link>
            <span className="w-1 h-1 rounded-full bg-terracotta/50" />
            <Link href="/privacy#cookies" className="text-xs text-gray/40 hover:text-white/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
