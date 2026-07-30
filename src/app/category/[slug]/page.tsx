import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getArticlesByCategory, getCategoryBySlug } from '../../lib/payload'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const { docs: articles } = await getArticlesByCategory(slug)

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-gray-500 mb-8">{category.description}</p>
      )}

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => {
            const image = typeof article.featuredImage === 'object' ? article.featuredImage : null

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
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
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