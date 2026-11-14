---
title: "Release notes (part 2 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 2 of 12)

## Version 1.63

### 🔒 Test locks

Tests that access a shared resource — an external service, a global account setting — can now declare a named `lock`.
Tests that share a lock name never run concurrently, across files, workers and projects, while
everything else keeps running in parallel:

```js
test('update user settings', { lock: 'user-settings' }, async ({ page }) => {
  // never runs at the same time as other tests holding 'user-settings'
});
```

A test can hold multiple locks, and [`method: Test.describe`] accepts a `lock` for the whole group.
Learn more about test locks.

### 🪟 Locate across frames

[`method: Page.frameLocator`] and [`method: Frame.frameLocator`] called without a selector search in any frame of the
subtree, so you no longer need to locate the iframe first:

```js
// Finds the button in any frame on the page.
await page.frameLocator().getByRole('button').click();
```

The rest of the locator resolves inside a single frame, just like a regular locator, and an error is thrown when it
matches elements in several frames.

### 👁️ Visible-only locators

New [`method: Locator.visible`] returns a locator that matches only visible elements. It is the recommended
replacement for the `:visible` CSS pseudo-class:

```js
await page.locator('button').visible().click();
```

### 🧾 Step params and subtitles

Steps now carry structured data for reporters. Playwright API steps report the target locator and call arguments,
and [`method: Test.step`] accepts `subtitle` and `params` options for your own steps:

```js
await test.step('Login', async () => {
  // ...
}, { subtitle: 'as admin', params: { user: 'admin' } });
```

Reporters receive them via [`property: TestStep.subtitle`] and [`property: TestStep.params`]. For Playwright API
steps, the subtitle is the locator or the navigation url — for example, `Click` with subtitle `getByRole('button')`.
Both are rendered next to the step title in the trace viewer and the HTML report.

### 🖼️ Aria and screen snapshots in traces

The `snapshots` option of [`method: Tracing.start`] and the [`property: TestOptions.trace`] fixture option now accept an
object selecting what to capture on every action:

```js
export default defineConfig({
  use: {
    trace: {
      mode: 'on',
      snapshots: { dom: true, aria: true, screen: true }
    },
  },
});
```

With aria and screen snapshots recorded, the new **Display Aria** mode in the trace viewer shows the action screenshot
side by side with the aria snapshot, and hovering an aria node highlights it on the screenshot.

### New APIs

#### Browser and Context

- [`option: Browser.newContext.httpCredentials`] now also accepts an array of credentials. The first entry matching the request origin is used, and entries without an origin match any request.
- New option [`option: BrowserContext.storageState.opfs`] includes the origin private file system in the storage state, so it can be persisted and restored into later contexts.
- New events [`event: Page.dialogClosed`] and [`event: BrowserContext.dialogClosed`] are emitted when a JavaScript dialog is accepted, dismissed or closed by the user.

#### Locators

- New [`method: Locator.ariaSnapshotJSON`] and [`method: Page.ariaSnapshotJSON`] return the aria snapshot as a JSON value instead of YAML markup, with `mode`, `depth` and `boxes` options.
- [`method: APIRequestContext.get`] and other request methods accept a type argument that types the response `json()`:

```js
const response = await request.get<User>('/api/users/42');
const user = await response.json(); // typed as User
```

#### Test runner

- New standalone [`property: TestOptions.reducedMotion`], [`property: TestOptions.forcedColors`] and [`property: TestOptions.contrast`] options.
- New `--add-reporter` command line option appends a reporter on top of the ones configured in `playwright.config`, instead of replacing them like `--reporter` does.
- New `omitTags` option for the `list`, `line`, `dot`, `github` and `junit` reporters suppresses the tags that are automatically appended to test titles.

#### Command line

- `npx playwright install --no-remove` keeps the browsers of other Playwright installations instead of removing them.
- `npx playwright codegen --http-credentials` records against pages behind HTTP authentication.

#### Miscellaneous

- New built-in `perfetto` reporter writes a Trace Event Format file for the Perfetto UI or `chrome://tracing`, rendering the test run as a timeline with a lane per worker.
- The HTML report renders a duration waterfall next to test steps.

### Announcements

* ⚠️ The experimental `@playwright/experimental-ct-react`, `@playwright/experimental-ct-react17` and `@playwright/experimental-ct-vue` packages will no longer be updated. Follow the migration guide to move to the stories model introduced in 1.62. Story ids passed to [`method: Fixtures.mount`] can now be typed through the generated `Stories` registry.
* ⚠️ Ubuntu 20.04 is not supported anymore.
* 🐧 On Linux arm64, Playwright now downloads the Chrome for Testing build of Chromium, the same build used on all other platforms.

### Browser Versions

- Chromium 153.0.8010.12
- Mozilla Firefox 155.0
- WebKit 26.6

This version was also tested against the following stable channels:

- Google Chrome 153
- Microsoft Edge 153

## Version 1.62

### 🧱 New component testing model

Component testing moves to a **stories and galleries** model.
A **story** wraps your component in one specific scenario — hard-coded props, mock data, providers — and a
**gallery** page that you serve renders stories on demand. The new [`method: Fixtures.mount`] fixture navigates
to the gallery, mounts a story by id, and returns a [Locator] scoped to the story's root element:

```js
test('click should expand', async ({ mount }) => {
  const component = await mount('components/Expandable/Stateful');
  await component.getByRole('button').click();
  await expect(component.getByTestId('expanded')).toHaveValue('true');
});
```

Pass a story type as a template argument to type-check its props, and use `update(props)` /
`unmount()` on the returned locator to re-render or tear down within a test.

### 🛑 Cancel operations with AbortSignal

Most operations and web-first assertions now accept a `signal` option that takes an
`AbortSignal`, letting you
cancel long-running actions, navigations, waits, and assertions:

```js
const controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

await page.getByRole('button', { name: 'Submit' }).click({ signal: controller.signal });
await expect(page.getByText('Done')).toBeVisible({ signal: controller.signal });
```

Providing a signal does not disable the default timeout; pass `timeout: 0` to disable it.

### 🖼️ WebP screenshots

[`method: PageAssertions.toHaveScreenshot#1`] and [`method: LocatorAssertions.toHaveScreenshot#1`]
can now store snapshots in the WebP format — just give the snapshot a `.webp` name:

```js
// Visual comparisons store the golden snapshot as lossless WebP.
await expect(page).toHaveScreenshot('homepage.webp');

// Standalone screenshots can trade quality for size with lossy WebP.
await page.screenshot({ path: 'homepage.webp', quality: 50 });
```

[`method: Page.screenshot`] and [`method: Locator.screenshot`] also accept `webp` as a `type`,
where quality `100` (the default) is lossless and lower values use lossy compression.

### 🧩 Custom test filtering with Reporter.preprocess()

New [`method: Reporter.preprocess`] hook runs after the configuration is resolved and before
[`method: Reporter.onBegin`], letting a reporter mark individual tests as skipped, excluded,
fixed, or failing through a [TestRun] object:

```js
class MyReporter {
  async preprocess({ config, suite, testRun }) {
    for (const test of suite.allTests()) {
      if (shouldSkip(test))
        testRun.skip(test);
    }
  }
}
```

### 🔁 Isolated retries

New [`property: TestConfig.retryStrategy`] controls when failed tests are retried. The default
`'immediate'` retries as soon as a worker is free; `'isolated'` runs all retries at the end,
one by one in a single worker, to minimize interference with the rest of the suite:

```js
export default defineConfig({
  retries: 2,
  retryStrategy: 'isolated',
});
```

### New APIs

#### Browser and Context

- New option [`option: BrowserContext.storageState.credentials`] includes the context's virtual WebAuthn [Credentials] (passkeys) in the storage state, so they can be persisted and re-seeded into later contexts.

#### Actions

- New `scroll` option (`"auto"` | `"none"`) on actions to opt out of Playwright's automatic scroll-into-view.

#### Network

- New [`method: APIResponse.timing`] returns resource timing information for an API response.

#### Evaluation

- New [`method: Locator.waitForFunction`] waits until a function — called with the matching element — returns a truthy value.
- [`method: Page.evaluate`] and related methods now accept functions as evaluate arguments.
- [`method: Page.addInitScript`] / [`method: BrowserContext.addInitScript`] now accept functions as init-script arguments.

#### Command line & MCP

- Playwright now bundles the Playwright MCP server and `playwright-cli`, runnable via `npx playwright mcp` and `npx playwright cli`.

#### Reporters

- The HTML report's **Merge files** grouping — previously only a UI toggle — can now be enabled from the config with the new `mergeFiles` reporter option:

```js
export default defineConfig({
  reporter: [['html', { mergeFiles: true }]],
});
```

### Announcements

* 📋 The clipboard is now isolated from the operating system in headless mode, so tests that use `navigator.clipboard` no longer read or overwrite the clipboard of the machine running them.
* ⚠️ Debian 11 is not supported anymore.

### Browser Versions

- Chromium 151.0.7922.34
- Mozilla Firefox 153.0
- WebKit 26.5

This version was also tested against the following stable channels:

- Google Chrome 151
- Microsoft Edge 151

## Version 1.61

### 🔑 WebAuthn passkeys

New [Credentials] virtual authenticator, available via [`property: BrowserContext.credentials`], lets tests register passkeys and answer `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies in the page — no real hardware key <example-value>, works in all browsers:

```js
const context = await browser.newContext();

// Seed a passkey your backend provisioned for a test user.
await context.credentials.create('example.com', {
  id: credentialId,
  userHandle,
  privateKey,
  publicKey,
});
await context.credentials.install();

const page = await context.newPage();
await page.goto('https://example.com/login');
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

You can also let the app register a passkey once in a setup test, read it back with [`method: Credentials.get`], and seed it into later tests — see [Credentials] for details.

### 🗃️ Web Storage

New [WebStorage] API, available via [`property: Page.localStorage`] and [`property: Page.sessionStorage`], reads and writes the page's storage for the current origin:

```js
await page.localStorage.setItem('<example-value>', '<example-value>');
const token = await page.localStorage.getItem('<example-value>');
const items = await page.sessionStorage.items();
```

### New APIs

#### Network

- [`method: APIResponse.securityDetails`] and [`method: APIResponse.serverAddr`] mirror the browser-side [`method: Response.securityDetails`] and [`method: Response.serverAddr`].

#### Browser and Screencast

- New option `artifactsDir` in [`method: BrowserType.connectOverCDP`] controls where artifacts such as traces and downloads are stored when attached to an existing browser.
- New option `cursor` in [`method: Screencast.showActions`] controls the cursor decoration rendered for pointer actions.
- The `onFrame` callback in [`method: Screencast.start`] now receives a `timestamp` of when the frame was presented by the browser.

#### Test runner

- The [`property: TestOptions.video`] option now supports the same set of modes as `trace`: new `'on-all-retries'`, `'retain-on-first-failure'` and `'retain-on-failure-and-retries'` values. See the video modes table for which runs are recorded and kept in each mode.
- Supported `expect.soft.poll(...)`.
- New [`property: FullConfig.argv`] — a snapshot of `process.argv` from the runner process, handy for reading custom arguments passed after the `--` separator.
- New [`property: FullConfig.failOnFlakyTests`] mirrors the config option, so reporters can explain why a flaky run failed.
- [`property: TestInfo.errors`] now lists each sub-error of an `AggregateError` as a separate entry.
- New `-G` command line shorthand for `--grep-invert`.

### 🛠️ Other improvements

- Playwright now supports Ubuntu 26.04.
- HAR and trace recordings now include WebSocket requests.

### Browser Versions

- Chromium 149.0.7827.55
- Mozilla Firefox 151.0
- WebKit 26.5

This version was also tested against the following stable channels:

- Google Chrome 149
- Microsoft Edge 149
