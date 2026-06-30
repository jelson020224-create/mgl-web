import { getSiteSettings } from '@/lib/queries'
import ContactForm from './contact-form'

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return <ContactForm settings={settings} />
}
