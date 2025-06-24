import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { NextRequest, NextResponse } from 'next/server'

export const { GET: _enable } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})

export async function GET(req: NextRequest) {
  const res = await _enable(req)

  // pull out all Set-Cookie headers
  const cookies =
    res.headers
      .get('set-cookie')
      ?.split('\n')
      .map((c) =>
        // strip any default SameSite and then force None; Secure; Partitioned
        c.replace(/; ?SameSite=[^;]+/i, '').concat('; SameSite=None; Secure; Partitioned'),
      ) ?? []

  // clear the old header and re-append
  res.headers.delete('set-cookie')
  for (const cook of cookies) {
    res.headers.append('set-cookie', cook)
  }

  return res
}

export const OPTIONS = () => {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://hostscena.sanity.studio',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
