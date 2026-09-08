// Operação administrativa local. Não é exposta como endpoint público.
import config from '@payload-config'
import { getPayload } from 'payload'
import { randomBytes } from 'node:crypto'
import { open } from 'node:fs/promises'
import path from 'node:path'

async function run() {
  const email = process.env.CMS_RESET_EMAIL?.trim().toLowerCase()
  const output = process.env.CMS_RESET_OUTPUT
  if (!email || !output || !path.isAbsolute(output)) {
    throw new Error('Informe CMS_RESET_EMAIL e CMS_RESET_OUTPUT (arquivo privado absoluto, ainda inexistente).')
  }
  const payload = await getPayload({ config })
  try {
    const { docs } = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 2, depth: 0, overrideAccess: true })
    if (docs.length !== 1) throw new Error('Conta não identificada de forma única; nenhuma senha foi alterada.')
    const password = randomBytes(24).toString('base64url')
    // Criação exclusiva impede sobrescrever outro arquivo de credenciais.
    const file = await open(output, 'wx', 0o600)
    try {
      await file.writeFile(JSON.stringify({ email, password, status: 'pendente' }, null, 2))
      await payload.update({ collection: 'users', id: docs[0].id, overrideAccess: true,
        data: { password, sessions: [], loginAttempts: 0, lockUntil: null } })
      await file.truncate(0)
      await file.write(JSON.stringify({ email, password, status: 'redefinida', em: new Date().toISOString() }, null, 2), 0, 'utf8')
      console.log('Senha redefinida; sessões anteriores encerradas. Credenciais no arquivo privado: ' + output)
    } finally { await file.close() }
  } finally { await payload.destroy() }
}
run().then(() => process.exit(0)).catch(() => { console.error('Recuperação não concluída. Confira conta, destino privado e acesso ao banco.'); process.exit(1) })
