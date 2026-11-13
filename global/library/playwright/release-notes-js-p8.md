---
title: "Release notes (part 8 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 8 of 12)

## Version 1.40

<LiteYouTube
  id="mn892dV81_8"
  title="Playwright 1.40"
/>

### Test Generator Update

New tools to generate assertions:
- "Assert visibility" tool generates [`method: LocatorAssertions.toBeVisible`].
- "Assert value" tool generates [`method: LocatorAssertions.toHaveValue`].
- "Assert text" tool generates [`method: LocatorAssertions.toContainText`].

Here is an example of a generated test with assertions:

```js
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByLabel('Breadcrumbs').getByRole('list')).toContainText('Installation');
  await expect(page.getByLabel('Search')).toBeVisible();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('locator');
  await expect(page.getByPlaceholder('Search docs')).toHaveValue('locator');
});
```

### New APIs

- Options [`option: Page.close.reason`] in [`method: Page.close`], [`option: BrowserContext.close.reason`] in [`method: BrowserContext.close`] and [`option: Browser.close.reason`] in [`method: Browser.close`]. Close reason is reported for all operations interrupted by the closure.
- Option [`option: BrowserType.launchPersistentContext.firefoxUserPrefs`] in [`method: BrowserType.launchPersistentContext`].

### Other Changes

- Methods [`method: Download.path`] and [`method: Download.createReadStream`] throw an error for failed and cancelled downloads.
- Playwright docker image now comes with Node.js v20.

### Browser Versions

* Chromium 120.0.6099.28
* Mozilla Firefox 119.0
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 119
* Microsoft Edge 119

## Version 1.39

<LiteYouTube
  id="KqVuRAlOkm0"
  title="Playwright 1.39"
/>

### Add custom matchers to your expect

You can extend Playwright assertions by providing custom matchers. These matchers will be available on the expect object.

```js
import { expect as baseExpect } from '@playwright/test';
export const expect = baseExpect.extend({
  async toHaveAmount(locator: Locator, expected: number, options?: { timeout?: number }) {
    // ... see documentation for how to write matchers.
  },
});

test('pass', async ({ page }) => {
  await expect(page.getByTestId('cart')).toHaveAmount(5);
});
```

See the documentation for a full example.

### Merge test fixtures

You can now merge test fixtures from multiple files or modules:

```js
import { mergeTests } from '@playwright/test';
import { test as dbTest } from 'database-test-utils';
import { test as a11yTest } from 'a11y-test-utils';

export const test = mergeTests(dbTest, a11yTest);
```

```js
import { test } from './fixtures';

test('passes', async ({ database, page, a11y }) => {
  // use database and a11y fixtures.
});
```

### Merge custom expect matchers

You can now merge custom expect matchers from multiple files or modules:

```js
import { mergeTests, mergeExpects } from '@playwright/test';
import { test as dbTest, expect as dbExpect } from 'database-test-utils';
import { test as a11yTest, expect as a11yExpect } from 'a11y-test-utils';

export const test = mergeTests(dbTest, a11yTest);
export const expect = mergeExpects(dbExpect, a11yExpect);
```

```js
import { test, expect } from './fixtures';

test('passes', async ({ page, database }) => {
  await expect(database).toHaveDatabaseUser('admin');
  await expect(page).toPassA11yAudit();
});
```

### Hide implementation details: box test steps

You can mark a [`method: Test.step`] as "boxed" so that errors inside it point to the step call site.

```js
async function login(page) {
  await test.step('login', async () => {
    // ...
  }, { box: true });  // Note the "box" option here.
}
```

```txt
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  ... error details omitted ...

  14 |   await page.goto('https://github.com/login');
> 15 |   await login(page);
     |         ^
  16 | });
```

See [`method: Test.step`] documentation for a full example.

### New APIs

- [`method: LocatorAssertions.toHaveAttribute#2`]

### Browser Versions

* Chromium 119.0.6045.9
* Mozilla Firefox 118.0.1
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 118
* Microsoft Edge 118

## Version 1.38

<LiteYouTube
  id="YGJTeXaZDTM"
  title="Playwright 1.38"
/>

### UI Mode Updates

1. Zoom into time range.
1. Network panel redesign.

### New APIs

- [`event: BrowserContext.webError`]
- [`method: Locator.pressSequentially`]
- The [`method: Reporter.onEnd`] now reports `startTime` and total run `duration`.

### Deprecations

* The following methods were deprecated: [`method: Page.type`], [`method: Frame.type`],
  [`method: Locator.type`] and [`method: ElementHandle.type`].
  Please use [`method: Locator.fill`] instead which is much faster. Use
  [`method: Locator.pressSequentially`] only if there is a special keyboard
  handling on the page, and you need to press keys one-by-one.

### Breaking Changes: Playwright no longer downloads browsers automatically

> **Note**: If you are using `@playwright/test` package, this change does not affect you.

Playwright recommends to use `@playwright/test` package and download browsers via `npx playwright install` command. If you are following this recommendation, nothing has changed for you.

However, up to v1.38, installing the `playwright` package instead of `@playwright/test` did automatically download browsers. This is no longer the case, and we recommend to explicitly download browsers via `npx playwright install` command.

**v1.37 and earlier**

`playwright` package was downloading browsers during `npm install`, while `@playwright/test` was not.

**v1.38 and later**

`playwright` and `@playwright/test` packages do not download browsers during `npm install`.

**Recommended migration**

Run `npx playwright install` to download browsers after `npm install`. For example, in your CI configuration:

```yml
- run: npm ci
- run: npx playwright install --with-deps
```

**Alternative migration option - not recommended**

Add `@playwright/browser-chromium`, `@playwright/browser-firefox` and `@playwright/browser-webkit` as a dependency. These packages download respective browsers during `npm install`. Make sure you keep the version of all playwright packages in sync:

```json
// package.json
{
  "devDependencies": {
    "playwright": "1.38.0",
    "@playwright/browser-chromium": "1.38.0",
    "@playwright/browser-firefox": "1.38.0",
    "@playwright/browser-webkit": "1.38.0"
  }
}
```

### Browser Versions

* Chromium 117.0.5938.62
* Mozilla Firefox 117.0
* WebKit 17.0

This version was also tested against the following stable channels:

* Google Chrome 116
* Microsoft Edge 116

## Version 1.37

<LiteYouTube
  id="cEd4SH_Xf5U"
  title="Playwright 1.36 & 1.37"
/>

### New `npx playwright merge-reports` tool

If you run tests on multiple shards, you can now merge all reports in a single HTML report (or any other report)
using the new `merge-reports` CLI tool.

Using `merge-reports` tool requires the following steps:

1. Adding a new "blob" reporter to the config when running on CI:

  ```js
  export default defineConfig({
    testDir: './tests',
    reporter: process.env.CI ? 'blob' : 'html',
  });
  ```

  The "blob" reporter will produce ".zip" files that contain all the information
  about the test run.

2. Copying all "blob" reports in a single shared location and running `npx playwright merge-reports`:

  ```bash
  npx playwright merge-reports --reporter html ./all-blob-reports
  ```

  Read more in our documentation.

### 📚 Debian 12 Bookworm Support

Playwright now supports Debian 12 Bookworm on both x86_64 and arm64 for Chromium, Firefox and WebKit.
Let us know if you encounter any issues!

Linux support looks like this:

|          | Ubuntu 20.04 | Ubuntu 22.04 | Debian 11 | Debian 12 |
| :--- | :---: | :---: | :---: | :---: |
| Chromium | ✅ | ✅ | ✅ | ✅ |
| WebKit | ✅ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ | ✅ |

### UI Mode Updates

- UI Mode now respects project dependencies. You can control which dependencies to respect by checking/unchecking them in a projects list.
- Console logs from the test are now displayed in the Console tab.

### Browser Versions

* Chromium 116.0.5845.82
* Mozilla Firefox 115.0
* WebKit 17.0

This version was also tested against the following stable channels:

* Google Chrome 115
* Microsoft Edge 115

## Version 1.36

🏝️ Summer maintenance release.

### Browser Versions

* Chromium 115.0.5790.75
* Mozilla Firefox 115.0
* WebKit 17.0

This version was also tested against the following stable channels:

* Google Chrome 114
* Microsoft Edge 114

## Version 1.35

<LiteYouTube
  id="pJiirfyJwcA"
  title="Playwright 1.35"
/>

### Highlights

* UI mode is now available in VSCode Playwright extension via a new "Show trace viewer" button:

* UI mode and trace viewer mark network requests handled with [`method: Page.route`] and [`method: BrowserContext.route`] handlers, as well as those issued via the API testing:

* New option `maskColor` for methods [`method: Page.screenshot`], [`method: Locator.screenshot`], [`method: PageAssertions.toHaveScreenshot#1`] and [`method: LocatorAssertions.toHaveScreenshot#1`] to change default masking color:
  ```js
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot({
    mask: [page.locator('img')],
    maskColor: '#00FF00', // green
  });
  ```

* New `uninstall` CLI command to uninstall browser binaries:
  ```bash
  $ npx playwright uninstall # remove browsers installed by this installation
  $ npx playwright uninstall --all # remove all ever-install Playwright browsers
  ```

* Both UI mode and trace viewer now could be opened in a browser tab:
  ```bash
  $ npx playwright test --ui-port 0 # open UI mode in a tab on a random port
  $ npx playwright show-trace --port 0 # open trace viewer in tab on a random port
  ```

### ⚠️ Breaking changes

* `playwright-core` binary got renamed from `playwright` to `playwright-core`. So if you use `playwright-core` CLI, make sure to update the name:
  ```bash
  $ npx playwright-core install # the new way to install browsers when using playwright-core
  ```

  This change **does not** affect `@playwright/test` and `playwright` package users.

### Browser Versions

* Chromium 115.0.5790.13
* Mozilla Firefox 113.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 114
* Microsoft Edge 114

## Version 1.34

<LiteYouTube
  id="JeFD6rqDbBo"
  title="Playwright 1.34"
/>

### Highlights

* UI Mode now shows steps, fixtures and attachments:

* New property [`property: TestProject.teardown`] to specify a project that needs to run after this
  and all dependent projects have finished. Teardown is useful to cleanup any resources acquired by this project.

  A common pattern would be a `setup` dependency with a corresponding `teardown`:
  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    projects: [
      {
        name: 'setup',
        testMatch: /global.setup\.ts/,
        teardown: 'teardown',
      },
      {
        name: 'teardown',
        testMatch: /global.teardown\.ts/,
      },
      {
        name: 'chromium',
        use: devices['Desktop Chrome'],
        dependencies: ['setup'],
      },
      {
        name: 'firefox',
        use: devices['Desktop Firefox'],
        dependencies: ['setup'],
      },
      {
        name: 'webkit',
        use: devices['Desktop Safari'],
        dependencies: ['setup'],
      },
    ],
  });
  ```
* New method `expect.configure` to
  create pre-configured expect instance with its own defaults such as `timeout`
  and `soft`.

  ```js
  const slowExpect = expect.configure({ timeout: 10000 });
  await slowExpect(locator).toHaveText('Submit');

  // Always do soft assertions.
  const softExpect = expect.configure({ soft: true });
  ```

* New options `stderr` and `stdout`  in [`property: TestConfig.webServer`] to configure output handling:

  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    // Run your local dev server before starting the tests
    webServer: {
      command: 'npm run start',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  });
  ```
* New [`method: Locator.and`] to create a locator that matches both locators.

    ```js
    const button = page.getByRole('button').and(page.getByTitle('Subscribe'));
    ```

* New events [`event: BrowserContext.console`] and [`event: BrowserContext.dialog`] to subscribe to any dialogs
  and console messages from any page from the given browser context. Use the new methods [`method: ConsoleMessage.page`]
  and [`method: Dialog.page`] to pin-point event source.

### ⚠️ Breaking changes

* `npx playwright test` no longer works if you install both `playwright` and `@playwright/test`. There's no need
  to install both, since you can always import browser automation APIs from `@playwright/test` directly:

  ```js
  import { chromium, firefox, webkit } from '@playwright/test';
  /* ... */
  ```
* Node.js 14 is no longer supported since it reached its end-of-life on April 30, 2023.

### Browser Versions

* Chromium 114.0.5735.26
* Mozilla Firefox 113.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 113
* Microsoft Edge 113
