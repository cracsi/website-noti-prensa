import Image from 'next/image'

interface HeroBlockProps {
  heading: string
  subheading?: string | null
  image?: any
}

export function HeroBlock({ heading, subheading, image }: HeroBlockProps) {
  const img = typeof image === 'object' ? image : null

  return (
    <section
      className={`relative w-full h-[560px] flex items-end mb-16 overflow-hidden ${
        img?.url ? '' : 'bg-gradient-to-br from-gray-900 to-gray-700'
      }`}
    >
      {img?.url && (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${img.url}`}
            alt={img.alt || heading}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pb-16 text-white">
        <span className="inline-block text-xs uppercase tracking-widest font-semibold text-blue-400 mb-3">
          Featured
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 max-w-3xl">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{subheading}</p>
        )}
      </div>
    </section>
  )
}