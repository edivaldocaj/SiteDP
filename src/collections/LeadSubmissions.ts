import type { CollectionConfig } from 'payload'

import { CAMPAIGN_CODE_REGEX } from '../lib/integration/constants'

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const LeadSubmissions: CollectionConfig = {
  slug: 'lead-submissions',
  labels: {
    singular: 'Submissao de lead',
    plural: 'Submissoes de lead',
  },
  admin: {
    defaultColumns: ['nome', 'telefone', 'origem', 'campanha', 'status', 'tentativas'],
    group: 'Integracao',
    useAsTitle: 'telefone',
  },
  access: {
    create: () => false,
    delete: () => false,
    read: adminOnly,
    update: adminOnly,
  },
  fields: [
    {
      name: 'idempotencia',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'enviadoEm',
      type: 'date',
      required: true,
    },
    {
      name: 'escritorio',
      type: 'select',
      options: [{ label: 'DP', value: 'DP' }],
      required: true,
    },
    {
      name: 'telefone',
      type: 'text',
      required: true,
      validate: (value: unknown) =>
        typeof value === 'string' && /^\d{10,15}$/.test(value)
          ? true
          : 'Informe o telefone em E.164 sem +.',
    },
    {
      name: 'nome',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'campanha',
      type: 'text',
      validate: (value: unknown) => {
        if (!value) return true
        return typeof value === 'string' && CAMPAIGN_CODE_REGEX.test(value)
          ? true
          : 'Use o formato do contrato, como PREV-BPC.'
      },
    },
    {
      name: 'origem',
      type: 'select',
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'Contato', value: 'contato' },
        { label: 'Calculadora', value: 'calculadora' },
      ],
      required: true,
    },
    {
      name: 'utm',
      type: 'group',
      fields: [
        { name: 'source', type: 'text' },
        { name: 'medium', type: 'text' },
        { name: 'campaign', type: 'text' },
        { name: 'content', type: 'text' },
        { name: 'term', type: 'text' },
      ],
    },
    {
      name: 'referrer',
      type: 'text',
    },
    {
      name: 'respostas',
      type: 'array',
      fields: [
        { name: 'pergunta', type: 'text', required: true },
        { name: 'resposta', type: 'textarea', required: true },
      ],
    },
    {
      name: 'consentAceito',
      type: 'checkbox',
    },
    {
      name: 'consentVersao',
      type: 'text',
    },
    {
      name: 'consentEm',
      type: 'date',
    },
    {
      name: 'consentIp',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pendente',
      options: [
        { label: 'Pendente', value: 'pendente' },
        { label: 'Entregue', value: 'entregue' },
        { label: 'Rejeitada', value: 'rejeitada' },
        { label: 'Falha', value: 'falha' },
      ],
      required: true,
    },
    {
      name: 'tentativas',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'ultimoErro',
      type: 'textarea',
    },
    {
      name: 'leadIdCrm',
      type: 'text',
    },
    {
      name: 'capturaParcial',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Registro criado pela etapa 1 do formulario, antes do consentimento.',
      },
    },
  ],
}
