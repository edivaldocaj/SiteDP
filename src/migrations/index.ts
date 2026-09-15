import * as migration_20260824_201158_inicial_site_dp from './20260824_201158_inicial_site_dp';
import * as migration_20260824_232954_campanhas_e_formulario from './20260824_232954_campanhas_e_formulario';
import * as migration_20260908_092127_campanhas_editoriais from './20260908_092127_campanhas_editoriais';
import * as migration_20260908_100000_conteudo_editorial from './20260908_100000_conteudo_editorial';
import * as migration_20260909_020022 from './20260909_020022';
import * as migration_20260909_030000_site_content_baseline from './20260909_030000_site_content_baseline';
import * as migration_20260909_121000_replace_site_content_placeholders from './20260909_121000_replace_site_content_placeholders';
import * as migration_20260914_200000_add_campaign_publication_checklist from './20260914_200000_add_campaign_publication_checklist';
import * as migration_20260915_023000_sec_rbac from './20260915_023000_sec_rbac';
import * as migration_20260915_024000_primeiro_relato_campanhas from './20260915_024000_primeiro_relato_campanhas';

export const migrations = [
  { up: migration_20260909_040500_site_content_arrays.up, down: migration_20260909_040500_site_content_arrays.down, name: '20260909_040500_site_content_arrays' },
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
  {
    up: migration_20260908_092127_campanhas_editoriais.up,
    down: migration_20260908_092127_campanhas_editoriais.down,
    name: '20260908_092127_campanhas_editoriais',
  },
  {
    up: migration_20260908_100000_conteudo_editorial.up,
    down: migration_20260908_100000_conteudo_editorial.down,
    name: '20260908_100000_conteudo_editorial',
  },
  {
    up: migration_20260909_020022.up,
    down: migration_20260909_020022.down,
    name: '20260909_020022'
  },
  {
    up: migration_20260909_030000_site_content_baseline.up,
    down: migration_20260909_030000_site_content_baseline.down,
    name: '20260909_030000_site_content_baseline',
  },
  {
    up: migration_20260909_121000_replace_site_content_placeholders.up,
    down: migration_20260909_121000_replace_site_content_placeholders.down,
    name: '20260909_121000_replace_site_content_placeholders',
  },
  {
    up: migration_20260914_200000_add_campaign_publication_checklist.up,
    down: migration_20260914_200000_add_campaign_publication_checklist.down,
    name: '20260914_200000_add_campaign_publication_checklist',
  },
  {
    up: migration_20260915_023000_sec_rbac.up,
    down: migration_20260915_023000_sec_rbac.down,
    name: '20260915_023000_sec_rbac',
  },
  {
    up: migration_20260915_024000_primeiro_relato_campanhas.up,
    down: migration_20260915_024000_primeiro_relato_campanhas.down,
    name: '20260915_024000_primeiro_relato_campanhas',
  },
];





import * as migration_20260909_040500_site_content_arrays from './20260909_040500_site_content_arrays';


