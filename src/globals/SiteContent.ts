import type { Field, GlobalConfig } from 'payload'

const text = (name: string, label: string, required = true): Field => ({ name, label, type: 'text', required })
const copy = (name: string, label: string, required = true): Field => ({ name, label, type: 'textarea', required })
const image = (name: string, label: string): Field => ({ name, label, type: 'upload', relationTo: 'media' })
const cards = (name: string, label: string, withLink = false): Field => ({
  name, label, type: 'array', fields: [
    text('titulo', 'Título'), copy('descricao', 'Descrição'),
    { name: 'icone', label: 'Ícone', type: 'text', admin: { description: 'Nome do ícone da identidade visual (ex.: protection, document, checklist).' } },
    ...(withLink ? [text('link', 'Link')] : []),
  ],
})
const steps = (name: string, label: string): Field => ({ name, label, type: 'array', fields: [text('titulo', 'Título'), copy('descricao', 'Descrição')] })
const faq = (name = 'faq'): Field => ({ name, label: 'Dúvidas frequentes', type: 'array', fields: [text('pergunta', 'Pergunta'), copy('resposta', 'Resposta')] })
const cta = (name = 'cta'): Field => ({ name, label: 'Chamada final', type: 'group', fields: [text('chapeu', 'Chapéu'), text('titulo', 'Título'), copy('texto', 'Texto'), text('botao', 'Texto do botão')] })

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Conteúdo do site',
  access: { read: () => true },
  admin: { group: 'Conteúdo' },
  fields: [{
    name: 'seedAplicado', type: 'checkbox', defaultValue: false, admin: { hidden: true },
  }, {
    type: 'tabs', tabs: [
      { label: 'Compartilhados', fields: [{ name: 'compartilhados', type: 'group', fields: [
        text('logoAlt', 'Texto alternativo do logo'), text('whatsappBotao', 'Texto padrão do WhatsApp'),
        { name: 'menu', label: 'Menu principal', type: 'array', fields: [text('rotulo', 'Rótulo'), text('link', 'Link'), { name: 'mostrarAreas', label: 'Mostrar submenu de áreas', type: 'checkbox' }] },
        text('rodapeResumo', 'Resumo do rodapé'), text('rodapeAreasTitulo', 'Título da coluna de áreas'), text('rodapeInstitucionalTitulo', 'Título da coluna institucional'),
        text('rodapeAtendimentoTitulo', 'Título da coluna de atendimento'), text('rodapeHorarioTitulo', 'Título da coluna de horário'),
        { name: 'rodapeLocais', label: 'Locais de atendimento', type: 'array', fields: [text('texto', 'Texto')] }, cta(),
      ] }] },
      { label: 'Home', fields: [{ name: 'home', type: 'group', fields: [
        text('heroChapeu', 'Chapéu do destaque'), text('heroLinha1', 'Título — linha 1'), text('heroLinha2Antes', 'Título — linha 2 (antes do destaque)'), text('heroLinha2Destaque', 'Título — destaque'), text('heroLinha3', 'Título — linha 3'), copy('heroTexto', 'Texto do destaque'), text('heroNota', 'Nota junto ao botão'), image('heroImagem', 'Imagem do destaque'),
        text('areasChapeu', 'Áreas — chapéu'), text('areasTitulo', 'Áreas — título'), text('bannersChapeu', 'Atendimento por área — chapéu'), text('bannersTitulo', 'Atendimento por área — título'),
        text('sobreChapeu', 'Sobre — chapéu'), text('sobreTitulo', 'Sobre — título'), { name: 'sobreParagrafos', label: 'Sobre — parágrafos', type: 'array', fields: [copy('texto', 'Texto')] }, text('sobreBotao', 'Sobre — botão'), image('sobreImagem', 'Sobre — imagem'),
        text('processoChapeu', 'Processo — chapéu'), text('processoTitulo', 'Processo — título'), steps('processoEtapas', 'Processo — etapas'), cta(),
      ] }] },
      { label: 'Sobre', fields: [{ name: 'sobre', type: 'group', fields: [
        text('heroChapeu', 'Destaque — chapéu'), text('heroTitulo', 'Destaque — título'), copy('heroTexto', 'Destaque — texto'), image('heroImagem', 'Destaque — imagem'),
        text('bioChapeu', 'Biografia — chapéu'), text('bioTitulo', 'Biografia — título'), { name: 'bioParagrafos', label: 'Biografia — parágrafos', type: 'array', fields: [copy('texto', 'Texto')] }, image('bioImagem', 'Biografia — imagem'), text('bioBotaoSecundario', 'Botão de contato'),
        text('valoresChapeu', 'Valores — chapéu'), text('valoresTitulo', 'Valores — título'), cards('valores', 'Valores'),
        text('processoChapeu', 'Forma de atuar — chapéu'), text('processoTitulo', 'Forma de atuar — título'), steps('processoEtapas', 'Forma de atuar — etapas'),
        text('areasChapeu', 'Áreas — chapéu'), text('areasTitulo', 'Áreas — título'), text('areasBotao', 'Áreas — botão'), cta(),
      ] }] },
      { label: 'Contato', fields: [{ name: 'contato', type: 'group', fields: [
        text('heroChapeu', 'Destaque — chapéu'), text('heroTitulo', 'Destaque — título'), copy('heroTexto', 'Destaque — texto'), text('heroNota', 'Nota junto ao botão'), image('heroImagem', 'Destaque — imagem'),
        text('metodosTitulo', 'Outras formas de contato — título'), text('whatsappTitulo', 'WhatsApp — título'), text('whatsappAcao', 'WhatsApp — ação'), text('emailTitulo', 'E-mail — título'), text('localizacaoTitulo', 'Localização — título'), text('localizacaoFallback', 'Localização — texto alternativo'), text('horarioTitulo', 'Horário — título'), text('horarioFallback', 'Horário — texto alternativo'),
        text('areasChapeu', 'Assuntos — chapéu'), text('areasTitulo', 'Assuntos — título'), text('faqChapeu', 'FAQ — chapéu'), text('faqTitulo', 'FAQ — título'), faq(), text('segurancaChapeu', 'Segurança — chapéu'), text('segurancaTitulo', 'Segurança — título'),
      ] }] },
      { label: 'Áreas de atuação', fields: [
        { name: 'areas', label: 'Página de áreas', type: 'group', fields: [text('heroChapeu', 'Destaque — chapéu'), text('heroTitulo', 'Destaque — título'), copy('heroTexto', 'Destaque — texto'), image('heroImagem', 'Destaque — imagem'), text('editorialChapeu', 'Apresentação — chapéu'), text('editorialTitulo', 'Apresentação — título'), copy('editorialTexto', 'Apresentação — texto'), image('editorialImagem', 'Apresentação — imagem'), { name: 'destaques', label: 'Destaques', type: 'array', fields: [text('texto', 'Texto'), text('icone', 'Ícone')] }, text('processoChapeu', 'Processo — chapéu'), text('processoTitulo', 'Processo — título'), steps('processoEtapas', 'Processo — etapas'), cta()] },
        { name: 'paginasArea', label: 'Páginas de cada área', type: 'array', fields: [
          { name: 'slug', label: 'Página', type: 'select', required: true, unique: true, options: [{ label: 'Direito Previdenciário', value: 'direito-previdenciario' }, { label: 'BPC/LOAS', value: 'bpc-loas' }, { label: 'Direito do Trabalho', value: 'direito-do-trabalho' }, { label: 'Licitações e Contratos', value: 'licitacoes-e-contratos' }] },
          text('titulo', 'Título'), text('tituloDestaque', 'Trecho destacado', false), text('chapeu', 'Chapéu'), copy('descricao', 'Descrição'), text('icone', 'Ícone'), text('notaHero', 'Nota junto ao botão'),
          text('servicosChapeu', 'Serviços — chapéu'), text('servicosTitulo', 'Serviços — título'), cards('servicos', 'Serviços'), text('publicoTitulo', 'Público — título', false), cards('publicos', 'Públicos'),
          text('processoChapeu', 'Processo — chapéu'), text('processoTitulo', 'Processo — título'), steps('processoEtapas', 'Processo — etapas'), text('extrasChapeu', 'Extras — chapéu', false), text('extrasTitulo', 'Extras — título', false), cards('extras', 'Extras'),
          text('faqChapeu', 'FAQ — chapéu'), text('faqTitulo', 'FAQ — título'), faq(), cta(),
          { name: 'situacoes', label: 'Situações atendidas', type: 'array', fields: [text('texto', 'Texto')] }, text('documentosTitulo', 'Documentos — título', false), { name: 'documentos', label: 'Documentos', type: 'array', fields: [text('texto', 'Texto')] },
        ] },
      ] },
    ],
  }],
}
