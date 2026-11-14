---
title: "Release notes (part 4 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 4 of 12)

## Version 1.59

### 🎬 Screencast

New [`property: Page.screencast`] API provides a unified interface for capturing page content with:
- Screencast recordings
- Action annotations
- Visual overlays
- Real-time frame capture
- Agentic video receipts

**Screencast recording** — record video with precise start/stop control, as an alternative to the [`option: Browser.newContext.recordVideo`] option:

```js
await page.screencast.start({ path: 'video.webm' });
// ... perform actions ...
await page.screencast.stop();
```

**Action annotations** — enable built-in visual annotations that highlight interacted elements and display action titles during recording:

```js
await page.screencast.showActions({ position: 'top-right' });
```

[`method: Screencast.showActions`] accepts `position` (`'top-left'`, `'top'`, `'top-right'`, `'bottom-left'`, `'bottom'`, `'bottom-right'`), `duration` (ms per annotation), and `fontSize` (px). Returns a disposable to stop showing actions.

Action annotations can also be enabled in test fixtures via the `video` option:

```js
// playwright.config.ts
export default defineConfig({
  use: {
    video: {
      mode: 'on',
      show: {
        actions: { position: 'top-left' },
        test: { position: 'top-right' },
      },
    },
  },
});
```

**Visual overlays** — add chapter titles and custom HTML overlays on top of the page for richer narration:

```js
await page.screencast.showChapter('Adding TODOs', {
  description: 'Type and press enter for each TODO',
  duration: 1000,
});

await page.screencast.showOverlay('<div style="color: red">Recording</div>');
```

**Real-time frame capture** — stream JPEG-encoded frames for custom processing like thumbnails, live previews, AI vision, and more:

```js
await page.screencast.start({
  onFrame: ({ data }) => sendToVisionModel(data),
  size: { width: 800, height: 600 },
});
```

**Agentic video receipts** — coding agents can produce video evidence of their work. After completing a task, an agent can record a walkthrough video with rich annotations for human review:

```js
await page.screencast.start({ path: 'receipt.webm' });
await page.screencast.showActions({ position: 'top-right' });

await page.screencast.showChapter('Verifying checkout flow', {
  description: 'Added coupon code support per ticket #1234',
});

// Agent performs the verification steps...
await page.locator('#coupon').fill('SAVE20');
await page.locator('#apply-coupon').click();
await expect(page.locator('.discount')).toContainText('20%');

await page.screencast.showChapter('Done', {
  description: 'Coupon applied, discount reflected in total',
});

await page.screencast.stop();
```

The resulting video serves as a receipt: chapter titles provide context, action annotations highlight each interaction, and the visual walkthrough is faster to review than text logs.

### 🔗 Interoperability

New [`method: Browser.bind`] API makes a launched browser available for `playwright-cli`, `@playwright/mcp`, and other clients to connect to.

**Bind a browser** — start a browser and bind it so others can connect:

```js
const { endpoint } = await browser.bind('my-session', {
  workspaceDir: '/my/project',
});
```

**Connect from playwright-cli** — connect to the running browser from your favorite coding agent.

```bash
playwright-cli attach my-session
playwright-cli -s my-session snapshot
```

**Connect from @playwright/mcp** — or point your MCP server to the running browser.

```bash
@playwright/mcp --endpoint=my-session
```

**Connect from a Playwright client** — use API to connect to the browser. Multiple clients at a time are supported!

```js
const browser = await chromium.connect(endpoint);
```

Pass `host` and `port` options to bind over WebSocket instead of a named pipe:

```js
const { endpoint } = await browser.bind('my-session', {
  host: 'localhost',
  port: 0,
});
// endpoint is a ws:// URL
```

Call [`method: Browser.unbind`] to stop accepting new connections.

### 📊 Observability

Run `playwright-cli show` to open the Dashboard that lists all the bound browsers, their statuses, and allows interacting with them:
- See what your agent is doing on the background browsers
- Click into the sessions for manual interventions
- Open DevTools to inspect pages from the background browsers.

- `playwright-cli` binds all of its browsers automatically, so you can see what your agents are doing.
- Pass `PLAYWRIGHT_DASHBOARD=1` env variable to see all `@playwright/test` browsers in the dashboard.

### 🐛 CLI debugger for agents

Coding agents can now run `npx playwright test --debug=cli` to attach and debug tests over `playwright-cli` — perfect for automatically fixing tests in agentic workflows:

```bash
$ npx playwright test --debug=cli
### Debugging Instructions
- Run "playwright-cli attach tw-87b59e" to attach to this test

$ playwright-cli attach tw-87b59e
### Session `tw-87b59e` created, attached to `tw-87b59e`.
Run commands with: playwright-cli --session=tw-87b59e <command>
### Paused
- Navigate to "/" at output/tests/example.spec.ts:4

$ playwright-cli --session tw-87b59e step-over
### Page
- Page URL: https://playwright.dev/
- Page Title: Fast and reliable end-to-end testing for modern web apps | Playwright
### Paused
- Expect "toHaveTitle" at output/tests/example.spec.ts:7
```

### 📋 CLI trace analysis for agents

Coding agents can run `npx playwright trace` to explore Playwright Trace and understand failing or flaky tests from the command line:

```bash
$ npx playwright trace open test-results/example-has-title-chromium/trace.zip
  Title:        example.spec.ts:3 › has title

$ npx playwright trace actions --grep="expect"
     # Time       Action                                                  Duration
  ──── ─────────  ─────────────────────────────────────────────────────── ────────
    9. 0:00.859  Expect "toHaveTitle"                                        5.1s  ✗

$ npx playwright trace action 9
  Expect "toHaveTitle"
  Error: expect(page).toHaveTitle(expected) failed
    Expected pattern: /Wrong Title/
    Received string:  "Fast and reliable end-to-end testing for modern web apps | Playwright"
    Timeout: 5000ms
  Snapshots
    available: before, after
    usage:     npx playwright trace snapshot 9 --name <before|after>

$ npx playwright trace snapshot 9 --name after
### Page
- Page Title: Fast and reliable end-to-end testing for modern web apps | Playwright

$ npx playwright trace close
```

### ♻️ `await using`

Many APIs now return async disposables, enabling the `await using` syntax for automatic cleanup:

```js
await using page = await context.newPage();
{
  await using route = await page.route('**/*', route => route.continue());
  await using script = await page.addInitScript('console.log("init script here")');
  await page.goto('https://playwright.dev');
  // do something
}
// route and init script have been removed at this point
```

### 🔍 Snapshots and Locators

- Method [`method: Page.ariaSnapshot`] to capture the aria snapshot of the page — equivalent to `page.locator('body').ariaSnapshot()`.
- Options `depth` and `mode` in [`method: Locator.ariaSnapshot`].
- Method [`method: Locator.normalize`] converts a locator to follow best practices like test ids and aria roles.
- Method [`method: Page.pickLocator`] enters an interactive mode where hovering over elements highlights them and shows the corresponding locator. Click an element to get its [Locator] back. Use [`method: Page.cancelPickLocator`] to cancel.

### New APIs

#### Screencast

- [`property: Page.screencast`] provides video recording, real-time frame streaming, and overlay management.
- Methods [`method: Screencast.start`] and [`method: Screencast.stop`] for recording and frame capture.
- Methods [`method: Screencast.showActions`] and [`method: Screencast.hideActions`] for action annotations.
- Methods [`method: Screencast.showChapter`] and [`method: Screencast.showOverlay`] for visual overlays.
- Methods [`method: Screencast.showOverlays`] and [`method: Screencast.hideOverlays`] for overlay visibility control.

#### Storage, Console and Errors

- Method [`method: BrowserContext.setStorageState`] clears existing cookies, local storage, and IndexedDB for all origins and sets a new storage state — no need to create a new context.
- Methods [`method: Page.clearConsoleMessages`] and [`method: Page.clearPageErrors`] to clear stored messages and errors.
- Option `filter` in [`method: Page.consoleMessages`] and [`method: Page.pageErrors`] controls which messages are returned.
- Method [`method: ConsoleMessage.timestamp`].

#### Miscellaneous

- [`property: BrowserContext.debugger`] provides programmatic control over the Playwright debugger.
- Method [`method: BrowserContext.isClosed`].
- Method [`method: Request.existingResponse`] returns the response without waiting.
- Method [`method: Response.httpVersion`] returns the HTTP version used by the response.
- Events [`event: CDPSession.event`] and [`event: CDPSession.close`] for CDP sessions.
- Option `live` in [`method: Tracing.start`] for real-time trace updates.
- Option `artifactsDir` in [`method: BrowserType.launch`] to configure the artifacts directory.

### 🛠️ Other improvements

- UI Mode has an option to only show tests affected by source changes.
- UI Mode and Trace Viewer have improved action filtering.
- HTML Reporter shows the list of runs from the same worker.
- HTML Reporter allows filtering test steps for quick search.
- New trace mode `'retain-on-failure-and-retries'` records a trace for each test run and retains all traces when an attempt fails — great for comparing a passing trace with a failing one from a flaky test.

### Breaking Changes ⚠️

- Removed macOS 14 support for WebKit. We recommend upgrading your macOS version, or keeping an older Playwright version.
- Removed `@playwright/experimental-ct-svelte` package.
- `junit` test reporter now differentiates between types of errors, so some of the previous `<failure>`s are now reported as `<error>`s.

### Browser Versions

- Chromium 147.0.7727.15
- Mozilla Firefox 148.0.2
- WebKit 26.4

This version was also tested against the following stable channels:

- Google Chrome 146
- Microsoft Edge 146

## Version 1.58

### Timeline

If you're using merged reports, the HTML report Speedboard tab now shows the Timeline:

### UI Mode and Trace Viewer Improvements

- New 'system' theme option follows your OS dark/light mode preference
- Search functionality (Cmd/Ctrl+F) is now available in code editors
- Network details panel has been reorganized for better usability
- JSON responses are now automatically formatted for readability

Thanks to @cpAdm for contributing these improvements!

### Miscellaneous

[`method: BrowserType.connectOverCDP`] now accepts an `isLocal` option. When set to `true`, it tells Playwright that it runs on the same host as the CDP server, enabling file system optimizations.

### Breaking Changes ⚠️

- Removed `_react` and `_vue` selectors. See locators guide for alternatives.

- Removed `:light` selector engine suffix. Use standard CSS selectors instead.

- Option `devtools` from [`method: BrowserType.launch`] has been removed. Use `args: ['--auto-open-devtools-for-tabs']` instead.

- Removed macOS 13 support for WebKit. We recommend to upgrade your macOS version, or keep using an older Playwright version.

### Browser Versions

- Chromium 145.0.7632.6
- Mozilla Firefox 146.0.1
- WebKit 26.0

This version was also tested against the following stable channels:

- Google Chrome 144
- Microsoft Edge 144
