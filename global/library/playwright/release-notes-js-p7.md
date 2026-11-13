---
title: "Release notes (part 7 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 7 of 12)

## Version 1.45

<LiteYouTube
  id="54_aC-rVKHg"
  title="Playwright 1.45"
/>

### Clock

Utilizing the new [Clock] API allows to manipulate and control time within tests to verify time-related behavior. This API covers many common scenarios, including:
* testing with predefined time;
* keeping consistent time and timers;
* monitoring inactivity;
* ticking through time manually.

```js
// Initialize clock and let the page load naturally.
await page.clock.install({ time: new Date('2024-02-02T08:00:00') });
await page.goto('http://localhost:3333');

// Pretend that the user closed the laptop lid and opened it again at 10am,
// Pause the time once reached that point.
await page.clock.pauseAt(new Date('2024-02-02T10:00:00'));

// Assert the page state.
await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:00:00 AM');

// Close the laptop lid again and open it at 10:30am.
await page.clock.fastForward('30:00');
await expect(page.getByTestId('current-time')).toHaveText('2/2/2024, 10:30:00 AM');
```

See the clock guide for more details.

### Test runner

- New CLI option `--fail-on-flaky-tests` that sets exit code to `1` upon any flaky tests. Note that by default, the test runner exits with code `0` when all failed tests recovered upon a retry. With this option, the test run will fail in such case.

- New environment variable `PLAYWRIGHT_FORCE_TTY` controls whether built-in `list`, `line` and `dot` reporters assume a live terminal. For example, this could be useful to disable tty behavior when your CI environment does not handle ANSI control sequences well. Alternatively, you can enable tty behavior even when to live terminal is present, if you plan to post-process the output and handle control sequences.

  ```sh
  # Avoid TTY features that output ANSI control sequences
  PLAYWRIGHT_FORCE_TTY=0 npx playwright test

  # Enable TTY features, assuming a terminal width 80
  PLAYWRIGHT_FORCE_TTY=80 npx playwright test
  ```

- New options [`property: TestConfig.respectGitIgnore`] and [`property: TestProject.respectGitIgnore`] control whether files matching `.gitignore` patterns are excluded when searching for tests.

- New property `timeout` is now available for custom expect matchers. This property takes into account `playwright.config.ts` and `expect.configure()`.
  ```js
  import { expect as baseExpect } from '@playwright/test';

  export const expect = baseExpect.extend({
    async toHaveAmount(locator: Locator, expected: number, options?: { timeout?: number }) {
      // When no timeout option is specified, use the config timeout.
      const timeout = options?.timeout ?? this.timeout;
      // ... implement the assertion ...
    },
  });
  ```

### Miscellaneous

- Method [`method: Locator.setInputFiles`] now supports uploading a directory for `` elements.
  ```js
  await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir'));
  ```

- Multiple methods like [`method: Locator.click`] or [`method: Locator.press`] now support a `ControlOrMeta` modifier key. This key maps to `Meta` on macOS and maps to `Control` on Windows and Linux.
  ```js
  // Press the common keyboard shortcut Control+S or Meta+S to trigger a "Save" operation.
  await page.keyboard.press('ControlOrMeta+S');
  ```

- New property `httpCredentials.send` in [`method: APIRequest.newContext`] that allows to either always send the `Authorization` header or only send it in response to `401 Unauthorized`.

- New option `reason` in [`method: APIRequestContext.dispose`] that will be included in the error message of ongoing operations interrupted by the context disposal.

- New option `host` in [`method: BrowserType.launchServer`] allows to accept websocket connections on a specific address instead of unspecified `0.0.0.0`.

- Playwright now supports Chromium, Firefox and WebKit on Ubuntu 24.04.

- v1.45 is the last release to receive WebKit update for macOS 12 Monterey. Please update macOS to keep using the latest WebKit.

### Browser Versions

* Chromium 127.0.6533.5
* Mozilla Firefox 127.0
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 126
* Microsoft Edge 126

## Version 1.44

<LiteYouTube
  id="avjSahFWdCI"
  title="Playwright 1.44"
/>

### New APIs

**Accessibility assertions**

- [`method: LocatorAssertions.toHaveAccessibleName`] checks if the element has the specified accessible name:
  ```js
  const locator = page.getByRole('button');
  await expect(locator).toHaveAccessibleName('Submit');
  ```

- [`method: LocatorAssertions.toHaveAccessibleDescription`] checks if the element has the specified accessible description:
  ```js
  const locator = page.getByRole('button');
  await expect(locator).toHaveAccessibleDescription('Upload a photo');
  ```

- [`method: LocatorAssertions.toHaveRole`] checks if the element has the specified ARIA role:
  ```js
  const locator = page.getByTestId('save-button');
  await expect(locator).toHaveRole('button');
  ```

**Locator handler**

- After executing the handler added with [`method: Page.addLocatorHandler`], Playwright will now wait until the overlay that triggered the handler is not visible anymore. You can opt-out of this behavior with the new `noWaitAfter` option.
- You can use new `times` option in [`method: Page.addLocatorHandler`] to specify maximum number of times the handler should be run.
- The handler in [`method: Page.addLocatorHandler`] now accepts the locator as argument.
- New [`method: Page.removeLocatorHandler`] method for removing previously added locator handlers.

```js
const locator = page.getByText('This interstitial covers the button');
await page.addLocatorHandler(locator, async overlay => {
  await overlay.locator('#close').click();
}, { times: 3, noWaitAfter: true });
// Run your tests that can be interrupted by the overlay.
// ...
await page.removeLocatorHandler(locator);
```

**Miscellaneous options**

- `multipart` option in `apiRequestContext.fetch()` now accepts `FormData` and supports repeating fields with the same name.
  ```js
  const formData = new FormData();
  formData.append('file', new File(['let x = 2024;'], 'f1.js', { type: 'text/javascript' }));
  formData.append('file', new File(['hello'], 'f2.txt', { type: 'text/plain' }));
  context.request.post('https://example.com/uploadFiles', {
    multipart: <example-value>
  });
  ```

- `expect(callback).toPass({ intervals })` can now be configured by `expect.toPass.intervals` option globally in [`property: TestConfig.expect`] or per project in [`property: TestProject.expect`].
- `expect(page).toHaveURL(url)` now supports `ignoreCase` option.
- `property: TestProject.ignoreSnapshots` allows to configure  per project whether to skip screenshot expectations.

**Reporter API**

- New method [`method: Suite.entries`] returns child test suites and test cases in their declaration order. [`property: Suite.type`] and [`property: TestCase.type`] can be used to tell apart test cases and suites in the list.
- Blob reporter now allows overriding report file path with a single option `outputFile`. The same option can also be specified as `PLAYWRIGHT_BLOB_OUTPUT_FILE` environment variable that might be more convenient on CI/CD.
- JUnit reporter now supports `includeProjectInTestName` option.

**Command line**

- `--last-failed` CLI option to for running only tests that failed in the previous run.

  First run all tests:
  ```sh
  $ npx playwright test

  Running 103 tests using 5 workers
  ...
  2 failed
    [chromium] › my-test.spec.ts:8:5 › two ─────────────────────────────────────────────────────────
    [chromium] › my-test.spec.ts:13:5 › three ──────────────────────────────────────────────────────
  101 passed (30.0s)
  ```

  Now fix the failing tests and run Playwright again with `--last-failed` option:
  ```sh
  $ npx playwright test --last-failed

  Running 2 tests using 2 workers
    2 passed (1.2s)
  ```

### Browser Versions

* Chromium 125.0.6422.14
* Mozilla Firefox 125.0.1
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 124
* Microsoft Edge 124

## Version 1.43

### New APIs

- Method [`method: BrowserContext.clearCookies`] now supports filters to remove only some cookies.

  ```js
  // Clear all cookies.
  await context.clearCookies();
  // New: clear cookies with a particular name.
  await context.clearCookies({ name: 'session-id' });
  // New: clear cookies for a particular domain.
  await context.clearCookies({ domain: 'my-origin.com' });
  ```

- New mode `retain-on-first-failure` for [`property: TestOptions.trace`]. In this mode, trace is recorded for the first run of each test, but not for retires. When test run fails, the trace file is retained, otherwise it is removed.

  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    use: {
      trace: 'retain-on-first-failure',
    },
  });
  ```

- New property [`property: TestInfo.tags`] exposes test tags during test execution.

  ```js
  test('example', async ({ page }) => {
    console.log(test.info().tags);
  });
  ```

- New method [`method: Locator.contentFrame`] converts a [Locator] object to a [FrameLocator]. This can be useful when you have a [Locator] object obtained somewhere, and later on would like to interact with the content inside the frame.

  ```js
  const locator = page.locator('iframe[name="embedded"]');
  // ...
  const frameLocator = locator.contentFrame();
  await frameLocator.getByRole('button').click();
  ```

- New method [`method: FrameLocator.owner`] converts a [FrameLocator] object to a [Locator]. This can be useful when you have a [FrameLocator] object obtained somewhere, and later on would like to interact with the `iframe` element.

  ```js
  const frameLocator = page.frameLocator('iframe[name="embedded"]');
  // ...
  const locator = frameLocator.owner();
  await expect(locator).toBeVisible();
  ```

### UI Mode Updates

* See tags in the test list.
* Filter by tags by typing `@fast` or clicking on the tag itself.
* New shortcuts:
  - "F5" to run tests.
  - "Shift F5" to stop running tests.
  - "Ctrl `" to toggle test output.

### Browser Versions

* Chromium 124.0.6367.8
* Mozilla Firefox 124.0
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 123
* Microsoft Edge 123

## Version 1.42

<LiteYouTube
  id="KjSaIQLlgns"
  title="Playwright 1.41 & 1.42"
/>

### New APIs

- New method [`method: Page.addLocatorHandler`] registers a callback that will be invoked when specified element becomes visible and may block Playwright actions. The callback can get rid of the overlay. Here is an example that closes a cookie dialog when it appears:
```js
// Setup the handler.
await page.addLocatorHandler(
    page.getByRole('heading', { name: 'Hej! You are in control of your cookies.' }),
    async () => {
      await page.getByRole('button', { name: 'Accept all' }).click();
    });
// Write the test as usual.
await page.goto('https://www.ikea.com/');
await page.getByRole('link', { name: 'Collection of blue and white' }).click();
await expect(page.getByRole('heading', { name: 'Light and easy' })).toBeVisible();
```

- `expect(callback).toPass()` timeout can now be configured by `expect.toPass.timeout` option globally or in project config

- [`event: ElectronApplication.console`] event is emitted when Electron main process calls console API methods.
```js
electronApp.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await electronApp.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

- New syntax for adding tags to the tests (@-tokens in the test title are still supported):
```js
test('test customer login', {
  tag: ['@fast', '@login'],
}, async ({ page }) => {
  // ...
});
```
 Use `--grep` command line option to run only tests with certain tags.
```sh
npx playwright test --grep @fast
```

- `--project` command line flag now supports '*' wildcard:
```sh
npx playwright test --project='*mobile*'
```

- New syntax for test annotations:
```js
test('test full report', {
  annotation: [
    { type: 'issue', description: 'https://github.com/microsoft/playwright/issues/23180' },
    { type: 'docs', description: 'https://playwright.dev/docs/test-annotations#tag-tests' },
  ],
}, async ({ page }) => {
  // ...
});
```

- [`method: Page.pdf`] accepts two new options `tagged` and `outline`.

### Announcements

* ⚠️ Ubuntu 18 is not supported anymore.

### Browser Versions

* Chromium 123.0.6312.4
* Mozilla Firefox 123.0
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 122
* Microsoft Edge 123

## Version 1.41

### New APIs

- New method [`method: Page.unrouteAll`] removes all routes registered by [`method: Page.route`] and [`method: Page.routeFromHAR`]. Optionally allows to wait for ongoing routes to finish, or ignore any errors from them.
- New method [`method: BrowserContext.unrouteAll`] removes all routes registered by [`method: BrowserContext.route`] and [`method: BrowserContext.routeFromHAR`]. Optionally allows to wait for ongoing routes to finish, or ignore any errors from them.
- New options [`option: Page.screenshot.style`] in [`method: Page.screenshot`] and [`option: Locator.screenshot.style`] in [`method: Locator.screenshot`] to add custom CSS to the page before taking a screenshot.
- New option `stylePath` for methods [`method: PageAssertions.toHaveScreenshot#1`] and [`method: LocatorAssertions.toHaveScreenshot#1`] to apply a custom stylesheet while making the screenshot.
- New `fileName` option for Blob reporter, to specify the name of the report to be created.

### Browser Versions

* Chromium 121.0.6167.57
* Mozilla Firefox 121.0
* WebKit 17.4

This version was also tested against the following stable channels:

* Google Chrome 120
* Microsoft Edge 120
