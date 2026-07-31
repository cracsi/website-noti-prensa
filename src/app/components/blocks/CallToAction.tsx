import Link from 'next/link'

interface CTAProps {
  text: string
  buttonLabel: string
  buttonUrl: string
}

export function CallToActionBlock({ text, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section className="bg-[#1c1f26] text-[#f5f2eb] rounded-xl max-w-4xl mx-auto px-8 py-12 mb-16 text-center">
  <p className="text-xl font-serif mb-6 max-w-xl mx-auto leading-relaxed">{text}</p>
  <Link
    href={buttonUrl}
    className="inline-block bg-[#a3231f] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#7f1b18] transition-colors"
  >
    {buttonLabel}
  </Link>
</section>
  )
}