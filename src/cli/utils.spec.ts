import test from 'ava';
import { getVersion } from './utils';

test('return ngx-lib-starter version', t => {
  t.true(getVersion() != null, 'Resolves library version');
});
