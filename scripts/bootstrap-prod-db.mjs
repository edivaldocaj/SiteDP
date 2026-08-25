import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import pg from 'pg'

const { Pool } = pg
const dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(dirname, '../src/migrations')
const dryRun = process.argv.includes('--dry-run')

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

async function run() {
  const connectionString = assertExpectedDatabase()
  const migrations = await readMigrations()

  if (dryRun) {
    for (const migration of migrations) {
      console.log(`dry-run: ${migration.name}`)
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
  } finally {
    client.release()
    await pool.end()
  }
}

void run().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
