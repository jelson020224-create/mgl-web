import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const appId = process.env.FACEBOOK_APP_ID
  const appSecret = process.env.FACEBOOK_APP_SECRET
  if (!appId || !appSecret) {
    return Response.json({ error: 'Facebook App not configured. Set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET in env.' }, { status: 400 })
  }

  try {
    const { url } = await req.json()
    if (!url) return Response.json({ error: 'Missing url' }, { status: 400 })

    const reelId = url.match(/facebook\.com\/(?:share\/r\/|reel\/)([^\/?#]+)/)?.[1]
    if (!reelId) return Response.json({ error: 'Invalid Facebook Reels URL' }, { status: 400 })

    const token = `${appId}|${appSecret}`

    const graphRes = await fetch(
      `https://graph.facebook.com/v22.0/?id=https://www.facebook.com/reel/${reelId}&fields=og_object&access_token=${token}`
    )
    const graphData = await graphRes.json()

    const videoId = graphData?.og_object?.video?.id
    if (!videoId) {
      return Response.json({ error: 'Could not find video. Make sure the Reel is public.' }, { status: 400 })
    }

    const videoRes = await fetch(
      `https://graph.facebook.com/v22.0/${videoId}?fields=source&access_token=${token}`
    )
    const videoData = await videoRes.json()
    const sourceUrl = videoData?.source

    if (!sourceUrl) {
      return Response.json({ error: 'Could not get video source URL.' }, { status: 400 })
    }

    const videoReq = await fetch(sourceUrl)
    if (!videoReq.ok) throw new Error('Failed to download video')
    const videoBuffer = Buffer.from(await videoReq.arrayBuffer())

    const { put } = await import('@vercel/blob')
    const blobFilename = `${Date.now()}-reel-${reelId}.mp4`
    const body = new Blob([new Uint8Array(videoBuffer)], { type: 'video/mp4' })
    const { url: blobUrl } = await put(blobFilename, body, { access: 'public' })

    const image = await prisma.uploadedImage.create({
      data: { filename: blobFilename, url: blobUrl, alt: '' },
    })

    return Response.json({ success: true, url: blobUrl, image })
  } catch (e) {
    console.error('Convert reel error:', e)
    return Response.json({ error: 'Failed to convert Reel. Try again or use a different URL.' }, { status: 500 })
  }
}
