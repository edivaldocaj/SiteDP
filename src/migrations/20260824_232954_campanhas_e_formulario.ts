import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_campaigns_perguntas_tipo" AS ENUM('texto', 'data', 'opcoes');
  CREATE TYPE "public"."enum_campaigns_status" AS ENUM('rascunho', 'publicada');
  CREATE TABLE "campaigns_perguntas_opcoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opcao" varchar NOT NULL
  );
  
  CREATE TABLE "campaigns_perguntas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar NOT NULL,
  	"tipo" "enum_campaigns_perguntas_tipo" DEFAULT 'texto' NOT NULL
  );
  
  CREATE TABLE "campaigns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"campaign_code" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tem_landing" boolean DEFAULT false,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"midia_topo_id" integer,
  	"bloco_dor" jsonb,
  	"bloco_prova" jsonb,
  	"mensagem_whatsapp" varchar,
  	"seo_titulo" varchar,
  	"seo_descricao" varchar,
  	"seo_og_image_id" integer,
  	"status" "enum_campaigns_status" DEFAULT 'rascunho' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "lead_submissions" ALTER COLUMN "nome" DROP NOT NULL;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_aceito" DROP DEFAULT;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_aceito" DROP NOT NULL;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_versao" DROP NOT NULL;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_em" DROP NOT NULL;
  ALTER TABLE "lead_submissions" ADD COLUMN "captura_parcial" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "campaigns_id" integer;
  ALTER TABLE "site_config" ADD COLUMN "urgencia_texto" varchar;
  ALTER TABLE "site_config" ADD COLUMN "aviso_golpe_texto" varchar;
  ALTER TABLE "campaigns_perguntas_opcoes" ADD CONSTRAINT "campaigns_perguntas_opcoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaigns_perguntas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaigns_perguntas" ADD CONSTRAINT "campaigns_perguntas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_midia_topo_id_media_id_fk" FOREIGN KEY ("midia_topo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "campaigns_perguntas_opcoes_order_idx" ON "campaigns_perguntas_opcoes" USING btree ("_order");
  CREATE INDEX "campaigns_perguntas_opcoes_parent_id_idx" ON "campaigns_perguntas_opcoes" USING btree ("_parent_id");
  CREATE INDEX "campaigns_perguntas_order_idx" ON "campaigns_perguntas" USING btree ("_order");
  CREATE INDEX "campaigns_perguntas_parent_id_idx" ON "campaigns_perguntas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "campaigns_campaign_code_idx" ON "campaigns" USING btree ("campaign_code");
  CREATE UNIQUE INDEX "campaigns_slug_idx" ON "campaigns" USING btree ("slug");
  CREATE INDEX "campaigns_midia_topo_idx" ON "campaigns" USING btree ("midia_topo_id");
  CREATE INDEX "campaigns_seo_seo_og_image_idx" ON "campaigns" USING btree ("seo_og_image_id");
  CREATE INDEX "campaigns_updated_at_idx" ON "campaigns" USING btree ("updated_at");
  CREATE INDEX "campaigns_created_at_idx" ON "campaigns" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campaigns_fk" FOREIGN KEY ("campaigns_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("campaigns_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "campaigns_perguntas_opcoes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaigns_perguntas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaigns" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "campaigns_perguntas_opcoes" CASCADE;
  DROP TABLE "campaigns_perguntas" CASCADE;
  DROP TABLE "campaigns" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_campaigns_fk";
  
  DROP INDEX "payload_locked_documents_rels_campaigns_id_idx";
  ALTER TABLE "lead_submissions" ALTER COLUMN "nome" SET NOT NULL;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_aceito" SET DEFAULT false;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_aceito" SET NOT NULL;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_versao" SET NOT NULL;
  ALTER TABLE "lead_submissions" ALTER COLUMN "consent_em" SET NOT NULL;
  ALTER TABLE "lead_submissions" DROP COLUMN "captura_parcial";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "campaigns_id";
  ALTER TABLE "site_config" DROP COLUMN "urgencia_texto";
  ALTER TABLE "site_config" DROP COLUMN "aviso_golpe_texto";
  DROP TYPE "public"."enum_campaigns_perguntas_tipo";
  DROP TYPE "public"."enum_campaigns_status";`)
}
