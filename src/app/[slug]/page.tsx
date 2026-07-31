import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '../lib/payload'
import { BlockRenderer } from '../components/BlockRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const ogImage = typeof page.seo?.ogImage === 'object' ? page.seo.ogImage : null

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || undefined,
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || undefined,
      images: ogImage?.url
        ? [`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${ogImage.url}`]
        : undefined,
    },
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <main>
      <BlockRenderer blocks={page.layout || []} />
    </main>
  )
}