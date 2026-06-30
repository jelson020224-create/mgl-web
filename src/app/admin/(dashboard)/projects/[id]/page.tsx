import prisma from '@/lib/prisma'
import EditProjectForm from './edit-project-form'

export default async function EditProjectPage() {
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } })
  return <EditProjectForm clients={clients} />
}
