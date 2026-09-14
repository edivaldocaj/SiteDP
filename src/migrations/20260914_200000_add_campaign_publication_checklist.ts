import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_content_reviewed" boolean DEFAULT false;
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_identity_reviewed" boolean DEFAULT false;
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_cta_tested" boolean DEFAULT false;
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_seo_reviewed" boolean DEFAULT false;
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_no_demo_content" boolean DEFAULT false;
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_reviewed_at" timestamp(3) with time zone;
    ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "publication_checklist_reviewer" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "campaigns"
      DROP COLUMN IF EXISTS "publication_checklist_content_reviewed",
      DROP COLUMN IF EXISTS "publication_checklist_identity_reviewed",
      DROP COLUMN IF EXISTS "publication_checklist_cta_tested",
      DROP COLUMN IF EXISTS "publication_checklist_seo_reviewed",
      DROP COLUMN IF EXISTS "publication_checklist_no_demo_content",
      DROP COLUMN IF EXISTS "publication_checklist_reviewed_at",
      DROP COLUMN IF EXISTS "publication_checklist_reviewer";
  `)
}
