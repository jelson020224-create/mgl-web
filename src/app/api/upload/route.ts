import prisma from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { getSession } from '@/lib/session'
import sharp from 'sharp'

async function localUpload(source: Buffer, filename: string) {
  const finalFilename = filename.replace(/\.\w+$/, '.webp')
  const dir = join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, finalFilename), source)
  return `/uploads/${finalFilename}`
}

async function blobUpload(source: Buffer, filename: string) {
  const { put } = await import('@vercel/blob')
  const finalFilename = filename.replace(/\.\w+$/, '.webp')
  const { url } = await put(finalFilename, source, { access: 'public' })
  return url
}

async function fileToBuffer(file: File): Promise<Buffer> {
  const chunks: Uint8Array[] = []
  const reader = file.stream().getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }
  return Buffer.concat(chunks)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

    let raw: Buffer
    try {
      raw = await fileToBuffer(file)
    } catch (e) {
      console.error('fileToBuffer error:', e)
      return Response.json({ error: 'Failed to read file' }, { status: 500 })
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '')
    const filename = `${Date.now()}-${originalName}`

    let finalBuffer: Buffer = raw
    let finalFilename = filename
    try {
      finalBuffer = await sharp(raw).webp({ quality: 80 }).toBuffer()
      finalFilename = filename.replace(/\.\w+$/, '.webp')
    } catch (e) {
      console.error('sharp conversion error:', e)
    }

    const alt = (formData.get('alt') as string) || finalFilename
    const useBlob = !!process.env.VERCEL && !!process.env.BLOB_READ_WRITE_TOKEN

    let url: string
    try {
      url = useBlob
        ? await blobUpload(finalBuffer, finalFilename)
        : await localUpload(finalBuffer, finalFilename)
    } catch (e) {
      console.error('storage upload error:', e)
      return Response.json({ error: 'Storage upload failed' }, { status: 500 })
    }

    const image = await prisma.uploadedImage.create({
      data: { filename: finalFilename, url, alt },
    })

    return Response.json({ success: true, url: image.url, image })
  } catch (e) {
    console.error('Upload error:', e)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
