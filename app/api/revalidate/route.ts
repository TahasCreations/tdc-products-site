import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({})) as { tags?: string[] }
    const tags = body.tags || []
    tags.forEach((t) => revalidateTag(t))
    return NextResponse.json({ ok: true, revalidated: tags })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


