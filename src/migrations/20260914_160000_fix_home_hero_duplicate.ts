import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Correct only the known duplicated editorial value; preserve later CMS edits.
  await db.execute(sql`
    UPDATE site_content
    SET "home_hero_linha2_antes" = 'com'
    WHERE "home_hero_linha2_antes" = 'com com'
  `)
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // The correction is intentionally non-destructive and has no automatic rollback.
}
