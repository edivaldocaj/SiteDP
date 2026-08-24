import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'SiteConfig',
  access: {
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Configuracao',
  },
  fields: [
    {
      name: 'razaoSocial',
      label: 'Razao social',
      type: 'text',
      required: true,
    },
    {
      name: 'titular',
      label: 'Titular',
      type: 'text',
      required: true,
    },
    {
      name: 'oab',
      label: 'OAB',
      type: 'text',
      required: true,
    },
    {
      name: 'cnpj',
      label: 'CNPJ',
      type: 'text',
    },
    {
      name: 'endereco',
      label: 'Enderecos',
      type: 'array',
      fields: [
        {
          name: 'cidade',
          label: 'Cidade',
          type: 'text',
        },
        {
          name: 'uf',
          label: 'UF',
          type: 'text',
          maxLength: 2,
        },
        {
          name: 'logradouro',
          label: 'Logradouro',
          type: 'text',
        },
        {
          name: 'bairro',
          label: 'Bairro',
          type: 'text',
        },
        {
          name: 'cep',
          label: 'CEP',
          type: 'text',
        },
      ],
    },
    {
      name: 'telefoneWhatsapp',
      label: 'Telefone WhatsApp em E.164 sem +',
      type: 'text',
      required: true,
    },
    {
      name: 'telefoneFixo',
      label: 'Telefone fixo',
      type: 'text',
    },
    {
      name: 'emails',
      label: 'E-mails',
      type: 'array',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
    },
    {
      name: 'areasDeAtuacao',
      label: 'Areas de atuacao',
      type: 'array',
      fields: [
        {
          name: 'nome',
          label: 'Nome',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'horarioAtendimento',
      label: 'Horario de atendimento',
      type: 'text',
    },
    {
      name: 'textoConsentimento',
      label: 'Texto de consentimento',
      type: 'textarea',
      required: true,
    },
    {
      name: 'consentimentoVersao',
      label: 'Versao do consentimento',
      type: 'text',
      required: true,
    },
    {
      name: 'urgenciaTexto',
      label: 'Texto do atalho de urgencia',
      type: 'textarea',
      admin: {
        description: 'Texto exibido no atalho fixo para /ir/whatsapp?c=PREV-EXIGENCIA.',
      },
    },
    {
      name: 'avisoGolpeTexto',
      label: 'Texto do aviso de golpe',
      type: 'textarea',
      admin: {
        description:
          'Aviso sobre senhas do gov.br, Meu INSS, banco e codigos de SMS. Texto fornecido pelo escritorio.',
      },
    },
    {
      name: 'marca',
      label: 'Marca',
      type: 'group',
      fields: [
        {
          name: 'logo',
          label: 'Logo principal',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'logoClaro',
          label: 'Logo para fundo escuro',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
