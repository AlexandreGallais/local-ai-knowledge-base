---
title: "Release notes (part 5 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 5 of 12)

## Version 1.57

### Speedboard

In HTML reporter, there's a new tab we call "Speedboard":

It shows you all your executed tests sorted by slowness,
and can help you understand where your test suite is taking longer than expected.
Take a look at yours - maybe you'll find some tests that are spending a longer time waiting than they should!

### Chrome for Testing

Playwright now runs on Chrome for Testing builds rather than Chromium. Headed mode uses `chrome`; headless mode uses `chrome-headless-shell`. Existing tests should continue to pass after upgrading to v1.57.

We're expecting no functional changes to come from this switch. The biggest change is the new icon and title in your toolbar.

If you still see an unexpected behaviour change, please file an issue.

On Arm64 Linux, Playwright continues to use Chromium.

### Waiting for webserver output

[`property: TestConfig.webServer`] added a `wait` field. Pass a regular expression, and Playwright will wait until the webserver logs match it.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    wait: {
      stdout: /Listening on port (?<my_server_port>\d+)/
    },
  },
});
```

If you include a named capture group into the expression, then Playwright will provide the capture group contents via environment variables:

```js
import { test, expect } from '@playwright/test';

test.use({ baseURL: `http://localhost:${process.env.MY_SERVER_PORT ?? 3000}` });

test('homepage', async ({ page }) => {
  await page.goto('/');
});
```

This is not just useful for capturing varying ports of dev servers. You can also use it to wait for readiness of a service that doesn't expose an HTTP readiness check, but instead prints a readiness message to stdout or stderr.

### Breaking Change

After 3 years of being deprecated, we removed `page.accessibility` from our API. Please use other libraries such as Axe if you need to test page accessibility. See our Node.js guide for integration with Axe.

### New APIs

- New property [`property: TestConfig.tag`] adds a tag to all tests in this run. This is useful when using merge-reports.
- [`event: Worker.console`] event is emitted when JavaScript within the worker calls one of console API methods, e.g. console.log or console.dir. [`method: Worker.waitForEvent`] can be used to wait for it.
- [`method: Locator.description`] returns locator description previously set with [`method: Locator.describe`], and [`method: Locator.toString`] now uses the description when available.
- New option [`option: Locator.click.steps`] in [`method: Locator.click`] and [`method: Locator.dragTo`] that configures the number of `mousemove` events emitted while moving the mouse pointer to the target element.
- Network requests issued by Service Workers are now reported and can be routed through the BrowserContext, only in Chromium. You can opt out using the `PLAYWRIGHT_DISABLE_SERVICE_WORKER_NETWORK` environment variable.
- Console messages from Service Workers are dispatched through [`event: Worker.console`]. You can opt out of this using the `PLAYWRIGHT_DISABLE_SERVICE_WORKER_CONSOLE` environment variable.

### Miscellaneous

- Playwright docker images switched from Node.js v22 to Node.js v24 LTS.

### Browser Versions

- Chromium 143.0.7499.4
- Mozilla Firefox 144.0.2
- WebKit 26.0

## Version 1.56

<LiteYouTube
  id="_AifxZGxwuk"
  title="Playwright 1.56 - Introducing Playwright Test Agents"
/>

### Playwright Test Agents

Introducing Playwright Test Agents, three custom agent definitions designed to guide LLMs through the core process of building a Playwright test:

* **🎭 planner** explores the app and produces a Markdown test plan

* **🎭 generator** transforms the Markdown plan into the Playwright Test files

* **🎭 healer** executes the test suite and automatically repairs failing tests

Run `npx playwright init-agents` with your client of choice to generate the latest agent definitions:

```bash
# Generate agent files for each agentic loop
# Visual Studio Code
npx playwright init-agents --loop=vscode
# Claude Code
npx playwright init-agents --loop=claude
# opencode
npx playwright init-agents --loop=opencode
```

Learn more about Playwright Test Agents

### New APIs

- New methods [`method: Page.consoleMessages`] and [`method: Page.pageErrors`] for retrieving the most recent console messages from the page
- New method [`method: Page.requests`] for retrieving the most recent network requests from the page
- Added `--test-list` and `--test-list-invert` to allow manual specification of specific tests from a file

### UI Mode and HTML Reporter

- Added option to `'html'` reporter to disable the "Copy prompt" button
- Added option to `'html'` reporter and UI Mode to merge files, collapsing test and describe blocks into a single unified list
- Added option to UI Mode mirroring the `--update-snapshots` options
- Added option to UI Mode to run only a single worker at a time

### Breaking Changes

- Event [`event: BrowserContext.backgroundPage`] has been deprecated and will not be emitted. Method [`method: BrowserContext.backgroundPages`] will return an empty list

### Miscellaneous

- Aria snapshots render and compare `input` `placeholder`
- Added environment variable `PLAYWRIGHT_TEST` to Playwright worker processes to allow discriminating on testing status

### Browser Versions

- Chromium 141.0.7390.37
- Mozilla Firefox 142.0.1
- WebKit 26.0

## Version 1.55

### New APIs

- New Property [`property: TestStepInfo.titlePath`] Returns the full title path starting from the test file, including test and step titles.

### Codegen

- Automatic `toBeVisible()` assertions: Codegen can now generate automatic `toBeVisible()` assertions for common UI interactions. This feature can be enabled in the Codegen settings UI.

### Breaking Changes

- ⚠️ Dropped support for Chromium extension manifest v2.

### Miscellaneous

- Added support for Debian 13 "Trixie".

### Browser Versions

- Chromium 140.0.7339.16
- Mozilla Firefox 141.0
- WebKit 26.0

This version was also tested against the following stable channels:

- Google Chrome 139
- Microsoft Edge 139

## Version 1.54

### Highlights

- New cookie property `partitionKey` in [`method: BrowserContext.cookies`] and [`method: BrowserContext.addCookies`]. This property allows to save and restore partitioned cookies. See CHIPS MDN article for more information. Note that browsers have different support and defaults for cookie partitioning.

- New option `noSnippets` to disable code snippets in the html report.
  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    reporter: [['html', { noSnippets: true }]]
  });
  ```

- New property `location` in test annotations, for example in [`property: TestResult.annotations`] and [`property: TestInfo.annotations`]. It shows where the annotation like `test.skip` or `test.fixme` was added.

### Command Line

- New option `--user-data-dir` in multiple commands. You can specify the same user data dir to reuse browsing state, like authentication, between sessions.
  ```bash
  npx playwright codegen --user-data-dir=./user-data
  ```

- Option `-gv` has been removed from the `npx playwright test` command. Use `--grep-invert` instead.

- `npx playwright open` does not open the test recorder anymore. Use `npx playwright codegen` instead.

### Miscellaneous

- Support for Node.js 16 has been removed.

- Support for Node.js 18 has been deprecated, and will be removed in the future.

### Browser Versions

- Chromium 139.0.7258.5
- Mozilla Firefox 140.0.2
- WebKit 26.0

This version was also tested against the following stable channels:

- Google Chrome 140
- Microsoft Edge 140

## Version 1.53

### Trace Viewer and HTML Reporter Updates

- New Steps in Trace Viewer and HTML reporter:

- New option in `'html'` reporter to set the title of a specific test run:
  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    reporter: [['html', { title: 'Custom test run #1028' }]]
  });
  ```

### Miscellaneous

- New option [`option: TestInfo.snapshotPath.kind`] in [`method: TestInfo.snapshotPath`] controls which snapshot path template is used.
- New method [`method: Locator.describe`] to describe a locator. Used for trace viewer and reports.
  ```js
  const button = page.getByTestId('btn-sub').describe('Subscribe button');
  await button.click();
  ```
- `npx playwright install --list` will now list all installed browsers, versions and locations.

### Browser Versions

- Chromium 138.0.7204.4
- Mozilla Firefox 139.0
- WebKit 18.5

This version was also tested against the following stable channels:

- Google Chrome 137
- Microsoft Edge 137

## Version 1.52

### Highlights

- New method [`method: LocatorAssertions.toContainClass`] to ergonomically assert individual class names on the element.

  ```ts
  await expect(page.getByRole('listitem', { name: 'Ship v1.52' })).toContainClass('done');
  ```

- Aria Snapshots got two new properties: `/children` for strict matching and `/url` for links.

  ```ts
  await expect(locator).toMatchAriaSnapshot(`
    - list
      - /children: equal
      - listitem: Feature A
      - listitem:
        - link "Feature B":
          - /url: "https://playwright.dev"
  `);
  ```

### Test Runner

- New property [`property: TestProject.workers`] allows to specify the number of concurrent worker processes to use for a test project. The global limit of property [`property: TestConfig.workers`] still applies.
- New [`property: TestConfig.failOnFlakyTests`] option to fail the test run if any flaky tests are detected, similarly to `--fail-on-flaky-tests`. This is useful for CI/CD environments where you want to ensure that all tests are stable before deploying.
- New property [`property: TestResult.annotations`] contains annotations for each test retry.

### Miscellaneous

- New option [`option: APIRequest.newContext.maxRedirects`] in [`method: APIRequest.newContext`] to control the maximum number of redirects.
- HTML reporter now supports *NOT filtering* via `!@my-tag` or `!my-file.spec.ts` or `!p:my-project`.

### Breaking Changes

- Glob URL patterns in methods like [`method: Page.route`] do not support `?` and `[]` anymore. We recommend using regular expressions instead.
- Method [`method: Route.continue`] does not allow to override the `Cookie` header anymore. If a `Cookie` header is provided, it will be ignored, and the cookie will be loaded from the browser's cookie store. To set custom cookies, use [`method: BrowserContext.addCookies`].
- macOS 13 is now deprecated and will no longer receive WebKit updates. Please upgrade to a more recent macOS version to continue benefiting from the latest WebKit improvements.

### Browser Versions

- Chromium 136.0.7103.25
- Mozilla Firefox 137.0
- WebKit 18.4

This version was also tested against the following stable channels:

- Google Chrome 135
- Microsoft Edge 135

## Version 1.51

### StorageState for indexedDB

* New option [`option: BrowserContext.storageState.indexedDB`] for [`method: BrowserContext.storageState`] allows to save and restore IndexedDB contents. Useful when your application uses IndexedDB API to store authentication tokens, like Firebase Authentication.

  Here is an example following the authentication guide:

  ```js
  import { test as setup, expect } from '@playwright/test';
  import path from 'path';

  const authFile = path.join(__dirname, '../playwright/.auth/user.json');

  setup('authenticate', async ({ page }) => {
    await page.goto('/');
    // ... perform authentication steps ...

    // make sure to save indexedDB
    await page.context().storageState({ path: authFile, indexedDB: true });
  });
  ```

### Copy as prompt

New "Copy prompt" button on errors in the HTML report, trace viewer and UI mode. Click to copy a pre-filled LLM prompt that contains the error message and useful context for fixing the error.

### Filter visible elements

New option [`option: Locator.filter.visible`] for [`method: Locator.filter`] allows matching only visible elements.

  ```js
  test('some test', async ({ page }) => {
    // Ignore invisible todo items.
    const todoItems = page.getByTestId('todo-item').filter({ visible: true });
    // Check there are exactly 3 visible ones.
    await expect(todoItems).toHaveCount(3);
  });
  ```

### Git information in HTML report

Set option [`property: TestConfig.captureGitInfo`] to capture git information into [`property: TestConfig.metadata`].

  ```js
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    captureGitInfo: { commit: true, diff: true }
  });
  ```

  HTML report will show this information when available:

### Test Step improvements

A new [TestStepInfo] object is now available in test steps. You can add step attachments or skip the step under some conditions.

  ```js
  test('some test', async ({ page, isMobile }) => {
    // Note the new "step" argument:
    await test.step('here is my step', async step => {
      step.skip(isMobile, 'not relevant on mobile layouts');

      // ...
      await step.attach('my attachment', { body: 'some text' });
      // ...
    });
  });
  ```

### Miscellaneous

* New option `contrast` for methods [`method: Page.emulateMedia`] and [`method: Browser.newContext`] allows to emulate the `prefers-contrast` media feature.
* New option [`option: APIRequest.newContext.failOnStatusCode`] makes all fetch requests made through the [APIRequestContext] throw on response codes other than 2xx and 3xx.
* Assertion [`method: PageAssertions.toHaveURL`] now supports a predicate.

### Browser Versions

* Chromium 134.0.6998.35
* Mozilla Firefox 135.0
* WebKit 18.4

This version was also tested against the following stable channels:

* Google Chrome 133
* Microsoft Edge 133
