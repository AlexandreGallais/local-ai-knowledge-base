---
title: "Release notes (part 11 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 11 of 12)

## Version 1.19

<LiteYouTube
  id="z0EOFvlf14U"
  title="Playwright 1.19"
/>

### Playwright Test Update

- Playwright Test v1.19 now supports *soft assertions*. Failed soft assertions
  **do not** terminate test execution, but mark the test as failed.

  ```js
  // Make a few checks that will not stop the test when failed...
  await expect.soft(page.locator('#status')).toHaveText('Success');
  await expect.soft(page.locator('#eta')).toHaveText('1 day');

  // ... and continue the test to check more things.
  await page.locator('#next-page').click();
  await expect.soft(page.locator('#title')).toHaveText('Make another order');
  ```

  Read more in our documentation

- You can now specify a **custom expect message** as a second argument to the `expect` and `expect.soft` functions, for example:

  ```js
  await expect(page.locator('text=Name'), 'should be logged in').toBeVisible();
  ```

  The error would look like this:

  ```bash
      Error: should be logged in

      Call log:
        - expect.toBeVisible with timeout 5000ms
        - waiting for "getByText('Name')"

        2 |
        3 | test('example test', async({ page }) => {
      > 4 |   await expect(page.locator('text=Name'), 'should be logged in').toBeVisible();
          |                                                                  ^
        5 | });
        6 |
  ```

  Read more in our documentation
- By default, tests in a single file are run in order. If you have many independent tests in a single file, you can now
  run them in parallel with [`method: Test.describe.configure`].

### Other Updates

- Locator now supports a `has` option that makes sure it contains another locator inside:

  ```js
  await page.locator('article', {
    has: page.locator('.highlight'),
  }).click();
  ```

  Read more in locator documentation

- New [`method: Locator.page`]
- [`method: Page.screenshot`] and [`method: Locator.screenshot`] now automatically hide blinking caret
- Playwright Codegen now generates locators and frame locators
- New option `url`  in [`property: TestConfig.webServer`] to ensure your web server is ready before running the tests
- New [`property: TestInfo.errors`] and [`property: TestResult.errors`] that contain all failed assertions and soft assertions.

### Potentially breaking change in Playwright Test Global Setup

It is unlikely that this change will affect you, no action is required if your tests keep running as they did.

We've noticed that in rare cases, the set of tests to be executed was configured in the global setup by means of the environment variables. We also noticed some applications that were post processing the reporters' output in the global teardown. If you are doing one of the two, learn more

### Browser Versions

- Chromium 100.0.4863.0
- Mozilla Firefox 96.0.1
- WebKit 15.4

This version was also tested against the following stable channels:

- Google Chrome 98
- Microsoft Edge 98

## Version 1.18

<LiteYouTube
  id="ABLYpw2BN_g"
  title="Playwright 1.18"
/>

### Locator Improvements

- [`method: Locator.dragTo`]
- `expect(locator).toBeChecked({ checked })`
- Each locator can now be optionally filtered by the text it contains:
    ```js
    await page.locator('li', { hasText: 'my item' }).locator('button').click();
    ```
    Read more in locator documentation

### Testing API improvements

- `expect(response).toBeOK()`
- `testInfo.attach()`
- `test.info()`

### Improved TypeScript Support

1. Playwright Test now respects `tsconfig.json`'s `baseUrl` and `paths`, so you can use aliases
1. There is a new environment variable `PW_EXPERIMENTAL_TS_ESM` that allows importing ESM modules in your TS code, without the need for the compile step. Don't forget the `.js` suffix when you are importing your esm modules. Run your tests as follows:

```bash
npm i --save-dev @playwright/user@example.com
PW_EXPERIMENTAL_TS_ESM=1 npx playwright test
```

### Create Playwright

The `npm init playwright` command is now generally available for your use:

```sh
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

This will create a Playwright Test configuration file, optionally add examples, a GitHub Action workflow and a first test `example.spec.ts`.

### New APIs & changes

- new `testCase.repeatEachIndex` API
- `acceptDownloads` option now defaults to `true`

### Breaking change: custom config options

Custom config options are a convenient way to parametrize projects with different values. Learn more in this guide.

Previously, any fixture introduced through [`method: Test.extend`] could be overridden in the [`property: TestProject.use`] config section. For example,

```js
// WRONG: THIS SNIPPET DOES NOT WORK SINCE v1.18.

// fixtures.js
const test = base.extend({
  myParameter: 'default',
});

// playwright.config.js
module.exports = {
  use: {
    myParameter: 'value',
  },
};
```

The proper way to make a fixture parametrized in the config file is to specify `option: true` when defining the fixture. For example,

```js
// CORRECT: THIS SNIPPET WORKS SINCE v1.18.

// fixtures.js
const test = base.extend({
  // Fixtures marked as "option: true" will get a value specified in the config,
  // or fallback to the default value.
  myParameter: ['default', { option: true }],
});

// playwright.config.js
module.exports = {
  use: {
    myParameter: 'value',
  },
};
```

### Browser Versions

- Chromium 99.0.4812.0
- Mozilla Firefox 95.0
- WebKit 15.4

This version was also tested against the following stable channels:

- Google Chrome 97
- Microsoft Edge 97

## Version 1.17

<LiteYouTube
  id="7iyIdeoAP04"
  title="Playwright 1.17"
/>

### Frame Locators

Playwright 1.17 introduces frame locators - a locator to the iframe on the page. Frame locators capture the logic sufficient to retrieve the `iframe` and then locate elements in that iframe. Frame locators are strict by default, will wait for `iframe` to appear and can be used in Web-First assertions.

Frame locators can be created with either [`method: Page.frameLocator`] or [`method: Locator.frameLocator`] method.

```js
const locator = page.frameLocator('#my-iframe').locator('text=Submit');
await locator.click();
```

Read more at our documentation.

### Trace Viewer Update

Playwright Trace Viewer is now **available online** at https://trace.playwright.dev! Just drag-and-drop your `trace.zip` file to inspect its contents.

> **NOTE**: trace files are not uploaded anywhere; trace.playwright.dev is a progressive web application that processes traces locally.

- Playwright Test traces now include sources by default (these could be turned off with tracing option)
- Trace Viewer now shows test name
- New trace metadata tab with browser details
- Snapshots now have URL bar

### HTML Report Update

- HTML report now supports dynamic filtering
- Report is now a **single static HTML file** that could be sent by e-mail or as a slack attachment.

### Ubuntu ARM64 support + more

- Playwright now supports **Ubuntu 20.04 ARM64**. You can now run Playwright tests inside Docker on Apple M1 and on Raspberry Pi.
- You can now use Playwright to install stable version of Edge on Linux:
    ```bash
    npx playwright install msedge
    ```

### New APIs

- Tracing now supports a `'title'` option
- Page navigations support a new `'commit'` waiting option
- HTML reporter got new configuration options
- `testConfig.snapshotDir` option
- `testInfo.parallelIndex`
- `testInfo.titlePath`
- `testOptions.trace` has new options
- `expect.toMatchSnapshot` supports subdirectories
- `reporter.printsToStdio()`

## Version 1.16

<LiteYouTube
  id="OQKwFDmY64g"
  title="Playwright 1.16"
/>

### 🎭 Playwright Test

#### API Testing

Playwright 1.16 introduces new API Testing that lets you send requests to the server directly from Node.js!
Now you can:

- test your server API
- prepare server side state before visiting the web application in a test
- validate server side post-conditions after running some actions in the browser

To do a request on behalf of Playwright's Page, use **new [`property: Page.request`] API**:

```js
import { test, expect } from '@playwright/test';

test('context fetch', async ({ page }) => {
  // Do a GET request on behalf of page
  const response = await page.request.get('http://example.com/foo.json');
  // ...
});
```

To do a stand-alone request from node.js to an API endpoint, use **new `request` fixture**:

```js
import { test, expect } from '@playwright/test';

test('context fetch', async ({ request }) => {
  // Do a GET request on behalf of page
  const response = await request.get('http://example.com/foo.json');
  // ...
});
```

Read more about it in our API testing guide.

#### Response Interception

It is now possible to do response interception by combining API Testing with request interception.

For example, we can blur all the images on the page:

```js
import { test, expect } from '@playwright/test';
import jimp from 'jimp'; // image processing library

test('response interception', async ({ page }) => {
  await page.route('**/*.jpeg', async route => {
    const response = await page._request.fetch(route.request());
    const image = await jimp.read(await response.body());
    await image.blur(5);
    await route.fulfill({
      response,
      body: await image.getBufferAsync('image/jpeg'),
    });
  });
  const response = await page.goto('https://playwright.dev');
  expect(response.status()).toBe(200);
});
```

Read more about response interception.

#### New HTML reporter

Try it out new HTML reporter with either `--reporter=html` or a `reporter` entry
in `playwright.config.ts` file:

```bash
$ npx playwright test --reporter=html
```

The HTML reporter has all the information about tests and their failures, including surfacing
trace and image artifacts.

Read more about our reporters.

### 🎭 Playwright Library

#### locator.waitFor

Wait for a locator to resolve to a single element with a given state.
Defaults to the `state: 'visible'`.

Comes especially handy when working with lists:

```js
import { test, expect } from '@playwright/test';

test('context fetch', async ({ page }) => {
  const completeness = page.locator('text=Success');
  await completeness.waitFor();
  expect(await page.screenshot()).toMatchSnapshot('screen.png');
});
```

Read more about [`method: Locator.waitFor`].

### Docker support for Arm64

Playwright Docker image is now published for Arm64 so it can be used on Apple Silicon.

Read more about Docker integration.

### 🎭 Playwright Trace Viewer

- web-first assertions inside trace viewer
- run trace viewer with `npx playwright show-trace` and drop trace files to the trace viewer PWA
- API testing is integrated with trace viewer
- better visual attribution of action targets

Read more about Trace Viewer.

### Browser Versions

- Chromium 97.0.4666.0
- Mozilla Firefox 93.0
- WebKit 15.4

This version of Playwright was also tested against the following stable channels:

- Google Chrome 94
- Microsoft Edge 94

## Version 1.15

<LiteYouTube
  id="6RwzsDeEj7Y"
  title="Playwright 1.15"
/>

### 🎭 Playwright Library

#### 🖱️ Mouse Wheel

By using [`method: Mouse.wheel`] you are now able to scroll vertically or horizontally.

#### 📜 New Headers API

Previously it was not possible to get multiple header values of a response. This is now  possible and additional helper functions are available:

- [`method: Request.allHeaders`]
- [`method: Request.headersArray`]
- [`method: Request.headerValue`]
- [`method: Response.allHeaders`]
- [`method: Response.headersArray`]
- [`method: Response.headerValue`]
- [`method: Response.headerValues`]

#### 🌈 Forced-Colors emulation

Its now possible to emulate the `forced-colors` CSS media feature by passing it in the [`method: Browser.newContext`] or calling [`method: Page.emulateMedia`].

#### New APIs

- [`method: Page.route`] accepts new `times` option to specify how many times this route should be matched.
- [`method: Page.setChecked`] and [`method: Locator.setChecked`] were introduced to set the checked state of a checkbox.
- [`method: Request.sizes`] Returns resource size information for given http request.
- [`method: Tracing.startChunk`] - Start a new trace chunk.
- [`method: Tracing.stopChunk`] - Stops a new trace chunk.

### 🎭 Playwright Test

#### 🤝 `test.parallel()` run tests in the same file in parallel

```js
test.describe.parallel('group', () => {
  test('runs in parallel 1', async ({ page }) => {
  });
  test('runs in parallel 2', async ({ page }) => {
  });
});
```

By default, tests in a single file are run in order. If you have many independent tests in a single file, you can now run them in parallel with test.describe.parallel(title, callback).

#### 🛠 Add `--debug` CLI flag

By using `npx playwright test --debug` it will enable the Playwright Inspector for you to debug your tests.

### Browser Versions

- Chromium 96.0.4641.0
- Mozilla Firefox 92.0
- WebKit 15.0
