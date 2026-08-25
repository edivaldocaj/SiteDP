import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import pg from 'pg'

import { campaigns, richTextFromText, siteTexts } from './campaign-content.mjs'

const { Pool } = pg
const dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(dirname, '../src/migrations')
const dryRun = process.argv.includes('--dry-run')
const shouldSeedCampaigns = process.env.SEED_CAMPAIGNS_ON_START !== 'false'
const shouldSeedSiteTexts = process.env.SEED_SITE_TEXTS_ON_START !== 'false'

function fail(message) {
  console.error(message)
  process.exit(1)
}

function getDatabaseTarget(connectionString) {
  let url

  try {
    url = new URL(connectionString)
  } catch {
    fail('DATABASE_URI invalida: informe uma URL postgres valida.')
  }

  return {
    database: decodeURIComponent(url.pathname.replace(/^\//, '').split('/')[0] || ''),
    host: url.hostname,
    port: url.port || '5432',
    user: decodeURIComponent(url.username || ''),
  }
}

function assertExpectedDatabase() {
  const connectionString = process.env.DATABASE_URI
  const expectedDatabase = process.env.EXPECTED_DB_NAME
  const expectedUser = process.env.EXPECTED_DB_USER || ''

  if (!connectionString) {
    fail('DATABASE_URI ausente. Recusando aplicar migrations sem banco explicitamente configurado.')
  }

  if (!expectedDatabase) {
    fail('EXPECTED_DB_NAME ausente. Recusando aplicar migrations sem guarda de banco.')
  }

  const target = getDatabaseTarget(connectionString)

  if (target.database !== expectedDatabase) {
    fail(
      `DATABASE_URI aponta para banco "${target.database}" em ${target.host}:${target.port}; esperado "${expectedDatabase}". Migrations bloqueadas para proteger o Postgres compartilhado.`,
    )
  }

  if (expectedUser && target.user !== expectedUser) {
    fail(
      `DATABASE_URI usa usuario "${target.user}" em ${target.host}:${target.port}; esperado "${expectedUser}". Migrations bloqueadas para proteger o Postgres compartilhado.`,
    )
  }

  return connectionString
}

async function migrationExistsTable(client) {
  const result = await client.query(`
    select exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = 'payload_migrations'
    ) as exists
  `)

  return Boolean(result.rows[0]?.exists)
}

async function getAppliedMigrations(client) {
  if (!(await migrationExistsTable(client))) {
    return new Set()
  }

  const result = await client.query('select name from payload_migrations')
  return new Set(result.rows.map((row) => row.name).filter(Boolean))
}

async function readMigrations() {
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .sort()

  return Promise.all(
    files.map(async (file) => {
      const name = file.replace(/\.ts$/, '')
      const source = await fs.readFile(path.join(migrationsDir, file), 'utf8')
      const match = source.match(/export async function up[\s\S]*?await db\.execute\(sql`([\s\S]*?)`\)/)

      if (!match) {
        fail(`Nao foi possivel extrair SQL da migration ${file}.`)
      }

      return {
        name,
        sql: match[1],
      }
    }),
  )
}

function questionId(campaignCode, index) {
  return `${campaignCode.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-q-${index + 1}`
}

function optionId(parentId, index) {
  return `${parentId}-o-${index + 1}`
}

function nullableRichText(text) {
  return text ? richTextFromText(text) : null
}

async function seedCampaigns(client) {
  console.log(`sincronizando campanhas: ${campaigns.length}`)
  await client.query('begin')

  try {
    for (const campaign of campaigns) {
      const result = await client.query(
        `
          insert into campaigns (
            campaign_code,
            slug,
            tem_landing,
            titulo,
            subtitulo,
            bloco_dor,
            bloco_prova,
            mensagem_whatsapp,
            seo_titulo,
            seo_descricao,
            status,
            updated_at,
            created_at
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, now(), now())
          on conflict (campaign_code) do update set
            slug = excluded.slug,
            tem_landing = excluded.tem_landing,
            titulo = excluded.titulo,
            subtitulo = excluded.subtitulo,
            bloco_dor = excluded.bloco_dor,
            bloco_prova = excluded.bloco_prova,
            mensagem_whatsapp = excluded.mensagem_whatsapp,
            seo_titulo = excluded.seo_titulo,
            seo_descricao = excluded.seo_descricao,
            status = excluded.status,
            updated_at = now()
          returning id
        `,
        [
          campaign.campaignCode,
          campaign.slug,
          campaign.temLanding,
          campaign.temLanding ? campaign.titulo : null,
          campaign.temLanding ? campaign.subtitulo : null,
          campaign.temLanding ? JSON.stringify(nullableRichText(campaign.blocoDor)) : null,
          campaign.temLanding ? JSON.stringify(nullableRichText(campaign.blocoProva)) : null,
          campaign.mensagemWhatsapp || null,
          campaign.temLanding ? campaign.seo?.titulo || null : null,
          campaign.temLanding ? campaign.seo?.descricao || null : null,
          campaign.status,
        ],
      )

      const campaignId = result.rows[0]?.id
      await client.query('delete from campaigns_perguntas where _parent_id = $1', [campaignId])

      if (!campaign.temLanding || !campaign.perguntas?.length) {
        console.log(`campanha sem landing: ${campaign.campaignCode}`)
        continue
      }

      for (const [index, pergunta] of campaign.perguntas.entries()) {
        const parentQuestionId = questionId(campaign.campaignCode, index)
        await client.query(
          `
            insert into campaigns_perguntas (_order, _parent_id, id, pergunta, tipo)
            values ($1, $2, $3, $4, $5)
          `,
          [index, campaignId, parentQuestionId, pergunta.pergunta, pergunta.tipo],
        )

        for (const [optionIndex, opcao] of (pergunta.opcoes || []).entries()) {
          await client.query(
            `
              insert into campaigns_perguntas_opcoes (_order, _parent_id, id, opcao)
              values ($1, $2, $3, $4)
            `,
            [optionIndex, parentQuestionId, optionId(parentQuestionId, optionIndex), opcao.opcao],
          )
        }
      }

      console.log(`campanha publicada: ${campaign.campaignCode}`)
    }

    await client.query('commit')
  } catch (error) {
    await client.query('rollback')
    throw error
  }
}

async function seedSiteTexts(client) {
  const result = await client.query(
    `
      update site_config
      set
        urgencia_texto = $1,
        aviso_golpe_texto = $2,
        updated_at = now()
      where id = (
        select id
        from site_config
        order by id
        limit 1
      )
    `,
    [siteTexts.urgenciaTexto, siteTexts.avisoGolpeTexto],
  )

  if (result.rowCount) {
    console.log('textos globais do SiteConfig sincronizados')
  } else {
    console.log('SiteConfig ainda nao existe; textos globais serao mantidos pelo fallback do app')
  }
}

async function run() {
  const connectionString = assertExpectedDatabase()
  const migrations = await readMigrations()

  if (dryRun) {
    for (const migration of migrations) {
      console.log(`dry-run: ${migration.name}`)
    }
    if (shouldSeedCampaigns) {
      console.log(`dry-run: seed campanhas (${campaigns.length})`)
    }
    if (shouldSeedSiteTexts) {
      console.log('dry-run: seed textos globais do SiteConfig')
    }
    return
  }

  const pool = new Pool({ connectionString })
  const client = await pool.connect()

  try {
    const applied = await getAppliedMigrations(client)
    const latestBatchResult = await (await migrationExistsTable(client)
      ? client.query('select coalesce(max(batch), 0) as batch from payload_migrations')
      : Promise.resolve({ rows: [{ batch: 0 }] }))
    const batch = Number(latestBatchResult.rows[0]?.batch || 0) + 1

    for (const migration of migrations) {
      if (applied.has(migration.name)) {
        console.log(`migration ja aplicada: ${migration.name}`)
        continue
      }

      console.log(`aplicando migration: ${migration.name}`)
      await client.query('begin')

      try {
        await client.query(migration.sql)
        await client.query(
          'insert into payload_migrations (name, batch, updated_at, created_at) values ($1, $2, now(), now())',
          [migration.name, batch],
        )
        await client.query('commit')
        console.log(`migration aplicada: ${migration.name}`)
      } catch (error) {
        await client.query('rollback')
        throw error
      }
    }

    if (shouldSeedCampaigns) {
      await seedCampaigns(client)
    }

    if (shouldSeedSiteTexts) {
      await seedSiteTexts(client)
    }
  } finally {
    client.release()
    await pool.end()
  }
}

void run().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
