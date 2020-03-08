## [{{library}}]({{repository}})

This project was generated with [Ngx Lib Starter](https://github.com/eisberg-labs/ngx-lib-starter) version {{version}}.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Bump version, update changelog, commit, & tag release

It's recommended that you install [commitizen](https://github.com/commitizen/cz-cli) to make commits to your project.

```bash
npm install -g commitizen

# commit your changes:
git cz
```

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

Command | Description
---|---
npm run release-alpha | alpha release - bump package.json version, update CHANGELOG.md, git tag the release
npm run release-patch | patch release - bump package.json version, update CHANGELOG.md, git tag the release
npm run release-minor | minor release - bump package.json version, update CHANGELOG.md, git tag the release
npm run release-major | major release - bump package.json version, update CHANGELOG.md, git tag the release
npm run publish | runs test, lint, builds code for production, publishes to npm repository


{{license}} © [{{author}}]({{authorWebsite}})
