import { getSiteSettings, getArticles } from './lib/payload'
import Link from 'next/link'


export default async function HomePage() {
  const siteSettings = await getSiteSettings()
  const articlesData = await getArticles()

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">{siteSettings.publicationName}</h1>
      <p className="text-gray-500 mb-8">{siteSettings.footerText}</p>

      <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
      <ul className="space-y-4">
        {articlesData.docs.map((article) => (
          <li key={article.id} className="border-b pb-4">
  <Link href={`/articles/${article.slug}`} className="hover:underline">
    <h3 className="text-lg font-medium">{article.title}</h3>
  </Link>
  <p className="text-gray-600">{article.excerpt}</p>
</li>
        ))}
      </ul>
    </main>
  )
}