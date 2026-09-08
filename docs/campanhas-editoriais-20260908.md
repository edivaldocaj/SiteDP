# Campanhas individuais DP — 08/09/2026

## Implementação local

- Layout claro nas páginas `/campanhas/[slug]`, com retrato institucional sem livro, blocos de conteúdo, FAQ, vídeo e formulário opcional.
- Revisão editorial específica das 11 campanhas públicas, incluindo perguntas de triagem. Códigos e vínculos de campanha preservados.
- Novos campos opcionais do Payload: `blocoOrientacao`, `videoUrl`, `videoFile`, `textoUrgencia`, `mostrarFormulario`, `faq`.
- O editor Lexical passa a renderizar formatação e parágrafos. O mapa de componentes é gerado no build.
- Uploads de imagem e vídeo filtrados por MIME; links externos aceitos apenas para vídeos HTTPS do YouTube/Vimeo. Sem reprodução automática.

## Migração e preservação

1. `20260908_092127_campanhas_editoriais` adiciona o schema.
2. `20260908_100000_conteudo_editorial` bloqueia cada registro durante a atualização e cria `campaign_editorial_backups_20260908`, com o registro anterior e perguntas.
3. Cada campo existente só muda se ainda corresponde ao texto inicial conhecido. Edições diferentes no CMS permanecem intactas.
4. FAQ e orientação entram apenas quando o respectivo conteúdo está ausente.
5. O bootstrap deixa de sobrescrever campanhas existentes. Schema push automático fica desabilitado; alterações de banco passam pelas migrations.

O rollback editorial exige revisão do backup e das alterações posteriores. A migration não executa restauração automática que possa apagar edições recentes. O gerador de migration é ferramenta de preparação; não deve ser reexecutado para modificar uma migration já aplicada.

## Evidências locais

- `pnpm build`: aprovado (Next e TypeScript).
- `pnpm lint`: aprovado.
- `pnpm e2e:local`: aprovado; são testes da integração em isolamento, não entrega de lead real.
- Quatro migrations aplicadas em banco isolado; 11 backups e 11 FAQs verificados; título previamente editado preservado.
- PostgreSQL nativo local: bootstrap completo em banco novo e segunda inicialização sem sobrescrever título/status ou duplicar migrations/FAQ.
- Navegador em 390×844 e 1440×1000: sem overflow horizontal ou erros JavaScript; FAQ acessível e formulário até a recusa sem consentimento.
- Conta sintética local: login, edição e salvamento pelo painel Payload e leitura do valor salvo.
- Rotina de recuperação: senha redefinida em conta sintética local, com login posterior validado.
- Vídeo: link inválido recusado, embed permitido verificado sem depender de vídeo externo, upload de vídeo sintético WebM e reprodução real no navegador; exibição condicional do formulário validada.
- Capturas e scripts de execução ficam em `.tmp/screens` e `.tmp/qa-runtime`, fora do commit.

## Produção: pendências explícitas

- Nenhuma dessas alterações foi publicada nesta etapa.
- DP: a tentativa autorizada de login para a conta indicada pelo usuário retornou HTTP 401. A API pública de campanhas retornou HTTP 200 e 11 registros. Isso não confirma falha geral de banco.
- CA: a API pública de campanhas retornou HTTP 200 e 7 registros. O erro de salvamento relatado ainda exige sessão autenticada e logs; nenhuma correção especulativa foi aplicada no CA.
- Acesso ao EasyPanel/servidor é necessário para conferir o usuário real, redefinir sua senha e investigar o salvamento CA.
- Antes da publicação: backup de banco e arquivos de mídia, confirmação da versão concorrente, execução de migrations, teste autenticado de edição e conferência da versão implantada.

## Recuperação administrativa DP

`scripts/reset-cms-password.ts` usa a API local do Payload, com a guarda de banco do projeto. Exige `CMS_RESET_EMAIL` e `CMS_RESET_OUTPUT` (caminho absoluto de arquivo privado que ainda não existe). Gera senha aleatória, redefine somente uma conta identificada de forma única, limpa o bloqueio e encerra suas sessões anteriores. O segredo é gravado no arquivo privado; não há endpoint público de recuperação administrativa.

Executar com o ambiente real do serviço somente após confirmar banco e conta. O script foi testado apenas no PostgreSQL local desta validação; não foi executado contra a conta de produção.
