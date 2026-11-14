---
title: "Release notes (part 6 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 6 of 12)

## Version 1.50

### Test runner

* New option [`option: Test.step.timeout`] allows specifying a maximum run time for an individual test step. A timed-out step will fail the execution of the test.

  ```js
  test('some test', async ({ page }) => {
    await test.step('a step', async () => {
      // This step can time out separately from the test
    }, { timeout: 1000 });
  });
  ```

* New method [`method: Test.step.skip`] to disable execution of a test step.

  ```js
  test('some test', async ({ page }) => {
    await test.step('before running step', async () => {
      // Normal step
    });

    await test.step.skip('not yet ready', async () => {
      // This step is skipped
    });

    await test.step('after running step', async () => {
      // This step still runs even though the previous one was skipped
    });
  });
  ```

* Expanded [`method: LocatorAssertions.toMatchAriaSnapshot#2`] to allow storing of aria snapshots in separate YAML files.
* Added method [`method: LocatorAssertions.toHaveAccessibleErrorMessage`] to assert the Locator points to an element with a given aria errormessage.
* Option [`property: TestConfig.updateSnapshots`] added the configuration enum `changed`. `changed` updates only the snapshots that have changed, whereas `all` now updates all snapshots, regardless of whether there are any differences.
* New option [`property: TestConfig.updateSourceMethod`] defines the way source code is updated when [`property: TestConfig.updateSnapshots`] is configured. Added `overwrite` and `3-way` modes that write the changes into source code, on top of existing `patch` mode that creates a patch file.

  ```bash
  npx playwright test --update-snapshots=changed --update-source-method=3way
  ```

* Option [`property: TestConfig.webServer`] added a `gracefulShutdown` field for specifying a process kill signal other than the default `SIGKILL`.
* Exposed [`property: TestStep.attachments`] from the reporter API to allow retrieval of all attachments created by that step.
* New option `pathTemplate` for `toHaveScreenshot` and `toMatchAriaSnapshot` assertions in the [`property: TestConfig.expect`] configuration.

### UI updates

* Updated default HTML reporter to improve display of attachments.
* New button in Codegen for picking elements to produce aria snapshots.
* Additional details (such as keys pressed) are now displayed alongside action API calls in traces.
* Display of `canvas` content in traces is error-prone. Display is now disabled by default, and can be enabled via the `Display canvas content` UI setting.
* `Call` and `Network` panels now display additional time information.

### Breaking

* [`method: LocatorAssertions.toBeEditable`] and [`method: Locator.isEditable`] now throw if the target element is not ``, `<select>`, or a number of other editable elements.
* Option [`property: TestConfig.updateSnapshots`] now updates all snapshots when set to `all`, rather than only the failed/changed snapshots. Use the new enum `changed` to keep the old functionality of only updating the changed snapshots.

### Browser Versions

* Chromium 133.0.6943.16
* Mozilla Firefox 134.0
* WebKit 18.2

This version was also tested against the following stable channels:

* Google Chrome 132
* Microsoft Edge 132

## Version 1.49

<LiteYouTube
  id="S5wCft-ImKk"
  title="Playwright 1.49"
/>

### Aria snapshots

New assertion [`method: LocatorAssertions.toMatchAriaSnapshot`] verifies page structure by comparing to an expected accessibility tree, represented as YAML.

```js
await page.goto('https://playwright.dev');
await expect(page.locator('body')).toMatchAriaSnapshot(`
  - banner:
    - heading /Playwright enables reliable/ [level=1]
    - link "Get started"
    - link "Star microsoft/playwright on GitHub"
  - main:
    - img "Browsers (Chromium, Firefox, WebKit)"
    - heading "Any browser • Any platform • One API"
`);
```

You can generate this assertion with Test Generator and update the expected snapshot with `--update-snapshots` command line flag.

Learn more in the aria snapshots guide.

### Test runner

- New option [`property: TestConfig.tsconfig`] allows to specify a single `tsconfig` to be used for all tests.
- New method [`method: Test.fail.only`] to focus on a failing test.
- Options [`property: TestConfig.globalSetup`] and [`property: TestConfig.globalTeardown`] now support multiple setups/teardowns.
- New value `'on-first-failure'` for [`property: TestOptions.screenshot`].
- Added "previous" and "next" buttons to the HTML report to quickly switch between test cases.
- New properties [`property: TestInfoError.cause`] and [`property: TestError.cause`] mirroring `Error.cause`.

### Breaking: `chrome` and `msedge` channels switch to new headless mode

This change affects you if you're using one of the following channels in your `playwright.config.ts`:
- `chrome`, `chrome-dev`, `chrome-beta`, or `chrome-canary`
- `msedge`, `msedge-dev`, `msedge-beta`, or `msedge-canary`

#### What do I need to do?

After updating to Playwright v1.49, run your test suite. If it still passes, you're good to go. If not, you will probably need to update your snapshots, and adapt some of your test code around PDF viewers and extensions. See issue #33566 for more details.

### Other breaking changes

- There will be no more updates for WebKit on Ubuntu 20.04 and Debian 11. We recommend updating your OS to a later version.
- Package `@playwright/experimental-ct-vue2` will no longer be updated.
- Package `@playwright/experimental-ct-solid` will no longer be updated.

### Try new Chromium headless

You can opt into the new headless mode by using `'chromium'` channel. As official Chrome documentation puts it:

> New Headless on the other hand is the real Chrome browser, and is thus more authentic, reliable, and offers more features. This makes it more suitable for high-accuracy end-to-end web app testing or browser extension testing.

See issue #33566 for the list of possible breakages you could encounter and more details on Chromium headless. Please file an issue if you see any problems after opting in.

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
});
```

### Miscellaneous

- `<canvas>` elements inside a snapshot now draw a preview.
- New method [`method: Tracing.group`] to visually group actions in the trace.
- Playwright docker images switched from Node.js v20 to Node.js v22 LTS.

### Browser Versions

- Chromium 131.0.6778.33
- Mozilla Firefox 132.0
- WebKit 18.2

This version was also tested against the following stable channels:

- Google Chrome 130
- Microsoft Edge 130

## Version 1.48

<LiteYouTube
  id="VGlkSBkMVCQ"
  title="Playwright 1.48"
/>

### WebSocket routing

New methods [`method: Page.routeWebSocket`] and [`method: BrowserContext.routeWebSocket`] allow to intercept, modify and mock WebSocket connections initiated in the page. Below is a simple example that mocks WebSocket communication by responding to a `"request"` with a `"response"`.

```js
await page.routeWebSocket('/ws', ws => {
  ws.onMessage(message => {
    if (message === 'request')
      ws.send('response');
  });
});
```

See [WebSocketRoute] for more details.

### UI updates

- New "copy" buttons for annotations and test location in the HTML report.
- Route method calls like [`method: Route.fulfill`] are not shown in the report and trace viewer anymore. You can see which network requests were routed in the network tab instead.
- New "Copy as cURL" and "Copy as fetch" buttons for requests in the network tab.

### Miscellaneous

- Option [`option: APIRequestContext.fetch.form`] and similar ones now accept FormData.
- New method [`method: Page.requestGC`] may help detect memory leaks.
- New option [`option: Test.step.location`] to pass <example-value> step location.
- Requests made by [APIRequestContext] now record detailed timing and security information in the HAR.

### Browser Versions

- Chromium 130.0.6723.19
- Mozilla Firefox 130.0
- WebKit 18.0

This version was also tested against the following stable channels:

- Google Chrome 129
- Microsoft Edge 129

## Version 1.47

### Network Tab improvements

The Network tab in the UI mode and trace viewer has several nice improvements:

- filtering by asset type and URL
- better display of query string parameters
- preview of font assets

### `--tsconfig` CLI option

By default, Playwright will look up the closest tsconfig for each imported file using a heuristic. You can now specify a single tsconfig file in the command line, and Playwright will use it for all imported files, not only test files:

```sh
# Pass a specific tsconfig
npx playwright test --tsconfig tsconfig.test.json
```

### [APIRequestContext] now accepts `URLSearchParams` and `string` as query parameters

You can now pass `URLSearchParams` and `string` as query parameters to [APIRequestContext]:

```js
test('query params', async ({ request }) => {
  const searchParams = new URLSearchParams();
  searchParams.set('userId', 1);
  const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: searchParams // or as a string: 'userId=1'
      }
  );
  // ...
});
```

### Miscellaneous

- The `mcr.microsoft.com/playwright:v1.47.0` now serves a Playwright image based on Ubuntu 24.04 Noble.
  To use the 22.04 jammy-based image, please use `mcr.microsoft.com/playwright:v1.47.0-jammy` instead.
- New options [`option: Page.removeAllListeners.behavior`], [`option: Browser.removeAllListeners.behavior`] and [`option: BrowserContext.removeAllListeners.behavior`] to wait for ongoing listeners to complete.
- TLS client certificates can now be passed from memory by passing [`option: Browser.newContext.clientCertificates.cert`] and [`option: Browser.newContext.clientCertificates.key`] as buffers instead of file paths.
- Attachments with a `text/html` content type can now be opened in a new tab in the HTML report. This is useful for including third-party reports or other HTML content in the Playwright test report and distributing it to your team.
- [`option: Locator.selectOption.noWaitAfter`] option in [`method: Locator.selectOption`] was deprecated.
- We've seen reports of WebGL in Webkit misbehaving on GitHub Actions `macos-13`. We recommend upgrading GitHub Actions to `macos-14`.

### Browser Versions

- Chromium 129.0.6668.29
- Mozilla Firefox 130.0
- WebKit 18.0

This version was also tested against the following stable channels:

- Google Chrome 128
- Microsoft Edge 128

## Version 1.46

<LiteYouTube
  id="tQo7w-QQBsI"
  title="Playwright 1.46"
/>

### TLS Client Certificates

Playwright now allows you to supply client-side certificates, so that server can verify them, as specified by TLS Client Authentication.

The following snippet sets up a client certificate for `https://example.com`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ...
  use: {
    clientCertificates: [{
      origin: 'https://example.com',
      certPath: './cert.pem',
      keyPath: './key.pem',
      passphrase: '<example-value>',
    }],
  },
  // ...
});
```

You can also provide client certificates to a particular test project or as a parameter of [`method: Browser.newContext`] and [`method: APIRequest.newContext`].

### `--only-changed` cli option

New CLI option `--only-changed` will only run test files that have been changed since the last git commit or from a specific git "ref". This will also run all test files that import any changed files.

```sh
# Only run test files with uncommitted changes
npx playwright test --only-changed

# Only run test files changed relative to the "main" branch
npx playwright test --only-changed=main
```

### Component Testing: New `router` fixture

This release introduces an experimental `router` fixture to intercept and handle network requests in component testing.
There are two ways to use the router fixture:

- Call `router.route(url, handler)` that behaves similarly to [`method: Page.route`].
- Call `router.use(handlers)` and pass MSW library request handlers to it.

Here is an example of reusing your existing MSW handlers in the test.

```js
import { handlers } from '@src/mocks/handlers';

test.beforeEach(async ({ router }) => {
  // install common handlers before each test
  await router.use(...handlers);
});

test('example test', async ({ mount }) => {
  // test as usual, your handlers are active
  // ...
});
```

This fixture is only available in component tests.

### UI Mode / Trace Viewer Updates

- Test annotations are now shown in UI mode.
- Content of text attachments is now rendered inline in the attachments pane.
- New setting to show/hide routing actions like [`method: Route.continue`].
- Request method and status are shown in the network details tab.
- New button to copy source file location to clipboard.
- Metadata pane now displays the `baseURL`.

### Miscellaneous

- New `maxRetries` option in [`method: APIRequestContext.fetch`] which retries on the `ECONNRESET` network error.
- New option to box a fixture to minimize the fixture exposure in test reports and error messages.
- New option to provide a custom fixture title to be used in test reports and error messages.

### Browser Versions

- Chromium 128.0.6613.18
- Mozilla Firefox 128.0
- WebKit 18.0

This version was also tested against the following stable channels:

- Google Chrome 127
- Microsoft Edge 127
