---
title: "Release notes (part 9 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 9 of 12)

## Version 1.33

<LiteYouTube
  id="JeFD6rqDbBo"
  title="Playwright 1.33"
/>

### Locators Update

* Use [`method: Locator.or`] to create a locator that matches either of the two locators.
  Consider a scenario where you'd like to click on a "New email" button, but sometimes a security settings dialog shows up instead.
  In this case, you can wait for either a "New email" button, or a dialog and act accordingly:

    ```js
    const newEmail = page.getByRole('button', { name: 'New email' });
    const dialog = page.getByText('Confirm security settings');
    await expect(newEmail.or(dialog)).toBeVisible();
    if (await dialog.isVisible())
      await page.getByRole('button', { name: 'Dismiss' }).click();
    await newEmail.click();
    ```
* Use new options [`option: Locator.filter.hasNot`] and [`option: Locator.filter.hasNotText`] in [`method: Locator.filter`]
  to find elements that **do not match** certain conditions.

    ```js
    const rowLocator = page.locator('tr');
    await rowLocator
        .filter({ hasNotText: 'text in column 1' })
        .filter({ hasNot: page.getByRole('button', { name: 'column 2 button' }) })
        .screenshot();
    ```
* Use new web-first assertion [`method: LocatorAssertions.toBeAttached`] to ensure that the element
  is present in the page's DOM. Do not confuse with the [`method: LocatorAssertions.toBeVisible`] that ensures that
  element is both attached & visible.

### New APIs

- [`method: Locator.or`]
- New option [`option: Locator.filter.hasNot`] in [`method: Locator.filter`]
- New option [`option: Locator.filter.hasNotText`] in [`method: Locator.filter`]
- [`method: LocatorAssertions.toBeAttached`]
- New option [`option: Route.fetch.timeout`] in [`method: Route.fetch`]
- [`method: Reporter.onExit`]

### ⚠️ Breaking change

* The `mcr.microsoft.com/playwright:v1.33.0` now serves a Playwright image based on Ubuntu Jammy.
  To use the focal-based image, please use `mcr.microsoft.com/playwright:v1.33.0-focal` instead.

### Browser Versions

* Chromium 113.0.5672.53
* Mozilla Firefox 112.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 112
* Microsoft Edge 112

## Version 1.32

<LiteYouTube
  id="jF0yA-JLQW0"
  title="Playwright 1.32"
/>

### Introducing UI Mode (preview)

New UI Mode lets you explore, run and debug tests. Comes with a built-in watch mode.

Engage with a new flag `--ui`:

```sh
npx playwright test --ui
```

### New APIs

- New options [`option: Page.routeFromHAR.updateMode`] and [`option: Page.routeFromHAR.updateContent`] in [`method: Page.routeFromHAR`] and [`method: BrowserContext.routeFromHAR`].
- Chaining existing locator objects, see locator docs for details.
- New property [`property: TestInfo.testId`].
- New option [`option: Tracing.startChunk.name`] in method [`method: Tracing.startChunk`].

### ⚠️ Breaking change in component tests

Note: **component tests only**, does not affect end-to-end tests.

* `@playwright/experimental-ct-react` now supports **React 18 only**.
* If you're running component tests with React 16 or 17, please replace
  `@playwright/experimental-ct-react` with `@playwright/experimental-ct-react17`.

### Browser Versions

* Chromium 112.0.5615.29
* Mozilla Firefox 111.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 111
* Microsoft Edge 111

## Version 1.31

<LiteYouTube
  id="PI50YAPTAs4"
  title="Playwright 1.31"
/>

### New APIs

- New property [`property: TestProject.dependencies`] to configure dependencies between projects.

  Using dependencies allows global setup to produce traces and other artifacts,
  see the setup steps in the test report and more.

  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    projects: [
      {
        name: 'setup',
        testMatch: /global.setup\.ts/,
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

- New assertion [`method: LocatorAssertions.toBeInViewport`] ensures that locator points to an element that intersects viewport, according to the intersection observer API.

  ```js
  const button = page.getByRole('button');

  // Make sure at least some part of element intersects viewport.
  await expect(button).toBeInViewport();

  // Make sure element is fully outside of viewport.
  await expect(button).not.toBeInViewport();

  // Make sure that at least half of the element intersects viewport.
  await expect(button).toBeInViewport({ ratio: 0.5 });
  ```

### Miscellaneous

- DOM snapshots in trace viewer can be now opened in a separate window.
- New method `defineConfig` to be used in `playwright.config`.
- New option [`option: Route.fetch.maxRedirects`] for method [`method: Route.fetch`].
- Playwright now supports Debian 11 arm64.
- Official docker images now include Node 18 instead of Node 16.

### ⚠️ Breaking change in component tests

Note: **component tests only**, does not affect end-to-end tests.

`playwright-ct.config` configuration file for component testing now requires calling `defineConfig`.

```js
// Before

import { type PlaywrightTestConfig, devices } from '@playwright/experimental-ct-react';
const config: PlaywrightTestConfig = {
  // ... config goes here ...
};
export default config;
```

Replace `config` variable definition with `defineConfig` call:

```js
// After

import { defineConfig, devices } from '@playwright/experimental-ct-react';
export default defineConfig({
  // ... config goes here ...
});
```

### Browser Versions

* Chromium 111.0.5563.19
* Mozilla Firefox 109.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 110
* Microsoft Edge 110

## Version 1.30

### Browser Versions

* Chromium 110.0.5481.38
* Mozilla Firefox 108.0.2
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 109
* Microsoft Edge 109

## Version 1.29

<LiteYouTube
  id="VbVlz61VtNo"
  title="Playwright 1.29"
/>

### New APIs

- New method [`method: Route.fetch`] and new option `json` for [`method: Route.fulfill`]:

    ```js
    await page.route('**/api/settings', async route => {
      // Fetch original settings.
      const response = await route.fetch();

      // Force settings theme to a predefined value.
      const json = await response.json();
      json.theme = 'Solorized';

      // Fulfill with modified data.
      await route.fulfill({ json });
    });
    ```

- New method [`method: Locator.all`] to iterate over all matching elements:

    ```js
    // Check all checkboxes!
    const checkboxes = page.getByRole('checkbox');
    for (const checkbox of await checkboxes.all())
      await checkbox.check();
    ```

- [`method: Locator.selectOption`] matches now by value or label:

  ```html
  <select multiple>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
  ```

  ```js
  await element.selectOption('Red');
  ```

- Retry blocks of code until all assertions pass:

    ```js
    await expect(async () => {
      const response = await page.request.get('https://api.example.com');
      await expect(response).toBeOK();
    }).toPass();
    ```

  Read more in our documentation.

- Automatically capture **full page screenshot** on test failure:
    ```js
    import { defineConfig } from '@playwright/test';
    export default defineConfig({
      use: {
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        }
      }
    });
    ```

### Miscellaneous

- Playwright Test now respects `jsconfig.json`.
- New options `args` and `proxy` for [`method: AndroidDevice.launchBrowser`].
- Option `postData` in method [`method: Route.continue`] now supports [Serializable] values.

### Browser Versions

* Chromium 109.0.5414.46
* Mozilla Firefox 107.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 108
* Microsoft Edge 108

## Version 1.28

<LiteYouTube
  id="tVSq-0n-TY4"
  title="Playwright 1.28"
/>

### Playwright Tools

* **Record at Cursor in VSCode.** You can run the test, position the cursor at the end of the test and continue generating the test.

* **Live Locators in VSCode.** You can hover and edit locators in VSCode to get them  highlighted in the opened browser.
* **Live Locators in CodeGen.** Generate a locator for any element on the page using "Explore" tool.

* **Codegen and Trace Viewer Dark Theme.** Automatically picked up from operating system settings.

### Test Runner

* Configure retries and test timeout for a file or a test with [`method: Test.describe.configure`].

    ```js
    // Each test in the file will be retried twice and have a timeout of 20 seconds.
    test.describe.configure({ retries: 2, timeout: 20_000 });
    test('runs first', async ({ page }) => {});
    test('runs second', async ({ page }) => {});
    ```

* Use [`property: TestProject.snapshotPathTemplate`] and [`property: TestConfig.snapshotPathTemplate`] to configure a template controlling location of snapshots generated by [`method: PageAssertions.toHaveScreenshot#1`] and [`method: SnapshotAssertions.toMatchSnapshot#1`].

    ```js
    import { defineConfig } from '@playwright/test';
    export default defineConfig({
      testDir: './tests',
      snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
    });
    ```

### New APIs

- [`method: Locator.blur`]
- [`method: Locator.clear`]
- [`method: Android.launchServer`] and  [`method: Android.connect`]
- [`event: AndroidDevice.close`]

### Browser Versions

* Chromium 108.0.5359.29
* Mozilla Firefox 106.0
* WebKit 16.4

This version was also tested against the following stable channels:

* Google Chrome 107
* Microsoft Edge 107

## Version 1.27

<LiteYouTube
  id="b84eqab3kwc"
  title="Playwright 1.27"
/>

### Locators

With these new APIs writing locators is a joy:
- [`method: Page.getByText`] to locate by text content.
- [`method: Page.getByRole`] to locate by ARIA role, ARIA attributes and accessible name.
- [`method: Page.getByLabel`] to locate a form control by associated label's text.
- [`method: Page.getByTestId`] to locate an element based on its `data-testid` attribute (other attribute can be configured).
- [`method: Page.getByPlaceholder`] to locate an input by placeholder.
- [`method: Page.getByAltText`] to locate an element, usually image, by its text alternative.
- [`method: Page.getByTitle`] to locate an element by its title.

```js
await page.getByLabel('User Name').fill('John');

await page.getByLabel('<example-value>').fill('<example-value>');

await page.getByRole('button', { name: 'Sign in' }).click();

await expect(page.getByText('Welcome, John!')).toBeVisible();
```

All the same methods are also available on [Locator], [FrameLocator] and [Frame] classes.

### Other highlights

- `workers` option in the `playwright.config.ts` now accepts a percentage string to use some of the available CPUs. You can also pass it in the command line:
  ```bash
  npx playwright test --workers=20%
  ```

- New options `host` and `port` for the html reporter.
  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    reporter: [['html', { host: 'localhost', port: '9223' }]],
  });
  ```

- New field `FullConfig.configFile` is available to test reporters, specifying the path to the config file if any.

- As announced in v1.25, Ubuntu 18 will not be supported as of Dec 2022. In addition to that, there will be no WebKit updates on Ubuntu 18 starting from the next Playwright release.

### Behavior Changes

- [`method: LocatorAssertions.toHaveAttribute`] with an empty value does not match missing attribute anymore. For example, the following snippet will succeed when `button` **does not** have a `disabled` attribute.

   ```js
   await expect(page.getByRole('button')).toHaveAttribute('disabled', '');
   ```

- Command line options `--grep` and `--grep-invert` previously incorrectly ignored `grep` and `grepInvert` options specified in the config. Now all of them are applied together.

### Browser Versions

* Chromium 107.0.5304.18
* Mozilla Firefox 105.0.1
* WebKit 16.0

This version was also tested against the following stable channels:

* Google Chrome 106
* Microsoft Edge 106

## Version 1.26

<LiteYouTube
  id="b84eqab3kwc"
  title="Playwright 1.26"
/>

### Assertions

- New option `enabled` for [`method: LocatorAssertions.toBeEnabled`].
- [`method: LocatorAssertions.toHaveText`] now pierces open shadow roots.
- New option `editable` for [`method: LocatorAssertions.toBeEditable`].
- New option `visible` for [`method: LocatorAssertions.toBeVisible`].

### Other highlights

- New option `maxRedirects` for [`method: APIRequestContext.get`] and others to limit redirect count.
- New command-line flag `--pass-with-no-tests` that allows the test suite to pass when no files are found.
- New command-line flag `--ignore-snapshots` to skip snapshot expectations, such as `expect(value).toMatchSnapshot()` and `expect(page).toHaveScreenshot()`.

### Behavior Change

A bunch of Playwright APIs already support the `waitUntil: 'domcontentloaded'` option.
For example:

```js
await page.goto('https://playwright.dev', {
  waitUntil: 'domcontentloaded',
});
```

Prior to 1.26, this would wait for all iframes to fire the `DOMContentLoaded`
event.

To align with web specification, the `'domcontentloaded'` value only waits for
the target frame to fire the `'DOMContentLoaded'` event. Use `waitUntil: 'load'` to wait for all iframes.

### Browser Versions

* Chromium 106.0.5249.30
* Mozilla Firefox 104.0
* WebKit 16.0

This version was also tested against the following stable channels:

* Google Chrome 105
* Microsoft Edge 105
