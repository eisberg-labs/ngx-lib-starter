// tslint:disable:no-console no-if-statement no-expression-statement
import ora from 'ora';
import {
  copyResourceFiles,
  generateLicense,
  modifyPackage,
  modifyReadme,
  ngGenerate
} from './tasks';
import { addInferredOptions } from './utils';
import { TypescriptStarterUserOptions } from './models';

export async function ngxLibStarter(
  userOptions: TypescriptStarterUserOptions
): Promise<void> {
  const options = await addInferredOptions(userOptions);

  const spinnerPackage = ora('Generating project').start();
  const tasks = [
    ngGenerate,
    generateLicense,
    copyResourceFiles,
    modifyReadme,
    modifyPackage
  ];
  tasks.forEach(task => task(options));
  spinnerPackage.stop();
}
