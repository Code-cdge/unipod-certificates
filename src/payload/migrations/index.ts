import * as migration_20260902_052134_setup from './20260902_052134_setup';
import * as migration_20260902_060921_create_trainings_table from './20260902_060921_create_trainings_table';
import * as migration_20260902_070330_create_attendants_table from './20260902_070330_create_attendants_table';
import * as migration_20260902_074011_create_attendant_trainings_table from './20260902_074011_create_attendant_trainings_table';
import * as migration_20260903_152128_alter_users from './20260903_152128_alter_users';
import * as migration_20260904_122116_alter_trainings from './20260904_122116_alter_trainings';

export const migrations = [
  {
    up: migration_20260902_052134_setup.up,
    down: migration_20260902_052134_setup.down,
    name: '20260902_052134_setup',
  },
  {
    up: migration_20260902_060921_create_trainings_table.up,
    down: migration_20260902_060921_create_trainings_table.down,
    name: '20260902_060921_create_trainings_table',
  },
  {
    up: migration_20260902_070330_create_attendants_table.up,
    down: migration_20260902_070330_create_attendants_table.down,
    name: '20260902_070330_create_attendants_table',
  },
  {
    up: migration_20260902_074011_create_attendant_trainings_table.up,
    down: migration_20260902_074011_create_attendant_trainings_table.down,
    name: '20260902_074011_create_attendant_trainings_table',
  },
  {
    up: migration_20260903_152128_alter_users.up,
    down: migration_20260903_152128_alter_users.down,
    name: '20260903_152128_alter_users',
  },
  {
    up: migration_20260904_122116_alter_trainings.up,
    down: migration_20260904_122116_alter_trainings.down,
    name: '20260904_122116_alter_trainings'
  },
];
