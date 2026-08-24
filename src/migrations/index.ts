import * as migration_20260824_201158_inicial_site_dp from './20260824_201158_inicial_site_dp';
import * as migration_20260824_232954_campanhas_e_formulario from './20260824_232954_campanhas_e_formulario';

export const migrations = [
  {
    up: migration_20260824_201158_inicial_site_dp.up,
    down: migration_20260824_201158_inicial_site_dp.down,
    name: '20260824_201158_inicial_site_dp',
  },
  {
    up: migration_20260824_232954_campanhas_e_formulario.up,
    down: migration_20260824_232954_campanhas_e_formulario.down,
    name: '20260824_232954_campanhas_e_formulario',
  },
];
