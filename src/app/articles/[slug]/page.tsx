import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getArticleBySlug } from '../../lib/payload'
import { RichText } from '../../components/RichText'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Article Not Found' }
  }

  const image = typeof article.featuredImage === 'object' ? article.featuredImage : null

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: image?.url
        ? [`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${image.url}`]
        : undefined,
      type: 'article',
      publishedTime: article.publishedDate || undefined,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const category = typeof article.category === 'object' ? article.category : null
  const author = typeof article.author === 'object' ? article.author : null
  const image = typeof article.featuredImage === 'object' ? article.featuredImage : null

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {category && (
        <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
          {category.name}
        </span>
      )}

      <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>

      <div className="text-gray-500 text-sm mb-6">
        {author && <span>By {author.email}</span>}
        {article.publishedDate && (
          <span className="ml-2">
            {new Date(article.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
      </div>

      {image?.url && (
        <div className="relative w-full h-96 mb-8">
          <Image
  src={`http://localhost:3000${image.url}`}
  alt={image.alt || article.title}
  fill
  className="object-cover rounded"
/>
        </div>
      )}

      <RichText content={article.content} />
    </main>
  )
}