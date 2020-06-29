import test from 'ava';
import {getRepository, getVersion} from './utils';
import {GitRepository} from './models';

test('return ngx-lib-starter version', t => {
  t.true(getVersion() != null, 'Resolves library version');
});

test('return git repository', t => {
  t.deepEqual(getRepository({
    projectName: 'ngx-project-name',
    description: undefined,
    owner: {
      username: 'test123',
      name: 'Test 123',
      website: undefined,
      email: 'test123@e'
    },
    gitRepositoryType: GitRepository.Github,
    keywords: undefined,
    license: undefined,
    travis: undefined
  }), 'https://github.com/test123/ngx-project-name');
});
