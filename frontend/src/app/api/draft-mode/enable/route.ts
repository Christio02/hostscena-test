// src/app/api/draft-mode/enable/route.ts
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { NextRequest, NextResponse } from 'next/server'

/* helper – local only */
const { GET: enableDraftMode } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET!

/* public route export */
export async function GET(req: NextRequest) {
  const urlSecret = new URL(req.url).searchParams.get('secret')
  if (urlSecret !== PREVIEW_SECRET) {
    return NextResponse.json('Invalid secret', { status: 401 })
  }

  // pass the same request on to the helper
  return enableDraftMode(req)
}

/* keep your OPTIONS handler if you added CORS */
