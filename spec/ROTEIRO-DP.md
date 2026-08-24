# ROTEIRO-DP.md — construção do site

Cinco fases. Uma por sessão. Cada uma termina com o critério de aceite rodado
e mostrado ao usuário.

---

# FASE 0 — Fundação

## 0.1 Projeto

Next.js App Router + Payload CMS 3.x embutido + PostgreSQL + TypeScript, com
pnpm. Banco `site_dp` no Postgres existente — **criar banco novo, nunca
serviço de banco novo**.

## 0.2 Ambiente

```
ESCRITORIO=DP
DATABASE_URI=postgres://…/site_dp
PAYLOAD_SECRET=
NEXT_PUBLIC_SITE_URL=https://deilapinto.com.br
N8N_BASE_URL=https://n8n.cavalcantealbuquerque.com.br
SITE_TOKEN=
WHATSAPP_NUMERO=5584996026567
```

O `N8N_BASE_URL` aponta para o domínio do outro escritório porque o n8n é
compartilhado. É esperado. O isolamento acontece no `SITE_TOKEN` e no
`escritorio`, não no domínio.

Nenhum valor real destes vai para o repositório. `.env.example` com as chaves
vazias, `.env` no `.gitignore`.

## 0.3 `SiteConfig` — global do Payload

```
razaoSocial, titular, oab, cnpj
endereco[]                      ← confirmar quais cidades, ver 0.6
telefoneWhatsapp, telefoneFixo, emails[]
instagram, facebook
areasDeAtuacao[]                ← confirmar a lista, ver 0.6
horarioAtendimento
textoConsentimento + consentimentoVersao
marca: logo, favicon (já em public/marca/)
```

Nada disso fixo no código.

## 0.4 Camada visual

Aplicar `spec/MARCA-DP.md`: tokens como variáveis CSS, Cormorant Garamond e
Montserrat via `next/font` (não via `<link>` do Google — piora o LCP), escala
tipográfica, alvos de toque, foco visível.

Montar uma rota `/estilo` só em desenvolvimento, mostrando a escala, as cores
com o contraste calculado ao lado, e os cinco arquivos de logo em fundo claro
e escuro. É o jeito barato de revisar identidade sem abrir dez páginas.

## 0.5 Implantação

Serviço novo no EasyPanel. **Não tocar nos projetos existentes.** Domínio e
SSL o usuário configura — não tente.

Enquanto não lançar: `robots.txt` com `Disallow: /` e cabeçalho
`X-Robots-Tag: noindex`. Site de advogado indexado pela metade é problema de
publicidade, não só de SEO.

## 0.6 Divergências a resolver antes de seguir

Duas informações conflitam entre as fontes. **Pergunte, não escolha:**

1. **Cidades.** Uma fonte diz Natal; outra diz Goianinha e Natal.
2. **Áreas.** O manual de marketing lista aposentadorias, BPC/LOAS,
   auxílio-doença, pensão por morte, salário-maternidade e revisões. Outra
   fonte inclui Trabalhista e omite salário-maternidade.

**Critério de aceite**

- [ ] `pnpm build` passa
- [ ] `/admin` abre e o `SiteConfig` é editável
- [ ] `/estilo` mostra tokens, escala e os cinco logos nos dois fundos
- [ ] Nenhum dado do escritório fixo no código
- [ ] `robots.txt` bloqueando indexação
- [ ] As duas divergências de 0.6 respondidas pelo usuário

---

# FASE 1 — Camada de integração

Implementar conforme `spec/CONTRATO-INTEGRACAO.md`. Esta fase não tem
interface — é a canalização.

## 1.1 `lead-submissions`

```ts
idempotencia   text unique required   // uuid v4
enviadoEm      date required
escritorio     select ['DP'] required
telefone       text required          // E.164 sem '+'
nome           text required
email          email
campanha       text                   // valida o regex do contrato
origem         select ['landing','contato','calculadora'] required
utm            group { source, medium, campaign, content, term }
referrer       text
respostas      array { pergunta, resposta }
consentAceito  checkbox required
consentVersao  text required
consentEm      date required
consentIp      text
status         select ['pendente','entregue','rejeitada','falha'] default 'pendente'
tentativas     number default 0
ultimoErro     text
leadIdCrm      text
```

`create` só pelo endpoint interno. `read`/`update` só admin. **Sem `delete`
pela interface** — é registro de consentimento.

Sem campo de score, funil ou responsável. Se a tentação aparecer, é sinal de
que alguém está reinventando o CRM aqui.

## 1.2 `POST /api/submit-lead`

Nesta ordem, sem exceção:

1. Validar com Zod; normalizar telefone para E.164 sem `+`.
2. `consentAceito` falso → 422, sem gravar.
3. Gravar com `status: pendente`.
4. **Responder 200 ao navegador.** Não segurar o usuário esperando o n8n.
5. Em segundo plano, `POST {N8N_BASE_URL}/webhook/lead-in` com `X-Site-Token`.
6. Atualizar `status` e `leadIdCrm`.

Anti-spam: honeypot, tempo mínimo de preenchimento de 3s, limite por IP.
**Sem captcha visível** — este público não passa em captcha.

## 1.3 `POST /api/redrive`

Rota protegida, chamada a cada 15 min. Reenvia `falha` e `pendente` com mais de
5 min. Espera de 5s, 30s, 5min; teto de 6 tentativas. Alerta quando houver
mais de 3 em `falha`.

## 1.4 `GET /ir/whatsapp`

Conforme a seção 6.1 do contrato: resolve campanha, gera token de 6 caracteres,
registra o clique no n8n com timeout de 500 ms, redireciona 302 para o
WhatsApp com o token entre colchetes no fim da mensagem.

**O registro nunca bloqueia o redirecionamento.** Perder atribuição é ruim;
travar o lead na porta é pior.

## 1.5 Persistência de UTM

Cookie de primeira parte `utm_first`, 30 dias, `SameSite=Lax`, gravado na
primeira visita com UTM. Precedência conforme a seção 5 do contrato.

**Critério de aceite**

- [ ] Envio de teste grava linha `entregue` com `leadIdCrm`, e o lead aparece
      no `espocrm_dp` — nunca no `espocrm`
- [ ] n8n derrubado → linha `pendente`, usuário vê sucesso, redrive entrega
- [ ] Consentimento desmarcado → 422 e nenhuma linha gravada
- [ ] Telefone em qualquer formato → gravado em E.164 sem `+`
- [ ] `grep -r "wa.me"` retorna só o handler
- [ ] n8n fora do ar → redirecionamento ainda acontece em menos de 1s

---

# FASE 2 — Conteúdo e páginas

## 2.1 Collections

`Pages`, `Areas`, `Campaigns`, `Posts`, `Testimonials`, `FAQ`, `Media`.

**`Testimonials` exige `autorizacaoRegistrada` (checkbox) e
`autorizacaoArquivo` (upload).** Sem os dois, `validate` bloqueia a
publicação. Não é zelo excessivo: depoimento sem autorização é exposição de
cliente.

`Campaigns` precisa de `campaignCode` obrigatório e único, validado pelo regex
do contrato, forçado para maiúscula, com a descrição no admin:

> Código criado primeiro no EspoCRM. Copie de lá. Não invente aqui.

## 2.2 Páginas

```
/                       home
/sobre                  a advogada
/areas                  lista
/areas/[slug]           área do direito
/blog  /blog/[slug]     conteúdo educativo
/campanhas/[slug]       landing de campanha
/contato
/privacidade            política de privacidade e LGPD
```

Todo texto vem do CMS. Marque `[A FORNECER]` no que faltar e liste em
`spec/CONTEUDO-A-FORNECER.md`.

## 2.3 SEO

Título por página sem sufixo duplicado. `og:image` própria por página, com
recuo para a padrão. `sitemap.xml` e `robots.txt` gerados. Dados estruturados
de `LegalService` com OAB e endereço. Sem `meta-keywords`.

**Critério de aceite**

- [ ] Depoimento sem autorização não publica
- [ ] `campaignCode` minúsculo vira maiúsculo; formato inválido é recusado
- [ ] Nenhum `<title>` com sufixo repetido
- [ ] Nenhum texto institucional escrito pelo agente
- [ ] `spec/CONTEUDO-A-FORNECER.md` atualizado com tudo que falta

---

# FASE 3 — Conversão e acessibilidade

## 3.1 Formulário em quatro etapas

Ordem fixa, uma coisa por tela:

1. **Telefone, sozinho.** É a chave de dedup — se a pessoa abandonar na etapa
   3, você ainda tem como ligar. Teclado numérico, máscara ao digitar.
2. Nome. E-mail opcional aqui, nunca obrigatório.
3. Duas a quatro perguntas de qualificação vindas da campanha.
4. Consentimento LGPD, texto do `SiteConfig`, caixa desmarcada por padrão.

**Captura parcial:** ao avançar da etapa 1, disparar submissão com o telefone.
As etapas seguintes atualizam a mesma `idempotencia`. Abandono deixa de ser
perda total.

Cada etapa guarda em `sessionStorage` — pessoa que perde sinal não recomeça.

## 3.2 Landing de campanha

Blocos vindos do CMS: título, subtítulo, mídia, dor, prova, perguntas, texto
de consentimento, mensagem pré-preenchida do WhatsApp, OG.

Tornar os blocos de texto obrigatórios e **bloquear publicação quando o texto
for idêntico ao de outra campanha**. Texto de template repetido derruba
conversão e o índice de qualidade do anúncio.

Botão de WhatsApp fixo, via `/ir/whatsapp`, com o código da campanha.

## 3.3 Desempenho

Este público está em 3G com telefone antigo. Imagem em AVIF/WebP com tamanhos
declarados, fonte com `next/font` e `display: swap`, JavaScript mínimo na
landing, nada de biblioteca de animação.

**Critério de aceite**

- [ ] Lighthouse móvel: desempenho ≥ 85, acessibilidade ≥ 95
- [ ] Abandono após a etapa 1 gera submissão com o telefone
- [ ] Navegação completa por teclado, foco sempre visível
- [ ] Zoom de 200% sem rolagem horizontal
- [ ] Página utilizável em 3G simulado
- [ ] Nenhum texto abaixo de 18px fora de etiqueta

---

# FASE 4 — Lançamento

Só com as fases anteriores aceitas.

## 4.1 Verificação final

- [ ] Nenhum `[A FORNECER]` ou placeholder em rota pública
- [ ] Rodapé completo: razão social, OAB, endereço, contato
- [ ] Nenhum depoimento sem autorização arquivada
- [ ] Nenhum texto que prometa resultado ou capte clientela
- [ ] Política de privacidade publicada, com base legal e contato do encarregado
- [ ] `grep -r "wa.me"` limpo; nenhum SMTP no código

## 4.2 Teste de ponta a ponta

Antes de liberar a indexação, e nesta ordem:

1. Formulário de contato → lead no `espocrm_dp` com consentimento gravado
2. Landing de campanha → lead com `campanha` e UTM corretos
3. Botão de WhatsApp → mensagem chega com token → lead com a campanha certa
4. Abandono na etapa 1 → lead só com telefone
5. n8n derrubado → nada se perde, redrive entrega

## 4.3 Liberar

Remover `Disallow: /` e o `noindex`. Enviar sitemap. Configurar monitor de
disponibilidade.

**Só depois disso o anúncio pode subir.** Tráfego pago em site com
`Disallow: /` é dinheiro em página que o buscador não vê.
