import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { NextRequest, NextResponse } from 'next/server'

export const { GET: _enable } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET!

export async function GET(req: NextRequest) {
  // 1) check the query param yourself
  const urlSecret = new URL(req.url).searchParams.get('secret')
  if (urlSecret !== PREVIEW_SECRET) {
    return NextResponse.json('Invalid secret', { status: 401 })
  }

  // 2) forward the (same) request to the helper
  return _enable(req)
}
