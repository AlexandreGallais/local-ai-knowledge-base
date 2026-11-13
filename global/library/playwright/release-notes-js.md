---
title: "Release notes (part 1 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

import LiteYouTube from '@site/src/components/LiteYouTube';

## Version 1.65

### 🥟 Run tests with Bun

The test runner now runs under Bun. Bun transpiles your TypeScript test files itself, so Playwright does not use Babel or its compilation cache. Pass the `--bun` flag, because without it `bunx playwright test` runs on Node.js:

```bash
bunx --bun playwright test
```

Our CI runs the test runner tests under Bun 1.4.3 on Linux. Some features work differently under Bun:

- There is no watch mode. UI mode does not run tests again when files change, and `--only-changed` does not follow imports.
- Bun loads modules itself, so `--tsconfig` and the JSX options in `tsconfig.json` have no effect, and custom ESM loaders are not supported.
- Stack traces do not include async frames, and API names do not include the class name: `click` instead of `locator.click`. This changes some step locations, step titles and error messages.
- Console output of a test does not get into the trace and UI mode.

### 🚨 Reports with only failures

New `failures` reporter prints failures and successful retries as they occur, followed by a summary, without progress output.

New `onlyFailures` option of the HTML, JSON and JUnit reporters keeps only tests with unexpected outcomes, flaky tests and interrupted tests:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['failures'],
    ['html', { onlyFailures: true }],
  ],
});
```

### 🎯 Test runner

- New built-in `-exclusive-` test lock runs a test only when no other tests are running. All other tests continue to run in parallel with each other:

  ```js
  test('restart the server', { lock: '-exclusive-' }, async () => {
    // No other test runs while this one is running.
  });
  ```

- [`method: Test.skip`], [`method: Test.fixme`], [`method: Test.fail`] and [`method: Test.slow`] now accept only a description. It is recorded in the test annotation:

  ```js
  test('upload a file', async ({ page }) => {
    test.skip('Not implemented yet');
  });
  ```

- New `PLAYWRIGHT_TRANSFORM_CACHE_DIR` environment variable sets the directory for transpiled test files, for example on a Linux machine shared with other users.

### New APIs

- New options [`option: CDPSession.send.timeout`] and [`option: CDPSession.send.signal`] in [`method: CDPSession.send`].
- New [`method: TestRun.mode`] returns the execution mode of a suite during [`method: Reporter.preprocess`].

### Breaking Changes ⚠️

- TypeScript class fields now follow `useDefineForClassFields` from your `tsconfig.json`, the same as `tsc`. It is enabled for `ES2022` and later targets, and when `target` is not specified. A field initializer that reads a constructor parameter property now fails, because the initializer runs first:

  ```js
  class LoginPage {
    // TypeError: Cannot read properties of undefined (reading 'getByRole')
    readonly submit = this.page.getByRole('button', { name: 'Submit' });

    constructor(private readonly page: Page) {}
  }
  ```

  Move the initialization to the constructor, or set `"useDefineForClassFields": false` in your `tsconfig.json`.

- Actions such as [`method: Locator.click`], [`method: Locator.check`], [`method: Locator.tap`], [`method: Locator.fill`], [`method: Locator.clear`] and [`method: Locator.selectOption`] now wait for the element to be not inert. An action on an element with the `inert` attribute, or inside such an element, now times out if the element stays inert.

- A sharded run now fails with "No tests found" when no tests match across all shards. Pass `--pass-with-no-tests` to allow this. An empty shard still passes when other shards have tests.

- Cookie matching now follows RFC 6265. With a URL, [`method: BrowserContext.cookies`] and [`method: APIRequestContext.cookies`] no longer return host-only cookies for subdomains or `Path=/api` cookies for `/apiv2`, and a `Path=/foo/` cookie does not match `/foo`. [APIRequestContext] sends a cookie without a name as `Cookie: x` instead of `Cookie: =x`, and stores `Set-Cookie: token` as a cookie without a name.

- Proxy credentials are no longer sent to websites. The credentials in the [`option: BrowserType.launch.proxy`] option now answer only proxy challenges. To authenticate on a website, use [`option: Browser.newContext.httpCredentials`].

- Text that the browser does not render, such as text that is not assigned to a slot or text directly inside a closed ``, is no longer part of accessible names and aria snapshots. This can change the results of [`method: Page.getByRole`] with a name, [`method: Locator.ariaSnapshot`] and [`method: LocatorAssertions.toMatchAriaSnapshot`].

- String and `URLSearchParams` values of the `params` option in [APIRequestContext] requests are now appended to the query that the URL already has, instead of replacing it.

- `.css`, `.less` and `.scss` imports in test files now load as empty modules instead of being removed, so the imported file must exist.

- The blob reporter again deletes the content of its output directory before it writes the report. Playwright 1.64 kept reports with other names.

- Test locations of imported calls such as `test(` in CommonJS output now point to the start of the callee, for example `a.spec.ts:3:7` instead of `a.spec.ts:3:11`. This is the same as in ESM.

### Announcements

* ⚠️ Playwright no longer tests on Node.js 20. Use Node.js 22, 24 or 26, as listed in the system requirements.
* 🐳 Docker images now include Node.js 26 instead of Node.js 24, and the latest patch of Chromium on the same branch.

### Browser Versions

- Chromium 158.0.8127.18
- Mozilla Firefox 159.0
- WebKit 27.2

This version was also tested against the following stable channels:

- Google Chrome 157
- Microsoft Edge 156

## Version 1.64

### 🧰 WebMCP

New [`property: Page.webmcp`] and [`property: Frame.webmcp`] give access to the tools that a page registers through
the experimental WebMCP browser API, so you can test them like
any other part of your app:

```js
const browser = await chromium.launch({ args: ['--enable-features=WebMCP'] });
const page = await browser.newPage();
await page.goto('https://example.com');

for (const tool of await page.webmcp.tools())
  console.log(tool.name, tool.description);

const result = await page.webmcp.callTool('add', { a: 2, b: 40 });
console.log(result.content[0].text); // "42"
```

Playwright MCP also supports WebMCP by default, with page-defined tools offered to the agent as `webmcp_<tool>`. Pass `--no-webmcp` to opt out.

`playwright-cli` exposes them as well:

```bash
playwright-cli webmcp-list
playwright-cli webmcp-call search_catalog --params '{"query":"cats"}'
```

### 🎬 Better videos

Videos can now be recorded at a custom frame rate, and the decorations for actions are styled with plain CSS:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 },
      fps: 60,
      show: {
        actions: {
          style: {
            point: 'width: 20px; height: 20px; border-radius: 50%; background: red',
            highlight: 'outline: 2px solid #333; background: rgba(0, 128, 255, .15)',
            title: 'font-size: 16px',
          },
        },
      },
    },
  },
});
```

- New `fps` option in [`property: TestOptions.video`], [`option: Browser.newContext.recordVideo`] and
  [`method: Screencast.start`]. Firefox and WebKit currently capture up to 25 frames per second.
- New [`option: Screencast.showActions.style`] option takes CSS declarations for the `point` marker, the target
  `highlight` and the action `title`. It replaces the `fontSize` option, which is now deprecated.
- The cursor stays visible at the last action point, survives navigations and travels along a natural, eased path.
- Videos are encoded with VP9 instead of VP8, which takes less CPU and produces smaller files of the same or better
  quality.
- All video options are also available in Playwright MCP and `playwright-cli`.

### 🎯 Test runner

- New [`property: TestProject.default`] option keeps a project in the config without running it by default. You can configure every browser you care about, and let a plain `npx playwright test` run just your favourite one:

  ```js
  import { defineConfig, devices } from '@playwright/test';

  export default defineConfig({
    projects: [
      { name: 'chromium', use: devices['Desktop Chrome'] },
      { name: 'firefox', use: devices['Desktop Firefox'], default: false },
      { name: 'webkit', use: devices['Desktop Safari'], default: false },
    ],
  });
  ```

  ```bash
  npx playwright test                     # runs chromium only
  npx playwright test --project=firefox   # runs firefox
  npx playwright test --project="*"       # runs all three, for example on CI
  ```

- New `--shuffle` command line option schedules tests in a random order, which helps to find tests that accidentally depend on each other.

  ```bash
  npx playwright test --shuffle
  # Running 42 tests using 4 workers, shuffle seed 271828182
  # ...

  # Pass the seed to reproduce the same order.
  npx playwright test --shuffle 271828182
  ```

- New `lock` option in [`method: Test.describe.configure`] adds test locks to all tests in a file or a group:

  ```js
  test.describe.configure({ lock: 'user-settings' });
  ```

- New `type` option of `toHaveScreenshot` in [`property: TestConfig.expect`] stores all unnamed screenshots as WebP:

  ```js
  export default defineConfig({
    expect: {
      toHaveScreenshot: { type: 'webp' },
    },
  });
  ```

### 🪆 Locator.within()

New [`method: Locator.within`] combines two locators that you already have, reading in the natural order —
"this button, within that dialog":

```js
const saveButton = page.getByRole('button', { name: 'Save' });
const dialog = page.getByTestId('settings-dialog');

await saveButton.within(dialog).click();
```

Relative locators such as [`method: Locator.nth`] or [`method: Locator.first`] are resolved inside each parent
separately, which makes column-like queries straightforward:

```js
// The third cell of every row, not the third cell in the table.
const thirdColumn = page.getByRole('cell').nth(2).within(page.getByRole('row'));
await expect(thirdColumn).toHaveText(['Apple', 'Banana', 'Cherry']);
```

### New APIs

- New [`method: Page.getByRef`] locates an element by its aria ref, such as `e2`, reported by [`method: Page.ariaSnapshot`] in the `'ai'` mode.
- New option [`option: Page.content.includeShadow`] in [`method: Page.content`] and [`method: Frame.content`] serializes open shadow roots as declarative shadow DOM.
- New option [`option: Credentials.create.signCount`] sets the initial signature counter of a virtual credential. [`method: Credentials.create`] and [`method: Credentials.get`] return the current `signCount`, and it is saved and restored together with the credentials in the storage state.
- New [`property: FullConfig.filteredProjects`] lists the projects that were selected to run after applying the `--project` filter. It is available in global setup and reporters.
- New [`method: APIRequestContext.addCookies`], [`method: APIRequestContext.cookies`] and [`method: APIRequestContext.clearCookies`] manage cookies of a request context, mirroring the [BrowserContext] methods:

  ```js
  await request.addCookies([{ name: 'session-id', value: '42', url: 'https://example.com' }]);
  console.log(await request.cookies('https://example.com'));
  await request.clearCookies({ name: 'session-id' });
  ```

### Breaking changes ⚠️

- `screen` property is now forwarded from the device descriptors. If you use `...devices['Desktop Chrome']` and alike, `window.screen` and media queries now see the emulated screen size. You can opt-out by explicitly setting `screen` to `undefined`:

  ```js
  export default defineConfig({
    use: {
      ...devices['Desktop Chrome'],
      screen: undefined,
    },
  });
  ```

- JSX in your test files now follows your `tsconfig.json`. Playwright compiles JSX in test files according to the `jsx`, `jsxFactory`, `jsxFragmentFactory` and `jsxImportSource` tsconfig options, and defaults to the automatic runtime from `react/jsx-runtime`.

- `--update-snapshots=missing` now passes the test run. Tests that only create missing snapshots now pass in the `'missing'` mode of [`property: TestConfig.updateSnapshots`], so that CI can generate new snapshots and verify the existing ones in a single run. The mode used when the option is not specified is now called `'default'` and behaves as before: missing snapshots are written and the test fails.

- Elements inside hidden iframes are considered hidden. Elements inside an iframe that is not visible, for example with `visibility: hidden`, are now considered hidden by actions, [`method: Locator.isVisible`] and [`method: LocatorAssertions.toBeVisible`].

### Browser Versions

- Chromium 156.0.8078.4
- Mozilla Firefox 157.0
- WebKit 27.2

This version was also tested against the following stable channels:

- Google Chrome 155
- Microsoft Edge 155
