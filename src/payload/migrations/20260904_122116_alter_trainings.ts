import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trainings_signatories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"signature_id" uuid NOT NULL
  );
  
  ALTER TABLE "trainings_signatories" ADD CONSTRAINT "trainings_signatories_signature_id_media_id_fk" FOREIGN KEY ("signature_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trainings_signatories" ADD CONSTRAINT "trainings_signatories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "trainings_signatories_order_idx" ON "trainings_signatories" USING btree ("_order");
  CREATE INDEX "trainings_signatories_parent_id_idx" ON "trainings_signatories" USING btree ("_parent_id");
  CREATE INDEX "trainings_signatories_signature_idx" ON "trainings_signatories" USING btree ("signature_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "trainings_signatories" CASCADE;`)
}
