import prisma from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { getSession } from '@/lib/session'
import sharp from 'sharp'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

    const source = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`

    let finalBuffer: Uint8Array = source
    let finalFilename = filename
    try {
      finalBuffer = await sharp(source).webp({ quality: 80 }).toBuffer()
      finalFilename = filename.replace(/\.\w+$/, '.webp')
    } catch {
      // fallback to original
    }

    const dir = join(process.cwd(), 'public', 'uploads')
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, finalFilename), finalBuffer)

    const url = `/uploads/${finalFilename}`
    const alt = formData.get('alt') as string || finalFilename

    const image = await prisma.uploadedImage.create({
      data: { filename: finalFilename, url, alt },
    })

    return Response.json({ success: true, image })
  } catch (e) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
