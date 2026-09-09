import type { CollectionConfig } from 'payload'

function normalizeSlug(value: string) {
  return value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Artigo', plural: 'Artigos' },
  admin: { defaultColumns: ['title', 'category', 'publishedAt', 'status'], group: 'Conteudo', useAsTitle: 'title' },
  access: { read: ({ req }) => (req.user ? true : { status: { equals: 'published' } }) },
  hooks: { beforeValidate: [({ data }) => {
    if (!data) return data
    if (typeof data.slug === 'string') data.slug = normalizeSlug(data.slug)
    if (data.status === 'published') {
      if (!data.publishedAt) throw new Error('Publicar artigo exige uma data de publicação.')
      if (!data.body) throw new Error('Publicar artigo exige conteúdo.')
    }
    return data
  }] },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true },
    { name: 'category', label: 'Categoria', type: 'text', required: true },
    { name: 'excerpt', label: 'Resumo', type: 'textarea', required: true },
    { name: 'author', label: 'Autoria', type: 'text', required: true },
    { name: 'publishedAt', label: 'Data de publicação', type: 'date' },
    { name: 'readingTime', label: 'Tempo de leitura', type: 'text' },
    { name: 'coverImage', label: 'Imagem de capa', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'image/' } } },
    { name: 'body', label: 'Conteúdo', type: 'richText' },
    { name: 'status', label: 'Status', type: 'select', defaultValue: 'draft', required: true, options: [{ label: 'Rascunho', value: 'draft' }, { label: 'Publicado', value: 'published' }] },
  ],
}
