import { RichText } from '../RichText'

export function RichTextBlockComponent({ content }: { content: any }) {
  return (
    <section className="max-w-3xl mx-auto px-4 mb-12">
      <RichText content={content} />
    </section>
  )
}