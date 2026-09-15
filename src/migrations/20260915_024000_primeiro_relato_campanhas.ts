import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "campaigns_perguntas" AS question
    SET "pergunta" = CASE campaign."campaign_code"
      WHEN 'PREV-BPC' THEN 'Conte brevemente qual é sua dúvida sobre o BPC ou o que está acontecendo.'
      WHEN 'PREV-RURAL' THEN 'Conte brevemente sua dúvida sobre aposentadoria rural ou sua história de trabalho.'
      ELSE question."pergunta"
    END
    FROM "campaigns" AS campaign
    WHERE question."_parent_id" = campaign."id"
      AND question."_order" = 0
      AND campaign."campaign_code" IN ('PREV-BPC', 'PREV-RURAL');
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "campaigns_perguntas" AS question
    SET "pergunta" = CASE campaign."campaign_code"
      WHEN 'PREV-BPC' THEN 'O benefício seria para você ou outra pessoa da família?'
      WHEN 'PREV-RURAL' THEN 'Qual é a sua idade?'
      ELSE question."pergunta"
    END
    FROM "campaigns" AS campaign
    WHERE question."_parent_id" = campaign."id"
      AND question."_order" = 0
      AND campaign."campaign_code" IN ('PREV-BPC', 'PREV-RURAL');
  `)
}
