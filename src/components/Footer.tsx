import Image from 'next/image'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-warm-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/mgl-logo.jpg" alt="MGL Logo" width={40} height={40} className="rounded-lg" />
              <h3 className="text-terracotta text-xl font-bold">{settings.company_name || 'MGL Construction & Interior'}</h3>
            </div>
            <p className="text-gray text-sm leading-relaxed">
              Building dreams with precision and passion. From concept to completion, we deliver excellence in every project.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray">
              <li><a href="/services" className="hover:text-terracotta transition-colors duration-300">Services</a></li>
              <li><a href="/portfolio" className="hover:text-terracotta transition-colors duration-300">Portfolio</a></li>
              <li><a href="/track" className="hover:text-terracotta transition-colors duration-300">Track Your Project</a></li>
              <li><a href="/contact" className="hover:text-terracotta transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray">
              <li>Email: {settings.company_email || 'info@mglconstruction.com'}</li>
              <li>Phone: {settings.company_phone || '(123) 456-7890'}</li>
              <li>Address: {settings.company_address || '123 Construction Ave, Building City'}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray">
          &copy; {new Date().getFullYear()} {settings.company_name || 'MGL Construction & Interior Designs'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
