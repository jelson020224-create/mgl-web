import { getSettings } from '@/lib/admin-actions'
import { EditAboutForm } from './form'

export default async function EditAboutPage() {
  const settings = await getSettings()
  return <EditAboutForm settings={settings} />
}
