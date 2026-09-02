import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trainings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"code" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"placement" varchar NOT NULL,
  	"start_date" date,
  	"end_date" date,
  	"created_by_id" uuid,
  	"updated_by_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     CONSTRAINT start_date_must_be_earlier_than_end_date CHECK ( start_date <= end_date )
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "trainings_id" uuid;
  ALTER TABLE "trainings" ADD CONSTRAINT "trainings_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade ;
  ALTER TABLE "trainings" ADD CONSTRAINT "trainings_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade ;
  CREATE UNIQUE INDEX "trainings_code_idx" ON "trainings" USING btree ("code");
  CREATE INDEX "trainings_created_by_idx" ON "trainings" USING btree ("created_by_id");
  CREATE INDEX "trainings_updated_by_idx" ON "trainings" USING btree ("updated_by_id");
  CREATE INDEX "trainings_updated_at_idx" ON "trainings" USING btree ("updated_at");
  CREATE INDEX "trainings_created_at_idx" ON "trainings" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_trainings_id_idx" ON "payload_locked_documents_rels" USING btree ("trainings_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trainings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "trainings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_trainings_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_trainings_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "trainings_id";`)
}
