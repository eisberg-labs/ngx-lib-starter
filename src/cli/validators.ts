import validateNpmPackageName from 'validate-npm-package-name';
import { existsSync } from 'fs';

/**
 * Package cannot exists in this directory, should be in kebab-case, should
 * not start with a number
 * @param input package name
 */
export function validateName(input: string): boolean | string {
  const validForNewPackages = !validateNpmPackageName(input)
    .validForNewPackages;
  return validForNewPackages
    ? 'Name should be in-kebab-case (for npm)'
    : /^\d/.test(input)
    ? 'Name should not start with a number.'
    : existsSync(input)
    ? `The "${input}" path already exists in this directory.`
    : true;
}

export function validateEmail(input: string): boolean | string {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(input) || 'Enter valid email';
}

export function validateURL(input: string): boolean | string {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(input) || 'Enter valid url';
}

export function validateNotEmpty(input: string): boolean {
  return input.length > 0;
}
