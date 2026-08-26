import type { BrandIconName } from '@/components/BrandIcons'

export type AreaSlug =
  | 'bpc-loas'
  | 'direito-do-trabalho'
  | 'direito-previdenciario'
  | 'licitacoes-e-contratos'

export type AreaSummary = {
  description: string
  href: string
  icon: BrandIconName
  shortTitle: string
  title: string
}

export const areaSummaries: AreaSummary[] = [
  {
    description: 'Aposentadorias, auxílios, pensões, revisões e benefícios por incapacidade.',
    href: '/areas-de-atuacao/direito-previdenciario',
    icon: 'protection',
    shortTitle: 'Previdenciário',
    title: 'Direito Previdenciário',
  },
  {
    description:
      'Benefício de Prestação Continuada para idosos, pessoas com deficiência e famílias em situação de vulnerabilidade.',
    href: '/areas-de-atuacao/bpc-loas',
    icon: 'bpc',
    shortTitle: 'BPC/LOAS',
    title: 'BPC/LOAS',
  },
  {
    description:
      'Rescisão, jornada, verbas trabalhistas, justa causa, assédio, acidentes e demais direitos do trabalhador.',
    href: '/areas-de-atuacao/direito-do-trabalho',
    icon: 'briefcase',
    shortTitle: 'Trabalho',
    title: 'Direito do Trabalho',
  },
  {
    description:
      'Assessoria em licitações, análise de editais, recursos, impugnações, habilitação e contratos administrativos.',
    href: '/areas-de-atuacao/licitacoes-e-contratos',
    icon: 'contract',
    shortTitle: 'Licitações',
    title: 'Licitações e Contratos',
  },
]

export const homeSteps = [
  {
    description: 'Você entra em contato pelo WhatsApp e conta brevemente o seu caso.',
    title: 'Fale comigo',
  },
  {
    description:
      'As informações são analisadas com atenção para compreender a situação e os caminhos possíveis.',
    title: 'Análise do seu caso',
  },
  {
    description: 'São explicadas as possibilidades e as providências adequadas ao caso.',
    title: 'Orientação e próximos passos',
  },
]

export const institutionalSteps = [
  {
    description: 'Você conta sua história. Nós ouvimos com atenção e respeito.',
    title: 'Acolhimento',
  },
  {
    description: 'A situação é estudada com profundidade para identificar caminhos possíveis.',
    title: 'Análise e estratégia',
  },
  {
    description: 'A documentação e as próximas etapas são organizadas com clareza.',
    title: 'Planejamento',
  },
  {
    description: 'O andamento é acompanhado e explicado durante cada fase.',
    title: 'Acompanhamento',
  },
]

export const values = [
  {
    description: 'Explicação em linguagem simples para que cada etapa seja compreendida.',
    icon: 'document' as BrandIconName,
    title: 'Clareza',
  },
  {
    description: 'Escuta atenta para entender a realidade apresentada no primeiro contato.',
    icon: 'assistance' as BrandIconName,
    title: 'Acolhimento',
  },
  {
    description: 'Atuação com estudo, método e atenção aos documentos do caso.',
    icon: 'search' as BrandIconName,
    title: 'Técnica',
  },
  {
    description: 'Responsabilidade na orientação e no acompanhamento das providências.',
    icon: 'checklist' as BrandIconName,
    title: 'Compromisso',
  },
]

export const blogCategories = ['Previdenciário', 'BPC/LOAS', 'Direito do Trabalho', 'Licitações e Contratos']
