export enum GitRepository {
  Github = 'github',
  Bitbucket = 'bitbucket',
  Gitlab = 'gitlab'
}

export enum LicenseType {
  SimpleAndPermissive = 'SimpleAndPermissive',
  Patents = 'patents',
  ShareImprovements = 'shareImprovements',
  More = 'more'
}

export interface LicenseExtras {
  readonly disclose: boolean;
  readonly licenseAndCopyright: boolean;
  readonly patent: boolean;
  readonly sameLicense: boolean;
  readonly stateChanges: boolean;
  readonly trademark: boolean;
}

export interface LicenseOptions {
  readonly include: boolean;
  readonly kind: LicenseType;
  readonly extras: LicenseExtras;
}

export interface OwnerOptions {
  readonly name: string;
  readonly email: string;
  readonly website: string;
  readonly username: string;
}

export function ownerFQ(ownerOptions: OwnerOptions): string {
  return !ownerOptions.email
    ? ownerOptions.name
    : `${ownerOptions.name} <${ownerOptions.email}>`;
}

// tslint:disable-next-line:no-empty-interface
export type TypescriptStarterCLIOptions = TypescriptStarterUserOptions &
  TypescriptStarterInferredOptions;

export interface TypescriptStarterInferredOptions {
  readonly assetsDir: string;
  readonly ownerFQ: string;
  readonly projectDir: string;
  readonly repository: string;
  readonly year: string;
}

export interface TypescriptStarterUserOptions {
  readonly description: string;
  readonly keywords: string;
  readonly projectName: string;
  readonly travis: boolean;
  readonly owner: OwnerOptions;
  readonly gitRepositoryType: GitRepository;
  readonly license: LicenseOptions;
}
