import { getSettings } from '@/lib/admin-actions'
import { EditContactForm } from './form'

export default async function EditContactPage() {
  const settings = await getSettings()
  return <EditContactForm settings={settings} />
}
