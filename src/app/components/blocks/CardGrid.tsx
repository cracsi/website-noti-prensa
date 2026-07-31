import Image from 'next/image'
import Link from 'next/link'

interface Card {
  title: string
  description?: string | null
  image?: any
  link?: string | null
}

export function CardGridBlock({ cards }: { cards: Card[] }) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => {
          const img = typeof card.image === 'object' ? card.image : null
          const content = (
            <div className="group h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200">
              {img?.url && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${img.url}`}
                    alt={img.alt || card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-serif font-semibold text-lg mb-2 text-gray-900 group-hover:text-[#a3231f] transition-colors">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                )}
              </div>
            </div>
          )

          return card.link ? (
            <Link key={i} href={card.link}>
              {content}
            </Link>
          ) : (
            <div key={i}>{content}</div>
          )
        })}
      </div>
    </section>
  )
}