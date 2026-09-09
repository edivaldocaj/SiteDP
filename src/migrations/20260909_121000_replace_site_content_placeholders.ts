import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // The production bootstrapper deliberately executes literal SQL from this
  // migration. Each update preserves content already edited in the CMS.
  await db.execute(sql`
UPDATE site_content SET "compartilhados_logo_alt" = 'Deila Pinto Advocacia e Consultoria' WHERE "compartilhados_logo_alt" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_whatsapp_botao" = 'Fale no WhatsApp' WHERE "compartilhados_whatsapp_botao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_rodape_resumo" = 'Advocacia com propósito, técnica e sensibilidade para defender o que é seu por direito.' WHERE "compartilhados_rodape_resumo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_rodape_areas_titulo" = 'Áreas de atuação' WHERE "compartilhados_rodape_areas_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_rodape_institucional_titulo" = 'Institucional' WHERE "compartilhados_rodape_institucional_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_rodape_atendimento_titulo" = 'Atendimento' WHERE "compartilhados_rodape_atendimento_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_rodape_horario_titulo" = 'Horário de atendimento' WHERE "compartilhados_rodape_horario_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_cta_chapeu" = 'Contato' WHERE "compartilhados_cta_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_cta_titulo" = 'Vamos conversar sobre o seu direito?' WHERE "compartilhados_cta_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_cta_texto" = 'Atendimento online para todo o Brasil.' WHERE "compartilhados_cta_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "compartilhados_cta_botao" = 'Fale comigo no WhatsApp' WHERE "compartilhados_cta_botao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_chapeu" = 'Advocacia com propósito' WHERE "home_hero_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_linha1" = 'Orientação jurídica' WHERE "home_hero_linha1" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_linha2_antes" = 'com' WHERE "home_hero_linha2_antes" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_linha2_destaque" = 'clareza, atenção' WHERE "home_hero_linha2_destaque" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_linha3" = 'e responsabilidade' WHERE "home_hero_linha3" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_texto" = 'Atendimento em Direito Previdenciário, BPC/LOAS, Direito do Trabalho, Licitações e Contratos para organizar informações, orientar decisões e oferecer atendimento jurídico próximo e responsável.' WHERE "home_hero_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_hero_nota" = 'Atendimento humanizado e sigiloso' WHERE "home_hero_nota" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_areas_chapeu" = 'Áreas de atuação' WHERE "home_areas_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_areas_titulo" = 'Como posso te ajudar' WHERE "home_areas_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_banners_chapeu" = 'Atendimento por área' WHERE "home_banners_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_banners_titulo" = 'Caminhos de orientação' WHERE "home_banners_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_sobre_chapeu" = 'Quem vai atender você' WHERE "home_sobre_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_sobre_titulo" = 'Prazer, eu sou Deila Pinto' WHERE "home_sobre_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_sobre_botao" = 'Me conhecer melhor' WHERE "home_sobre_botao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_processo_chapeu" = 'Como funciona' WHERE "home_processo_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_processo_titulo" = 'Um atendimento em 3 passos' WHERE "home_processo_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_cta_chapeu" = 'Vamos conversar?' WHERE "home_cta_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_cta_titulo" = 'Inicie pelo caminho mais simples.' WHERE "home_cta_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_cta_texto" = 'O WhatsApp preserva o assunto escolhido e facilita a continuidade da conversa.' WHERE "home_cta_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "home_cta_botao" = 'Fale comigo no WhatsApp' WHERE "home_cta_botao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_hero_chapeu" = 'Sobre' WHERE "sobre_hero_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_hero_titulo" = 'Sobre' WHERE "sobre_hero_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_hero_texto" = 'Conheça a trajetória, os valores e o propósito que guiam cada atendimento.' WHERE "sobre_hero_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_bio_chapeu" = 'Quem é Deila Pinto' WHERE "sobre_bio_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_bio_titulo" = 'Advocacia com propósito, escuta e excelência.' WHERE "sobre_bio_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_bio_botao_secundario" = 'Agendar atendimento' WHERE "sobre_bio_botao_secundario" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_valores_chapeu" = 'Nossos valores' WHERE "sobre_valores_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_valores_titulo" = 'Princípios que orientam cada passo' WHERE "sobre_valores_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_processo_chapeu" = 'Nossa forma de atuar' WHERE "sobre_processo_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_processo_titulo" = 'Um atendimento próximo e estratégico' WHERE "sobre_processo_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_areas_chapeu" = 'Áreas de atuação' WHERE "sobre_areas_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_areas_titulo" = 'Atuação especializada com atenção aos detalhes' WHERE "sobre_areas_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_areas_botao" = 'Ver todas as áreas' WHERE "sobre_areas_botao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_cta_chapeu" = 'Contato' WHERE "sobre_cta_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_cta_titulo" = 'Vamos conversar sobre o seu caso?' WHERE "sobre_cta_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_cta_texto" = 'Atendimento online para todo o Brasil.' WHERE "sobre_cta_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "sobre_cta_botao" = 'Fale comigo no WhatsApp' WHERE "sobre_cta_botao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_hero_chapeu" = 'Vamos conversar?' WHERE "contato_hero_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_hero_titulo" = 'Contato' WHERE "contato_hero_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_hero_texto" = 'Estamos aqui para ouvir você e encontrar o melhor caminho para o seu caso.' WHERE "contato_hero_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_hero_nota" = 'Atendimento humanizado e sigiloso.' WHERE "contato_hero_nota" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_metodos_titulo" = 'Outras formas de contato' WHERE "contato_metodos_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_whatsapp_titulo" = 'Atendimento via WhatsApp' WHERE "contato_whatsapp_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_whatsapp_acao" = 'Iniciar conversa' WHERE "contato_whatsapp_acao" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_email_titulo" = 'E-mail' WHERE "contato_email_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_localizacao_titulo" = 'Localização' WHERE "contato_localizacao_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_localizacao_fallback" = 'Endereço confirmado pelo atendimento.' WHERE "contato_localizacao_fallback" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_horario_titulo" = 'Horário de atendimento' WHERE "contato_horario_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_horario_fallback" = 'Mediante agendamento.' WHERE "contato_horario_fallback" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_areas_chapeu" = 'Áreas' WHERE "contato_areas_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_areas_titulo" = 'Assuntos atendidos' WHERE "contato_areas_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_faq_chapeu" = 'Dúvidas frequentes' WHERE "contato_faq_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_faq_titulo" = 'Antes do primeiro contato' WHERE "contato_faq_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_seguranca_chapeu" = 'Segurança' WHERE "contato_seguranca_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "contato_seguranca_titulo" = 'Antes de enviar qualquer dado sensível.' WHERE "contato_seguranca_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_hero_chapeu" = 'Atendimento humanizado e especializado' WHERE "areas_hero_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_hero_titulo" = 'Áreas de atuação' WHERE "areas_hero_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_hero_texto" = 'Atuação jurídica com clareza, atenção e responsabilidade para proteger seus direitos e trazer tranquilidade.' WHERE "areas_hero_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_editorial_chapeu" = 'Atuação que faz a diferença' WHERE "areas_editorial_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_editorial_titulo" = 'Assessoria jurídica feita para entender você e o seu caso' WHERE "areas_editorial_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_editorial_texto" = 'Cada pessoa tem uma história e cada caso exige atenção aos detalhes. Por isso, a conversa inicial organiza informações e documentos antes de qualquer providência.' WHERE "areas_editorial_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_processo_chapeu" = 'Como funciona' WHERE "areas_processo_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_processo_titulo" = 'Um atendimento em 3 passos' WHERE "areas_processo_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_cta_chapeu" = 'Contato' WHERE "areas_cta_chapeu" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_cta_titulo" = 'Dê o primeiro passo para proteger seus direitos.' WHERE "areas_cta_titulo" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_cta_texto" = 'Atendimento online para todo o Brasil.' WHERE "areas_cta_texto" = 'Conteúdo editável pelo CMS';
UPDATE site_content SET "areas_cta_botao" = 'Fale comigo no WhatsApp' WHERE "areas_cta_botao" = 'Conteúdo editável pelo CMS';
  `)
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // This data correction intentionally has no destructive rollback.
}
