import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "attendant_trainings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"attendant_id" uuid NOT NULL,
  	"training_id" uuid NOT NULL,
  	"certificate_id" uuid,
  	"grade" numeric,
  	"qualification" varchar,
  	"created_by_id" uuid,
  	"updated_by_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     CONSTRAINT grade_must_be_positive CHECK ( grade >= 0 ),
     CONSTRAINT attendant_training_unique UNIQUE (attendant_id, training_id)
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "attendant_trainings_id" uuid;
  ALTER TABLE "attendant_trainings" ADD CONSTRAINT "attendant_trainings_attendant_id_attendants_id_fk" FOREIGN KEY ("attendant_id") REFERENCES "public"."attendants"("id") ON DELETE cascade ON UPDATE cascade ;
  ALTER TABLE "attendant_trainings" ADD CONSTRAINT "attendant_trainings_training_id_trainings_id_fk" FOREIGN KEY ("training_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE cascade ;
  ALTER TABLE "attendant_trainings" ADD CONSTRAINT "attendant_trainings_certificate_id_media_id_fk" FOREIGN KEY ("certificate_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE cascade ;
  ALTER TABLE "attendant_trainings" ADD CONSTRAINT "attendant_trainings_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade ;
  ALTER TABLE "attendant_trainings" ADD CONSTRAINT "attendant_trainings_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade ;
  CREATE INDEX "attendant_trainings_attendant_idx" ON "attendant_trainings" USING btree ("attendant_id");
  CREATE INDEX "attendant_trainings_training_idx" ON "attendant_trainings" USING btree ("training_id");
  CREATE INDEX "attendant_trainings_certificate_idx" ON "attendant_trainings" USING btree ("certificate_id");
  CREATE INDEX "attendant_trainings_created_by_idx" ON "attendant_trainings" USING btree ("created_by_id");
  CREATE INDEX "attendant_trainings_updated_by_idx" ON "attendant_trainings" USING btree ("updated_by_id");
  CREATE INDEX "attendant_trainings_updated_at_idx" ON "attendant_trainings" USING btree ("updated_at");
  CREATE INDEX "attendant_trainings_created_at_idx" ON "attendant_trainings" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_attendant_trainings_fk" FOREIGN KEY ("attendant_trainings_id") REFERENCES "public"."attendant_trainings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_attendant_trainings_id_idx" ON "payload_locked_documents_rels" USING btree ("attendant_trainings_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "attendant_trainings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "attendant_trainings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_attendant_trainings_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_attendant_trainings_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "attendant_trainings_id";`)
}
