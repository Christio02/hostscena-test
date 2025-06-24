import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirect') || '/'

  // Disable draft mode
  const draft = await draftMode()
  draft.disable()

  // Redirect to the specified path
  const response = NextResponse.redirect(new URL(redirectTo, request.url))

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', 'https://hostscena.sanity.studio')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}

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
