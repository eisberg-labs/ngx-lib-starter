// tslint:disable:no-expression-statement no-console
import chalk from 'chalk';
import { inquire } from './inquire';
import { ngxLibStarter } from './ngx-lib-starter';
import { getIntro } from './utils';
import { TypescriptStarterUserOptions } from './models';

(async () => {
  const userOptions: TypescriptStarterUserOptions = {
    ...(await (async () => {
      console.log(getIntro(process.stdout.columns));
      return inquire();
    })())
  };
  return ngxLibStarter(userOptions);
})().catch((err: Error) => {
  console.error(`
  ${chalk.red(err.message)}
`);
  process.exit(1);
});
