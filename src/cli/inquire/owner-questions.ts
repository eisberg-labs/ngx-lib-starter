import { DistinctQuestion } from 'inquirer';
import { validateEmail, validateURL } from '../validators';

export const ownerNameQuestion: DistinctQuestion = {
  filter: (answer: string) => answer.trim(),
  message: '📦 Enter owner of the package:',
  name: 'name',
  type: 'input'
};

export const ownerEmailQuestion: DistinctQuestion = {
  filter: (answer: string) => answer.trim(),
  message: '📦 Enter owner email:',
  name: 'email',
  type: 'input'
  // validate: validateEmail
};

export const ownerWebsiteQuestion: DistinctQuestion = {
  filter: (answer: string) => answer.trim(),
  message: '📦 Enter owner website:',
  name: 'website',
  type: 'input'
  // validate: validateURL
};

export const gitUserQuestion: DistinctQuestion = {
  filter: (answer: string) => answer.trim(),
  message: '📦 Enter git user:',
  name: 'username',
  type: 'input'
};
