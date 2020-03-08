import * as assert from 'assert';
import * as path from 'path';
import { readFileSync } from 'fs';
import { LicenseExtras, LicenseOptions, LicenseType } from '../models';
import { objectsEqual } from '../utils';

const licensesFolder = path.resolve(
  __dirname,
  '..',
  '..',
  'assets',
  'licenses'
);

const licensePath = (file: string) => path.join(licensesFolder, file);

export function getLicense(licenseOptions: LicenseOptions): any {
  switch (licenseOptions.kind) {
    case LicenseType.More: {
      const key = Object.keys(licenses).find(it =>
        objectsEqual(licenses[it].attributes, licenseOptions.extras)
      );
      return key ? licenses[key] : undefined;
    }
    case LicenseType.Patents:
      return licenses['Apache 2.0'];
    case LicenseType.ShareImprovements:
      return licenses['GNU General Public License'];
    case LicenseType.SimpleAndPermissive:
      return licenses.MIT;
    default:
      return undefined;
  }
}

export interface Licenses {
  readonly [key: string]: {
    readonly name: string;
    readonly value: () => string;
    readonly attributes: LicenseExtras;
  };
}

const licenses: Licenses = {
  'Apache 2.0': {
    name: 'Apache 2.0',
    value: () => readFileSync(licensePath('Apache 2.0'), 'utf-8'),
    attributes: {
      patent: true,
      disclose: false,
      licenseAndCopyright: true,
      sameLicense: false,
      stateChanges: true,
      trademark: true
    }
  },
  'BSD-2-Clause': {
    name: 'BSD-2-Clause',
    value: () => readFileSync(licensePath('BSD-2-Clause'), 'utf-8'),
    attributes: {
      patent: false,
      disclose: false,
      licenseAndCopyright: true,
      sameLicense: false,
      stateChanges: false,
      trademark: false
    }
  },
  'BSD-3-Clause': {
    name: 'BSD-3-Clause',
    value: () => readFileSync(licensePath('BSD-3-Clause'), 'utf-8'),
    attributes: {
      patent: false,
      disclose: false,
      licenseAndCopyright: true,
      sameLicense: false,
      stateChanges: false,
      trademark: false
    }
  },
  'GNU General Public License': {
    name: 'GNU General Public License',
    value: () =>
      readFileSync(licensePath('GNU General Public License'), 'utf-8'),
    attributes: {
      patent: false,
      disclose: true,
      licenseAndCopyright: true,
      sameLicense: true,
      stateChanges: true,
      trademark: false
    }
  },
  'ISC License': {
    name: 'ISC License',
    value: () => readFileSync(licensePath('ISC License'), 'utf-8'),
    attributes: {
      patent: false,
      disclose: false,
      licenseAndCopyright: true,
      sameLicense: false,
      stateChanges: false,
      trademark: false
    }
  },
  MIT: {
    name: 'MIT',
    value: () => readFileSync(licensePath('MIT'), 'utf-8'),
    attributes: {
      patent: false,
      disclose: false,
      licenseAndCopyright: true,
      sameLicense: false,
      stateChanges: false,
      trademark: false
    }
  },
  'Mozilla Public License 2.0': {
    name: 'Mozilla Public License 2.0',
    value: () =>
      readFileSync(licensePath('Mozilla Public License 2.0'), 'utf-8'),
    attributes: {
      patent: true,
      disclose: true,
      licenseAndCopyright: true,
      sameLicense: true,
      stateChanges: false,
      trademark: true
    }
  },
  Unlicense: {
    name: 'Unlicense',
    value: () => readFileSync(licensePath('Unlicense'), 'utf-8'),
    attributes: {
      patent: false,
      disclose: false,
      licenseAndCopyright: false,
      sameLicense: false,
      stateChanges: false,
      trademark: false
    }
  }
};
