const { spawnSync } = require('child_process')

const steps = [
  ['Preflight', 'npm', ['run', 'preflight:production']],
  ['TypeScript', 'npx', ['tsc', '--noEmit']],
  ['Node syntax', 'node', ['--check', 'scripts/production-preflight.cjs']],
  ['Build', 'npm', ['run', 'build']],
]

for (const [label, command, args] of steps) {
  console.log(`\n== ${label} ==`)
  const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  if (result.status !== 0) {
    console.error(`\nFalhou: ${label}`)
    process.exit(result.status || 1)
  }
}

console.log('\nRelease check DP concluido.')
