import AnimateOnScroll from '@/components/AnimateOnScroll'

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-warm-gray text-white overflow-hidden hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-warm-gray-soft to-[#222]" />
        <div className="absolute inset-0 opacity-[0.03] pattern-grid" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-terracotta/8 rounded-full blur-[100px]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="section-container relative text-center">
          <AnimateOnScroll type="fade-up">
            <span className="section-eyebrow text-terracotta/80">Legal</span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-[1.05] mb-5">
              Privacy & <span className="gradient-text">Cookies</span>
            </h1>
            <p className="text-lg text-gray-light/60 font-light">How we handle your data</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section bg-cream relative">
        <div className="absolute inset-0 pattern-dots opacity-[0.06]" />
        <div className="section-container relative max-w-3xl">
          <div className="space-y-12">
            <AnimateOnScroll type="fade-up">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 leading-[1.05]">Privacy Policy</h2>
                <p className="text-sm text-gray mb-6">Last updated: June 2026</p>
                <div className="prose prose-sm text-gray-dark space-y-4 leading-relaxed">
                  <p>MGL Construction & Interior Designs (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Information We Collect</h3>
                  <p><strong>Personal Data:</strong> Name, email address, phone number, and project details you provide via our contact form, registration, or account creation.</p>
                  <p><strong>Usage Data:</strong> Browser type, device information, pages visited, time spent on pages, and referring URLs collected automatically.</p>
                  <p><strong>Cookies:</strong> See our Cookie Policy below.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">How We Use Your Information</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>To respond to inquiries and provide project estimates</li>
                    <li>To manage client accounts and project tracking</li>
                    <li>To improve our website and services</li>
                    <li>To send relevant updates about your projects</li>
                    <li>To comply with legal obligations</li>
                  </ul>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Data Retention</h3>
                  <p>We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy. Client account data is retained until account deletion. Contact form submissions are retained for up to 12 months.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Data Sharing</h3>
                  <p>We do not sell your personal information. We may share data with trusted third-party service providers who assist in operating our website (hosting, analytics), bound by confidentiality agreements.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal data. You may also withdraw consent for cookies at any time. Contact us at <a href="mailto:info@mglconstruction.com" className="text-terracotta hover:underline">info@mglconstruction.com</a> to exercise these rights.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Third-Party Links</h3>
                  <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices. We encourage you to review their policies.</p>
                </div>
              </div>
            </AnimateOnScroll>

            <hr className="border-sand-light" />

            <AnimateOnScroll type="fade-up" delay={100}>
              <div id="cookies">
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 leading-[1.05]">Cookie Policy</h2>
                <p className="text-sm text-gray mb-6">Last updated: June 2026</p>
                <div className="prose prose-sm text-gray-dark space-y-4 leading-relaxed">
                  <p>This Cookie Policy explains how MGL Construction & Interior Designs uses cookies and similar tracking technologies on our website.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">What Are Cookies</h3>
                  <p>Cookies are small text files stored on your device when you visit a website. They help the website function properly, improve your experience, and provide analytics.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Cookies We Use</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-warm-gray-50">
                          <th className="text-left p-3 font-semibold text-xs uppercase tracking-wider">Type</th>
                          <th className="text-left p-3 font-semibold text-xs uppercase tracking-wider">Purpose</th>
                          <th className="text-left p-3 font-semibold text-xs uppercase tracking-wider">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-sand-light">
                          <td className="p-3 font-medium">Session</td>
                          <td className="p-3">Keeps you signed in to your admin or client dashboard</td>
                          <td className="p-3">Session</td>
                        </tr>
                        <tr className="border-t border-sand-light">
                          <td className="p-3 font-medium">Authentication</td>
                          <td className="p-3">Secures your login session (admin & client)</td>
                          <td className="p-3">24 hours</td>
                        </tr>
                        <tr className="border-t border-sand-light">
                          <td className="p-3 font-medium">OAuth State</td>
                          <td className="p-3">Prevents CSRF during Google sign-in</td>
                          <td className="p-3">10 minutes</td>
                        </tr>
                        <tr className="border-t border-sand-light">
                          <td className="p-3 font-medium">Analytics</td>
                          <td className="p-3">Anonymous usage statistics (if enabled)</td>
                          <td className="p-3">Persistent</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Managing Cookies</h3>
                  <p>You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling essential cookies may affect website functionality.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Changes to This Policy</h3>
                  <p>We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.</p>

                  <h3 className="text-base font-bold text-warm-gray mt-6">Contact</h3>
                  <p>If you have questions about this policy, contact us at <a href="mailto:info@mglconstruction.com" className="text-terracotta hover:underline">info@mglconstruction.com</a>.</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
