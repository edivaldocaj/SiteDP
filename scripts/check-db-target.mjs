const expectedDatabase = process.env.EXPECTED_DB_NAME
const expectedUser = process.env.EXPECTED_DB_USER || ''
const connectionString = process.env.DATABASE_URI

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (!connectionString) {
  fail('DATABASE_URI ausente. Recusando iniciar sem banco explicitamente configurado.')
}

if (!expectedDatabase) {
  fail('EXPECTED_DB_NAME ausente. Recusando iniciar sem guarda de banco.')
}

let url

try {
  url = new URL(connectionString)
} catch {
  fail('DATABASE_URI invalida: informe uma URL postgres valida.')
}

const database = decodeURIComponent(url.pathname.replace(/^\//, '').split('/')[0] || '')
const user = decodeURIComponent(url.username || '')
const host = url.hostname
const port = url.port || '5432'

if (database !== expectedDatabase) {
  fail(
    `DATABASE_URI aponta para banco "${database}" em ${host}:${port}; esperado "${expectedDatabase}". Processo encerrado para proteger o Postgres compartilhado.`,
  )
}

if (expectedUser && user !== expectedUser) {
  fail(
    `DATABASE_URI usa usuario "${user}" em ${host}:${port}; esperado "${expectedUser}". Processo encerrado para proteger o Postgres compartilhado.`,
  )
}
