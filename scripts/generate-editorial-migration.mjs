// Gera SQL revisável; não abre conexão com banco nem aplica alterações.
import fs from 'node:fs'
import { campaigns, legacyCampaigns, richTextFromText } from './campaign-content.mjs'

const quote = (value) => value == null ? 'NULL' : "'" + String(value).replaceAll("'", "''") + "'"
const json = (value) => quote(JSON.stringify(value)) + '::jsonb'
const statements = [
  `CREATE TABLE campaign_editorial_backups_20260908 (campaign_id integer PRIMARY KEY, snapshot jsonb NOT NULL, backed_up_at timestamptz NOT NULL DEFAULT now());`,
]

for (const campaign of campaigns.filter((item) => item.temLanding)) {
  const legacy = legacyCampaigns.find((item) => item.campaignCode === campaign.campaignCode)
  const code = quote(campaign.campaignCode)
  statements.push(`SELECT id FROM campaigns WHERE campaign_code = ${code} FOR UPDATE;`)
  statements.push(`INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = ${code};`)
  const fields = {
    titulo: [legacy.titulo, campaign.titulo],
    subtitulo: [legacy.subtitulo, campaign.subtitulo],
    seo_titulo: [legacy.seo.titulo, campaign.seo.titulo],
    seo_descricao: [legacy.seo.descricao, campaign.seo.descricao],
    bloco_dor: [richTextFromText(legacy.blocoDor), richTextFromText(campaign.blocoDor)],
    bloco_prova: [richTextFromText(legacy.blocoProva), richTextFromText(campaign.blocoProva)],
    bloco_orientacao: [null, richTextFromText(campaign.blocoOrientacao)],
  }
  for (const [field, [previous, next]] of Object.entries(fields)) {
    const convert = field.startsWith('bloco_') ? json : quote
    const before = previous === null ? 'NULL' : convert(previous)
    statements.push(`UPDATE campaigns SET ${field} = ${convert(next)}, updated_at = now()
      WHERE campaign_code = ${code} AND ${field} IS NOT DISTINCT FROM ${before};`)
  }
  for (const [index, question] of campaign.perguntas.entries()) {
    statements.push(`UPDATE campaigns_perguntas SET pergunta = ${quote(question.pergunta)}
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = ${code})
      AND pergunta = ${quote(legacy.perguntas[index].pergunta)};`)
  }
  for (const [index, item] of campaign.faq.entries()) {
    statements.push(`INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT ${index + 1}, id, ${quote(campaign.campaignCode.toLowerCase() + '-editorial-faq-' + index)}, ${quote(item.pergunta)}, ${quote(item.resposta)}
      FROM campaigns WHERE campaign_code = ${code}
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);`)
  }
}

fs.writeFileSync(new URL('../src/migrations/20260908_100000_conteudo_editorial.ts', import.meta.url),
  `import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'\n\n` +
  `export async function up({ db }: MigrateUpArgs): Promise<void> {\n  await db.execute(sql\`\n${statements.join('\n')}\n\`)\n}\n\n` +
  `export async function down(_args: MigrateDownArgs): Promise<void> {\n  throw new Error('Rollback de conteúdo exige comparar o backup campaign_editorial_backups_20260908 com a versão atual para preservar edições posteriores.')\n}\n`)
console.log('Migration editorial gerada com comparação do conteúdo anterior e backup por campanha.')
