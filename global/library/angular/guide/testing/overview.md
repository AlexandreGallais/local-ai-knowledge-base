---
title: "Unit testing"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/testing/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Unit testing

Testing your Angular application helps you check that it is working as you expect. Unit tests are crucial for catching bugs early, ensuring code quality, and facilitating safe refactoring.

NOTE: This guide covers the default testing setup for new Angular CLI projects, which uses Vitest. If you are migrating an existing project from Karma, see the Migrating from Karma to Vitest guide. Karma is still supported; for more information, see the Karma testing guide.

## Set up for testing

The Angular CLI downloads and installs everything you need to test an Angular application with the Vitest testing framework. New projects include `vitest` and `jsdom` by default.

Vitest runs your unit tests in a Node.js environment. To simulate the browser's DOM, Vitest uses a library called `jsdom`. This allows for faster test execution by avoiding the overhead of launching a browser. You can swap `jsdom` for an alternative like `happy-dom` by installing it and uninstalling `jsdom`. Currently, `jsdom` and `happy-dom` are the supported DOM emulation libraries.

The project you create with the CLI is immediately ready to test. Run the `ng test` command:

```shell
ng test
```

The `ng test` command builds the application in _watch mode_ and launches the Vitest test runner.

The console output looks like this:

```shell
 ✓ src/app/app.spec.ts (2)
   ✓ App should create the app
   ✓ App should render title
 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  18:18:01
   Duration  2.46s (transform 615ms, setup 2ms, collect 2.21s, tests 5ms)
```

The `ng test` command also watches your files for changes. If you modify a file and save it, the tests will run again.

## Configuration

The Angular CLI handles most of the Vitest configuration for you. You can customize the test behavior by modifying the `test` target options in your `angular.json` file.

### Angular.json options

- `include`: Glob patterns for files to include for testing. Defaults to `['**/*.spec.ts', '**/*.test.ts']`.
- `exclude`: Glob patterns for files to exclude from testing.
- `setupFiles`: A list of paths to global setup files (e.g., polyfills or global mocks) that are executed before your tests.
- `providersFile`: The path to a file that exports a default array of Angular providers for the test environment. This is useful for setting up global test providers which are injected into your tests.
- `coverage`: A boolean to enable or disable code coverage reporting. Defaults to `false`.
- `browsers`: An array of browser names to run tests in a real browser (e.g., `["chromium"]`). Requires a browser provider to be installed. See the Running tests in a browser section for more details.

### Global test setup and providers

The `setupFiles` and `providersFile` options are particularly useful for managing global test configuration.

For example, you could create a `src/test-providers.ts` file to provide `provideHttpClientTesting` to all your tests:

```typescript
import {EnvironmentProviders, Provider} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';

const testProviders: (Provider | EnvironmentProviders)[] = [provideHttpClientTesting()];

export default testProviders;
```

You would then reference this file in your `angular.json`:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "providersFile": "src/test-providers.ts"
          }
        }
      }
    }
  }
}
```

HELPFUL: When creating new TypeScript files for test setup or providers, like `src/test-providers.ts`, ensure they are included in your project's test TypeScript configuration file (typically `tsconfig.spec.json`). This allows the TypeScript compiler to properly process these files during testing.

### Advanced Vitest configuration

For advanced use cases, you can provide a custom Vitest configuration file using the `runnerConfig` option in `angular.json`.

IMPORTANT: While using a custom configuration enables advanced options, the Angular team does not provide support for the contents of the configuration file or for any third-party plugins. The CLI will also override certain properties (`test.projects`, `test.include`) to ensure proper integration.

You can create a Vitest configuration file (e.g., `vitest-base.config.mts`) and reference it in your `angular.json`:

```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "test": {
          "builder": "@angular/build:unit-test",
          "options": {
            "runnerConfig": "vitest-base.config.mts"
          }
        }
      }
    }
  }
}
```

You can also generate a base configuration file using the CLI:

```shell
ng generate config vitest
```

This creates a `vitest-base.config.mts` file that you can customize.

HELPFUL: Read more about Vitest configuration in the official Vitest documentation.

## Code coverage

You can generate a code coverage report by adding the `--coverage` flag to the `ng test` command. The report is generated in the `coverage/` directory.

For more detailed information, see the Code coverage guide.

## Running tests in a browser

While the default Node.js environment is faster for most unit tests, you can also run your tests in a real browser. This is useful for tests that rely on browser-specific APIs (like rendering) or for debugging.

To run tests in a browser, you must first install a browser provider. Read more about Vitest's browser mode in the official documentation.

Once the provider is installed, you can run your tests in the browser by configuring the `browsers` option in `angular.json` or by using the `--browsers` CLI flag. Tests run in a headed browser by default. If the `CI` environment variable is set, headless mode is used instead. To explicitly control headless mode, you can suffix the browser name with `Headless` (e.g., `chromiumHeadless`).

```bash
# Example for Playwright (headed)
ng test --browsers=chromium

# Example for Playwright (headless)
ng test --browsers=chromiumHeadless

# Example for WebdriverIO (headed)
ng test --browsers=chrome

# Example for WebdriverIO (headless)
ng test --browsers=chromeHeadless
```

Choose one of the following browser providers based on your needs:

### Playwright

Playwright is a browser automation library that supports Chromium, Firefox, and WebKit.

```
  
    npm install --save-dev @vitest/browser-playwright playwright
```
  File: `yarn`

```shell
    yarn add --dev @vitest/browser-playwright playwright
```
  File: `pnpm`

```shell
    pnpm add -D @vitest/browser-playwright playwright
```
  File: `bun`

```shell
    bun add --dev @vitest/browser-playwright playwright
```

### WebdriverIO

WebdriverIO is a browser and mobile automation test framework that supports Chrome, Firefox, Safari, and Edge.

```
  
    npm install --save-dev @vitest/browser-webdriverio webdriverio
```
  File: `yarn`

```shell
    yarn add --dev @vitest/browser-webdriverio webdriverio
```
  File: `pnpm`

```shell
    pnpm add -D @vitest/browser-webdriverio webdriverio
```
  File: `bun`

```shell
    bun add --dev @vitest/browser-webdriverio webdriverio
```

### Preview

The `@vitest/browser-preview` provider is designed for WebContainer environments like StackBlitz and is not intended for use in CI/CD.

```
  
    npm install --save-dev @vitest/browser-preview
```
  File: `yarn`

```shell
    yarn add --dev @vitest/browser-preview
```
  File: `pnpm`

```shell
    pnpm add -D @vitest/browser-preview
```
  File: `bun`

```shell
    bun add --dev @vitest/browser-preview
```

HELPFUL: For more advanced browser-specific configuration, see the Advanced Vitest configuration section.

## Other test frameworks

You can also unit test an Angular application with other testing libraries and test runners. Each library and runner has its own installation procedures, configuration, and syntax.

## Testing in continuous integration

A robust test suite is a key part of a continuous integration (CI) pipeline. CI servers let you automate your tests to run on every commit and pull request.

To test your Angular application in a CI server, run the standard test command:

```shell
ng test
```

Most CI servers set a `CI=true` environment variable, which `ng test` detects. This automatically configures your tests to run in a non-interactive, single-run mode.

If your CI server does not set this variable, or if you need to force single-run mode manually, you can use the `--no-watch` and `--no-progress` flags:

```shell
ng test --no-watch --no-progress
```

## More information on testing

After you've set up your application for testing, you might find the following testing guides useful.

|                                                                    | Details                                                                           |
| :----------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Code coverage                       | How much of your app your tests are covering and how to specify required amounts. |
| Testing services                         | How to test the services your application uses.                                   |
| Basics of testing components    | Basics of testing Angular components.                                             |
| Component testing scenarios  | Various kinds of component testing scenarios and use cases.                       |
| Testing attribute directives | How to test your attribute directives.                                            |
| Testing pipes                               | How to test pipes.                                                                |
| Debugging tests                         | Common testing bugs.                                                              |
| Testing utility APIs                 | Angular testing features.                                                         |
