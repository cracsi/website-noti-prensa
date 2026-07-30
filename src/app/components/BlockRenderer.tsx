import { HeroBlock } from './blocks/Hero'
import { RichTextBlockComponent } from './blocks/RichTextBlock'
import { CallToActionBlock } from './blocks/CallToAction'
import { CardGridBlock } from './blocks/CardGrid'

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <HeroBlock
                key={i}
                heading={block.heading}
                subheading={block.subheading}
                image={block.image}
              />
            )
          case 'richText':
            return <RichTextBlockComponent key={i} content={block.content} />
          case 'cta':
            return (
              <CallToActionBlock
                key={i}
                text={block.text}
                buttonLabel={block.buttonLabel}
                buttonUrl={block.buttonUrl}
              />
            )
          case 'cardGrid':
            return <CardGridBlock key={i} cards={block.cards} />
          default:
            // Unknown block type — fail gracefully, don't crash the page
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </>
  )
}