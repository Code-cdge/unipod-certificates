import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trainings" ALTER COLUMN "description" SET DEFAULT '';
  ALTER TABLE "trainings" ALTER COLUMN "workload" SET DEFAULT 0;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trainings" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "trainings" ALTER COLUMN "workload" DROP DEFAULT;`)
}
