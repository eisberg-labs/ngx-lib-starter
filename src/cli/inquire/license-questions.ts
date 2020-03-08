import { DistinctQuestion } from 'inquirer';
import { LicenseType } from '../models';

export enum MoreLicenseExtras {
  licenseAndCopyright = 'licenseAndCopyright',
  disclose = 'disclose',
  sameLicense = 'sameLicense',
  stateChanges = 'stateChanges',
  patent = 'patent',
  trademark = 'trademark'
}

export const licenseQuestion: DistinctQuestion = {
  choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
  message: 'Add license to your project?',
  name: 'license.include',
  type: 'list'
};

export const firstLicenseQuestion: DistinctQuestion = {
  choices: [
    {
      name: 'I want it simple and permissive',
      value: LicenseType.SimpleAndPermissive
    },
    {
      name: 'I am concerned about patents',
      value: LicenseType.Patents
    },
    {
      name: 'I care about sharing improvements',
      value: LicenseType.ShareImprovements
    },
    {
      name: 'I want more choices',
      value: LicenseType.More
    }
  ],
  message: 'Select license',
  name: 'license.kind',
  type: 'list',
  when: answers => !!answers.license.include
};

export const moreLicenseQuestions: DistinctQuestion = {
  choices: [
    {
      checked: false,
      name: 'Do you want to provide an express grant of patent rights?',
      value: MoreLicenseExtras.patent
    },
    {
      checked: false,
      name: 'Do you want to enforce source disclosure when distributed?',
      value: MoreLicenseExtras.disclose
    },
    {
      checked: false,
      name:
        'Do you want to enforce attachment of license and copyright notice when distributed?',
      value: MoreLicenseExtras.licenseAndCopyright
    },
    {
      checked: false,
      name:
        'Do you want to enforce distribution of modification under the same license?',
      value: MoreLicenseExtras.sameLicense
    },
    {
      checked: false,
      name:
        'Do you want to enforce documentation for each change in the source?',
      value: MoreLicenseExtras.stateChanges
    },
    {
      checked: false,
      name: 'Do you want to explicitly not grant any trademark right?',
      value: MoreLicenseExtras.trademark
    }
  ],
  name: 'license.extras',
  type: 'checkbox',
  when: answers =>
    !!answers.license && answers.license.kind === LicenseType.More
};
