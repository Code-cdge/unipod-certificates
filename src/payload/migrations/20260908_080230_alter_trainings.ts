import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trainings" ALTER COLUMN "placement" DROP NOT NULL;
  ALTER TABLE "trainings" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "trainings" ADD COLUMN "workload" numeric NOT NULL;
  ALTER TABLE "trainings" ADD COLUMN "graduation_date" timestamp(3) with time zone;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trainings" ALTER COLUMN "placement" SET NOT NULL;
  ALTER TABLE "trainings" DROP COLUMN "description";
  ALTER TABLE "trainings" DROP COLUMN "workload";
  ALTER TABLE "trainings" DROP COLUMN "graduation_date";`)
}
