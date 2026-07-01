import prisma from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const id = Number(url.searchParams.get('id'))
  if (!id) return Response.json({ error: 'Invalid id' }, { status: 400 })

  const image = await prisma.uploadedImage.findUnique({ where: { id } })
  if (image) {
    if (process.env.VERCEL) {
      try {
        const { del } = await import('@vercel/blob')
        await del(image.url)
      } catch {}
    } else {
      const filePath = join(process.cwd(), 'public', image.url)
      try { await unlink(filePath) } catch {}
    }
    await prisma.uploadedImage.delete({ where: { id } })
  }

  revalidatePath('/admin/media')
  redirect('/admin/media')
}
