import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '../lib/payload'

export const metadata: Metadata = {
  title: 'Latest News',
  description: 'Catch up on everything we\'ve published — the latest articles, analysis, and coverage.',
  openGraph: {
    title: 'Latest News',
    description: 'Catch up on everything we\'ve published — the latest articles, analysis, and coverage.',
  },
}

export default async function ArticlesListPage() {
  const { docs: articles } = await getArticles()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => {
            const image = typeof article.featuredImage === 'object' ? article.featuredImage : null
            const category = typeof article.category === 'object' ? article.category : null

            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {image?.url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${image.url}`}
                      alt={image.alt || article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  {category && (
                    <span className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
                      {category.name}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold mt-1 mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm">{article.excerpt}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}