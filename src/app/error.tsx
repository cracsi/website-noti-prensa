'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold mb-3 text-gray-900">Something went wrong</h1>
      <p className="text-gray-500 mb-6">
        We couldn't load this content right now. This is usually temporary — please try again shortly.
      </p>
      <button
        onClick={() => reset()}
        className="inline-block bg-gray-900 text-white font-medium px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        Try again
      </button>
    </main>
  )
}