import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'staff', 'client');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "users_roles" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "public"."enum_users_roles",
      "id" serial PRIMARY KEY NOT NULL
    );

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_roles_parent_id_users_id_fk') THEN
        ALTER TABLE "users_roles"
          ADD CONSTRAINT "users_roles_parent_id_users_id_fk"
          FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");

    INSERT INTO "users_roles" ("order", "parent_id", "value")
    SELECT 1, "id",
      CASE WHEN (SELECT count(*) FROM "users") = 1
        THEN 'admin'::"public"."enum_users_roles"
        ELSE 'client'::"public"."enum_users_roles"
      END
    FROM "users"
    WHERE NOT EXISTS (SELECT 1 FROM "users_roles" WHERE "users_roles"."parent_id" = "users"."id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "users_roles" CASCADE;`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_users_roles";`)
}
