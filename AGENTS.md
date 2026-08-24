# AGENTS.md

Site de **Deila Pinto Advocacia e Consultoria**. Projeto novo, ainda não
lançado. Next.js (App Router) + Payload CMS 3.x embutido + PostgreSQL.

Este arquivo é carregado em toda sessão. É curto de propósito.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build          # tem que passar antes de encerrar qualquer tarefa
pnpm lint
pnpm payload migrate:create <nome>
```

## Onde está o resto

| Preciso de… | Leia |
|---|---|
| O que construir, em fases, com critério de aceite | `spec/ROTEIRO-DP.md` |
| Cor, fonte, logo, acessibilidade | `spec/MARCA-DP.md` |
| Formato do payload entre site e n8n | `spec/CONTRATO-INTEGRACAO.md` |
| O que o escritório ainda precisa entregar | `spec/CONTEUDO-A-FORNECER.md` |

**Leia um por vez.** Uma fase por sessão.

## O escritório

```
Deila Pinto Advocacia e Consultoria
Deila Ferreira Pinto — OAB/RN 22.940
deilapinto.com.br · @deilapintoadv
WhatsApp 5584996026567
```

Público: trabalhador rural, idoso, pessoa com deficiência, mãe de criança com
deficiência, pessoa em vulnerabilidade socioeconômica do RN.

**Isso é decisão de engenharia, não de estilo.** Corpo 18px, alvo de toque
48px, um campo por tela, teclado numérico no telefone, tudo funcionando em 3G
com telefone antigo. Sem carrossel, sem modal, sem rolagem infinita. WhatsApp
visível em toda seção. Se uma decisão pressupõe usuário confortável com
formulário longo, está errada.

## Regras que valem sempre

1. **Uma fase por sessão.** Terminar, rodar o critério de aceite, parar.
2. `pnpm build` passa antes de encerrar. Sem exceção.
3. **Não criar credencial, segredo, domínio ou chave de API.** Se faltar, pare
   e pergunte.
4. **Não escrever texto jurídico nem institucional.** Copy de campanha, texto
   de área do direito, depoimento e biografia são da Dra. Deila. Você cria o
   campo, valida, bloqueia publicação sem conteúdo — nunca preenche. Use
   `[A FORNECER]` como marcador e liste em `spec/CONTEUDO-A-FORNECER.md`.
5. **Nada de placeholder em rota pública.** Se o dado faltar, ocultar o bloco.
6. Migração de banco: sempre gerar migration.
7. Se o roteiro parecer contradizer o contrato de integração, o contrato ganha.
   Se a contradição for real, pare e escale.

## Publicidade advocatícia — Provimento 205/2021 do CFOAB

Vale para **todo texto de interface**, incluindo rótulo de botão e microcópia.

Proibido: prometer resultado, captar clientela, autoelogio, comparação com
outros profissionais, menção a honorários, mercantilização.

| Use | Evite |
|---|---|
| "Vamos conversar sobre o seu direito?" | "Contrate já", "Fale com um especialista agora" |
| "Entenda se você tem direito" | "Garanta seu benefício" |
| "Cada caso é único" | "Aprovação garantida", "100% de êxito" |
| "Atendimento técnico e humanizado" | "A melhor advogada do RN" |

Na dúvida, escolha a versão mais sóbria — ou pergunte.

## Invariantes de arquitetura

**O CMS não é CRM.** A fonte da verdade de lead, funil, score e caso é o
EspoCRM da instância `espocrm_dp`. O site guarda apenas `lead-submissions`:
fila de submissões com estado de entrega. Nunca adicionar campo de funil,
pontuação ou responsável aqui.

**Nenhum `wa.me` no código.** Todo botão de WhatsApp passa por `/ir/whatsapp`.
`grep -r "wa.me"` deve retornar só o handler.

**Nenhum SMTP.** Formulário posta no n8n; o e-mail de aviso sai de lá.

**Telefone em E.164 sem `+`.** Chave de deduplicação de todo o sistema,
normalizada no servidor.

**`escritorio` vem de variável de ambiente**, nunca inferido do host. Toda
submissão sai com `DP`.

**Nada do escritório fixo no código.** Nome, OAB, telefone, endereço, cor,
área do direito: `SiteConfig` ou variável de ambiente.

## Fora dos limites

Não tocar em nada fora deste repositório. Os projetos
`cavalcante_albuquerque`, `cavalcante_melo` e as instâncias de CRM no EasyPanel
estão em produção e pertencem a outro escritório.
