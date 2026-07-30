interface LexicalNode {
  type: string
  text?: string
  format?: number
  children?: LexicalNode[]
  tag?: string
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (node.type === 'text') {
    let text: React.ReactNode = node.text
    if (node.format && node.format & 1) text = <strong key={index}>{text}</strong>
    if (node.format && node.format & 2) text = <em key={index}>{text}</em>
    return <span key={index}>{text}</span>
  }

  if (node.type === 'paragraph') {
    return (
      <p key={index} className="mb-4">
        {node.children?.map((child, i) => renderNode(child, i))}
      </p>
    )
  }

  // Fallback: render children if we don't recognize the node type
  if (node.children) {
    return (
      <div key={index}>
        {node.children.map((child, i) => renderNode(child, i))}
      </div>
    )
  }

  return null
}

export function RichText({ content }: { content: any }) {
  if (!content?.root?.children) return null

  return (
    <div className="prose max-w-none">
      {content.root.children.map((node: LexicalNode, i: number) => renderNode(node, i))}
    </div>
  )
}