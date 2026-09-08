import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
CREATE TABLE campaign_editorial_backups_20260908 (campaign_id integer PRIMARY KEY, snapshot jsonb NOT NULL, backed_up_at timestamptz NOT NULL DEFAULT now());
SELECT id FROM campaigns WHERE campaign_code = 'PREV-BPC' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'PREV-BPC';
UPDATE campaigns SET titulo = 'BPC/LOAS: entenda por onde começar', updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND titulo IS NOT DISTINCT FROM 'BPC/LOAS para idoso ou pessoa com deficiencia';
UPDATE campaigns SET subtitulo = 'Para famílias com uma pessoa idosa ou com deficiência: organize suas dúvidas sobre renda, CadÚnico e pedido ao INSS.', updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND subtitulo IS NOT DISTINCT FROM 'Um primeiro atendimento simples para organizar idade, saude, renda da casa, CadUnico e resposta do INSS, quando ja houve pedido.';
UPDATE campaigns SET seo_titulo = 'BPC/LOAS: entenda por onde começar', updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND seo_titulo IS NOT DISTINCT FROM 'BPC/LOAS no RN | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Para famílias com uma pessoa idosa ou com deficiência: organize suas dúvidas sobre renda, CadÚnico e pedido ao INSS.', updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND seo_descricao IS NOT DISTINCT FROM 'Orientacao inicial sobre BPC/LOAS para idoso ou pessoa com deficiencia, com organizacao de documentos e informacoes para analise.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Cuidar de alguém e lidar com pouca renda já exige muito da família. Se você não sabe por onde começar o pedido de BPC, ou recebeu uma negativa, uma conversa pode ajudar a organizar a situação sem linguagem complicada.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quando a familia vive com pouca renda e uma pessoa idosa ou com deficiencia precisa de cuidado diario, e comum ficar em duvida sobre quais documentos juntar e como explicar a situacao ao INSS. A conversa inicial serve para colocar essas informacoes em ordem, com linguagem simples.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Separe documentos pessoais, comprovante de residência, CadÚnico ou NIS e informações de quem mora na casa. Laudos e exames ajudam quando o pedido envolve deficiência. Se o INSS já respondeu, guarde a carta ou o comprovante do Meu INSS.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Para a analise, costumam ajudar documentos pessoais, comprovante de residencia, dados de quem mora na mesma casa, CadUnico ou NIS, laudos e exames recentes. Se ja houve pedido negado, a carta ou print do Meu INSS ajuda a entender o que aconteceu.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A equipe pode ouvir a história da família, conferir os documentos disponíveis e explicar quais informações ainda precisam ser reunidas para a análise do BPC. O atendimento considera as particularidades de cada pessoa.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-BPC' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'O benefício seria para você ou outra pessoa da família?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-BPC')
      AND pergunta = 'O beneficio seria para voce ou para outra pessoa da familia?';
UPDATE campaigns_perguntas SET pergunta = 'Qual é a idade dessa pessoa?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-BPC')
      AND pergunta = 'Qual a idade dessa pessoa?';
UPDATE campaigns_perguntas SET pergunta = 'Ela tem alguma doença ou deficiência? Qual?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-BPC')
      AND pergunta = 'Ela tem alguma doenca ou deficiencia? Qual?';
UPDATE campaigns_perguntas SET pergunta = 'Quantas pessoas moram na mesma casa, contando com ela?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-BPC')
      AND pergunta = 'Quantas pessoas moram na mesma casa, contando com ela?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'prev-bpc-editorial-faq-0', 'Já recebi uma negativa. Posso conversar sobre ela?', 'Sim. Informe quando recebeu a resposta e, se possível, tenha a carta do INSS em mãos. O motivo informado ajuda a orientar a análise.'
      FROM campaigns WHERE campaign_code = 'PREV-BPC'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'PREV-RURAL' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'PREV-RURAL';
UPDATE campaigns SET titulo = 'Trabalhou na roça e tem dúvidas sobre aposentadoria?', updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND titulo IS NOT DISTINCT FROM 'Aposentadoria de quem trabalhou na roca';
UPDATE campaigns SET subtitulo = 'Sua história de trabalho merece ser ouvida. Comece contando sua idade, o tempo na atividade rural e os documentos que conseguiu guardar.', updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND subtitulo IS NOT DISTINCT FROM 'Atendimento para organizar idade, tempo de trabalho rural, documentos antigos e historico de pedido no INSS.';
UPDATE campaigns SET seo_titulo = 'Trabalhou na roça e tem dúvidas sobre aposentadoria?', updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND seo_titulo IS NOT DISTINCT FROM 'Aposentadoria rural no RN | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Sua história de trabalho merece ser ouvida. Comece contando sua idade, o tempo na atividade rural e os documentos que conseguiu guardar.', updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND seo_descricao IS NOT DISTINCT FROM 'Conversa inicial sobre aposentadoria de trabalhador rural, documentos antigos, tempo de roca e historico no INSS.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Anos de trabalho na roça nem sempre vêm acompanhados de uma pasta de documentos. Pode haver papéis em lugares diferentes, períodos sem registro e dúvidas sobre como contar essa história ao INSS.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quem trabalhou muitos anos na roca muitas vezes nao tem todos os papeis guardados. Isso nao deve encerrar a conversa. O primeiro passo e contar a historia de trabalho com calma e separar o que existir: documento antigo, sindicato, nota de produtor, contrato, certidao ou testemunhas.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Reúna o que tiver: carteira de trabalho, certidões, documentos de terra, contratos, notas de produtor e fichas de sindicato. Papéis de épocas diferentes ajudam a organizar a trajetória. Informe também se já fez um pedido ao INSS.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A avaliacao fica mais clara quando aparecem documentos de epocas diferentes, como certidao, carteira de trabalho, ficha de sindicato, documento de terra, nota de produtor ou nomes de pessoas que conhecem a rotina rural. Mesmo com poucos papeis, vale organizar o que existe.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"O primeiro atendimento ajuda a montar a linha do tempo do trabalho rural e a identificar os documentos disponíveis para uma avaliação individual. Você pode começar relatando o que lembra, mesmo sem ter todos os papéis separados.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-RURAL' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Qual é a sua idade?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-RURAL')
      AND pergunta = 'Qual a sua idade?';
UPDATE campaigns_perguntas SET pergunta = 'Por quantos anos trabalhou na roça, aproximadamente?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-RURAL')
      AND pergunta = 'Por quantos anos trabalhou na roca, mais ou menos?';
UPDATE campaigns_perguntas SET pergunta = 'Tem algum documento antigo desse trabalho?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-RURAL')
      AND pergunta = 'Tem algum papel antigo que mostre esse trabalho?';
UPDATE campaigns_perguntas SET pergunta = 'Já fez algum pedido ao INSS?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-RURAL')
      AND pergunta = 'Ja deu entrada no INSS alguma vez?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'prev-rural-editorial-faq-0', 'Preciso ter todos os documentos para o primeiro contato?', 'Você pode começar contando sua história e informando quais documentos possui. A equipe orientará o que pode ser útil reunir para a análise.'
      FROM campaigns WHERE campaign_code = 'PREV-RURAL'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE';
UPDATE campaigns SET titulo = 'A saúde está impedindo você de trabalhar?', updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND titulo IS NOT DISTINCT FROM 'Beneficio por incapacidade para trabalhar';
UPDATE campaigns SET subtitulo = 'Organize suas dúvidas sobre afastamento, perícia, pedido negado ou benefício interrompido.', updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND subtitulo IS NOT DISTINCT FROM 'Organize informacoes sobre saude, afastamento, pericia, resposta do INSS e documentos medicos recentes.';
UPDATE campaigns SET seo_titulo = 'A saúde está impedindo você de trabalhar?', updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND seo_titulo IS NOT DISTINCT FROM 'Beneficio por incapacidade no RN | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Organize suas dúvidas sobre afastamento, perícia, pedido negado ou benefício interrompido.', updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND seo_descricao IS NOT DISTINCT FROM 'Orientacao inicial para quem esta sem trabalhar por motivo de saude, teve pericia, pedido negado ou beneficio cortado.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quando um problema de saúde afeta o trabalho, dúvidas sobre laudos, perícia e resposta do INSS se somam à preocupação com a renda. Entender em que etapa está o pedido ajuda a preparar uma conversa mais objetiva.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quando a saude impede o trabalho, a preocupacao costuma vir junto com duvidas sobre laudo, pericia, alta programada ou beneficio cortado. Se existe pericia marcada, carta do INSS ou prazo em andamento, o contato deve ser direto e sem etapas desnecessarias.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Laudos, exames, atestados, receitas e respostas do INSS ajudam a explicar a situação. Separe também as datas de afastamento e de perícia, se houver, e informe se continua trabalhando.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Laudos, exames, receitas, atestados, carteira de trabalho e respostas do INSS ajudam a entender o momento do caso. Documentos recentes costumam explicar melhor a situacao atual, principalmente quando houve pericia ou corte de beneficio.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A equipe pode organizar o histórico de saúde e trabalho apresentado, conferir a resposta do INSS e indicar quais informações são necessárias para avaliar o caso. Se há perícia ou prazo informado em uma carta, mencione a data no primeiro contato.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-INCAPACIDADE' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Qual problema de saúde está impedindo o trabalho?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE')
      AND pergunta = 'Qual problema de saude esta impedindo o trabalho?';
UPDATE campaigns_perguntas SET pergunta = 'Desde quando está assim?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE')
      AND pergunta = 'Desde quando esta assim?';
UPDATE campaigns_perguntas SET pergunta = 'Está trabalhando agora ou precisou parar?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE')
      AND pergunta = 'Esta trabalhando agora ou parou?';
UPDATE campaigns_perguntas SET pergunta = 'Já passou por perícia ou tem uma marcada?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE')
      AND pergunta = 'Ja passou por pericia ou tem pericia marcada?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'prev-incapacidade-editorial-faq-0', 'Tenho perícia marcada. O que devo informar?', 'Informe a data e quais documentos médicos estão disponíveis. Se recebeu uma comunicação do INSS, guarde uma cópia para apresentar à equipe.'
      FROM campaigns WHERE campaign_code = 'PREV-INCAPACIDADE'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO';
UPDATE campaigns SET titulo = 'Saiu da empresa e ficou com dúvidas sobre o acerto?', updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND titulo IS NOT DISTINCT FROM 'Saiu da empresa e ficou com duvida sobre o acerto?';
UPDATE campaigns SET subtitulo = 'Comece pela data de saída. Depois, organize o que recebeu, os documentos da rescisão e suas dúvidas sobre o FGTS.', updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND subtitulo IS NOT DISTINCT FROM 'A primeira informacao e a data de saida, porque pode haver prazo correndo. Depois, organizamos documentos e valores recebidos.';
UPDATE campaigns SET seo_titulo = 'Saiu da empresa e ficou com dúvidas sobre o acerto?', updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND seo_titulo IS NOT DISTINCT FROM 'Duvidas sobre rescisao trabalhista | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Comece pela data de saída. Depois, organize o que recebeu, os documentos da rescisão e suas dúvidas sobre o FGTS.', updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND seo_descricao IS NOT DISTINCT FROM 'Atendimento inicial para organizar data de saida, acerto, FGTS, documentos e historico de rescisao trabalhista.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Depois do desligamento, pode ser difícil entender o termo de rescisão e conferir os pagamentos. Antes de tirar conclusões, vale reunir os documentos e reconstruir o que aconteceu na saída da empresa.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Depois da saida da empresa, muitas pessoas nao sabem se o acerto veio completo, se o FGTS foi liberado ou quais papeis precisam guardar. Como existe prazo para avaliacao trabalhista, a data de saida vem antes de qualquer outra pergunta.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Carteira de trabalho, termo de rescisão, contracheques, extrato do FGTS e comprovantes de pagamento ajudam na conferência. Guarde também as comunicações sobre o desligamento.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Carteira de trabalho, termo de rescisao, contracheques, extrato do FGTS, comprovantes de pagamento e conversas com a empresa ajudam a reconstruir o que foi pago e o que ainda precisa ser conferido.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"O atendimento começa pela data de saída e pelo relato do desligamento. Com os documentos, a equipe pode avaliar os pontos que precisam de esclarecimento e explicar os próximos passos possíveis.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-RESCISAO' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Quando você saiu da empresa?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO')
      AND pergunta = 'Quando voce saiu da empresa?';
UPDATE campaigns_perguntas SET pergunta = 'Qual era o nome da empresa?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO')
      AND pergunta = 'Qual era o nome da empresa?';
UPDATE campaigns_perguntas SET pergunta = 'A carteira era assinada?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO')
      AND pergunta = 'A carteira era assinada?';
UPDATE campaigns_perguntas SET pergunta = 'Recebeu algum acerto? Qual valor aproximado?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO')
      AND pergunta = 'Recebeu algum acerto? Quanto, mais ou menos?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'trab-rescisao-editorial-faq-0', 'Não sei se o valor está correto. Como começar?', 'Informe a data de saída e o que recebeu. O termo de rescisão e os comprovantes ajudam a equipe a entender os pagamentos antes de qualquer conclusão.'
      FROM campaigns WHERE campaign_code = 'TRAB-RESCISAO'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'PREV-PENSAO' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'PREV-PENSAO';
UPDATE campaigns SET titulo = 'Pensão por morte: orientação para os primeiros passos', updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND titulo IS NOT DISTINCT FROM 'Pensao por morte: organize os primeiros documentos';
UPDATE campaigns SET subtitulo = 'Um contato cuidadoso para organizar documentos, parentesco e dúvidas sobre o pedido ao INSS.', updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND subtitulo IS NOT DISTINCT FROM 'Um contato cuidadoso para reunir data do falecimento, parentesco, dependencia e documentos da pessoa falecida.';
UPDATE campaigns SET seo_titulo = 'Pensão por morte: orientação para os primeiros passos', updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND seo_titulo IS NOT DISTINCT FROM 'Pensao por morte no RN | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Um contato cuidadoso para organizar documentos, parentesco e dúvidas sobre o pedido ao INSS.', updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND seo_descricao IS NOT DISTINCT FROM 'Conversa inicial sobre pensao por morte, documentos, parentesco, dependencia e pedido no INSS.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Após um falecimento, lidar com documentos e dúvidas sobre renda pode tornar o momento ainda mais difícil. O primeiro contato permite organizar as informações com calma, respeitando a situação da família.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Depois de um falecimento, lidar com documentos e INSS pode ser pesado. O atendimento inicial respeita esse momento e coleta apenas o necessario para entender parentesco, dependencia, se ja havia beneficio ou trabalho, e se o pedido ja foi feito.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Separe a certidão de óbito, documentos pessoais, comprovantes de parentesco ou união e informações sobre trabalho ou benefício da pessoa falecida. Se já houve pedido ao INSS, guarde o protocolo e a resposta.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Certidao de obito, documentos pessoais, certidao de casamento ou prova de uniao estavel, documentos dos filhos e historico de trabalho ou beneficio da pessoa falecida ajudam a orientar a analise.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A equipe pode ouvir o contexto familiar, organizar as datas e conferir o material disponível para a análise da pensão. O atendimento começa com as informações essenciais, sem exigir que você tenha tudo resolvido.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-PENSAO' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Quando a pessoa faleceu?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-PENSAO')
      AND pergunta = 'Quando a pessoa faleceu?';
UPDATE campaigns_perguntas SET pergunta = 'Qual era seu parentesco com ela?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-PENSAO')
      AND pergunta = 'Qual era seu parentesco com ela?';
UPDATE campaigns_perguntas SET pergunta = 'Ela recebia benefício ou estava trabalhando?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-PENSAO')
      AND pergunta = 'Ela recebia beneficio ou estava trabalhando?';
UPDATE campaigns_perguntas SET pergunta = 'Já pediu a pensão ao INSS?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-PENSAO')
      AND pergunta = 'Ja deu entrada no INSS para a pensao?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'prev-pensao-editorial-faq-0', 'Outra pessoa da família pode ajudar no primeiro contato?', 'Pode ajudar a organizar o relato e os documentos. Informe para quem seria o atendimento e qual era o parentesco com a pessoa falecida.'
      FROM campaigns WHERE campaign_code = 'PREV-PENSAO'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'PREV-MATERNIDADE' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'PREV-MATERNIDADE';
UPDATE campaigns SET titulo = 'Salário-maternidade: organize suas dúvidas', updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND titulo IS NOT DISTINCT FROM 'Salario-maternidade para trabalhadora urbana ou rural';
UPDATE campaigns SET subtitulo = 'Orientação inicial sobre nascimento, adoção ou guarda, considerando sua história de trabalho urbano ou rural.', updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND subtitulo IS NOT DISTINCT FROM 'Atendimento para organizar nascimento, adocao ou guarda, tipo de trabalho e historico de pedido ao INSS.';
UPDATE campaigns SET seo_titulo = 'Salário-maternidade: organize suas dúvidas', updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND seo_titulo IS NOT DISTINCT FROM 'Salario-maternidade no RN | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Orientação inicial sobre nascimento, adoção ou guarda, considerando sua história de trabalho urbano ou rural.', updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND seo_descricao IS NOT DISTINCT FROM 'Orientacao inicial sobre salario-maternidade para trabalhadora urbana, rural, por conta propria, adocao ou guarda.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Com a chegada de uma criança, nem sempre é simples entender quais informações apresentar ao INSS. Trabalho por conta própria, na roça ou em empregos diferentes pode gerar dúvidas sobre como organizar o histórico.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"No periodo de nascimento, adocao ou guarda, muitas maes ficam em duvida sobre o que apresentar ao INSS, principalmente quando trabalham na roca, por conta propria ou tiveram vinculos diferentes. A conversa inicial organiza datas e documentos.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Certidão de nascimento, termo de adoção ou guarda, carteira de trabalho e comprovantes de contribuição ou de atividade rural ajudam na análise. Informe também se já apresentou um pedido ao INSS.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Certidao de nascimento, termo de guarda ou adocao, documentos pessoais, comprovante de residencia, carteira de trabalho, comprovantes de INSS ou papeis de atividade rural ajudam a entender qual caminho sera analisado.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A conversa inicial reúne as datas, o tipo de trabalho e os documentos disponíveis. A equipe pode explicar quais informações precisam ser conferidas para avaliar a situação individual.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-MATERNIDADE' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'A criança já nasceu? Qual é a data ou previsão?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-MATERNIDADE')
      AND pergunta = 'O bebe ja nasceu? Quando foi ou quando esta previsto?';
UPDATE campaigns_perguntas SET pergunta = 'Você trabalha de carteira assinada, por conta própria ou na roça?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-MATERNIDADE')
      AND pergunta = 'Voce trabalha de carteira assinada, por conta propria ou na roca?';
UPDATE campaigns_perguntas SET pergunta = 'Já fez o pedido ao INSS?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-MATERNIDADE')
      AND pergunta = 'Ja deu entrada no INSS?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'prev-maternidade-editorial-faq-0', 'O que preciso contar no primeiro atendimento?', 'Informe a data do nascimento ou previsão, adoção ou guarda, seu tipo de trabalho e se já fez um pedido ao INSS. Comece pelo que tiver disponível.'
      FROM campaigns WHERE campaign_code = 'PREV-MATERNIDADE'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'TRAB-HORAS' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'TRAB-HORAS';
UPDATE campaigns SET titulo = 'Sua jornada vai além do horário combinado?', updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND titulo IS NOT DISTINCT FROM 'Horas trabalhadas alem do combinado';
UPDATE campaigns SET subtitulo = 'Conte como é sua rotina: entrada, saída, intervalos e registros de ponto ajudam a entender o trabalho realizado.', updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND subtitulo IS NOT DISTINCT FROM 'Organize horario combinado, horario cumprido, ponto, contracheques e se ainda trabalha na empresa.';
UPDATE campaigns SET seo_titulo = 'Sua jornada vai além do horário combinado?', updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND seo_titulo IS NOT DISTINCT FROM 'Horas extras e jornada de trabalho | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Conte como é sua rotina: entrada, saída, intervalos e registros de ponto ajudam a entender o trabalho realizado.', updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND seo_descricao IS NOT DISTINCT FROM 'Atendimento inicial para organizar horario combinado, horario cumprido, ponto, contracheques e documentos de jornada.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Saídas frequentes depois do horário, intervalos reduzidos ou registros de ponto que não refletem a rotina podem gerar dúvidas. Organizar os horários reais é o primeiro passo para uma análise baseada no que aconteceu.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Jornada longa, intervalo reduzido, trabalho em fim de semana ou registro de ponto confuso podem deixar o trabalhador sem saber como contar sua rotina. O primeiro passo e separar horarios e documentos sem fazer calculos pela landing.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Reúna contracheques, cartões de ponto, escalas e mensagens sobre horários. Informe se ainda trabalha na empresa e, se já saiu, a data do desligamento.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Carteira de trabalho, contracheques, cartoes de ponto, escala, mensagens sobre horario e nomes de colegas que conhecem a rotina ajudam a montar a linha do tempo do trabalho.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A equipe pode comparar o relato da jornada com os registros disponíveis e identificar o que precisa ser esclarecido. Cálculos e conclusões dependem da análise dos documentos e da situação de trabalho.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-HORAS' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Você ainda trabalha na empresa? Se saiu, quando?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-HORAS')
      AND pergunta = 'Voce ainda trabalha la ou ja saiu? Se saiu, quando?';
UPDATE campaigns_perguntas SET pergunta = 'Qual horário estava combinado?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-HORAS')
      AND pergunta = 'Qual horario estava combinado?';
UPDATE campaigns_perguntas SET pergunta = 'Qual horário você realmente cumpria?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-HORAS')
      AND pergunta = 'Qual horario voce realmente cumpria?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'trab-horas-editorial-faq-0', 'Não tenho todos os cartões de ponto. Posso entrar em contato?', 'Sim. Descreva sua rotina e informe quais registros possui. A equipe orientará quais informações podem ajudar a compreender a jornada.'
      FROM campaigns WHERE campaign_code = 'TRAB-HORAS'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'TRAB-JUSTACAUSA' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'TRAB-JUSTACAUSA';
UPDATE campaigns SET titulo = 'Recebeu uma justa causa e precisa entender o que aconteceu?', updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND titulo IS NOT DISTINCT FROM 'Recebeu justa causa e quer entender os proximos passos?';
UPDATE campaigns SET subtitulo = 'Comece pela data da demissão e pelo motivo informado. Seus documentos ajudam a avaliar a situação com cuidado.', updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND subtitulo IS NOT DISTINCT FROM 'Conversa inicial para registrar data da demissao, motivo informado pela empresa, documentos e testemunhas.';
UPDATE campaigns SET seo_titulo = 'Recebeu uma justa causa e precisa entender o que aconteceu?', updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND seo_titulo IS NOT DISTINCT FROM 'Justa causa trabalhista | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Comece pela data da demissão e pelo motivo informado. Seus documentos ajudam a avaliar a situação com cuidado.', updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND seo_descricao IS NOT DISTINCT FROM 'Conversa inicial sobre justa causa, data da demissao, motivo informado pela empresa, documentos e testemunhas.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Uma demissão por justa causa pode chegar acompanhada de dúvidas e pouca explicação. Registrar o motivo apresentado pela empresa e o contexto dos fatos ajuda a preparar uma avaliação sem conclusões precipitadas.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A justa causa costuma chegar com pressa, constrangimento e pouca explicacao. A landing coleta a data da demissao e o motivo informado, sem julgar a situacao e sem afirmar resultado antes da analise dos documentos.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Separe o comunicado de demissão, advertências, suspensões, termo de rescisão e conversas relacionadas aos fatos. Informe se há pessoas que acompanharam o ocorrido.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Comunicado de demissao, advertencias, suspensoes, termo de rescisao, contracheques, conversas e nomes de testemunhas ajudam a compreender o contexto apresentado pela empresa e pelo trabalhador.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"O atendimento permite organizar a sequência dos acontecimentos e conferir os documentos apresentados. Só depois dessa análise é possível orientar os próximos passos conforme o caso.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-JUSTACAUSA' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Quando foi a demissão?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-JUSTACAUSA')
      AND pergunta = 'Quando foi a demissao?';
UPDATE campaigns_perguntas SET pergunta = 'Qual motivo a empresa informou?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-JUSTACAUSA')
      AND pergunta = 'Qual motivo a empresa informou?';
UPDATE campaigns_perguntas SET pergunta = 'Há documento por escrito ou alguém que acompanhou os fatos?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-JUSTACAUSA')
      AND pergunta = 'Existe documento por escrito ou testemunha?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'trab-justacausa-editorial-faq-0', 'A empresa não explicou por escrito. O que posso informar?', 'Conte o que foi comunicado, por quem e em qual data. Informe também se há mensagens, documentos ou pessoas que acompanharam a conversa.'
      FROM campaigns WHERE campaign_code = 'TRAB-JUSTACAUSA'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INDIRETA' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'TRAB-INDIRETA';
UPDATE campaigns SET titulo = 'O trabalho ficou insustentável?', updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND titulo IS NOT DISTINCT FROM 'Problemas graves no trabalho antes de pedir demissao';
UPDATE campaigns SET subtitulo = 'Atrasos, pressão ou humilhações no trabalho? Entenda sua situação antes de decidir sobre a saída da empresa.', updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND subtitulo IS NOT DISTINCT FROM 'Se a situacao ficou insustentavel, converse antes de tomar uma decisao que possa prejudicar seus direitos.';
UPDATE campaigns SET seo_titulo = 'O trabalho ficou insustentável?', updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND seo_titulo IS NOT DISTINCT FROM 'Rescisao indireta e problemas no trabalho | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Atrasos, pressão ou humilhações no trabalho? Entenda sua situação antes de decidir sobre a saída da empresa.', updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND seo_descricao IS NOT DISTINCT FROM 'Atendimento inicial para quem enfrenta atraso, assedio, falta de deposito ou situacao insustentavel no trabalho.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Salário atrasado, dúvidas sobre depósitos do FGTS, pressão constante ou humilhações podem levar você a pensar em pedir demissão. Reunir os fatos e buscar orientação ajuda a avaliar a situação com mais clareza.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Atraso de salario, falta de deposito, pressao constante, humilhacao ou condicoes muito ruins podem levar a pessoa a pensar em pedir demissao. Antes disso, e importante contar o que esta acontecendo e guardar provas do modo correto.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Contracheques, extratos do FGTS e mensagens que você já possui ajudam a organizar o relato. Informe quando os problemas começaram, se ainda trabalha na empresa e quem acompanhou os acontecimentos.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Contracheques, extrato do FGTS, mensagens, audios, e-mails, atestados e nomes de colegas ajudam a registrar a situacao. Se houver violencia, ameaca ou assedio sexual, o atendimento deve ser humano e imediato.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A equipe pode ouvir seu relato, conferir os registros disponíveis e avaliar se a rescisão indireta é uma questão a ser examinada no seu caso. A página não substitui essa análise individual nem orienta uma decisão automática sobre o emprego.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-INDIRETA' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Você ainda está trabalhando na empresa?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INDIRETA')
      AND pergunta = 'Voce ainda esta trabalhando la?';
UPDATE campaigns_perguntas SET pergunta = 'O que está tornando a situação insustentável?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INDIRETA')
      AND pergunta = 'O que esta acontecendo que tornou a situacao insustentavel?';
UPDATE campaigns_perguntas SET pergunta = 'Você tem mensagens, áudios ou pessoas que acompanharam os fatos?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INDIRETA')
      AND pergunta = 'Tem mensagens, audios ou testemunhas?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'trab-indireta-editorial-faq-0', 'Ainda estou na empresa. Posso conversar sobre o problema?', 'Sim. Informe que o vínculo continua ativo e descreva o que está acontecendo. A equipe poderá orientar a análise antes de você decidir sobre a saída.'
      FROM campaigns WHERE campaign_code = 'TRAB-INDIRETA'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INSALUBRE' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'TRAB-INSALUBRE';
UPDATE campaigns SET titulo = 'Seu trabalho envolve exposição a risco ou agentes nocivos?', updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND titulo IS NOT DISTINCT FROM 'Trabalho com risco, ruido, calor, produto quimico ou ambiente nocivo';
UPDATE campaigns SET subtitulo = 'Ruído, calor, produtos químicos ou outras condições: descreva o ambiente e esclareça suas dúvidas.', updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND subtitulo IS NOT DISTINCT FROM 'Organize atividade, ambiente, equipamentos de protecao, contracheques e tempo nessas condicoes.';
UPDATE campaigns SET seo_titulo = 'Seu trabalho envolve exposição a risco ou agentes nocivos?', updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND seo_titulo IS NOT DISTINCT FROM 'Insalubridade e periculosidade no trabalho | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Ruído, calor, produtos químicos ou outras condições: descreva o ambiente e esclareça suas dúvidas.', updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND seo_descricao IS NOT DISTINCT FROM 'Conversa inicial sobre ambiente de trabalho, risco, EPI, contracheques, PPP e documentos de insalubridade ou periculosidade.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quem convive com condições difíceis no trabalho nem sempre sabe como explicar a exposição ou entender os valores no contracheque. O relato da atividade e do ambiente ajuda a definir o que precisa de avaliação.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Algumas rotinas expoem o trabalhador a barulho, calor, produtos quimicos, lixo, doenca, eletricidade ou inflamaveis. A landing nao classifica o risco; ela coleta a descricao do ambiente e documentos para analise tecnica posterior.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Contracheques, documentos sobre equipamentos de proteção, exames ocupacionais e PPP ou LTCAT, se disponíveis, ajudam a compreender a rotina. Conte por quanto tempo trabalhou nessas condições.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Contracheques, fotos seguras do local, exames da empresa, PPP, LTCAT, carteira de trabalho e colegas que conhecem a rotina ajudam a verificar como o trabalho acontecia no dia a dia.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"O primeiro atendimento organiza a descrição da atividade e os documentos existentes. A classificação das condições e qualquer conclusão sobre adicionais dependem da análise específica, inclusive técnica quando necessária.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'TRAB-INSALUBRE' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Você ainda trabalha na empresa? Se saiu, quando?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INSALUBRE')
      AND pergunta = 'Voce ainda trabalha la ou ja saiu? Se saiu, quando?';
UPDATE campaigns_perguntas SET pergunta = 'Como é o ambiente e a exposição a ruído, calor, produtos ou riscos?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INSALUBRE')
      AND pergunta = 'O que existe no ambiente: ruido, calor, produto quimico, lixo, doenca ou risco?';
UPDATE campaigns_perguntas SET pergunta = 'Recebe algum adicional no contracheque por essas condições?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'TRAB-INSALUBRE')
      AND pergunta = 'Recebe algum valor a mais no contracheque por isso?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'trab-insalubre-editorial-faq-0', 'Basta o trabalho ser desconfortável para haver um adicional?', 'A página não permite concluir isso. É preciso avaliar a atividade, a exposição e os documentos do caso, com análise técnica quando necessária.'
      FROM campaigns WHERE campaign_code = 'TRAB-INSALUBRE'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
SELECT id FROM campaigns WHERE campaign_code = 'PREV-REVISAO' FOR UPDATE;
INSERT INTO campaign_editorial_backups_20260908 (campaign_id, snapshot)
    SELECT id, jsonb_build_object('campaign', to_jsonb(campaigns), 'perguntas',
      (SELECT jsonb_agg(q) FROM campaigns_perguntas q WHERE q._parent_id = campaigns.id))
    FROM campaigns WHERE campaign_code = 'PREV-REVISAO';
UPDATE campaigns SET titulo = 'Tem dúvidas sobre o benefício que já recebe?', updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND titulo IS NOT DISTINCT FROM 'Revisao de beneficio ja concedido pelo INSS';
UPDATE campaigns SET subtitulo = 'Organize a carta de concessão, as datas e os períodos de trabalho que você acredita que precisam ser conferidos.', updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND subtitulo IS NOT DISTINCT FROM 'Atendimento inicial para organizar carta de concessao, valor atual, data de inicio e pontos que precisam ser conferidos.';
UPDATE campaigns SET seo_titulo = 'Tem dúvidas sobre o benefício que já recebe?', updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND seo_titulo IS NOT DISTINCT FROM 'Revisao de beneficio do INSS | Deila Pinto Advocacia';
UPDATE campaigns SET seo_descricao = 'Organize a carta de concessão, as datas e os períodos de trabalho que você acredita que precisam ser conferidos.', updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND seo_descricao IS NOT DISTINCT FROM 'Orientacao inicial sobre revisao de beneficio, carta de concessao, valor atual, tempo de trabalho e documentos do INSS.';
UPDATE campaigns SET bloco_dor = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Ao consultar o benefício, você pode encontrar informações que não entende ou períodos de trabalho que parecem não ter sido considerados. Conferir o histórico ajuda a esclarecer a dúvida antes de pensar em revisão.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND bloco_dor IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Quem ja recebe beneficio pode perceber que algum periodo de trabalho, atividade rural ou atividade nociva nao foi considerado. Como revisao tem prazo, a data de concessao e a carta do INSS sao informacoes importantes desde o primeiro contato.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_prova = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Carta de concessão, extrato de pagamento e carteira de trabalho são um ponto de partida. Documentos de atividade rural e PPP, quando relacionados à sua dúvida, também podem ajudar.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND bloco_prova IS NOT DISTINCT FROM '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Carta de concessao, extrato de pagamento, carteira de trabalho, documentos rurais e PPP de empresas ajudam a conferir o historico usado pelo INSS, sem estimar valores pela landing.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
UPDATE campaigns SET bloco_orientacao = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A equipe pode conferir as informações usadas na concessão e ouvir o motivo da sua dúvida. A análise considera as datas e os documentos; não há estimativa de aumento ou promessa de revisão pela página.","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb, updated_at = now()
      WHERE campaign_code = 'PREV-REVISAO' AND bloco_orientacao IS NOT DISTINCT FROM NULL;
UPDATE campaigns_perguntas SET pergunta = 'Qual benefício você recebe?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-REVISAO')
      AND pergunta = 'Qual beneficio voce recebe?';
UPDATE campaigns_perguntas SET pergunta = 'Desde quando recebe?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-REVISAO')
      AND pergunta = 'Desde quando recebe?';
UPDATE campaigns_perguntas SET pergunta = 'O que você gostaria de conferir no benefício?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-REVISAO')
      AND pergunta = 'Por que acha que o valor esta errado?';
UPDATE campaigns_perguntas SET pergunta = 'Tem a carta de concessão?'
      WHERE _parent_id IN (SELECT id FROM campaigns WHERE campaign_code = 'PREV-REVISAO')
      AND pergunta = 'Tem a carta de concessao?';
INSERT INTO campaigns_faq (_order, _parent_id, id, pergunta, resposta)
      SELECT 1, id, 'prev-revisao-editorial-faq-0', 'Uma análise significa que o benefício vai aumentar?', 'Não. O primeiro passo é entender o cálculo e os documentos disponíveis. A análise pode esclarecer a dúvida sem indicar necessidade de revisão.'
      FROM campaigns WHERE campaign_code = 'PREV-REVISAO'
      AND NOT EXISTS (SELECT 1 FROM campaigns_faq WHERE _parent_id = campaigns.id);
`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error('Rollback de conteúdo exige comparar o backup campaign_editorial_backups_20260908 com a versão atual para preservar edições posteriores.')
}
