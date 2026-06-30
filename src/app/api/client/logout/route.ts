import { deleteClientSession } from '@/lib/client-session'
import { redirect } from 'next/navigation'

export async function POST() {
  await deleteClientSession()
  redirect('/login')
}
