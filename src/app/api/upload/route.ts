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

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    console.error('formData keys:', Array.from(formData.keys()))
    const file = formData.get('file')
    console.error('file type:', typeof file, file?.constructor?.name)
    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

    let raw: Buffer
    try {
      const ab = await (file as File).arrayBuffer()
      console.error('arrayBuffer size:', ab.byteLength)
      raw = Buffer.from(new Uint8Array(ab))
      console.error('buffer size:', raw.length)
    } catch (e1) {
      console.error('buffer step failed:', e1)
      return Response.json({ error: 'Buffer conversion failed' }, { status: 500 })
    }

    const originalName = (file as File).name.replace(/[^a-zA-Z0-9._-]/g, '')
    const filename = `${Date.now()}-${originalName}`

    let finalBuffer: Buffer = raw
    let finalFilename = filename
    try {
      finalBuffer = await sharp(raw).webp({ quality: 80 }).toBuffer()
      finalFilename = filename.replace(/\.\w+$/, '.webp')
      console.error('sharp converted to webp:', finalFilename)
    } catch (e2) {
      console.error('sharp failed, using original:', e2)
    }

    const alt = (formData.get('alt') as string) || finalFilename
    const useBlob = !!process.env.VERCEL && !!process.env.BLOB_READ_WRITE_TOKEN
    console.error('useBlob:', useBlob, 'VERCEL:', !!process.env.VERCEL, 'BLOB_TOKEN:', !!process.env.BLOB_READ_WRITE_TOKEN)

    let url: string
    try {
      url = useBlob
        ? await blobUpload(finalBuffer, finalFilename)
        : await localUpload(finalBuffer, finalFilename)
      console.error('upload success, url:', url?.slice(0, 60))
    } catch (e3) {
      console.error('upload step failed:', e3)
      return Response.json({ error: 'Storage upload failed' }, { status: 500 })
    }

    const image = await prisma.uploadedImage.create({
      data: { filename: finalFilename, url, alt },
    })

    return Response.json({ success: true, url: image.url, image })
  } catch (e) {
    console.error('Upload outer error:', e)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
