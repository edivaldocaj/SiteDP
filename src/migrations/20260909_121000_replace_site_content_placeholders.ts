import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

import { siteContentBaseline } from '../../scripts/site-content-baseline'

const placeholder = 'Conteúdo editável pelo CMS'

function columnName(path: string[]) {
  return path
    .join('_')
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

function baselineText(value: unknown, path: string[] = []): Array<[string, string]> {
  if (typeof value === 'string') return [[columnName(path), value]]
  if (!value || typeof value !== 'object' || Array.isArray(value)) return []

  return Object.entries(value).flatMap(([key, child]) => baselineText(child, [...path, key]))
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // The original baseline migration used this literal as temporary copy. Only
  // replace that exact value so CMS edits made after publication are retained.
  for (const [column, value] of baselineText(siteContentBaseline)) {
    if (column === 'seed_aplicado') continue
    await db.execute(sql`
      UPDATE site_content
      SET ${sql.raw(column)} = ${value}
      WHERE ${sql.raw(column)} = ${placeholder}
    `)
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // This data correction intentionally has no destructive rollback.
}
