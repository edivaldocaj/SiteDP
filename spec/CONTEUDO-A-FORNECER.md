# CONTEUDO-A-FORNECER.md

O agente não escreve texto jurídico nem institucional. Tudo abaixo vem da
Dra. Deila. Enquanto faltar, o campo fica `[A FORNECER]` e o bloco **não é
publicado** — placeholder em rota pública de advogado é problema de
publicidade, não só de estética.

O agente mantém esta lista atualizada conforme os campos forem criados.

---

## Bloqueia a Fase 0

- [x] **Cidades confirmadas.** Escritório físico em Goianinha, com atendimento
      também em Natal.
- [x] **Áreas de atuação confirmadas.** Previdenciário, Assistencial e
      Trabalhista.
- [ ] Endereço completo de cada unidade, com CEP
- [ ] CNPJ e razão social exata
- [ ] Telefone fixo, se houver, e e-mails de contato
- [ ] Horário de atendimento

## Bloqueia a Fase 2

- [ ] **Texto de cada área do direito.** Uma página por área. Linguagem sem
      jargão: "aposentadoria de quem trabalhou na roça", não "aposentadoria
      por idade rural". Quem tem direito, que documentos costumam ser
      necessários, como funciona o processo.
- [ ] **Biografia da Dra. Deila.** Formação, trajetória, por que
      previdenciário. Sem autoelogio nem comparação.
- [ ] **Foto profissional.** Alta resolução, uso autorizado.
- [ ] **Texto de consentimento LGPD**, com número de versão. Precisa dizer que
      dado é coletado, para quê, por quanto tempo, e como pedir exclusão.
- [ ] **Política de privacidade**, incluindo o contato do encarregado.
- [ ] Perguntas frequentes por área, com resposta.

## Bloqueia depoimentos

Cada depoimento exige, sem exceção:

- [ ] Texto
- [ ] Primeiro nome ou "Sra./Sr." + sobrenome, conforme autorizado
- [ ] **Autorização por escrito, arquivada e anexada no CMS**

Sem a autorização anexada, o sistema bloqueia a publicação. Não é rigor
excessivo — depoimento sem autorização expõe cliente.

## Bloqueia cada campanha

Por campanha, e nunca reaproveitado entre campanhas:

- [ ] **Código**, criado primeiro no EspoCRM
- [ ] Título e subtítulo
- [ ] Texto da dor — a situação concreta de quem procura
- [ ] Prova: resultado anonimizado ou número verificável
- [ ] Duas a quatro perguntas de qualificação
- [ ] Mensagem pré-preenchida do WhatsApp
- [ ] Imagem ou vídeo de topo

**O sistema bloqueia campanha com texto igual ao de outra.** Texto de template
repetido derruba conversão e o índice de qualidade do anúncio.

Campanhas criadas em rascunho pelo seed, com campos editoriais marcados como
`[A FORNECER]` quando `temLanding=true`:

- [ ] PREV-EXIGENCIA — codigo para urgencia, sem landing
- [ ] PREV-BPC — titulo, subtitulo, dor, prova, 2 a 4 perguntas, mensagem de WhatsApp, SEO e midia de topo
- [ ] PREV-RURAL — titulo, subtitulo, dor, prova, 2 a 4 perguntas, mensagem de WhatsApp, SEO e midia de topo
- [ ] PREV-INCAPACIDADE — sem landing
- [ ] TRAB-RESCISAO — titulo, subtitulo, dor, prova, primeira pergunta obrigatoria como data de saida, demais perguntas, mensagem de WhatsApp, SEO e midia de topo
- [ ] PREV-PENSAO — sem landing
- [ ] PREV-MATERNIDADE — sem landing
- [ ] TRAB-HORAS — sem landing
- [ ] TRAB-JUSTACAUSA — sem landing
- [ ] TRAB-INDIRETA — sem landing
- [ ] TRAB-INSALUBRE — sem landing
- [ ] PREV-REVISAO — sem landing

Textos globais pendentes no `SiteConfig`:

- [ ] Texto do atalho de urgencia para `/ir/whatsapp?c=PREV-EXIGENCIA`
- [ ] Aviso de golpe sobre senhas do gov.br, Meu INSS, banco e codigos de SMS

---

## Sobre a redação

Toda microcópia de interface — rótulo de botão, título de seção, mensagem de
erro — segue o Provimento 205/2021. Proibido prometer resultado, captar
clientela, autoelogiar-se, comparar-se ou mencionar honorários.

Um exemplo que vai aparecer: **"análise gratuita"**, comum em site de
advocacia, é discutível. Sugere gratuidade como chamariz comercial. A
Dra. Deila decide se usa. O agente não decide, e na dúvida escolhe a versão
mais sóbria — "Vamos conversar sobre o seu direito?" no lugar de "Solicite sua
análise gratuita agora".
