import prisma from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`
    const dir = join(process.cwd(), 'public', 'uploads')
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, filename), buffer)

    const url = `/uploads/${filename}`
    const alt = formData.get('alt') as string || filename

    const image = await prisma.uploadedImage.create({
      data: { filename, url, alt },
    })

    return Response.json({ success: true, image })
  } catch (e) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
