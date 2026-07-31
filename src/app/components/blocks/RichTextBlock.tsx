import { RichText } from '../RichText'

export function RichTextBlockComponent({ content }: { content: any }) {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 mb-16">
      <div className="prose prose-lg prose-gray">
        <RichText content={content} />
      </div>
    </section>
  )
}