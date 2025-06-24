// src/app/api/draft-mode/enable/route.ts

import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { NextRequest, NextResponse } from 'next/server'

// 1) grab the helper, but don't export it directly:
const { GET: _enableDraftMode } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})

// 2) export *only* your wrapped GET:
export async function GET(req: NextRequest) {
  // invoke the official draft-mode handler
  const res = await _enableDraftMode(req)

  // rewrite Set-Cookie to force SameSite=None; Secure; Partitioned
  const raw = res.headers.get('set-cookie') ?? ''
  const cookies = raw
    .split('\n')
    .map((c) => c.replace(/; ?SameSite=[^;]+/i, '').concat('; SameSite=None; Secure; Partitioned'))

  // clear & re-append
  res.headers.delete('set-cookie')
  for (const c of cookies) {
    res.headers.append('set-cookie', c)
  }

  return res
}

// 3) export only OPTIONS as needed for CORS preflight
export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://hostscena.sanity.studio',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
