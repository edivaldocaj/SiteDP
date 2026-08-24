export const EXPECTED_DB_USER = process.env.EXPECTED_DB_USER || ''

const NEXT_PRODUCTION_BUILD_PHASE = 'phase-production-build'

type DatabaseTarget = {
  database: string
  host: string
  port: string
  user: string
}

export function extractDatabaseTarget(connectionString: string): DatabaseTarget {
  let url: URL

  try {
    url = new URL(connectionString)
  } catch {
    throw new Error('DATABASE_URI invalida: informe uma URL postgres valida.')
  }

  const database = decodeURIComponent(url.pathname.replace(/^\//, '').split('/')[0] || '')
  const user = decodeURIComponent(url.username || '')

  return {
    database,
    host: url.hostname,
    port: url.port || '5432',
    user,
  }
}

export function assertExpectedDatabase(): DatabaseTarget | null {
  const connectionString = process.env.DATABASE_URI
  const expectedDatabase = process.env.EXPECTED_DB_NAME
  const isNextProductionBuild = process.env.NEXT_PHASE === NEXT_PRODUCTION_BUILD_PHASE

  if (isNextProductionBuild && (!connectionString || !expectedDatabase)) {
    return null
  }

  if (!connectionString) {
    throw new Error('DATABASE_URI ausente. Recusando iniciar sem banco explicitamente configurado.')
  }

  if (!expectedDatabase) {
    throw new Error('EXPECTED_DB_NAME ausente. Recusando iniciar sem guarda de banco.')
  }

  const target = extractDatabaseTarget(connectionString)

  if (target.database !== expectedDatabase) {
    throw new Error(
      `DATABASE_URI aponta para banco "${target.database}" em ${target.host}:${target.port}; esperado "${expectedDatabase}". Processo encerrado para proteger o Postgres compartilhado.`,
    )
  }

  if (EXPECTED_DB_USER && target.user !== EXPECTED_DB_USER) {
    throw new Error(
      `DATABASE_URI usa usuario "${target.user}" em ${target.host}:${target.port}; esperado "${EXPECTED_DB_USER}". Processo encerrado para proteger o Postgres compartilhado.`,
    )
  }

  return target
}
