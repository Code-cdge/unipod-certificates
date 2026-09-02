import * as migration_20260902_052134_setup from './20260902_052134_setup';

export const migrations = [
  {
    up: migration_20260902_052134_setup.up,
    down: migration_20260902_052134_setup.down,
    name: '20260902_052134_setup'
  },
];
