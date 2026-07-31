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
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {category && (
        <span className="text-xs uppercase tracking-widest text-[#a3231f] font-semibold">
  {category.name}
</span>
      )}

      <h1 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight text-gray-900">
        {article.title}
      </h1>

      <div className="flex items-center gap-3 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-100">
        {author && <span>By {author.email}</span>}
        {article.publishedDate && (
          <>
            <span>·</span>
            <span>
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </>
        )}
      </div>

      {image?.url && (
        <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${image.url}`}
            alt={image.alt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg prose-gray max-w-none">
        <RichText content={article.content} />
      </div>
    </main>
  )
}