import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const collection = request.nextUrl.searchParams.get('collection')
  const slug = request.nextUrl.searchParams.get('slug')

  if (secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 })
  }

  if (!collection || !slug) {
    return NextResponse.json({ message: 'Missing collection or slug' }, { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  if (collection === 'articles') {
    redirect(`/articles/${slug}`)
  }

  if (collection === 'pages') {
    redirect(`/${slug}`)
  }

  return NextResponse.json({ message: 'Unknown collection' }, { status: 400 })
}