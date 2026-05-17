import { NextResponse } from 'next/server'

export const revalidate = 3600 // refresh every hour

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return NextResponse.json({ posts: [], configured: false })
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=9&access_token=${token}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      console.error('Instagram API error:', res.status)
      return NextResponse.json({ posts: [], configured: false, error: res.status })
    }

    const data = await res.json()

    // Filter only images and videos (not CAROUSEL_ALBUM parents without media_url)
    const posts = (data.data ?? [])
      .filter((p: any) => p.media_url || p.thumbnail_url)
      .map((p: any) => ({
        id: p.id,
        caption: p.caption ?? '',
        media_type: p.media_type,
        media_url: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        permalink: p.permalink,
        timestamp: p.timestamp,
      }))
      .slice(0, 9)

    return NextResponse.json({ posts, configured: true })
  } catch (err) {
    console.error('Instagram fetch error:', err)
    return NextResponse.json({ posts: [], configured: false })
  }
}
