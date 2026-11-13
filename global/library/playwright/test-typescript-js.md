---
title: "TypeScript"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-typescript-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

Playwright supports TypeScript out of the box. You just write tests in TypeScript, and Playwright will read them, transform to JavaScript and run.

Note that Playwright does not check the types and will run tests even if there are non-critical TypeScript compilation errors. We recommend you run TypeScript compiler alongside Playwright. For example on GitHub actions:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    ...
    - name: Run type checks
      run: npx tsc -p tsconfig.json --noEmit
    - name: Run Playwright tests
      run: npx playwright test
```

For local development, you can run `tsc` in watch mode like this:
```sh
npx tsc -p tsconfig.json --noEmit -w
```

## tsconfig.json

Playwright will pick up `tsconfig.json` for each source file it loads. Note that Playwright **only supports** the following tsconfig options: `allowJs`, `baseUrl`, `paths`, `jsx`, `jsxFactory`, `jsxFragmentFactory`, `jsxImportSource`, `useDefineForClassFields`, `references` and `extends`. The `target` option is only used to determine `useDefineForClassFields`.

We recommend setting up a separate `tsconfig.json` in the tests directory so that you can change some preferences specifically for the tests. Here is an example directory structure.

```txt
src/
    source.ts

tests/
    tsconfig.json  # test-specific tsconfig
    example.spec.ts

tsconfig.json  # generic tsconfig for all typescript sources

playwright.config.ts
```

### tsconfig path mapping

Playwright supports path mapping declared in the `tsconfig.json`.

Here is an example `tsconfig.json` that works with Playwright:

```json
{
  "compilerOptions": {
    "paths": {
      "@myhelper/*": ["packages/myhelper/*"] // This mapping is relative to the tsconfig.
    }
  }
}
```

You can now import using the mapped paths:

```js
import { test, expect } from '@playwright/test';
import { username, password } from '<example-value>';

test('example', async ({ page }) => {
  await page.getByLabel('User Name').fill(username);
  await page.getByLabel('<example-value>').fill(password);
});
```

### tsconfig JSX options

Playwright compiles JSX in `.tsx` and `.jsx` files according to the `jsx`, `jsxFactory`, `jsxFragmentFactory` and `jsxImportSource` options in the `tsconfig.json`. When `jsx` is not specified, or is set to `preserve` or `react-native`, Playwright uses the automatic runtime from `react/jsx-runtime`.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

### tsconfig class fields

Playwright compiles TypeScript class fields according to the `useDefineForClassFields` option in the `tsconfig.json`. Just like `tsc`, when it is not specified, it is enabled for `ES2022` and later targets, and when `target` is not specified.

With `useDefineForClassFields` enabled, class fields follow the JavaScript semantics, so field initializers run before the constructor body and can not access constructor parameter properties. Disable it to keep the legacy TypeScript semantics.

```json
{
  "compilerOptions": {
    "useDefineForClassFields": false
  }
}
```

### tsconfig resolution

By default, Playwright will look up a closest tsconfig for each imported file by going up the directory structure and looking for `tsconfig.json` or `jsconfig.json`. This way, you can create a `tests/tsconfig.json` file that will be used only for your tests and Playwright will pick it up automatically.

```sh
# Playwright will choose tsconfig automatically
npx playwright test
```

Alternatively, you can specify a single tsconfig file to use in the command line, and Playwright will use it for all imported files, not only test files.

```sh
# Pass a specific tsconfig
npx playwright test --tsconfig=tsconfig.test.json
```

You can specify a single tsconfig file in the config file, that will be used for loading test files, reporters, etc. However, it will not be used while loading the playwright config itself or any files imported from it.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tsconfig: './tsconfig.test.json',
});
```

## Manually compile tests with TypeScript

Sometimes, Playwright Test will not be able to transform your TypeScript code correctly, for example when you are using experimental or very recent features of TypeScript, usually configured in `tsconfig.json`.

In this case, you can perform your own TypeScript compilation before sending the tests to Playwright.

First add a `tsconfig.json` file inside the tests directory:

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "commonjs",
        "moduleResolution": "Node",
        "sourceMap": true,
        "outDir": "../tests-out",
    }
}
```

In `package.json`, add two scripts:

```json
{
  "scripts": {
    "pretest": "tsc --incremental -p tests/tsconfig.json",
    "test": "playwright test -c tests-out"
  }
}
```

The `pretest` script runs typescript on the tests. `test` will run the tests that have been generated to the `tests-out` directory. The `-c` argument configures the test runner to look for tests inside the `tests-out` directory.

Then `npm run test` will build the tests and run them.
