# CONTRATO-INTEGRACAO.md

> **Cópia para o repositório `site-dp`.** Quando o pacote `@adv/lead-kit`
> existir, esta cópia sai e o contrato passa a ser imposto pelos tipos do
> pacote. Até lá, este arquivo é a referência. Não alterar sozinho: qualquer
> mudança aqui precisa valer também para o site de Cavalcante Albuquerque.


Este arquivo é lido pelos **dois** agentes. Nenhum dos lados pode alterá-lo
sozinho. Se um dos roteiros exigir mudança aqui, pare e escale ao usuário.

---

## 1. Código de campanha

Formato: `<AREA>-<PUBLICO>-<NN>` — maiúsculas, sem acento, sem espaço.

```
regex: ^[A-Z]{2,6}(-[A-Z0-9]{2,10})+-\d{2}$
exemplos: PREV-RURAL-01  BPC-PCD-01  DIG-CONTA-01  PEN-URGENCIA-01
```

**A campanha nasce no EspoCRM.** O código é criado lá, depois copiado para o
CMS, depois para o `utm_campaign` do anúncio. Landing publicada com código que
não existe no CRM gera lead órfão sem roteiro — o agente cai no fallback e a
atribuição se perde.

O CMS **valida o formato**, nunca inventa o código.

---

## 2. Endpoint de entrega

```
POST {N8N_BASE_URL}/webhook/lead-in
Content-Type: application/json
X-Site-Token: <segredo por escritório, em variável de ambiente>
```

### Corpo

```json
{
  "escritorio": "DP",
  "idempotencia": "uuid-v4 gerado pelo CMS",
  "enviadoEm": "2026-08-23T14:02:11-03:00",
  "telefone": "5584991243985",
  "nome": "Maria da Silva",
  "email": null,
  "campanha": "PREV-RURAL-01",
  "origem": "landing",
  "utm": {
    "source": "instagram",
    "medium": "cpc",
    "campaign": "PREV-RURAL-01",
    "content": "video-01",
    "term": null
  },
  "referrer": "https://l.instagram.com/",
  "respostas": [
    { "pergunta": "Trabalha na roça?", "resposta": "Sim, há 22 anos" }
  ],
  "consentimento": {
    "aceito": true,
    "versao": "v1",
    "em": "2026-08-23T14:02:09-03:00",
    "ip": "191.x.x.x"
  }
}
```

### Regras de campo

| Campo | Regra |
|---|---|
| `escritorio` | Sempre `DP` neste site. Nunca inferido de host — vem de variável de ambiente. |
| `telefone` | **E.164 sem `+`**, normalizado pelo CMS antes de enviar. É a chave de deduplicação de todo o sistema. Envio fora do formato deve falhar na validação, não ser corrigido pelo n8n. |
| `campanha` | `null` para formulário de contato genérico. Nunca string vazia. |
| `origem` | `landing`, `contato` ou `calculadora`. |
| `idempotencia` | UUID por submissão. Reenvio da mesma submissão repete o UUID. |
| `consentimento` | Obrigatório em toda submissão. Sem ele o n8n rejeita com 422. |

### Resposta

```
200 { "ok": true, "leadId": "6512ab..." }
422 { "ok": false, "erro": "descrição" }    → não retentar
5xx / timeout                                → retentar
```

O CMS grava o `leadId` retornado. É o único elo entre a submissão e o registro
no CRM.

---

## 3. Quem é dono de quê

| Dado | Dono | O outro lado |
|---|---|---|
| Conteúdo da landing, mídia, SEO | CMS | CRM não vê |
| Código, roteiro, meta, custo da campanha | **EspoCRM** | CMS só referencia |
| Lead, score, status de funil, caso, contrato | **EspoCRM** | CMS nunca guarda |
| Submissão bruta do formulário | CMS (fila) | CRM não conhece |
| Conversa | Chatwoot | — |

**O CMS não é CRM.** Ele registra que uma submissão ocorreu e se foi entregue.
Não guarda estado de funil, não pontua lead, não atribui responsável.

---

## 4. Entrega e retentativa

O CMS grava a submissão **antes** de chamar o n8n. Nenhuma submissão pode se
perder por falha de rede.

```
status: pendente → entregue | rejeitada | falha
```

- Retentar em 5s, 30s, 5min. Depois disso, `falha`.
- Cron de reenvio a cada 15 min para o que estiver em `falha`.
- Alerta quando houver mais de 3 em `falha` — hoje isso passaria despercebido.

---

## 5. Persistência de UTM

Parâmetros de UTM chegam na primeira visita e somem na navegação interna.

Regra: na primeira página com UTM, gravar em cookie de primeira parte
(`utm_first`, 30 dias) e em `sessionStorage`. O formulário lê de lá.

Precedência quando houver conflito:

```
1. utm_campaign da URL atual
2. campaignCode da landing onde o formulário está
3. utm_first do cookie
4. null
```

Landing de campanha sempre envia o próprio `campaignCode`, mesmo sem UTM —
tráfego orgânico e link de bio também precisam de atribuição.

---

## 6. Os quatro canais, duas portas

| Canal | Porta | Origem que carrega |
|---|---|---|
| WhatsApp direto (número salvo, indicação, bio) | Evolution → `wf-09` | nenhuma |
| Anúncio clique-para-WhatsApp | Evolution → `wf-09` | `referral` / `ctwa_clid` do Meta |
| Botão de WhatsApp no site | Evolution → `wf-09` | token de clique, ver 6.1 |
| Formulário de contato e landing de campanha | HTTP → `wf-01` | payload completo da seção 2 |

**Toda entrada passa por uma dessas duas portas.** Nenhum canal novo cria
webhook próprio. Se um canal não couber em nenhuma das duas, é sinal de que
está mal desenhado — escale.

### 6.1 Redirecionador de WhatsApp

Proibido linkar `wa.me` diretamente em qualquer lugar do site. Todo botão
aponta para rota própria:

```
GET /ir/whatsapp?c=<campaignCode>&o=<origem>
```

O handler, no servidor:

1. Resolve a campanha pela precedência da seção 5.
2. Gera token de 6 caracteres, base32 maiúscula (`K7X2M9`).
3. `POST {N8N_BASE_URL}/webhook/click-whatsapp` com
   `{ token, escritorio, campanha, utm, referrer, origem, em }`.
   O n8n grava em Redis sob `click:<token>`, TTL de 24 horas.
4. Responde `302` para
   `https://wa.me/<TEL>?text=<mensagem da campanha> [<token>]`.

O token vai entre colchetes, no fim da mensagem. O `wf-09` procura
`\[([A-Z0-9]{6})\]` na primeira mensagem, busca `click:<token>` no Redis,
aplica campanha e UTM ao lead, e **remove o token do texto antes de entregar
ao agente**.

Sem token — pessoa apagou o texto, ou passaram o número adiante — o lead é
criado sem campanha e marcado para revisão. Nunca chutar origem.

O passo 3 não pode bloquear o redirecionamento. Se o n8n não responder em
500 ms, redirecione mesmo assim: perder atribuição é ruim, travar o lead na
porta é pior.

### 6.2 Formulário por e-mail

O formulário **não envia e-mail**. Ele posta no `wf-01`. O e-mail de aviso ao
escritório é disparado pelo n8n depois de o lead existir no CRM.

E-mail é notificação, nunca transporte. Lead que vive em caixa de entrada não
tem deduplicação, prazo de resposta, funil nem atribuição.

---

## 7. Primeiro e último toque

O mesmo telefone chega por mais de um canal — é o caso normal, não a exceção.
Alguém vê o anúncio, preenche o formulário, e três dias depois manda WhatsApp
pelo número salvo.

Dois campos no Lead, e a regra é fixa:

| Campo | Comportamento |
|---|---|
| `campanhaPrimeiroToque` | gravado uma vez, **nunca sobrescrito** |
| `campanhaUltimoToque` | sobrescrito a cada novo toque com campanha identificada |

Toque sem campanha identificada não sobrescreve nada.

Custo de aquisição se calcula pelo primeiro toque. Efetividade de criativo, pelo
último. Sem os dois campos, um dos dois números fica errado e ninguém percebe.

---

## 8. Fora do escopo deste contrato

O tratamento de `referral` / `ctwa_clid` acontece dentro do `wf-09`, sem
participação do site. Está no roteiro do CRM.
