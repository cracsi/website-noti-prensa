import { notFound } from 'next/navigation'
import { getPageBySlug } from '../lib/payload'
import { BlockRenderer } from '../components/BlockRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  console.log('SLUG:', slug)
  console.log('PAGE:', JSON.stringify(page, null, 2))

  if (!page) {
    notFound()
  }

  return (
    <main>
      <BlockRenderer blocks={page.layout || []} />
    </main>
  )
}