import { getPageBySlug } from './lib/payload'
import { BlockRenderer } from './components/BlockRenderer'

export default async function HomePage() {
  const page = await getPageBySlug('home')

  if (!page) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Home page content not found. Please publish a Page with slug "home" in Payload.</p>
      </main>
    )
  }

  return (
    <main>
      <BlockRenderer blocks={page.layout || []} />
    </main>
  )
}