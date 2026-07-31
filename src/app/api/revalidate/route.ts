import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json()
  const { collection, slug } = body

  if (!collection) {
    return NextResponse.json({ message: 'Missing collection' }, { status: 400 })
  }

  try {
    if (collection === 'articles') {
      revalidatePath(`/articles/${slug}`)
      revalidatePath('/articles')
      revalidatePath('/') // homepage may show latest articles
    }

    if (collection === 'pages') {
      revalidatePath(`/${slug}`)
      revalidatePath('/')
    }

    if (collection === 'categories') {
      revalidatePath(`/category/${slug}`)
    }

    if (collection === 'site-settings') {
      revalidatePath('/', 'layout') // nav/footer appear on every page
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}