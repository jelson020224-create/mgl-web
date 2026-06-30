import { getSettings } from '@/lib/admin-actions'
import SettingsForm from './form'

export default async function SettingsPage() {
  const settings = await getSettings()
  return <SettingsForm settings={settings} />
}
