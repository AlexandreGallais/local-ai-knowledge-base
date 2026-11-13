---
title: "Multiple Setups"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/multiple-setups.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Multiple Setups

You can specify several different browser setups using the `browser.instances` option.

The main advantage of using the `browser.instances` over the test projects is improved caching. Every project will use the same Vite server meaning the file transform and dependency pre-bundling has to happen only once.

## Several Browsers

You can use the `browser.instances` field to specify options for different browsers. For example, if you want to run the same tests in different browsers, the minimal configuration will look like this:

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ],
    },
  },
})
```

## Different Setups

You can also specify different config options independently from the browser (although, the instances _can_ also have `browser` fields):

::: code-group

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        {
          browser: 'chromium',
          name: 'chromium-1',
          setupFiles: ['./ratio-setup.ts'],
          provide: {
            ratio: 1,
          },
        },
        {
          browser: 'chromium',
          name: 'chromium-2',
          provide: {
            ratio: 2,
          },
        },
      ],
    },
  },
})
```

```ts
import { expect, inject, test } from 'vitest'
import { globalSetupModifier } from './example.js'

test('ratio works', () => {
  expect(inject('ratio') * globalSetupModifier).toBe(14)
})
```

In this example Vitest will run all tests in `chromium` browser, but execute a `'./ratio-setup.ts'` file only in the first configuration and inject a different `ratio` value depending on the `provide` field.

**Warning:**
Note that you need to define the custom `name` value if you are using the same browser name because Vitest will assign the `browser` as the project name otherwise.

## Filtering

You can filter what projects to run with the `--project` flag. Vitest will automatically assign the browser name as a project name if it is not assigned manually. If the root config already has a name, Vitest will merge them: `custom` -> `custom (browser)`.

```shell
$ vitest --project=chromium
```

::: code-group

```ts
export default defineConfig({
  test: {
    browser: {
      instances: [
        // name: chromium
        { browser: 'chromium' },
        // name: custom
        { browser: 'firefox', name: 'custom' },
      ]
    }
  }
})
```

```ts
export default defineConfig({
  test: {
    name: 'custom',
    browser: {
      instances: [
        // name: custom (chromium)
        { browser: 'chromium' },
        // name: manual
        { browser: 'firefox', name: 'manual' },
      ]
    }
  }
})
```
