const fs = require('fs')
const dotenv = require('dotenv')

if (fs.existsSync('.env')) dotenv.config({ path: '.env' })

const required = ['DATABASE_URI', 'PAYLOAD_SECRET', 'NEXT_PUBLIC_SITE_URL']
const recommended = ['CRON_SECRET', 'REVALIDATE_SECRET', 'NEXT_PUBLIC_WHATSAPP_NUMBER']
let hasError = false

function mask(value) {
  if (!value) return ''
  if (value.length <= 8) return '********'
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

console.log('Preflight de producao — DP')
console.log('--------------------------')
for (const name of required) {
  const value = process.env[name]
  if (!value) {
    hasError = true
    console.log(`ERRO  ${name}: ausente`)
  } else console.log(`OK    ${name}: ${mask(value)}`)
}
for (const name of recommended) {
  const value = process.env[name]
  console.log(`${value ? 'OK   ' : 'AVISO'} ${name}: ${value ? mask(value) : 'ausente'}`)
}
if (process.env.PAYLOAD_SECRET && process.env.PAYLOAD_SECRET.length < 32) {
  hasError = true
  console.log('ERRO  PAYLOAD_SECRET deve ter pelo menos 32 caracteres')
}
if (process.env.NEXT_PUBLIC_SITE_URL && !/^https:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL)) {
  hasError = true
  console.log('ERRO  NEXT_PUBLIC_SITE_URL deve usar https:// em producao')
}
console.log(hasError ? 'Resultado: ambiente incompleto.' : 'Resultado: variaveis minimas parecem prontas.')
process.exit(hasError ? 1 : 0)
