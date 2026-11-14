---
title: "Configuration (use) (part 3 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-use-options-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Configuration (use) (part 3 of 3)

### Reset an option

You can reset an option to the value defined in the config file. Consider the following config that sets a `baseURL`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://playwright.dev',
  },
});
```

You can now configure `baseURL` for a file, and also opt-out for a single test.

```js
import { test } from '@playwright/test';

// Configure baseURL for this file.
test.use({ baseURL: 'https://playwright.dev/docs/intro' });

test('check intro contents', async ({ page }) => {
  // This test will use "https://playwright.dev/docs/intro" base url as defined above.
});

test.describe(() => {
  // Reset the value to a config-defined one.
  test.use({ baseURL: undefined });

  test('can navigate to intro from the home page', async ({ page }) => {
    // This test will use "https://playwright.dev" base url as defined in the config.
  });
});
```

If you would like to completely reset the value to `undefined`, use a long-form fixture notation.

```js
import { test } from '@playwright/test';

// Completely unset baseURL for this file.
test.use({
  baseURL: [async ({}, use) => use(undefined), { scope: 'test' }],
});

test('no base url', async ({ page }) => {
  // This test will not have a base url.
});
```
