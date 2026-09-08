import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "campaigns_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar NOT NULL,
  	"resposta" varchar NOT NULL
  );
  
  ALTER TABLE "campaigns" ADD COLUMN "bloco_orientacao" jsonb;
  ALTER TABLE "campaigns" ADD COLUMN "video_url" varchar;
  ALTER TABLE "campaigns" ADD COLUMN "video_file_id" integer;
  ALTER TABLE "campaigns" ADD COLUMN "texto_urgencia" varchar;
  ALTER TABLE "campaigns" ADD COLUMN "mostrar_formulario" boolean DEFAULT true;
  ALTER TABLE "campaigns_faq" ADD CONSTRAINT "campaigns_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "campaigns_faq_order_idx" ON "campaigns_faq" USING btree ("_order");
  CREATE INDEX "campaigns_faq_parent_id_idx" ON "campaigns_faq" USING btree ("_parent_id");
  ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "campaigns_video_file_idx" ON "campaigns" USING btree ("video_file_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "campaigns_faq" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "campaigns_faq" CASCADE;
  ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_video_file_id_media_id_fk";
  
  DROP INDEX "campaigns_video_file_idx";
  ALTER TABLE "campaigns" DROP COLUMN "bloco_orientacao";
  ALTER TABLE "campaigns" DROP COLUMN "video_url";
  ALTER TABLE "campaigns" DROP COLUMN "video_file_id";
  ALTER TABLE "campaigns" DROP COLUMN "texto_urgencia";
  ALTER TABLE "campaigns" DROP COLUMN "mostrar_formulario";`)
}
