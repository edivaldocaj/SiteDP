import React from 'react'
import { notFound } from 'next/navigation'
import { AreaPageTemplate } from '@/components/AreaPageTemplate'
import { getAreaPageProps } from '@/lib/getAreaPage'
export default async function Page() { const props = await getAreaPageProps('direito-previdenciario'); if (!props) notFound(); return <AreaPageTemplate {...props} /> }
