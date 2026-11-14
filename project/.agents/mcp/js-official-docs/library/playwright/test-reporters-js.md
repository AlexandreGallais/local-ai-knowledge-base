---
title: "Reporters (part 1 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-reporters-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Reporters

## Introduction

Playwright Test comes with a few built-in reporters for different needs and ability to provide custom reporters. The easiest way to try out built-in reporters is to pass `--reporter` command line option.

```bash
npx playwright test --reporter=line
```

For more control, you can specify reporters programmatically in the configuration file.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'line',
});
```

### Multiple reporters

You can use multiple reporters at the same time. For example  you can use `'list'` for nice terminal output and `'json'` to get a comprehensive json file with the test results.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['json', {  outputFile: 'test-results.json' }]
  ],
});
```

### Reporters on CI

You can use different reporters locally and on CI. For example, using concise `'dot'` reporter avoids too much output. This is the default on CI.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Concise 'dot' for CI, default 'list' when running locally
  reporter: process.env.CI ? 'dot' : 'list',
});
```

### Report only failures

Use `onlyFailures` with the JSON, JUnit, or HTML reporter to include only tests with unexpected outcomes (including unexpected passes), flaky tests, and interrupted tests. Flaky tests are included even when they pass on retry. Every attempt of an included test is retained, including successful retries:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { onlyFailures: true }]],
});
```

Configure `onlyFailures` independently for each reporter. To use it when merging blob reports, pass the configuration file to `npx playwright merge-reports --config=playwright.config.ts ./blob-report`.

Use the `failures` reporter for live terminal diagnostics without progress output.  For example, retain a complete HTML report alongside concise terminal output:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['failures'], ['html']],
});
```
