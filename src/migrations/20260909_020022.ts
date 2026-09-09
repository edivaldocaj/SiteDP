import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_campaigns_categoria" AS ENUM('previdenciario', 'assistencial', 'trabalhista', 'licitacoes');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_content_paginas_area_slug" AS ENUM('direito-previdenciario', 'bpc-loas', 'direito-do-trabalho', 'licitacoes-e-contratos');
  CREATE TABLE "campaigns_apresentacao_etapas_contato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"reading_time" varchar,
  	"cover_image_id" integer,
  	"body" jsonb,
  	"status" "enum_articles_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_content_compartilhados_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"mostrar_areas" boolean
  );
  
  CREATE TABLE "site_content_compartilhados_rodape_locais" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_home_sobre_paragrafos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_home_processo_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_sobre_bio_paragrafos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_sobre_valores" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"icone" varchar
  );
  
  CREATE TABLE "site_content_sobre_processo_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_contato_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar NOT NULL,
  	"resposta" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_areas_destaques" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"icone" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_areas_processo_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_paginas_area_servicos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"icone" varchar
  );
  
  CREATE TABLE "site_content_paginas_area_publicos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"icone" varchar
  );
  
  CREATE TABLE "site_content_paginas_area_processo_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_paginas_area_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"icone" varchar
  );
  
  CREATE TABLE "site_content_paginas_area_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar NOT NULL,
  	"resposta" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_paginas_area_situacoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_paginas_area_documentos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_paginas_area" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" "enum_site_content_paginas_area_slug" NOT NULL,
  	"titulo" varchar NOT NULL,
  	"titulo_destaque" varchar,
  	"chapeu" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"icone" varchar NOT NULL,
  	"nota_hero" varchar NOT NULL,
  	"servicos_chapeu" varchar NOT NULL,
  	"servicos_titulo" varchar NOT NULL,
  	"publico_titulo" varchar,
  	"processo_chapeu" varchar NOT NULL,
  	"processo_titulo" varchar NOT NULL,
  	"extras_chapeu" varchar,
  	"extras_titulo" varchar,
  	"faq_chapeu" varchar NOT NULL,
  	"faq_titulo" varchar NOT NULL,
  	"cta_chapeu" varchar NOT NULL,
  	"cta_titulo" varchar NOT NULL,
  	"cta_texto" varchar NOT NULL,
  	"cta_botao" varchar NOT NULL,
  	"documentos_titulo" varchar
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seed_aplicado" boolean DEFAULT false,
  	"compartilhados_logo_alt" varchar NOT NULL,
  	"compartilhados_whatsapp_botao" varchar NOT NULL,
  	"compartilhados_rodape_resumo" varchar NOT NULL,
  	"compartilhados_rodape_areas_titulo" varchar NOT NULL,
  	"compartilhados_rodape_institucional_titulo" varchar NOT NULL,
  	"compartilhados_rodape_atendimento_titulo" varchar NOT NULL,
  	"compartilhados_rodape_horario_titulo" varchar NOT NULL,
  	"compartilhados_cta_chapeu" varchar NOT NULL,
  	"compartilhados_cta_titulo" varchar NOT NULL,
  	"compartilhados_cta_texto" varchar NOT NULL,
  	"compartilhados_cta_botao" varchar NOT NULL,
  	"home_hero_chapeu" varchar NOT NULL,
  	"home_hero_linha1" varchar NOT NULL,
  	"home_hero_linha2_antes" varchar NOT NULL,
  	"home_hero_linha2_destaque" varchar NOT NULL,
  	"home_hero_linha3" varchar NOT NULL,
  	"home_hero_texto" varchar NOT NULL,
  	"home_hero_nota" varchar NOT NULL,
  	"home_hero_imagem_id" integer,
  	"home_areas_chapeu" varchar NOT NULL,
  	"home_areas_titulo" varchar NOT NULL,
  	"home_banners_chapeu" varchar NOT NULL,
  	"home_banners_titulo" varchar NOT NULL,
  	"home_sobre_chapeu" varchar NOT NULL,
  	"home_sobre_titulo" varchar NOT NULL,
  	"home_sobre_botao" varchar NOT NULL,
  	"home_sobre_imagem_id" integer,
  	"home_processo_chapeu" varchar NOT NULL,
  	"home_processo_titulo" varchar NOT NULL,
  	"home_cta_chapeu" varchar NOT NULL,
  	"home_cta_titulo" varchar NOT NULL,
  	"home_cta_texto" varchar NOT NULL,
  	"home_cta_botao" varchar NOT NULL,
  	"sobre_hero_chapeu" varchar NOT NULL,
  	"sobre_hero_titulo" varchar NOT NULL,
  	"sobre_hero_texto" varchar NOT NULL,
  	"sobre_hero_imagem_id" integer,
  	"sobre_bio_chapeu" varchar NOT NULL,
  	"sobre_bio_titulo" varchar NOT NULL,
  	"sobre_bio_imagem_id" integer,
  	"sobre_bio_botao_secundario" varchar NOT NULL,
  	"sobre_valores_chapeu" varchar NOT NULL,
  	"sobre_valores_titulo" varchar NOT NULL,
  	"sobre_processo_chapeu" varchar NOT NULL,
  	"sobre_processo_titulo" varchar NOT NULL,
  	"sobre_areas_chapeu" varchar NOT NULL,
  	"sobre_areas_titulo" varchar NOT NULL,
  	"sobre_areas_botao" varchar NOT NULL,
  	"sobre_cta_chapeu" varchar NOT NULL,
  	"sobre_cta_titulo" varchar NOT NULL,
  	"sobre_cta_texto" varchar NOT NULL,
  	"sobre_cta_botao" varchar NOT NULL,
  	"contato_hero_chapeu" varchar NOT NULL,
  	"contato_hero_titulo" varchar NOT NULL,
  	"contato_hero_texto" varchar NOT NULL,
  	"contato_hero_nota" varchar NOT NULL,
  	"contato_hero_imagem_id" integer,
  	"contato_metodos_titulo" varchar NOT NULL,
  	"contato_whatsapp_titulo" varchar NOT NULL,
  	"contato_whatsapp_acao" varchar NOT NULL,
  	"contato_email_titulo" varchar NOT NULL,
  	"contato_localizacao_titulo" varchar NOT NULL,
  	"contato_localizacao_fallback" varchar NOT NULL,
  	"contato_horario_titulo" varchar NOT NULL,
  	"contato_horario_fallback" varchar NOT NULL,
  	"contato_areas_chapeu" varchar NOT NULL,
  	"contato_areas_titulo" varchar NOT NULL,
  	"contato_faq_chapeu" varchar NOT NULL,
  	"contato_faq_titulo" varchar NOT NULL,
  	"contato_seguranca_chapeu" varchar NOT NULL,
  	"contato_seguranca_titulo" varchar NOT NULL,
  	"areas_hero_chapeu" varchar NOT NULL,
  	"areas_hero_titulo" varchar NOT NULL,
  	"areas_hero_texto" varchar NOT NULL,
  	"areas_hero_imagem_id" integer,
  	"areas_editorial_chapeu" varchar NOT NULL,
  	"areas_editorial_titulo" varchar NOT NULL,
  	"areas_editorial_texto" varchar NOT NULL,
  	"areas_editorial_imagem_id" integer,
  	"areas_processo_chapeu" varchar NOT NULL,
  	"areas_processo_titulo" varchar NOT NULL,
  	"areas_cta_chapeu" varchar NOT NULL,
  	"areas_cta_titulo" varchar NOT NULL,
  	"areas_cta_texto" varchar NOT NULL,
  	"areas_cta_botao" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "campaigns" ADD COLUMN "categoria" "enum_campaigns_categoria" DEFAULT 'previdenciario' NOT NULL;
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_bloco_dor_titulo" varchar DEFAULT 'Entenda a situação';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_bloco_prova_titulo" varchar DEFAULT 'O que ajuda na análise';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_bloco_orientacao_titulo" varchar DEFAULT 'Como podemos orientar';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_video_eyebrow" varchar DEFAULT 'Conteúdo da campanha';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_video_titulo" varchar DEFAULT 'Uma explicação rápida para começar';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_video_descricao" varchar DEFAULT 'Veja a explicação e anote suas dúvidas para conversar com a equipe.';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_faq_eyebrow" varchar DEFAULT 'Dúvidas comuns';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_faq_titulo" varchar DEFAULT 'Perguntas frequentes';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_faq_descricao" varchar DEFAULT 'As respostas são gerais. A análise do seu caso depende das informações e documentos apresentados.';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_nota_cuidado" varchar DEFAULT 'Uma conversa para entender sua necessidade. Cada caso passa por análise individual.';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_cta_formulario" varchar DEFAULT 'Solicitar atendimento';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_cta_whatsapp" varchar DEFAULT 'Abrir WhatsApp';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_formulario_titulo_whatsapp" varchar DEFAULT 'Conte o que aconteceu pelo WhatsApp';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_formulario_texto_whatsapp" varchar DEFAULT 'Informe apenas o essencial para a primeira conversa. A equipe orientará os próximos passos.';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_triagem_eyebrow" varchar DEFAULT 'Triagem inicial';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_triagem_titulo" varchar DEFAULT 'Perguntas desta campanha';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_triagem_vazia_titulo" varchar DEFAULT 'Comece pelo WhatsApp';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_triagem_vazia_texto" varchar DEFAULT 'O atendimento fará as perguntas necessárias conforme o relato enviado.';
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_midia_fallback_id" integer;
  ALTER TABLE "campaigns" ADD COLUMN "apresentacao_selo_marca_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articles_id" integer;
  ALTER TABLE "campaigns_apresentacao_etapas_contato" ADD CONSTRAINT "campaigns_apresentacao_etapas_contato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content_compartilhados_menu" ADD CONSTRAINT "site_content_compartilhados_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_compartilhados_rodape_locais" ADD CONSTRAINT "site_content_compartilhados_rodape_locais_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_home_sobre_paragrafos" ADD CONSTRAINT "site_content_home_sobre_paragrafos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_home_processo_etapas" ADD CONSTRAINT "site_content_home_processo_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_sobre_bio_paragrafos" ADD CONSTRAINT "site_content_sobre_bio_paragrafos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_sobre_valores" ADD CONSTRAINT "site_content_sobre_valores_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_sobre_processo_etapas" ADD CONSTRAINT "site_content_sobre_processo_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_contato_faq" ADD CONSTRAINT "site_content_contato_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_areas_destaques" ADD CONSTRAINT "site_content_areas_destaques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_areas_processo_etapas" ADD CONSTRAINT "site_content_areas_processo_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_servicos" ADD CONSTRAINT "site_content_paginas_area_servicos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_publicos" ADD CONSTRAINT "site_content_paginas_area_publicos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_processo_etapas" ADD CONSTRAINT "site_content_paginas_area_processo_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_extras" ADD CONSTRAINT "site_content_paginas_area_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_faq" ADD CONSTRAINT "site_content_paginas_area_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_situacoes" ADD CONSTRAINT "site_content_paginas_area_situacoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area_documentos" ADD CONSTRAINT "site_content_paginas_area_documentos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content_paginas_area"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_paginas_area" ADD CONSTRAINT "site_content_paginas_area_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_home_hero_imagem_id_media_id_fk" FOREIGN KEY ("home_hero_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_home_sobre_imagem_id_media_id_fk" FOREIGN KEY ("home_sobre_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_sobre_hero_imagem_id_media_id_fk" FOREIGN KEY ("sobre_hero_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_sobre_bio_imagem_id_media_id_fk" FOREIGN KEY ("sobre_bio_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_contato_hero_imagem_id_media_id_fk" FOREIGN KEY ("contato_hero_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_areas_hero_imagem_id_media_id_fk" FOREIGN KEY ("areas_hero_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_areas_editorial_imagem_id_media_id_fk" FOREIGN KEY ("areas_editorial_imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "campaigns_apresentacao_etapas_contato_order_idx" ON "campaigns_apresentacao_etapas_contato" USING btree ("_order");
  CREATE INDEX "campaigns_apresentacao_etapas_contato_parent_id_idx" ON "campaigns_apresentacao_etapas_contato" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "site_content_compartilhados_menu_order_idx" ON "site_content_compartilhados_menu" USING btree ("_order");
  CREATE INDEX "site_content_compartilhados_menu_parent_id_idx" ON "site_content_compartilhados_menu" USING btree ("_parent_id");
  CREATE INDEX "site_content_compartilhados_rodape_locais_order_idx" ON "site_content_compartilhados_rodape_locais" USING btree ("_order");
  CREATE INDEX "site_content_compartilhados_rodape_locais_parent_id_idx" ON "site_content_compartilhados_rodape_locais" USING btree ("_parent_id");
  CREATE INDEX "site_content_home_sobre_paragrafos_order_idx" ON "site_content_home_sobre_paragrafos" USING btree ("_order");
  CREATE INDEX "site_content_home_sobre_paragrafos_parent_id_idx" ON "site_content_home_sobre_paragrafos" USING btree ("_parent_id");
  CREATE INDEX "site_content_home_processo_etapas_order_idx" ON "site_content_home_processo_etapas" USING btree ("_order");
  CREATE INDEX "site_content_home_processo_etapas_parent_id_idx" ON "site_content_home_processo_etapas" USING btree ("_parent_id");
  CREATE INDEX "site_content_sobre_bio_paragrafos_order_idx" ON "site_content_sobre_bio_paragrafos" USING btree ("_order");
  CREATE INDEX "site_content_sobre_bio_paragrafos_parent_id_idx" ON "site_content_sobre_bio_paragrafos" USING btree ("_parent_id");
  CREATE INDEX "site_content_sobre_valores_order_idx" ON "site_content_sobre_valores" USING btree ("_order");
  CREATE INDEX "site_content_sobre_valores_parent_id_idx" ON "site_content_sobre_valores" USING btree ("_parent_id");
  CREATE INDEX "site_content_sobre_processo_etapas_order_idx" ON "site_content_sobre_processo_etapas" USING btree ("_order");
  CREATE INDEX "site_content_sobre_processo_etapas_parent_id_idx" ON "site_content_sobre_processo_etapas" USING btree ("_parent_id");
  CREATE INDEX "site_content_contato_faq_order_idx" ON "site_content_contato_faq" USING btree ("_order");
  CREATE INDEX "site_content_contato_faq_parent_id_idx" ON "site_content_contato_faq" USING btree ("_parent_id");
  CREATE INDEX "site_content_areas_destaques_order_idx" ON "site_content_areas_destaques" USING btree ("_order");
  CREATE INDEX "site_content_areas_destaques_parent_id_idx" ON "site_content_areas_destaques" USING btree ("_parent_id");
  CREATE INDEX "site_content_areas_processo_etapas_order_idx" ON "site_content_areas_processo_etapas" USING btree ("_order");
  CREATE INDEX "site_content_areas_processo_etapas_parent_id_idx" ON "site_content_areas_processo_etapas" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_servicos_order_idx" ON "site_content_paginas_area_servicos" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_servicos_parent_id_idx" ON "site_content_paginas_area_servicos" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_publicos_order_idx" ON "site_content_paginas_area_publicos" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_publicos_parent_id_idx" ON "site_content_paginas_area_publicos" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_processo_etapas_order_idx" ON "site_content_paginas_area_processo_etapas" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_processo_etapas_parent_id_idx" ON "site_content_paginas_area_processo_etapas" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_extras_order_idx" ON "site_content_paginas_area_extras" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_extras_parent_id_idx" ON "site_content_paginas_area_extras" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_faq_order_idx" ON "site_content_paginas_area_faq" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_faq_parent_id_idx" ON "site_content_paginas_area_faq" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_situacoes_order_idx" ON "site_content_paginas_area_situacoes" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_situacoes_parent_id_idx" ON "site_content_paginas_area_situacoes" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_documentos_order_idx" ON "site_content_paginas_area_documentos" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_documentos_parent_id_idx" ON "site_content_paginas_area_documentos" USING btree ("_parent_id");
  CREATE INDEX "site_content_paginas_area_order_idx" ON "site_content_paginas_area" USING btree ("_order");
  CREATE INDEX "site_content_paginas_area_parent_id_idx" ON "site_content_paginas_area" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_content_paginas_area_slug_idx" ON "site_content_paginas_area" USING btree ("slug");
  CREATE INDEX "site_content_home_home_hero_imagem_idx" ON "site_content" USING btree ("home_hero_imagem_id");
  CREATE INDEX "site_content_home_home_sobre_imagem_idx" ON "site_content" USING btree ("home_sobre_imagem_id");
  CREATE INDEX "site_content_sobre_sobre_hero_imagem_idx" ON "site_content" USING btree ("sobre_hero_imagem_id");
  CREATE INDEX "site_content_sobre_sobre_bio_imagem_idx" ON "site_content" USING btree ("sobre_bio_imagem_id");
  CREATE INDEX "site_content_contato_contato_hero_imagem_idx" ON "site_content" USING btree ("contato_hero_imagem_id");
  CREATE INDEX "site_content_areas_areas_hero_imagem_idx" ON "site_content" USING btree ("areas_hero_imagem_id");
  CREATE INDEX "site_content_areas_areas_editorial_imagem_idx" ON "site_content" USING btree ("areas_editorial_imagem_id");
  ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_apresentacao_midia_fallback_id_media_id_fk" FOREIGN KEY ("apresentacao_midia_fallback_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_apresentacao_selo_marca_id_media_id_fk" FOREIGN KEY ("apresentacao_selo_marca_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "campaigns_apresentacao_apresentacao_midia_fallback_idx" ON "campaigns" USING btree ("apresentacao_midia_fallback_id");
  CREATE INDEX "campaigns_apresentacao_apresentacao_selo_marca_idx" ON "campaigns" USING btree ("apresentacao_selo_marca_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "campaigns_apresentacao_etapas_contato" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_compartilhados_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_compartilhados_rodape_locais" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_home_sobre_paragrafos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_home_processo_etapas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_sobre_bio_paragrafos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_sobre_valores" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_sobre_processo_etapas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_contato_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_areas_destaques" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_areas_processo_etapas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_servicos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_publicos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_processo_etapas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_extras" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_situacoes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area_documentos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_paginas_area" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "campaigns_apresentacao_etapas_contato" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "site_content_compartilhados_menu" CASCADE;
  DROP TABLE "site_content_compartilhados_rodape_locais" CASCADE;
  DROP TABLE "site_content_home_sobre_paragrafos" CASCADE;
  DROP TABLE "site_content_home_processo_etapas" CASCADE;
  DROP TABLE "site_content_sobre_bio_paragrafos" CASCADE;
  DROP TABLE "site_content_sobre_valores" CASCADE;
  DROP TABLE "site_content_sobre_processo_etapas" CASCADE;
  DROP TABLE "site_content_contato_faq" CASCADE;
  DROP TABLE "site_content_areas_destaques" CASCADE;
  DROP TABLE "site_content_areas_processo_etapas" CASCADE;
  DROP TABLE "site_content_paginas_area_servicos" CASCADE;
  DROP TABLE "site_content_paginas_area_publicos" CASCADE;
  DROP TABLE "site_content_paginas_area_processo_etapas" CASCADE;
  DROP TABLE "site_content_paginas_area_extras" CASCADE;
  DROP TABLE "site_content_paginas_area_faq" CASCADE;
  DROP TABLE "site_content_paginas_area_situacoes" CASCADE;
  DROP TABLE "site_content_paginas_area_documentos" CASCADE;
  DROP TABLE "site_content_paginas_area" CASCADE;
  DROP TABLE "site_content" CASCADE;
  ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_apresentacao_midia_fallback_id_media_id_fk";
  
  ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_apresentacao_selo_marca_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  DROP INDEX "campaigns_apresentacao_apresentacao_midia_fallback_idx";
  DROP INDEX "campaigns_apresentacao_apresentacao_selo_marca_idx";
  DROP INDEX "payload_locked_documents_rels_articles_id_idx";
  ALTER TABLE "campaigns" DROP COLUMN "categoria";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_bloco_dor_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_bloco_prova_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_bloco_orientacao_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_video_eyebrow";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_video_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_video_descricao";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_faq_eyebrow";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_faq_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_faq_descricao";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_nota_cuidado";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_cta_formulario";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_cta_whatsapp";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_formulario_titulo_whatsapp";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_formulario_texto_whatsapp";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_triagem_eyebrow";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_triagem_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_triagem_vazia_titulo";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_triagem_vazia_texto";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_midia_fallback_id";
  ALTER TABLE "campaigns" DROP COLUMN "apresentacao_selo_marca_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "articles_id";
  DROP TYPE "public"."enum_campaigns_categoria";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_site_content_paginas_area_slug";`)
}
