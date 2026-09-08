import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'
import { hasRenderableRichText } from '@/lib/richText'

export function CampaignRichText({ value }: { value: unknown }) {
  if (!hasRenderableRichText(value)) return null
  return <RichText className="campaign-rich-text" data={value as ComponentProps<typeof RichText>['data']} />
}
