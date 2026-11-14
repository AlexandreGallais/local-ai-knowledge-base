---
title: "class: TestOptions (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-testoptions.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: TestOptions
* since: v1.10
* langs: js

Playwright Test provides many options to configure test environment, [Browser], [BrowserContext] and more.

These options are usually provided in the configuration file through [`property: TestConfig.use`] and [`property: TestProject.use`].

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
});
```

Alternatively, with [`method: Test.use`] you can override some options for a file.

```js
import { test, expect } from '@playwright/test';

// Run tests in this file with portrait-like viewport.
test.use({ viewport: { width: 600, height: 900 } });

test('my portrait test', async ({ page }) => {
  // ...
});
```

## property: TestOptions.acceptDownloads = %%-context-option-acceptdownloads-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    acceptDownloads: false,
  },
});
```

## property: TestOptions.baseURL = %%-context-option-baseURL-%%
* since: v1.10

**Usage**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
  },
});
```

## property: TestOptions.browserName
* since: v1.10
- type: "BrowserName" <"chromium"|"firefox"|"webkit">

Name of the browser that runs tests. Defaults to `'chromium'`. Most of the time you should set `browserName` in your [TestConfig]:

**Usage**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'firefox',
  },
});
```

## property: TestOptions.actionTimeout
* since: v1.10
- type: <[int]>

Default timeout for each Playwright action in milliseconds, defaults to 0 (no timeout).

This is a default timeout for all Playwright actions, same as configured via [`method: Page.setDefaultTimeout`].

**Usage**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
  },
});
```

Learn more about various timeouts.

## property: TestOptions.bypassCSP = %%-context-option-bypasscsp-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    bypassCSP: true,
  }
});
```

## property: TestOptions.channel = %%-browser-option-channel-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
  ]
});
```

## property: TestOptions.clientCertificates = %%-context-option-clientCertificates-%%
* since: v1.46

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    clientCertificates: [{
      origin: 'https://example.com',
      certPath: './cert.pem',
      keyPath: './key.pem',
      passphrase: '<example-value>',
    }],
  },
});
```

## property: TestOptions.colorScheme = %%-context-option-colorscheme-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    colorScheme: 'dark',
  },
});
```

## property: TestOptions.connectOptions
* since: v1.10
- type: <[void]|[Object]>
  - `wsEndpoint` <[string]> A browser websocket endpoint to connect to.
  - `headers` ?<[void]|[Object]<[string], [string]>> Additional HTTP headers to be sent with web socket connect request. Optional.
  - `timeout` ?<[int]> Timeout in milliseconds for the connection to be established. Optional, defaults to no timeout.
  - `exposeNetwork` ?<[string]> Option to expose network available on the connecting client to the browser being connected to. See [`method: BrowserType.connect`] for more details.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    connectOptions: {
      wsEndpoint: 'ws://localhost:5678',
    },
  },
});
```

When connect options are specified, default [`property: Fixtures.browser`], [`property: Fixtures.context`] and [`property: Fixtures.page`] use the remote browser instead of launching a browser locally.

## property: TestOptions.contextOptions
* since: v1.10
- type: <[Object]>

Options used to create the context, as passed to [`method: Browser.newContext`]. Specific options like [`property: TestOptions.viewport`] take priority over this.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
});
```

## property: TestOptions.contrast = %%-context-option-contrast-%%
* since: v1.50

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    contrast: 'more',
  },
});
```

## property: TestOptions.deviceScaleFactor = %%-context-option-devicescalefactor-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 2,
  },
});
```

## property: TestOptions.extraHTTPHeaders = %%-context-option-extrahttpheaders-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    extraHTTPHeaders: {
      'X-My-Header': 'value',
    },
  },
});
```

## property: TestOptions.forcedColors = %%-context-option-forcedColors-%%
* since: v1.50

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    forcedColors: 'active',
  },
});
```

## property: TestOptions.geolocation = %%-context-option-geolocation-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
  },
});
```
Learn more about geolocation.

## property: TestOptions.hasTouch = %%-context-option-hastouch-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    hasTouch: true
  },
});
```

## property: TestOptions.headless = %%-browser-option-headless-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false
  },
});
```

## property: TestOptions.httpCredentials = %%-context-option-httpcredentials-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    httpCredentials: {
      username: 'user',
      password: '<example-value>',
    },
  },
});
```

When passing an array of credentials to [`method: Test.use`], wrap it into an extra array, see fixture options.

```js
test.use({
  httpCredentials: [[
    { username: '<example-value>', password: '<example-value>', origin: '<example-value>' },
    { username: '<example-value>', password: '<example-value>', origin: '<example-value>' },
  ], { scope: 'test' }],
});
```

## property: TestOptions.ignoreHTTPSErrors = %%-context-option-ignorehttpserrors-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
  },
});
```

## property: TestOptions.isMobile = %%-context-option-ismobile-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    isMobile: false,
  },
});
```

## property: TestOptions.javaScriptEnabled = %%-context-option-javascriptenabled-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    javaScriptEnabled: false,
  },
});
```

## property: TestOptions.launchOptions
* since: v1.10
- type: <[Object]>

Options used to launch the browser, as passed to [`method: BrowserType.launch`]. Specific options [`property: TestOptions.headless`] and [`property: TestOptions.channel`] take priority over this.

:::warning
Use custom browser args at your own risk, as some of them may break Playwright functionality.
:::

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    }
  ]
});
```

## property: TestOptions.locale
* since: v1.10
- type: <[string]>

Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to `en-US`. Learn more about emulation in our emulation guide.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    locale: 'it-IT',
  },
});
```

## property: TestOptions.navigationTimeout
* since: v1.10
- type: <[int]>

Timeout for each navigation action in milliseconds. Defaults to 0 (no timeout).

This is a default navigation timeout, same as configured via [`method: Page.setDefaultNavigationTimeout`].

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    navigationTimeout: 3000,
  },
});
```

Learn more about various timeouts.

## property: TestOptions.offline = %%-context-option-offline-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    offline: true
  },
});
```

## property: TestOptions.permissions = %%-context-option-permissions-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    permissions: ['notifications'],
  },
});
```

## property: TestOptions.proxy = %%-browser-option-proxy-%%
* since: v1.10

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    proxy: {
      server: 'http://myproxy.com:3128',
      bypass: 'localhost',
    },
  },
});
```

## property: TestOptions.reducedMotion = %%-context-option-reducedMotion-%%
* since: v1.50

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    reducedMotion: 'reduce',
  },
});
```

## property: TestOptions.reuseContext
* since: v1.62
* discouraged: This option trades test isolation for speed and is intended for component tests that drive a story gallery. Leave it unset for end-to-end tests - a fresh browser context per test is one of the core guarantees of Playwright Test.
- type: <[boolean]>

**Experimental.** When set to `true`, all tests in a worker process run in a single browser context that is reused between tests, instead of getting a brand new context per test. Defaults to `false`.

Between tests, Playwright resets the state that component tests typically touch: it clears cookies, cache, local storage and IndexedDB of visited origins, unregisters service workers, closes extra pages, removes routes, bindings and init scripts, and re-applies the configured storage state, viewport and emulation options.

This reset is best-effort, not a guarantee of isolation. State that is **not** reset includes:
* Permissions granted with [`method: BrowserContext.grantPermissions`] during a test.
* Runtime changes made through [`method: BrowserContext.setGeolocation`], [`method: BrowserContext.setOffline`] and [`method: BrowserContext.setExtraHTTPHeaders`].
* Browsing history, `window.name` and any browser-process-wide state.

Additional restrictions:
* The option is ignored when [`property: TestOptions.video`] recording is enabled.
* Only a few context options may differ between consecutive tests: `colorScheme`, `forcedColors`, `reducedMotion`, `contrast`, `screen`, `userAgent`, `viewport` and `testIdAttribute`. Changing any other option in [`method: Test.use`], for example `locale` or `storageState`, silently forces a fresh context and negates the speedup.
* Do not combine with [`property: TestOptions.connectOptions`] pointing multiple workers at a shared browser - workers would compete for the single reusable context.
* `recordHar` in [`property: TestOptions.contextOptions`] is not supported and produces no HAR file.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'components',
      testDir: './tests/components',
      use: { reuseContext: true },
    },
  ],
});
```

## property: TestOptions.screen
* since: v1.64
- type: ?<[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [`property: TestOptions.viewport`] is set.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    viewport: { width: 390, height: 664 },
    screen: { width: 390, height: 844 },
  },
});
```

## property: TestOptions.screenshot
* since: v1.10
- type: "ScreenshotMode" <[Object]|"off"|"on"|"only-on-failure"|"on-first-failure">
  - `mode` "ScreenshotMode" <"off"|"on"|"only-on-failure"|"on-first-failure"> Automatic screenshot mode.
  - `fullPage` ?<[boolean]> When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to `false`.
  - `omitBackground` ?<[boolean]> Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.

Whether to automatically capture a screenshot after each test. Defaults to `'off'`.
* `'off'`: Do not capture screenshots.
* `'on'`: Capture screenshot after each test.
* `'only-on-failure'`: Capture screenshot after each test failure.
* `'on-first-failure'`: Capture screenshot after each test's first failure.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
  },
});
```

Learn more about automatic screenshots.
