import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../../..');

moduleAlias.addAliases({
  '@modules': path.join(files, 'src', 'modules'),
  '@shared': path.join(files, 'src', 'shared'),
  '@config': path.join(files, 'src', 'config'),
  '@tests': path.join(files, 'tests'),
});
