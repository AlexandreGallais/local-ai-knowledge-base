---
title: "Configuring WebdriverIO"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/webdriverio.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Configuring WebdriverIO

**Community maintained**
The WebdriverIO provider (`@vitest/browser-webdriverio`) is maintained by the Vitest community in the `vitest-community` organization, separately from the core Vitest packages. Please report provider-specific issues to its repository.

To run tests using WebdriverIO, you need to install the `@vitest/browser-webdriverio` npm package and specify its `webdriverio` export in the `test.browser.provider` property of your config:

```ts
import { webdriverio } from '@vitest/browser-webdriverio'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      provider: webdriverio(),
      instances: [{ browser: 'chrome' }]
    },
  },
})
```

You can configure all the parameters that `remote` function accepts:

```ts
import { webdriverio } from '@vitest/browser-webdriverio'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      // shared provider options between all instances
      provider: webdriverio({
        capabilities: {
          browserVersion: '82',
        },
      }),
      instances: [
        { browser: 'chrome' },
        {
          browser: 'firefox',
          // overriding options only for a single instance
          // this will NOT merge options with the parent one
          provider: webdriverio({
            capabilities: {
              'moz:firefoxOptions': {
                args: ['--disable-gpu'],
              },
            },
          })
        },
      ],
    },
  },
})
```

You can find most available options in the WebdriverIO documentation. Note that Vitest will ignore all test runner options because we only use `webdriverio`'s browser capabilities.

**Tip:**
Most useful options are located on `capabilities` object. WebdriverIO allows nested capabilities, but Vitest will ignore those options because we rely on a different mechanism to spawn several browsers.

Note that Vitest will ignore `capabilities.browserName`; use `test.browser.instances.browser` instead.

## Headful Chrome in CI

Vitest enables `browser.headless` automatically in CI.
If you explicitly set `headless: false` for Chrome on a Linux CI runner, Chrome
still needs a display server. Without one, WebDriverIO or ChromeDriver can fail
with a misleading error such as `session not created: probably user data
directory is already in use`.

Run the test command through `xvfb-run` when you need headful Chrome in GitHub
Actions or another Linux CI environment:

```bash
xvfb-run npm test
```

Alternatively, keep `browser.headless` enabled in CI and use headful mode only
for local debugging.
