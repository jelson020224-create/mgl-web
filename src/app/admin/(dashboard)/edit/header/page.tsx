import { getSettings } from '@/lib/admin-actions'
import { EditHeaderForm } from './form'

export default async function EditHeaderPage() {
  const settings = await getSettings()
  return <EditHeaderForm settings={settings} />
}
