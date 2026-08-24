# SiteDP

Site de Deila Pinto Advocacia e Consultoria.

## Desenvolvimento

1. Copie `.env.example` para `.env`.
2. Preencha as variaveis locais sem commitar credenciais.
3. Instale dependencias com `pnpm install`.
4. Rode `pnpm dev`.

## Comandos

```bash
pnpm dev
pnpm build
pnpm lint
pnpm payload migrate:create <nome>
```

## Observacoes

- O CMS roda embutido no Next.js em `/admin`.
- A configuracao institucional fica no global `SiteConfig`.
- Enquanto o site nao for lancado, `robots.txt` bloqueia indexacao e o app envia `X-Robots-Tag: noindex`.
