[![NPM version](https://img.shields.io/npm/v/ngx-lib-starter.svg)](https://www.npmjs.com/package/ngx-lib-starter)
[![Codecov](https://img.shields.io/codecov/c/github/eisberg-labs/ngx-lib-starter.svg)](https://codecov.io/gh/eisberg-labs/ngx-lib-starter)
[![Travis](https://img.shields.io/travis/eisberg-labs/ngx-lib-starter.svg)](https://travis-ci.org/eisberg-labs/ngx-lib-starter)
[![GitHub stars](https://img.shields.io/github/stars/eisberg-labs/ngx-lib-starter.svg?style=social&logo=github&label=Stars)](https://github.com/eisberg-labs/ngx-lib-starter)

# Ngx Lib Starter

Interactive Cli for generating angular library seed, inspired by [https://github.com/bitjson/typescript-starter](https://github.com/bitjson/typescript-starter).

## Start Now

Run one simple command to install and use the interactive project generator. You'll need [Node](https://nodejs.org/) `v10` or later.

```bash
npx ngx-lib-starter
```

## Bump version, update changelog, commit, & tag release

It's recommended that you install [commitizen](https://github.com/commitizen/cz-cli) to make commits to your project.

```bash
npm install -g commitizen

# commit your changes:
git cz
```

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.
`npm run release-alpha|release-patch|release-minor |release-major` runs tests, bumps package.json version, updates CHANGELOG.md, git tags the release.
`npm run publish` runs tests, builds code for production, publishes to npm repository.

## License

MIT © [Eisberg Labs](http://eisberg-labs.com)
