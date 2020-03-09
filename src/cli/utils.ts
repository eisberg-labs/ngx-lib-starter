import chalk from 'chalk';
import { deepStrictEqual } from 'assert';
import gradient from 'gradient-string';
import {
  ownerFQ,
  TypescriptStarterCLIOptions,
  TypescriptStarterInferredOptions,
  TypescriptStarterUserOptions
} from './models';
import * as path from 'path';
import * as shelljs from 'shelljs';
import { writeFileSync } from 'fs';

const coolGradient = gradient('#FFFFFF', '#38AAE6', '#27509B');

export function getIntro(columns: number | undefined): string {
  const ascii = `

                          _ _ _               _             _
                         | (_) |             | |           | |
  _ __   __ ___  ________| |_| |__ ______ ___| |_ __ _ _ __| |_ ___ _ __
 | '_ \\ / _\` \\ \\/ /______| | | '_ \\______/ __| __/ _\` | '__| __/ _ \\ '__|
 | | | | (_| |>  <       | | | |_) |     \\__ \\ || (_| | |  | ||  __/ |
 |_| |_|\\__, /_/\\_\\      |_|_|_.__/      |___/\\__\\__,_|_|   \\__\\___|_|
         __/ |
        |___/
                 \\/               \\/            \\/                 \\/
`;

  const asciiSmaller = `

                          _ _ _               _             _
                         | (_) |             | |           | |
  _ __   __ ___  ________| |_| |__ ______ ___| |_ __ _ _ __| |_ ___ _ __
 | '_ \\ / _\` \\ \\/ /______| | | '_ \\______/ __| __/ _\` | '__| __/ _ \\ '__|
 | | | | (_| |>  <       | | | |_) |     \\__ \\ || (_| | |  | ||  __/ |
 |_| |_|\\__, /_/\\_\\      |_|_|_.__/      |___/\\__\\__,_|_|   \\__\\___|_|
         __/ |
        |___/
               \\/               \\/            \\/                 \\/
`;

  return columns && columns >= 85
    ? chalk.bold(coolGradient(ascii))
    : columns && columns >= 74
    ? chalk.bold(coolGradient(asciiSmaller))
    : `\n${chalk.cyan.bold.underline('typescript-starter')}\n`;
}

export function objectsEqual(object1, object2): boolean {
  try {
    deepStrictEqual(object1, object2);
    return true;
  } catch (e) {
    return false;
  }
}

export function getRepository(opts: TypescriptStarterUserOptions): string {
  return `https://${opts.gitRepositoryType}.com/${opts.owner.username}/${opts.projectName}`;
}

export const addInferredOptions = async (
  userOptions: TypescriptStarterUserOptions
): Promise<TypescriptStarterCLIOptions> => {
  const projectDir = path.join(process.cwd(), userOptions.projectName);
  const assetsDir = path.resolve(__dirname, '..', '..', 'assets');
  const repository = getRepository(userOptions);
  const ownerFQName = ownerFQ(userOptions.owner);
  const year = new Date().getUTCFullYear().toString();

  const inferredOptions: TypescriptStarterInferredOptions = {
    projectDir,
    assetsDir,
    repository,
    ownerFQ: ownerFQName,
    year
  };
  return {
    ...inferredOptions,
    ...userOptions
  };
};

// tslint:disable-next-line:typedef
export function modifyJsonFile(file, modifyF: (packageFile: any) => any) {
  const packageFile = JSON.parse(shelljs.cat(file));
  writeFileSync(file, JSON.stringify(modifyF(packageFile), null, '  '));
}

export function getVersion(): string {
  return require('project-version');
}
