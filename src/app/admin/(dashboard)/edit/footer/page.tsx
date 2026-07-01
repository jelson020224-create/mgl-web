import { getSettings } from '@/lib/admin-actions'
import { EditFooterForm } from './form'

export default async function EditFooterPage() {
  const settings = await getSettings()
  return <EditFooterForm settings={settings} />
}
