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
    <section className="max-w-5xl mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const img = typeof card.image === 'object' ? card.image : null
          const content = (
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {img?.url && (
                <div className="relative w-full h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${img.url}`}
                    alt={img.alt || card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                {card.description && (
                  <p className="text-gray-600 text-sm">{card.description}</p>
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