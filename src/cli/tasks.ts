// tslint:disable:no-console no-if-statement no-expression-statement
import * as fs from 'fs';
import * as path from 'path';
import * as shelljs from 'shelljs';
import { getLicense } from './license/choose-license';
import chalk from 'chalk';
import { ownerFQ, TypescriptStarterCLIOptions } from './models';
import { getVersion, modifyJsonFile } from './utils';

export const ngGenerate = async (opts: TypescriptStarterCLIOptions) => {
  shelljs.exec(`ng new ${opts.projectName} --no-routing --style css`);
  shelljs.cd(opts.projectName);
  shelljs.ls('angular.json').forEach(file => {
    shelljs.sed(
      '-i',
      `"${opts.projectName}`,
      `"${opts.projectName}-demo`,
      file
    );
    modifyJsonFile(file, object => ({
      ...object,
      cli: {
        analytics: false
      }
    }));
  });
  shelljs.exec(`ng generate library ${opts.projectName}`);
  shelljs.cd('..');
};

export const generateLicense = async (opts: TypescriptStarterCLIOptions) => {
  if (opts.license.include) {
    const name = ownerFQ(opts.owner);
    const web = !opts.owner.website ? '' : `(${opts.owner.website})`;
    const header = `Copyright (c) ${opts.year} ${name} ${web}`.trim();
    const licenseBody = getLicense(opts.license).value();
    if (licenseBody) {
      const license = `${header}

${licenseBody}`;
      if (!fs.existsSync(opts.projectDir)) {
        fs.mkdirSync(opts.projectDir);
      }
      fs.writeFileSync(path.join(opts.projectDir, 'LICENSE'), license);
    } else {
      console.warn(`
      ${chalk.yellow('Could not generate appropriate license!')}
    `);
    }
  }
};

export const copyResourceFiles = async (
  options: TypescriptStarterCLIOptions
) => {
  if (options.travis) {
    shelljs.cp(
      path.join(options.assetsDir, 'ci', 'travis.yml'),
      path.join(options.projectName, '.travis.yml')
    );
  }
  shelljs.cp(
    path.join(options.assetsDir, 'md', 'README.md'),
    path.join(options.projectName, 'README.md')
  );
};

export const modifyReadme = async (options: TypescriptStarterCLIOptions) => {
  shelljs.ls(path.join(options.projectDir, 'README.md')).forEach(file => {
    shelljs.sed('-i', '{{version}}', getVersion(), file);
    shelljs.sed('-i', /{{library}}/g, options.projectName, file);
    shelljs.sed('-i', '{{description}}', options.description, file);
    shelljs.sed('-i', '{{repository}}', options.repository, file);
    shelljs.sed('-i', '{{year}}', options.year, file);
    shelljs.sed('-i', '{{license}}', (options.license.include) ? getLicense(options.license).name: '', file);
    shelljs.sed('-i', '{{author}}', options.owner.name, file);
    shelljs.sed('-i', '{{authorWebsite}}', options.owner.website, file);
  });
};

export const modifyPackage = (options: TypescriptStarterCLIOptions) => {
  modifyJsonFile(
    path.join(
      options.projectDir,
      'projects',
      options.projectName,
      'package.json'
    ),
    object => ({
      ...object,
      scripts: {
        ...object.scripts,
        release: 'standard-version'
      },
      devDependencies: {
        ...object.devDependencies,
        'standard-version': '^6.0.1'
      }
    })
  );

  modifyJsonFile(path.join(options.projectDir, 'package.json'), object => ({
    ...object,
    name: options.projectName,
    description: options.description,
    author: options.owner.name,
    repository: { type: 'git', url: options.repository },
    homepage: options.repository,
    license: getLicense(options.license) ? getLicense(options.license).name: undefined,
    keywords: options.keywords,
    scripts: {
      ...object.scripts,
      'release-alpha': `npm run lint && npm run test && npm --prefix projects/${options.projectName} run release -- --prerelease alpha`,
      'release-patch': `npm run lint && npm run test && npm --prefix projects/${options.projectName} run release -- --prerelease patch`,
      'release-minor': `npm run lint && npm run test && npm --prefix projects/${options.projectName} run release -- --prerelease minor`,
      'release-major': `npm run lint && npm run test && npm --prefix projects/${options.projectName} run release -- --prerelease major`,
      'build-prod': `npm run lint && npm run test && ng build ${options.projectName} --prod  && cp README.md dist/${options.projectName}/README.md`,
      publish: `npm run build-prod && cd dist/${options.projectName} && npm publish`
    }
  }));
  shelljs.ls(path.join(options.projectDir, 'karma.conf.js')).forEach(file => {
    shelljs.sed('-i', 'singleRun: false,', 'singleRun: true,', file);
  });
  shelljs
    .ls(
      path.join(
        options.projectDir,
        'projects',
        options.projectName,
        'karma.conf.js'
      )
    )
    .forEach(file => {
      shelljs.sed('-i', 'singleRun: false,', 'singleRun: true,', file);
    });
};
