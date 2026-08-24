type RichTextNode = {
  children?: RichTextNode[]
  text?: string
}

function collectText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''

  const current = node as RichTextNode
  const ownText = typeof current.text === 'string' ? current.text : ''
  const childText = Array.isArray(current.children)
    ? current.children.map((child) => collectText(child)).join(' ')
    : ''

  return `${ownText} ${childText}`.trim()
}

export function richTextToPlainText(value: unknown) {
  return collectText(value).replace(/\s+/g, ' ').trim()
}

export function isRenderableText(value?: string | null) {
  return Boolean(value && value.trim() && value.trim() !== '[A FORNECER]')
}

export function hasRenderableRichText(value: unknown) {
  const text = richTextToPlainText(value)
  return isRenderableText(text)
}
