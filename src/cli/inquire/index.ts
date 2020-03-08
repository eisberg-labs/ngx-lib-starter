import { DistinctQuestion, prompt } from 'inquirer';
import {
  firstLicenseQuestion,
  licenseQuestion,
  MoreLicenseExtras,
  moreLicenseQuestions
} from './license-questions';
import {
  gitUserQuestion,
  ownerEmailQuestion,
  ownerNameQuestion,
  ownerWebsiteQuestion
} from './owner-questions';
import { GitRepository, TypescriptStarterUserOptions } from '../models';
import { validateName, validateNotEmpty } from '../validators';

const packageNameQuestion: DistinctQuestion = {
  filter: (answer: string) => answer.trim(),
  message: '📦 Enter the new package name:',
  name: 'projectName',
  type: 'input',
  validate: validateName
};

const selectGitRepositoryManager: DistinctQuestion = {
  choices: [
    { name: GitRepository.Github, value: GitRepository.Github },
    { name: GitRepository.Gitlab, value: GitRepository.Gitlab },
    { name: GitRepository.Bitbucket, value: GitRepository.Bitbucket }
  ],
  message: 'Select git repository type?',
  name: 'gitRepositoryType',
  type: 'list'
};

const packageDescriptionQuestion: DistinctQuestion = {
  filter: (answer: string) => answer.trim(),
  message: '💬 Enter the package description:',
  name: 'description',
  type: 'input',
  validate: validateNotEmpty
};

const packageKeywordsQuestion: DistinctQuestion = {
  message: '💬 Enter package keywords separated by comma:',
  filter: (answer: string) => answer.trim(),
  name: 'keywords',
  type: 'input'
};

enum Extras {
  // TODO
  // appveyor = 'appveyor',
  // circleci = 'circleci',
  // vscode = 'vscode'
  // gitlab = 'gitlab'
  travis = 'travis'
}

const ciQuestion: DistinctQuestion = {
  message: '🚀Include Travis CI config?',
  choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
  name: 'travis',
  type: 'list'
};

export async function inquire(): Promise<TypescriptStarterUserOptions> {
  return prompt([
    packageNameQuestion,
    packageDescriptionQuestion,
    packageKeywordsQuestion,
    ownerNameQuestion,
    ownerEmailQuestion,
    ownerWebsiteQuestion,
    gitUserQuestion,
    selectGitRepositoryManager,
    licenseQuestion,
    firstLicenseQuestion,
    moreLicenseQuestions,
    ciQuestion
  ]).then((answers: any) => {
    const {
      projectName,
      description,
      keywords,
      name,
      email,
      website,
      username,
      gitRepositoryType,
      license,
      travis
    } = answers;

    return {
      description,
      keywords: keywords.split(','),
      gitRepositoryType,
      license: {
        extras: {
          disclose:
            license &&
            license.extras &&
            license.extras.includes(MoreLicenseExtras.disclose),
          licenseAndCopyright:
            license &&
            license.extras &&
            license.extras.includes(MoreLicenseExtras.licenseAndCopyright),
          patent:
            license &&
            license.extras &&
            license.extras.includes(MoreLicenseExtras.patent),
          sameLicense:
            license &&
            license.extras &&
            license.extras.includes(MoreLicenseExtras.sameLicense),
          stateChanges:
            license &&
            license.extras &&
            license.extras.includes(MoreLicenseExtras.stateChanges),
          trademark:
            license &&
            license.extras &&
            license.extras.includes(MoreLicenseExtras.trademark)
        },
        include: license.include,
        kind: license.kind
      },
      owner: {
        email,
        name,
        username,
        website
      },
      projectName,
      travis
    };
  });
}
