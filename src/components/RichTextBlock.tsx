import React from 'react'

import { getPublicText } from '@/lib/siteConfig'
import { richTextToPlainText } from '@/lib/richText'

export function RichTextBlock({ value }: { value: unknown }) {
  const text = getPublicText(richTextToPlainText(value))

  if (!text) return null

  return <p>{text}</p>
}
