import type { BrandIconName } from '@/components/BrandIcons'

export type DetailCard = {
  description: string
  icon: BrandIconName
  title: string
}

export type Faq = {
  answer: string
  question: string
}

export const previdenciarioServices: DetailCard[] = [
  {
    description: 'Planejamento e orientação sobre aposentadoria por idade urbana ou rural.',
    icon: 'area',
    title: 'Aposentadoria por idade',
  },
  {
    description: 'Orientação para situações em que a incapacidade impede o trabalho.',
    icon: 'bpc',
    title: 'Aposentadoria por incapacidade permanente',
  },
  {
    description: 'Apoio na organização de pedido de benefício por incapacidade temporária.',
    icon: 'accident',
    title: 'Benefício por incapacidade temporária',
  },
  {
    description: 'Orientação para dependentes em momento delicado.',
    icon: 'pension',
    title: 'Pensão por morte',
  },
  {
    description: 'Análise de documentos para avaliar possíveis correções.',
    icon: 'review',
    title: 'Revisão de benefício',
  },
  {
    description: 'Estratégia personalizada para organizar histórico, contribuições e documentos.',
    icon: 'calendar',
    title: 'Planejamento previdenciário',
  },
]

export const bpcCards: DetailCard[] = [
  {
    description: 'Renda familiar, composição do grupo familiar e documentação inicial.',
    icon: 'checklist',
    title: 'Requisitos',
  },
  {
    description: 'Documentos pessoais, comprovantes, laudos e dados socioeconômicos.',
    icon: 'document',
    title: 'Documentos',
  },
  {
    description: 'Estudo do contexto apresentado para identificar os próximos passos.',
    icon: 'search',
    title: 'Análise do caso',
  },
  {
    description: 'Acompanhamento próximo e linguagem clara em todas as etapas.',
    icon: 'assistance',
    title: 'Atendimento humanizado',
  },
]

export const bpcAudience: DetailCard[] = [
  {
    description: 'Quem tem 65 anos ou mais e vive em situação de vulnerabilidade econômica.',
    icon: 'area',
    title: 'Pessoa idosa',
  },
  {
    description: 'Pessoa com deficiência que precisa organizar documentos médicos e sociais.',
    icon: 'bpc',
    title: 'Pessoa com deficiência',
  },
]

export const trabalhoServices: DetailCard[] = [
  {
    description: 'Análise completa da rescisão e das verbas indicadas nos documentos.',
    icon: 'contract',
    title: 'Rescisão de contrato',
  },
  {
    description: 'Conferência de férias, 13º salário, horas extras, adicionais e outras verbas.',
    icon: 'document',
    title: 'Verbas trabalhistas',
  },
  {
    description: 'Horas extras, banco de horas, intervalos e controle de jornada.',
    icon: 'clock',
    title: 'Jornada de trabalho',
  },
  {
    description: 'Análise de dispensa por justa causa e documentos relacionados.',
    icon: 'protection',
    title: 'Justa causa',
  },
  {
    description: 'Orientação sobre situações de assédio no ambiente de trabalho.',
    icon: 'hearing',
    title: 'Assédio moral e sexual',
  },
  {
    description: 'Acidentes, afastamentos e documentos ligados ao trabalho.',
    icon: 'accident',
    title: 'Acidente de trabalho',
  },
  {
    description: 'Verificação de funções, salários e documentos comparáveis.',
    icon: 'work',
    title: 'Equiparação salarial',
  },
  {
    description: 'Outras situações que surgem na rotina profissional.',
    icon: 'briefcase',
    title: 'Outras demandas',
  },
]

export const licitacoesServices: DetailCard[] = [
  {
    description: 'Análise jurídica de editais, anexos, requisitos e riscos.',
    icon: 'document',
    title: 'Análise de Editais',
  },
  {
    description: 'Elaboração e análise de impugnações e recursos administrativos.',
    icon: 'appeal',
    title: 'Impugnações e Recursos',
  },
  {
    description: 'Orientação sobre documentação e requisitos de habilitação.',
    icon: 'checklist',
    title: 'Habilitação e Documentos',
  },
  {
    description: 'Análise, elaboração e revisão de contratos, aditivos e instrumentos correlatos.',
    icon: 'contract',
    title: 'Contratos Administrativos',
  },
]

export const licitacoesShortServices: DetailCard[] = [
  { description: 'Estudo técnico-jurídico do edital e anexos.', icon: 'document', title: 'Análise de editais' },
  { description: 'Interposição de recursos administrativos.', icon: 'appeal', title: 'Recursos administrativos' },
  { description: 'Impugnação de editais e questionamentos legais.', icon: 'impugnation', title: 'Impugnações' },
  { description: 'Organização e conferência de documentação.', icon: 'checklist', title: 'Habilitação' },
  { description: 'Elaboração, revisão e gestão contratual.', icon: 'contract', title: 'Contratos e aditivos' },
]

export const previdenciarioFaq: Faq[] = [
  {
    answer: 'A análise depende de idade, histórico de trabalho, contribuições e documentos disponíveis.',
    question: 'Quem pode pedir aposentadoria por idade?',
  },
  {
    answer: 'Documentos médicos, vínculos de trabalho, contribuições e datas ajudam na avaliação inicial.',
    question: 'Como saber se tenho direito a benefício por incapacidade?',
  },
  {
    answer: 'O prazo varia conforme o pedido, os documentos e a resposta do órgão responsável.',
    question: 'Quanto tempo demora para sair um benefício?',
  },
]

export const bpcFaq: Faq[] = [
  {
    answer: 'É um benefício assistencial voltado a idosos e pessoas com deficiência em situação de vulnerabilidade.',
    question: 'O que é o BPC/LOAS?',
  },
  {
    answer: 'O BPC/LOAS não exige contribuição prévia ao INSS, mas exige análise de requisitos próprios.',
    question: 'Preciso contribuir para o INSS?',
  },
  {
    answer: 'Documentos pessoais, CadÚnico, comprovantes de renda, laudos e relatórios podem ser necessários.',
    question: 'Quais documentos ajudam no primeiro contato?',
  },
]

export const trabalhoFaq: Faq[] = [
  {
    answer: 'Holerites, ponto, mensagens, contrato, carteira de trabalho e termo de rescisão ajudam na análise.',
    question: 'Quais documentos podem ser necessários?',
  },
  {
    answer: 'A análise depende do motivo indicado, documentos da empresa e situação concreta apresentada.',
    question: 'Fui demitido por justa causa, posso procurar orientação?',
  },
  {
    answer: 'Datas são importantes em assuntos trabalhistas, por isso o ideal é organizar os documentos cedo.',
    question: 'Existe prazo para tratar de uma demanda trabalhista?',
  },
]

export const licitacoesFaq: Faq[] = [
  {
    answer: 'O atendimento pode envolver empresas, profissionais e também dúvidas ligadas a órgãos públicos.',
    question: 'A atuação é apenas para empresas?',
  },
  {
    answer: 'Edital, anexos, atas, decisões, mensagens oficiais e documentos de habilitação ajudam na análise.',
    question: 'Quais documentos devo separar?',
  },
  {
    answer: 'Pode ser avaliada a existência de providências administrativas cabíveis conforme o caso.',
    question: 'É possível questionar um edital?',
  },
]
