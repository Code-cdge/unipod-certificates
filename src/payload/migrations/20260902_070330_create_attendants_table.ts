import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_attendants_sex" AS ENUM('M', 'F');
  CREATE TABLE "attendants" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"code" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar,
  	"birth_date" date,
  	"sex" "enum_attendants_sex",
  	"phone" varchar,
  	"email" varchar,
  	"created_by_id" uuid,
  	"updated_by_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    CONSTRAINT birth_date_cannot_be_in_the_future CHECK ( birth_date <= now() )
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "attendants_id" uuid;
  ALTER TABLE "attendants" ADD CONSTRAINT "attendants_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade ;
  ALTER TABLE "attendants" ADD CONSTRAINT "attendants_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade ;
  CREATE UNIQUE INDEX "attendants_code_idx" ON "attendants" USING btree ("code");
  CREATE UNIQUE INDEX "attendants_phone_idx" ON "attendants" USING btree ("phone");
  CREATE UNIQUE INDEX "attendants_email_idx" ON "attendants" USING btree ("email");
  CREATE INDEX "attendants_created_by_idx" ON "attendants" USING btree ("created_by_id");
  CREATE INDEX "attendants_updated_by_idx" ON "attendants" USING btree ("updated_by_id");
  CREATE INDEX "attendants_updated_at_idx" ON "attendants" USING btree ("updated_at");
  CREATE INDEX "attendants_created_at_idx" ON "attendants" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_attendants_fk" FOREIGN KEY ("attendants_id") REFERENCES "public"."attendants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_attendants_id_idx" ON "payload_locked_documents_rels" USING btree ("attendants_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "attendants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "attendants" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_attendants_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_attendants_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "attendants_id";
  DROP TYPE "public"."enum_attendants_sex";`)
}
