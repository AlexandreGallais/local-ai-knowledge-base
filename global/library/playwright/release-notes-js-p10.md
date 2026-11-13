---
title: "Release notes (part 10 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 10 of 12)

## Version 1.25

<LiteYouTube
  id="NFLHA57a-so"
  title="Playwright 1.25"
/>

### VSCode Extension

* Watch your tests running live & keep devtools open.
* Pick selector.
* Record new test from current page state.

### Test Runner

* [`method: Test.step`] now returns the value of the step function:

    ```js
    test('should work', async ({ page }) => {
      const pageTitle = await test.step('get title', async () => {
        await page.goto('https://playwright.dev');
        return await page.title();
      });
      console.log(pageTitle);
    });
    ```

* Added [`method: Test.describe.fixme`].
* New `'interrupted'` test status.
* Enable tracing via CLI flag: `npx playwright test --trace=on`.

### Announcements

* 🎁 We now ship Ubuntu 22.04 Jammy Jellyfish docker image: `mcr.microsoft.com/playwright:v1.34.0-jammy`.
* 🪦 This is the last release with macOS 10.15 support (deprecated as of 1.21).
* 🪦 This is the last release with Node.js 12 support, we recommend upgrading to Node.js LTS (16).
* ⚠️ Ubuntu 18 is now deprecated and will not be supported as of Dec 2022.

### Browser Versions

* Chromium 105.0.5195.19
* Mozilla Firefox 103.0
* WebKit 16.0

This version was also tested against the following stable channels:

* Google Chrome 104
* Microsoft Edge 104

## Version 1.24

<LiteYouTube
  id="9F05o1shxcY"
  title="Playwright 1.24"
/>

### 🌍 Multiple Web Servers in `playwright.config.ts`

Launch multiple web servers, databases, or other processes by passing an array of configurations:

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: [
    {
      command: 'npm run start',
      url: 'http://127.0.0.1:3000',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run backend',
      url: 'http://127.0.0.1:3333',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    }
  ],
  use: {
    baseURL: 'http://localhost:3000/',
  },
});
```

### 🐂 Debian 11 Bullseye Support

Playwright now supports Debian 11 Bullseye on x86_64 for Chromium, Firefox and WebKit. Let us know
if you encounter any issues!

Linux support looks like this:

|          | Ubuntu 20.04 | Ubuntu 22.04 | Debian 11
| :--- | :---: | :---: | :---: | :---: |
| Chromium | ✅ | ✅ | ✅ |
| WebKit | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |

### 🕵️ Anonymous Describe

It is now possible to call [`method: Test.describe`] to create suites without a title. This is useful for giving a group of tests a common option with [`method: Test.use`].

```js
test.describe(() => {
  test.use({ colorScheme: 'dark' });

  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

### 🧩 Component Tests Update

Playwright 1.24 Component Tests introduce `beforeMount` and `afterMount` hooks.
Use these to configure your app for tests.

For example, this could be used to setup App router in Vue.js:

```js
import { test } from '@playwright/experimental-ct-vue';
import { Component } from './mycomponent';

test('should work', async ({ mount }) => {
  const component = await mount(Component, {
    hooksConfig: {
      /* anything to configure your app */
    }
  });
});
```

```js
import { router } from '../router';
import { beforeMount } from '@playwright/experimental-ct-vue/hooks';

beforeMount(async ({ app, hooksConfig }) => {
  app.use(router);
});
```

A similar configuration in Next.js would look like this:

```js
import { test } from '@playwright/experimental-ct-react';
import { Component } from './mycomponent';

test('should work', async ({ mount }) => {
  const component = await mount(<Component></Component>, {
    // Pass mock value from test into `beforeMount`.
    hooksConfig: {
      router: {
        query: { page: 1, per_page: 10 },
        asPath: '/posts'
      }
    }
  });
});
```

```js
import router from 'next/router';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';

beforeMount(async ({ hooksConfig }) => {
  // Before mount, redefine useRouter to return mock value from test.
  router.useRouter = () => hooksConfig.router;
});
```

## Version 1.23

<LiteYouTube
  id="NRGOV46P3kU"
  title="Playwright 1.23"
/>

### Network Replay

Now you can record network traffic into a HAR file and re-use this traffic in your tests.

To record network into HAR file:

```bash
npx playwright open --save-har=github.har.zip https://github.com/microsoft
```

Alternatively, you can record HAR programmatically:

```js
const context = await browser.newContext({
  recordHar: { path: 'github.har.zip' }
});
// ... do stuff ...
await context.close();
```

Use the new methods [`method: Page.routeFromHAR`] or [`method: BrowserContext.routeFromHAR`] to serve matching responses from the HAR file:

```js
await context.routeFromHAR('github.har.zip');
```

Read more in our documentation.

### Advanced Routing

You can now use [`method: Route.fallback`] to defer routing to other handlers.

Consider the following example:

```js
// Remove a header from all requests.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', async route => {
    const headers = await route.request().allHeaders();
    delete headers['if-none-match'];
    await route.fallback({ headers });
  });
});

test('should work', async ({ page }) => {
  await page.route('**/*', async route => {
    if (route.request().resourceType() === 'image')
      await route.abort();
    else
      await route.fallback();
  });
});
```

Note that the new methods [`method: Page.routeFromHAR`] and [`method: BrowserContext.routeFromHAR`] also participate in routing and could be deferred to.

### Web-First Assertions Update

* New method [`method: LocatorAssertions.toHaveValues`] that asserts all selected values of `<select multiple>` element.
* Methods [`method: LocatorAssertions.toContainText`] and [`method: LocatorAssertions.toHaveText`] now accept `ignoreCase` option.

### Component Tests Update

* Support for Vue2 via the `@playwright/experimental-ct-vue2` package.
* Support for component tests for create-react-app with components in `.js` files.

Read more about component testing with Playwright.

### Miscellaneous

* If there's a service worker that's in your way, you can now easily disable it with a new context option `serviceWorkers`:
  ```js
  export default {
    use: {
      serviceWorkers: 'block',
    }
  };
  ```
* Using `.zip` path for `recordHar` context option automatically zips the resulting HAR:
  ```js
  const context = await browser.newContext({
    recordHar: {
      path: 'github.har.zip',
    }
  });
  ```
* If you intend to edit HAR by hand, consider using the `"minimal"` HAR recording mode
  that only records information that is essential for replaying:
  ```js
  const context = await browser.newContext({
    recordHar: {
      path: 'github.har',
      mode: 'minimal',
    }
  });
  ```
* Playwright now runs on Ubuntu 22 amd64 and Ubuntu 22 arm64. We also publish new docker image `mcr.microsoft.com/playwright:v1.34.0-jammy`.

### ⚠️ Breaking Changes ⚠️

WebServer is now considered "ready" if request to the specified url has any of the following HTTP status codes:

* `200-299`
* `300-399` (new)
* `400`, `401`, `402`, `403` (new)

## Version 1.22

<LiteYouTube
  id="keV2CIgtBlg"
  title="Playwright 1.22"
/>

### Highlights

- Components Testing (preview)

  Playwright Test can now test your React
  or Vue.js components.
  You can use all the features
  of Playwright Test (such as parallelization, emulation & debugging) while running components
  in real browsers.

  Here is what a typical component test looks like:

  ```js
  import { test, expect } from '@playwright/experimental-ct-react';
  import App from './App';

  // Let's test component in a dark scheme!
  test.use({ colorScheme: 'dark' });

  test('should render', async ({ mount }) => {
    const component = await mount(<App></App>);

    // As with any Playwright test, assert locator text.
    await expect(component).toContainText('React');
    // Or do a screenshot 🚀
    await expect(component).toHaveScreenshot();
    // Or use any Playwright method
    await component.click();
  });
  ```

  Read more in our documentation.

- Role selectors that allow selecting elements by their ARIA role, ARIA attributes and accessible name.

  ```js
  // Click a button with accessible name "log in"
  await page.locator('role=button[name="log in"]').click();
  ```

  Read more in our documentation.

- New [`method: Locator.filter`] API to filter an existing locator

  ```js
  const buttons = page.locator('role=button');
  // ...
  const submitButton = buttons.filter({ hasText: 'Submit' });
  await submitButton.click();
  ```

- New web-first assertions [`method: PageAssertions.toHaveScreenshot#1`] and [`method: LocatorAssertions.toHaveScreenshot#1`] that
  wait for screenshot stabilization and enhances test reliability.

  The new assertions has screenshot-specific defaults, such as:
  * disables animations
  * uses CSS scale option

  ```js
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot();
  ```

  The new [`method: PageAssertions.toHaveScreenshot#1`] saves screenshots at the same
  location as [`method: SnapshotAssertions.toMatchSnapshot#1`].

## Version 1.21

<LiteYouTube
  id="45HZdbmgEw8"
  title="Playwright 1.21"
/>

### Highlights

- New role selectors that allow selecting elements by their ARIA role, ARIA attributes and accessible name.

  ```js
  // Click a button with accessible name "log in"
  await page.locator('role=button[name="log in"]').click();
  ```

  Read more in our documentation.
- New `scale` option in [`method: Page.screenshot`] for smaller sized screenshots.
- New `caret` option in [`method: Page.screenshot`] to control text caret. Defaults to `"hide"`.

- New method `expect.poll` to wait for an arbitrary condition:

  ```js
  // Poll the method until it returns an expected result.
  await expect.poll(async () => {
    const response = await page.request.get('https://api.example.com');
    return response.status();
  }).toBe(200);
  ```

  `expect.poll` supports most synchronous matchers, like `.toBe()`, `.toContain()`, etc.
  Read more in our documentation.

### Behavior Changes

- ESM support when running TypeScript tests is now enabled by default. The `PLAYWRIGHT_EXPERIMENTAL_TS_ESM` env variable is
  no longer required.
- The `mcr.microsoft.com/playwright` docker image no longer contains Python. Please use `mcr.microsoft.com/playwright/python`
  as a Playwright-ready docker image with pre-installed Python.
- Playwright now supports large file uploads (100s of MBs) via [`method: Locator.setInputFiles`] API.

### Browser Versions

- Chromium 101.0.4951.26
- Mozilla Firefox 98.0.2
- WebKit 15.4

This version was also tested against the following stable channels:

- Google Chrome 100
- Microsoft Edge 100

## Version 1.20

<LiteYouTube
  id="6vV-XXKsrbA"
  title="Playwright 1.20"
/>

### Highlights

- New options for methods [`method: Page.screenshot`], [`method: Locator.screenshot`] and [`method: ElementHandle.screenshot`]:
  * Option `animations: "disabled"` rewinds all CSS animations and transitions to a consistent state
  * Option `mask: Locator[]` masks given elements, overlaying them with pink `#FF00FF` boxes.
- `expect().toMatchSnapshot()` now supports anonymous snapshots: when snapshot name is missing, Playwright Test will generate one
  automatically:

  ```js
  expect('Web is Awesome <3').toMatchSnapshot();
  ```
- New `maxDiffPixels` and `maxDiffPixelRatio` options for fine-grained screenshot comparison using `expect().toMatchSnapshot()`:

  ```js
  expect(await page.screenshot()).toMatchSnapshot({
    maxDiffPixels: 27, // allow no more than 27 different pixels.
  });
  ```

  It is most convenient to specify `maxDiffPixels` or `maxDiffPixelRatio` once in [`property: TestConfig.expect`].

- Playwright Test now adds [`property: TestConfig.fullyParallel`] mode. By default, Playwright Test parallelizes between files. In fully parallel mode, tests inside a single file are also run in parallel. You can also use `--fully-parallel` command line flag.

  ```js
  export default {
    fullyParallel: true,
  };
  ```

- [`property: TestProject.grep`] and [`property: TestProject.grepInvert`] are now configurable per project. For example, you can now
  configure smoke tests project using `grep`:
  ```js
  export default {
    projects: [
      {
        name: 'smoke tests',
        grep: /@smoke/,
      },
    ],
  };
  ```

- Trace Viewer now shows API testing requests.
- [`method: Locator.highlight`] visually reveals element(s) for easier debugging.

### Announcements

- We now ship a designated Python docker image `mcr.microsoft.com/playwright/python`. Please switch over to it if you use
  Python. This is the last release that includes Python inside our javascript `mcr.microsoft.com/playwright` docker image.
- v1.20 is the last release to receive WebKit update for macOS 10.15 Catalina. Please update macOS to keep using latest & greatest WebKit!

### Browser Versions

- Chromium 101.0.4921.0
- Mozilla Firefox 97.0.1
- WebKit 15.4

This version was also tested against the following stable channels:

- Google Chrome 99
- Microsoft Edge 99
