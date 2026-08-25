# Deploy no EasyPanel

## Start do servico

O Dockerfile ja define o arranque automatico:

```bash
./docker-entrypoint.sh node server.js
```

No EasyPanel, se houver campo de comando customizado, use:

```bash
node server.js
```

O `ENTRYPOINT` roda antes do servidor e valida `DATABASE_URI` contra
`EXPECTED_DB_NAME`. Se a URI apontar para outro banco, o processo encerra antes
de qualquer conexao do Payload.

As variaveis abaixo precisam estar no ambiente de runtime do servico, nao
apenas como build args:

```env
NODE_ENV=production
ESCRITORIO=DP
DATABASE_URI=
EXPECTED_DB_NAME=site_dp
EXPECTED_DB_USER=
DB_BOOTSTRAP_ON_START=true
SEED_CAMPAIGNS_ON_START=true
SEED_SITE_TEXTS_ON_START=true
PAYLOAD_SECRET=
NEXT_PUBLIC_SITE_URL=
N8N_BASE_URL=
SITE_TOKEN=
WHATSAPP_NUMERO=
NEXT_TELEMETRY_DISABLED=1
```

`EXPECTED_DB_USER` esta preparado para uma checagem futura. Hoje ele e opcional:
se ficar vazio, o guardiao valida apenas o nome do banco.

`DB_BOOTSTRAP_ON_START=true` aplica as migrations versionadas no boot, antes do
`node server.js`. O bootstrap e idempotente: migrations ja registradas em
`payload_migrations` sao ignoradas.

`SEED_CAMPAIGNS_ON_START=true` sincroniza as campanhas apos as migrations.
Use `false` apenas quando quiser impedir atualizacao automatica dos textos no
proximo restart/deploy. `SEED_SITE_TEXTS_ON_START=true` atualiza o aviso de
golpe e o texto do atalho de urgencia se o `SiteConfig` ja existir.

## DATABASE_URI com `$`

A senha do Postgres contem `$`. O app nao interpola `DATABASE_URI` no shell; o
entrypoint chama `exec "$@"` e o Node le a variavel diretamente de
`process.env`.

O ponto sensivel e o lugar onde a variavel e cadastrada:

- No painel de variaveis do EasyPanel, cole a URI como texto literal, sem
  Markdown, sem barras invertidas e sem colchetes.
- Em `docker-compose.yml` ou `.env` usado pelo Compose, `$` pode ser tratado
  como interpolacao. Nesse caso, escape cada `$` como `$$`.
- Em comandos de shell, prefira aspas simples ao exportar a URI.

Exemplo seguro para Compose com senha ficticia:

```env
DATABASE_URI=postgres://postgres:senha$$com$$cifrao@postgres:5432/site_dp?sslmode=disable
```

## Migration

As migrations rodam no entrypoint por causa do deploy no EasyPanel, onde o
hostname interno do Postgres so resolve dentro da rede Docker do projeto.
O script valida `DATABASE_URI` contra `EXPECTED_DB_NAME` antes de abrir
conexao e aplica apenas migrations ainda nao registradas.

Para rodar manualmente no console do EasyPanel, com as variaveis de runtime
corretas carregadas:

```bash
pnpm migrate
```

Para conferir o estado:

```bash
pnpm migrate:status
```

Nunca rode migrations se `EXPECTED_DB_NAME` nao estiver como `site_dp`. O
guardiao bloqueia divergencia entre `DATABASE_URI` e `EXPECTED_DB_NAME` antes
do Payload abrir conexao.

## Seed de campanhas

O deploy sincroniza as campanhas automaticamente quando
`SEED_CAMPAIGNS_ON_START=true`. O seed faz upsert pelo `campaignCode`, portanto
pode rodar mais de uma vez.

As landings publicadas pelo seed sao:

```text
PREV-BPC
PREV-RURAL
PREV-INCAPACIDADE
TRAB-RESCISAO
PREV-PENSAO
PREV-MATERNIDADE
TRAB-HORAS
TRAB-JUSTACAUSA
TRAB-INDIRETA
TRAB-INSALUBRE
PREV-REVISAO
```

`PREV-EXIGENCIA` permanece sem landing publica. Ele existe como codigo de
urgencia para `/ir/whatsapp?c=PREV-EXIGENCIA`.

Para sincronizar manualmente pelo Payload, use:

```bash
pnpm seed:campanhas
```

Para atualizar os textos globais pelo Payload:

```bash
pnpm seed:site-textos
```

Os textos de campanha sao provisiorios de teste e devem ser revisados antes de
trafego publico.
