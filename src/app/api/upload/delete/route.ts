import prisma from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const id = Number(url.searchParams.get('id'))
  if (!id) return Response.json({ error: 'Invalid id' }, { status: 400 })

  const image = await prisma.uploadedImage.findUnique({ where: { id } })
  if (image) {
    const filePath = join(process.cwd(), 'public', image.url)
    try { await unlink(filePath) } catch {}
    await prisma.uploadedImage.delete({ where: { id } })
  }

  revalidatePath('/admin/media')
  redirect('/admin/media')
}
