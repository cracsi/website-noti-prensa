import Link from 'next/link'

interface CTAProps {
  text: string
  buttonLabel: string
  buttonUrl: string
}

export function CallToActionBlock({ text, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section className="bg-blue-600 text-white rounded-lg max-w-4xl mx-auto px-8 py-10 mb-12 text-center">
      <p className="text-lg mb-4">{text}</p>
      <Link
        href={buttonUrl}
        className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100"
      >
        {buttonLabel}
      </Link>
    </section>
  )
}