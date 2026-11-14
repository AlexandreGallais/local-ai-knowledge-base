---
title: "Release notes (part 3 of 12)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/release-notes-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Release notes (part 3 of 12)

## Version 1.60

### 🌐 HAR recording on Tracing

[`method: Tracing.startHar`] / [`method: Tracing.stopHar`] expose HAR recording as a first-class tracing API, with the same `content`, `mode` and `urlFilter` options as `recordHar`. The returned [Disposable] makes it easy to scope a recording with `await using`:

```js
await using har = await context.tracing.startHar('trace.har');
const page = await context.newPage();
await page.goto('https://playwright.dev');
// HAR is finalized when `har` goes out of scope.
```

### 🪝 Drop API

New [`method: Locator.drop`] simulates an external drag-and-drop of files or clipboard-like data onto an element. Playwright dispatches `dragenter`, `dragover`, and `drop` with a synthetic [DataTransfer] in the page context — works cross-browser and is great for testing upload zones:

```js
await page.locator('#dropzone').drop({
  files: { name: 'note.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') },
});

await page.locator('#dropzone').drop({
  data: {
    'text/plain': 'hello world',
    'text/uri-list': 'https://example.com',
  },
});
```

### 🎯 Aria snapshots

- [`method: PageAssertions.toMatchAriaSnapshot`] now works on a [Page], in addition to a [Locator] — equivalent to asserting against `page.locator('body')`.
- New `boxes` option on [`method: Locator.ariaSnapshot`] / [`method: Page.ariaSnapshot`] appends each element's bounding box as `[box=x,y,width,height]`, useful for AI consumption.

### 🛑 test.abort()

New [`method: Test.abort`] aborts the currently running test from a fixture, hook, or route handler with an optional message. Use it when you have detected an unrecoverable misuse and want to fail the test right away:

```js
test('does not publish to the shared page', async ({ page }) => {
  await page.route('**/publish', route => {
    test.abort('Tests must not publish to the shared page. Use the `clone` option.');
    return route.abort();
  });
  // ...
});
```

### New APIs

#### Browser, Context and Page

- Event [`event: Browser.context`] — fired when a new context is created on the browser.
- [BrowserContext] now mirrors lifecycle events from its pages: [`event: BrowserContext.download`], [`event: BrowserContext.frameAttached`], [`event: BrowserContext.frameDetached`], [`event: BrowserContext.frameNavigated`], [`event: BrowserContext.pageClose`], [`event: BrowserContext.pageLoad`].

#### Locators and Assertions

- New option `description` in [`method: Page.getByRole`] / [`method: Locator.getByRole`] / [`method: Frame.getByRole`] / [`method: FrameLocator.getByRole`] for matching the accessible description.
- New option `pseudo` in [`method: LocatorAssertions.toHaveCSS`] reads computed styles from `::before` or `::after`.
- New option `style` in [`method: Locator.highlight`] applies extra inline CSS to the highlight overlay, plus new [`method: Page.hideHighlight`] to clear all highlights.

#### Network

- [`method: WebSocketRoute.protocols`] returns the WebSocket subprotocols requested by the page.
- New option `noDefaults` in [`method: BrowserType.connectOverCDP`] disables Playwright's default overrides on the default context (download behavior, focus emulation, media emulation), so attaching to a user's daily-driver browser doesn't disturb its state.

#### Errors and Reporting

- New [`method: WebError.location`] mirrors [`method: ConsoleMessage.location`].
- [`method: ConsoleMessage.location`] now exposes `line` / `column` properties (`lineNumber` / `columnNumber` are deprecated).
- New [`property: TestInfoError.errorContext`] surfaces additional diagnostic context, such as the aria snapshot of the receiver at the time of an `expect(...)` matcher failure.
- [`method: Reporter.onError`] now receives a `workerInfo` argument with details about the worker for fixture teardown errors.

#### Test runner

- New `{testFileBaseName}` token in [`property: TestProject.snapshotPathTemplate`] — file name without extension.
- Test runner now errors when a config tries to override a non-option fixture, and rejects `workers: 0` or negative values.

### 🛠️ Other improvements

- HTML reporter:
  - `npx playwright show-report` accepts `.zip` files directly — no need to unzip first.
  - Steps that contain attachments inside nested children show an indicator on the parent step.
  - The `repeatEachIndex` is shown in the test header when non-zero.
- Trace Viewer adds a pretty-print toggle for JSON / form request and response bodies in the network details panel.

### Breaking Changes ⚠️

- Removed long-deprecated APIs:
  - `Locator.ariaRef()` — use the standard [`method: Locator.ariaSnapshot`] pipeline.
  - `handle` option on `BrowserContext.exposeBinding` and `Page.exposeBinding`.
  - `logger` option on `BrowserType.connect` and `BrowserType.connectOverCDP` — use tracing instead.
  - Context options `videosPath` / `videoSize` — use `recordVideo` instead.

### Browser Versions

- Chromium 148.0.7778.96
- Mozilla Firefox 150.0.2
- WebKit 26.4

This version was also tested against the following stable channels:

- Google Chrome 147
- Microsoft Edge 147
