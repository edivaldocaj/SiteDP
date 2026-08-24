import * as migration_20260824_201158_inicial_site_dp from './20260824_201158_inicial_site_dp';

export const migrations = [
  {
    up: migration_20260824_201158_inicial_site_dp.up,
    down: migration_20260824_201158_inicial_site_dp.down,
    name: '20260824_201158_inicial_site_dp'
  },
];
