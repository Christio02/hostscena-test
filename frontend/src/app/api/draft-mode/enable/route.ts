import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { NextResponse } from 'next/server'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})

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
