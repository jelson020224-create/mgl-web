import prisma from '@/lib/prisma'
import NewProjectForm from './new-project-form'

export default async function NewProjectPage() {
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } })
  return <NewProjectForm clients={clients} />
}
