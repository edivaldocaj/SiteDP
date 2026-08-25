export const siteTexts = {
  avisoGolpeTexto:
    'O escritorio nunca pede senha do gov.br, do Meu INSS ou do banco. Tambem nao pede codigo de SMS. Se receber esse tipo de pedido, interrompa o contato e confirme pelos canais oficiais.',
  urgenciaTexto: 'Recebeu carta do INSS, teve beneficio cortado ou tem pericia marcada?',
}

export const campaigns = [
  {
    campaignCode: 'PREV-EXIGENCIA',
    slug: 'prev-exigencia',
    status: 'rascunho',
    temLanding: false,
    mensagemWhatsapp:
      'Ola. Recebi uma carta do INSS, tive o beneficio cortado ou tenho pericia marcada. Gostaria de orientacao sobre prazo e documentos.',
  },
  {
    campaignCode: 'PREV-BPC',
    slug: 'prev-bpc',
    status: 'publicada',
    temLanding: true,
    titulo: 'BPC/LOAS para idoso ou pessoa com deficiencia',
    subtitulo:
      'Um primeiro atendimento simples para organizar idade, saude, renda da casa, CadUnico e resposta do INSS, quando ja houve pedido.',
    blocoDor:
      'Quando a familia vive com pouca renda e uma pessoa idosa ou com deficiencia precisa de cuidado diario, e comum ficar em duvida sobre quais documentos juntar e como explicar a situacao ao INSS. A conversa inicial serve para colocar essas informacoes em ordem, com linguagem simples.',
    blocoProva:
      'Para a analise, costumam ajudar documentos pessoais, comprovante de residencia, dados de quem mora na mesma casa, CadUnico ou NIS, laudos e exames recentes. Se ja houve pedido negado, a carta ou print do Meu INSS ajuda a entender o que aconteceu.',
    perguntas: [
      { pergunta: 'O beneficio seria para voce ou para outra pessoa da familia?', tipo: 'texto' },
      { pergunta: 'Qual a idade dessa pessoa?', tipo: 'texto' },
      { pergunta: 'Ela tem alguma doenca ou deficiencia? Qual?', tipo: 'texto' },
      { pergunta: 'Quantas pessoas moram na mesma casa, contando com ela?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Quero conversar sobre BPC/LOAS para idoso ou pessoa com deficiencia. Posso informar idade, saude, moradores da casa e se ja houve pedido no INSS.',
    seo: {
      titulo: 'BPC/LOAS no RN | Deila Pinto Advocacia',
      descricao:
        'Orientacao inicial sobre BPC/LOAS para idoso ou pessoa com deficiencia, com organizacao de documentos e informacoes para analise.',
    },
  },
  {
    campaignCode: 'PREV-RURAL',
    slug: 'prev-rural',
    status: 'publicada',
    temLanding: true,
    titulo: 'Aposentadoria de quem trabalhou na roca',
    subtitulo:
      'Atendimento para organizar idade, tempo de trabalho rural, documentos antigos e historico de pedido no INSS.',
    blocoDor:
      'Quem trabalhou muitos anos na roca muitas vezes nao tem todos os papeis guardados. Isso nao deve encerrar a conversa. O primeiro passo e contar a historia de trabalho com calma e separar o que existir: documento antigo, sindicato, nota de produtor, contrato, certidao ou testemunhas.',
    blocoProva:
      'A avaliacao fica mais clara quando aparecem documentos de epocas diferentes, como certidao, carteira de trabalho, ficha de sindicato, documento de terra, nota de produtor ou nomes de pessoas que conhecem a rotina rural. Mesmo com poucos papeis, vale organizar o que existe.',
    perguntas: [
      { pergunta: 'Qual a sua idade?', tipo: 'texto' },
      { pergunta: 'Por quantos anos trabalhou na roca, mais ou menos?', tipo: 'texto' },
      { pergunta: 'Tem algum papel antigo que mostre esse trabalho?', tipo: 'texto' },
      { pergunta: 'Ja deu entrada no INSS alguma vez?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Trabalhei na roca e quero conversar sobre aposentadoria rural. Posso informar minha idade, tempo de trabalho e os documentos que tenho.',
    seo: {
      titulo: 'Aposentadoria rural no RN | Deila Pinto Advocacia',
      descricao:
        'Conversa inicial sobre aposentadoria de trabalhador rural, documentos antigos, tempo de roca e historico no INSS.',
    },
  },
  {
    campaignCode: 'PREV-INCAPACIDADE',
    slug: 'prev-incapacidade',
    status: 'publicada',
    temLanding: true,
    titulo: 'Beneficio por incapacidade para trabalhar',
    subtitulo:
      'Organize informacoes sobre saude, afastamento, pericia, resposta do INSS e documentos medicos recentes.',
    blocoDor:
      'Quando a saude impede o trabalho, a preocupacao costuma vir junto com duvidas sobre laudo, pericia, alta programada ou beneficio cortado. Se existe pericia marcada, carta do INSS ou prazo em andamento, o contato deve ser direto e sem etapas desnecessarias.',
    blocoProva:
      'Laudos, exames, receitas, atestados, carteira de trabalho e respostas do INSS ajudam a entender o momento do caso. Documentos recentes costumam explicar melhor a situacao atual, principalmente quando houve pericia ou corte de beneficio.',
    perguntas: [
      { pergunta: 'Qual problema de saude esta impedindo o trabalho?', tipo: 'texto' },
      { pergunta: 'Desde quando esta assim?', tipo: 'texto' },
      { pergunta: 'Esta trabalhando agora ou parou?', tipo: 'texto' },
      { pergunta: 'Ja passou por pericia ou tem pericia marcada?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Quero conversar sobre beneficio por incapacidade. Posso informar meu problema de saude, desde quando parei e se ja tive pericia no INSS.',
    seo: {
      titulo: 'Beneficio por incapacidade no RN | Deila Pinto Advocacia',
      descricao:
        'Orientacao inicial para quem esta sem trabalhar por motivo de saude, teve pericia, pedido negado ou beneficio cortado.',
    },
  },
  {
    campaignCode: 'TRAB-RESCISAO',
    slug: 'trab-rescisao',
    status: 'publicada',
    temLanding: true,
    titulo: 'Saiu da empresa e ficou com duvida sobre o acerto?',
    subtitulo:
      'A primeira informacao e a data de saida, porque pode haver prazo correndo. Depois, organizamos documentos e valores recebidos.',
    blocoDor:
      'Depois da saida da empresa, muitas pessoas nao sabem se o acerto veio completo, se o FGTS foi liberado ou quais papeis precisam guardar. Como existe prazo para avaliacao trabalhista, a data de saida vem antes de qualquer outra pergunta.',
    blocoProva:
      'Carteira de trabalho, termo de rescisao, contracheques, extrato do FGTS, comprovantes de pagamento e conversas com a empresa ajudam a reconstruir o que foi pago e o que ainda precisa ser conferido.',
    perguntas: [
      { pergunta: 'Quando voce saiu da empresa?', tipo: 'data' },
      { pergunta: 'Qual era o nome da empresa?', tipo: 'texto' },
      { pergunta: 'A carteira era assinada?', tipo: 'texto' },
      { pergunta: 'Recebeu algum acerto? Quanto, mais ou menos?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Sai da empresa e quero conversar sobre meu acerto. Posso informar a data de saida, nome da empresa, se a carteira era assinada e o que recebi.',
    seo: {
      titulo: 'Duvidas sobre rescisao trabalhista | Deila Pinto Advocacia',
      descricao:
        'Atendimento inicial para organizar data de saida, acerto, FGTS, documentos e historico de rescisao trabalhista.',
    },
  },
  {
    campaignCode: 'PREV-PENSAO',
    slug: 'prev-pensao',
    status: 'publicada',
    temLanding: true,
    titulo: 'Pensao por morte: organize os primeiros documentos',
    subtitulo:
      'Um contato cuidadoso para reunir data do falecimento, parentesco, dependencia e documentos da pessoa falecida.',
    blocoDor:
      'Depois de um falecimento, lidar com documentos e INSS pode ser pesado. O atendimento inicial respeita esse momento e coleta apenas o necessario para entender parentesco, dependencia, se ja havia beneficio ou trabalho, e se o pedido ja foi feito.',
    blocoProva:
      'Certidao de obito, documentos pessoais, certidao de casamento ou prova de uniao estavel, documentos dos filhos e historico de trabalho ou beneficio da pessoa falecida ajudam a orientar a analise.',
    perguntas: [
      { pergunta: 'Quando a pessoa faleceu?', tipo: 'data' },
      { pergunta: 'Qual era seu parentesco com ela?', tipo: 'texto' },
      { pergunta: 'Ela recebia beneficio ou estava trabalhando?', tipo: 'texto' },
      { pergunta: 'Ja deu entrada no INSS para a pensao?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Quero conversar sobre pensao por morte. Posso informar data do falecimento, parentesco e se ja houve pedido no INSS.',
    seo: {
      titulo: 'Pensao por morte no RN | Deila Pinto Advocacia',
      descricao:
        'Conversa inicial sobre pensao por morte, documentos, parentesco, dependencia e pedido no INSS.',
    },
  },
  {
    campaignCode: 'PREV-MATERNIDADE',
    slug: 'prev-maternidade',
    status: 'publicada',
    temLanding: true,
    titulo: 'Salario-maternidade para trabalhadora urbana ou rural',
    subtitulo:
      'Atendimento para organizar nascimento, adocao ou guarda, tipo de trabalho e historico de pedido ao INSS.',
    blocoDor:
      'No periodo de nascimento, adocao ou guarda, muitas maes ficam em duvida sobre o que apresentar ao INSS, principalmente quando trabalham na roca, por conta propria ou tiveram vinculos diferentes. A conversa inicial organiza datas e documentos.',
    blocoProva:
      'Certidao de nascimento, termo de guarda ou adocao, documentos pessoais, comprovante de residencia, carteira de trabalho, comprovantes de INSS ou papeis de atividade rural ajudam a entender qual caminho sera analisado.',
    perguntas: [
      { pergunta: 'O bebe ja nasceu? Quando foi ou quando esta previsto?', tipo: 'texto' },
      { pergunta: 'Voce trabalha de carteira assinada, por conta propria ou na roca?', tipo: 'texto' },
      { pergunta: 'Ja deu entrada no INSS?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Quero conversar sobre salario-maternidade. Posso informar a data do nascimento ou previsao, meu tipo de trabalho e se ja pedi no INSS.',
    seo: {
      titulo: 'Salario-maternidade no RN | Deila Pinto Advocacia',
      descricao:
        'Orientacao inicial sobre salario-maternidade para trabalhadora urbana, rural, por conta propria, adocao ou guarda.',
    },
  },
  {
    campaignCode: 'TRAB-HORAS',
    slug: 'trab-horas',
    status: 'publicada',
    temLanding: true,
    titulo: 'Horas trabalhadas alem do combinado',
    subtitulo:
      'Organize horario combinado, horario cumprido, ponto, contracheques e se ainda trabalha na empresa.',
    blocoDor:
      'Jornada longa, intervalo reduzido, trabalho em fim de semana ou registro de ponto confuso podem deixar o trabalhador sem saber como contar sua rotina. O primeiro passo e separar horarios e documentos sem fazer calculos pela landing.',
    blocoProva:
      'Carteira de trabalho, contracheques, cartoes de ponto, escala, mensagens sobre horario e nomes de colegas que conhecem a rotina ajudam a montar a linha do tempo do trabalho.',
    perguntas: [
      { pergunta: 'Voce ainda trabalha la ou ja saiu? Se saiu, quando?', tipo: 'texto' },
      { pergunta: 'Qual horario estava combinado?', tipo: 'texto' },
      { pergunta: 'Qual horario voce realmente cumpria?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Quero conversar sobre horas trabalhadas alem do combinado. Posso informar se ainda trabalho la, meus horarios e os documentos que tenho.',
    seo: {
      titulo: 'Horas extras e jornada de trabalho | Deila Pinto Advocacia',
      descricao:
        'Atendimento inicial para organizar horario combinado, horario cumprido, ponto, contracheques e documentos de jornada.',
    },
  },
  {
    campaignCode: 'TRAB-JUSTACAUSA',
    slug: 'trab-justacausa',
    status: 'publicada',
    temLanding: true,
    titulo: 'Recebeu justa causa e quer entender os proximos passos?',
    subtitulo:
      'Conversa inicial para registrar data da demissao, motivo informado pela empresa, documentos e testemunhas.',
    blocoDor:
      'A justa causa costuma chegar com pressa, constrangimento e pouca explicacao. A landing coleta a data da demissao e o motivo informado, sem julgar a situacao e sem afirmar resultado antes da analise dos documentos.',
    blocoProva:
      'Comunicado de demissao, advertencias, suspensoes, termo de rescisao, contracheques, conversas e nomes de testemunhas ajudam a compreender o contexto apresentado pela empresa e pelo trabalhador.',
    perguntas: [
      { pergunta: 'Quando foi a demissao?', tipo: 'data' },
      { pergunta: 'Qual motivo a empresa informou?', tipo: 'texto' },
      { pergunta: 'Existe documento por escrito ou testemunha?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Recebi justa causa e quero conversar. Posso informar a data da demissao, o motivo que a empresa deu e os documentos que tenho.',
    seo: {
      titulo: 'Justa causa trabalhista | Deila Pinto Advocacia',
      descricao:
        'Conversa inicial sobre justa causa, data da demissao, motivo informado pela empresa, documentos e testemunhas.',
    },
  },
  {
    campaignCode: 'TRAB-INDIRETA',
    slug: 'trab-indireta',
    status: 'publicada',
    temLanding: true,
    titulo: 'Problemas graves no trabalho antes de pedir demissao',
    subtitulo:
      'Se a situacao ficou insustentavel, converse antes de tomar uma decisao que possa prejudicar seus direitos.',
    blocoDor:
      'Atraso de salario, falta de deposito, pressao constante, humilhacao ou condicoes muito ruins podem levar a pessoa a pensar em pedir demissao. Antes disso, e importante contar o que esta acontecendo e guardar provas do modo correto.',
    blocoProva:
      'Contracheques, extrato do FGTS, mensagens, audios, e-mails, atestados e nomes de colegas ajudam a registrar a situacao. Se houver violencia, ameaca ou assedio sexual, o atendimento deve ser humano e imediato.',
    perguntas: [
      { pergunta: 'Voce ainda esta trabalhando la?', tipo: 'texto' },
      { pergunta: 'O que esta acontecendo que tornou a situacao insustentavel?', tipo: 'texto' },
      { pergunta: 'Tem mensagens, audios ou testemunhas?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Estou com problema serio no trabalho e quero conversar antes de pedir demissao. Posso explicar o que esta acontecendo e quais provas tenho.',
    seo: {
      titulo: 'Rescisao indireta e problemas no trabalho | Deila Pinto Advocacia',
      descricao:
        'Atendimento inicial para quem enfrenta atraso, assedio, falta de deposito ou situacao insustentavel no trabalho.',
    },
  },
  {
    campaignCode: 'TRAB-INSALUBRE',
    slug: 'trab-insalubre',
    status: 'publicada',
    temLanding: true,
    titulo: 'Trabalho com risco, ruido, calor, produto quimico ou ambiente nocivo',
    subtitulo:
      'Organize atividade, ambiente, equipamentos de protecao, contracheques e tempo nessas condicoes.',
    blocoDor:
      'Algumas rotinas expoem o trabalhador a barulho, calor, produtos quimicos, lixo, doenca, eletricidade ou inflamaveis. A landing nao classifica o risco; ela coleta a descricao do ambiente e documentos para analise tecnica posterior.',
    blocoProva:
      'Contracheques, fotos seguras do local, exames da empresa, PPP, LTCAT, carteira de trabalho e colegas que conhecem a rotina ajudam a verificar como o trabalho acontecia no dia a dia.',
    perguntas: [
      { pergunta: 'Voce ainda trabalha la ou ja saiu? Se saiu, quando?', tipo: 'texto' },
      { pergunta: 'O que existe no ambiente: ruido, calor, produto quimico, lixo, doenca ou risco?', tipo: 'texto' },
      { pergunta: 'Recebe algum valor a mais no contracheque por isso?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Trabalho ou trabalhei em ambiente com risco ou condicao nociva e quero conversar. Posso descrever minha atividade e os documentos que tenho.',
    seo: {
      titulo: 'Insalubridade e periculosidade no trabalho | Deila Pinto Advocacia',
      descricao:
        'Conversa inicial sobre ambiente de trabalho, risco, EPI, contracheques, PPP e documentos de insalubridade ou periculosidade.',
    },
  },
  {
    campaignCode: 'PREV-REVISAO',
    slug: 'prev-revisao',
    status: 'publicada',
    temLanding: true,
    titulo: 'Revisao de beneficio ja concedido pelo INSS',
    subtitulo:
      'Atendimento inicial para organizar carta de concessao, valor atual, data de inicio e pontos que precisam ser conferidos.',
    blocoDor:
      'Quem ja recebe beneficio pode perceber que algum periodo de trabalho, atividade rural ou atividade nociva nao foi considerado. Como revisao tem prazo, a data de concessao e a carta do INSS sao informacoes importantes desde o primeiro contato.',
    blocoProva:
      'Carta de concessao, extrato de pagamento, carteira de trabalho, documentos rurais e PPP de empresas ajudam a conferir o historico usado pelo INSS, sem estimar valores pela landing.',
    perguntas: [
      { pergunta: 'Qual beneficio voce recebe?', tipo: 'texto' },
      { pergunta: 'Desde quando recebe?', tipo: 'texto' },
      { pergunta: 'Por que acha que o valor esta errado?', tipo: 'texto' },
      { pergunta: 'Tem a carta de concessao?', tipo: 'texto' },
    ],
    mensagemWhatsapp:
      'Ola. Quero conversar sobre revisao de beneficio do INSS. Posso informar qual beneficio recebo, desde quando e o que acho que precisa ser conferido.',
    seo: {
      titulo: 'Revisao de beneficio do INSS | Deila Pinto Advocacia',
      descricao:
        'Orientacao inicial sobre revisao de beneficio, carta de concessao, valor atual, tempo de trabalho e documentos do INSS.',
    },
  },
]

export function richTextFromText(text) {
  return {
    root: {
      children: text.split(/\n{2,}/).map((paragraph) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: paragraph.replace(/\s+/g, ' ').trim(),
            type: 'text',
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}
