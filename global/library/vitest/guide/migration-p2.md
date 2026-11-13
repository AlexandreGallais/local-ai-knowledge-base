---
title: "Migration Guide | Guide (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/migration/index.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Migration Guide | Guide (part 2 of 2)

## `expect.poll` Fails When It Times Out

`expect.poll` now rejects when its callback, or the polled assertion, does not settle within `timeout`. Previously a callback that resolved after the deadline, or an assertion that only passed on a late attempt, could still succeed. The callback now also receives an `AbortSignal` that aborts when the timeout elapses, so you can cancel in-flight work:

```ts
await expect.poll(async ({ signal }) => {
  const response = await fetch('/api/status', { signal })
  return response.status
}, { timeout: 1000 }).toBe(200)
```

A poll that legitimately needs more time should raise its `timeout`. Otherwise it fails with `expect.poll() function didn't resolve in time.` (or `expect.poll() assertion didn't resolve in time.`).

## Unawaited Asynchronous Assertions Fail the Test

Asynchronous assertions, like `resolves`, `rejects` and `toMatchFileSnapshot`, now fail the test if they are not awaited. Previously, Vitest auto-awaited them at the end of the test and printed a warning:

```ts
test('unawaited assertion', async () => {
  // v4: prints a warning, the test passes // [!code --]
  // v5: the test fails // [!code ++]
  expect(promise).resolves.toBe(1) // [!code --]
  await expect(promise).resolves.toBe(1) // [!code ++]
})
```

The reported error points to the assertion that was not awaited.

## Test Titles and Inspected Values Use `pretty-format`

Vitest now formats values with `pretty-format` instead of `loupe` when it inspects them, including the values interpolated into `test.each` and `test.for` titles. The rendering of some values changes, so snapshots or assertions that capture inspected output may need updating.

Two changes are specific to generated test titles:

- A string value interpolated through a `$` placeholder is no longer wrapped in quotes:

```ts
test.for([{ id: 'a1' }])('case $id', ({ id }) => { /* ... */ })
// v4 title: case 'a1' // [!code --]
// v5 title: case a1   // [!code ++]
```

- The length limit for interpolated values is now controlled by the new `taskTitleValueFormatTruncate` option (default `40`).

## Removed `test.sequential`, `describe.sequential`, and `sequential` Options

Vitest 5.0 removes the deprecated `test.sequential`, `describe.sequential`, and `sequential` test options. Use `concurrent: false` when you need a test or suite to opt out of inherited or globally configured concurrency.

```ts
test.sequential('example', async () => { /* ... */ }) // [!code --]
test('example', { concurrent: false }, async () => { /* ... */ }) // [!code ++]
```

```ts
describe.sequential('suite', () => { /* ... */ }) // [!code --]
describe('suite', { concurrent: false }, () => { /* ... */ }) // [!code ++]
```

The same replacement applies to option objects:

```ts
test('example', { sequential: true }, async () => { /* ... */ }) // [!code --]
test('example', { concurrent: false }, async () => { /* ... */ }) // [!code ++]
```

## Locators in Commands are Serialized as Objects

Locators forwarded to browser commands are now serialized as a `SerializedLocator` object instead of a bare selector string. The object exposes two fields:

- `selector`: the provider-specific selector string (the same value commands previously received).
- `locator`: a human-readable representation of the locator (e.g. `getByRole('button')`), used for error messages and tracing.

Update any custom commands that accept a locator to destructure `selector` from the new object:

```ts
import type { SerializedLocator } from '@vitest/browser'
import type { BrowserCommandContext } from 'vitest/node'

export async function customClick(
  context: BrowserCommandContext,
  selector: string, // [!code --]
  { selector }: SerializedLocator, // [!code ++]
) {
  await context.page.locator(selector).click()
}
```

## Locators are Strict by Default

Browser locators now match the text exactly by default, requiring a full, case-sensitive match. To keep the previous behaviour, you can set `browser.locators.exact` to `false`.

```ts
// With exact: true (default), this only matches the string "Hello, World" exactly.
// With exact: false, this matches "Hello, World!", "Say Hello, World", etc.
const locator = page.getByText('Hello, World', { exact: true })
await locator.click()
```

## `toHaveTextContent` Now Performs Strict Equality

The browser-mode `toHaveTextContent` matcher now validates that an element's text content is exactly equal to the expected string instead of performing a partial, case-sensitive match. Regular expressions are no longer accepted. The previous behaviour, including `RegExp` support, has moved to the new `toMatchTextContent` matcher.

```ts
// Partial or regex matches:
await expect.element(banner).toHaveTextContent('Error') // [!code --]
await expect.element(banner).toHaveTextContent(/error/i) // [!code --]
await expect.element(banner).toMatchTextContent('Error') // [!code ++]
await expect.element(banner).toMatchTextContent(/error/i) // [!code ++]

// Exact matches stay on `toHaveTextContent`:
await expect.element(banner).toHaveTextContent('Error!')
```

## `render` Is Async in `vitest-browser-vue` and `vitest-browser-svelte`

The companion component-testing packages `vitest-browser-vue` and `vitest-browser-svelte` now return a promise from `render`, so the call must be awaited before you query the rendered output:

```ts
import { render } from 'vitest-browser-vue'
import Component from './Component.vue'

test('renders', async () => {
  const screen = render(Component) // [!code --]
  const screen = await render(Component) // [!code ++]

  await expect.element(screen.getByRole('heading')).toBeVisible()
})
```

## Glob Coverage Thresholds No Longer Inherit `perFile`

`coverage.thresholds.perFile` previously applied to every threshold set, including files matched by glob-pattern thresholds. Glob patterns now control their own per-file checking and no longer inherit the top-level `perFile` — set `perFile` on each glob that needs it.

```ts
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        'perFile': true,

        'src/utils/**': {
          lines: 80,
          perFile: true, // [!code ++]
        },
      },
    },
  },
})
```

## Coverage `include` and `exclude` Match More Precisely

`coverage.include` and `coverage.exclude` were matched against absolute paths with picomatch's `contains` option, which matched many more files than intended. Patterns are now matched against each file's path relative to the project root, without `contains`, and a pattern with no glob wildcard is treated as a directory that matches everything inside it:

```ts
export default defineConfig({
  test: {
    coverage: {
      include: ['src'], // matches src/**, not every path that contains "src"
    },
  },
})
```

Review your `include` and `exclude` patterns after upgrading and confirm the reported file set is what you expect. Files that were previously matched only by the looser behavior may no longer be included.

## Config Files Are Not Looked Up From Parent Directories

Vitest no longer searches parent directories for config files. If you previously relied on running `vitest` from a subdirectory while using a config file from a parent directory, pass the config explicitly and scope test discovery with `--dir`. For example,

```bash
$ cd subdir && vitest # [!code --]
$ cd subdir && vitest --config ../vitest.config.ts # [!code ++]
```

## DOM Environment Global Assignments Now Update the Underlying Window

Assignments to properties on `globalThis` or `window` in `jsdom` and `happy-dom` environments are now propagated to the underlying DOM implementation. Mutable properties such as `innerWidth` can affect APIs implemented by the DOM environment, for example `happy-dom`'s `matchMedia`.

## `populateGlobal` Returns Descriptors in `originals`

The `originals` map returned by `populateGlobal` now holds property descriptors instead of plain values. This avoids invoking native lazy getters (such as Node's `localStorage`) while capturing the original, and restores them faithfully on teardown.

If you restore them manually in a custom environment, use `Object.defineProperty` instead of an assignment:

```ts
originals.forEach((value, key) => (global[key] = value)) // [!code --]
originals.forEach((descriptor, key) => Object.defineProperty(global, key, descriptor)) // [!code ++]
```

## Browser Orchestrator URL Requires a Session

Vitest no longer serves the browser orchestrator UI from a bare `/__vitest_test__/` URL. Browser runner URLs are now session-bound and must include the `sessionId` generated by Vitest, for example `/__vitest_test__/?sessionId=...`.

If you manually opened the browser preview by copying the Vite server URL or visiting `/__vitest_test__/` directly, use the URL opened or printed by Vitest instead.

## `browser.api` Is Replaced by the Top-Level `api`

Browser mode now runs on a single Vite server configured by the top-level `api` option; the default port in browser mode is `23315`. The `browser.api` option is deprecated and no longer has any effect, so move its value to `api`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    api: { port: 4444 }, // [!code ++]
    browser: {
      enabled: true,
      api: { port: 4444 }, // [!code --]
    },
  },
})
```

The already deprecated `browser.isolate` option now also prints a warning at startup; its value is still applied to the top-level `isolate` option that replaces it.

## Generated Reports and Artifacts Use the `.vitest` Directory

Vitest now uses a single `.vitest` directory at the project root as the shared artifact root, so one `.vitest` entry in `.gitignore` is enough. Defaults that moved this major:

- **Attachments** (`attachmentsDir`): `.vitest-attachements/` → `.vitest/attachments/`
- **Failure screenshots** (`screenshotFailures`): `__screenshots__/` → `.vitest/attachments/failure-screenshots/`, so they are no longer mixed with the reference screenshots of `toMatchScreenshot`
- **Blob reporter** and `--merge-reports`: `.vitest-reports/blob-*.json` → `.vitest/blob/blob-*.json`
- **HTML reporter** (`html`): `html/index.html` → `.vitest/index.html`, and its option changed from `outputFile` (a file) to `outputDir` (a directory)
- **JSON reporter** (`json`): stdout → `.vitest/json/output.json`
- **JUnit reporter** (`junit`): stdout → `.vitest/junit/output.xml`

The `json` and `junit` reporters now write to a file by default instead of printing to stdout. If you piped the report (for example `vitest --reporter=json | jq`), read the artifact file instead, or opt back into stdout with the reporter's `stdout` option (`reporters: [['json', { stdout: true }]]`). An explicit `outputFile` is still respected and unchanged.

## `toMatchScreenshot` Now Uses a Dedicated Screenshot Directory Config

Previously, reference screenshots for `toMatchScreenshot` did not correctly respect `browser.screenshotDirectory`. As a result, screenshots were saved in an unintended location when a custom directory was configured.

This has now been fixed by introducing a dedicated option: `browser.expect.toMatchScreenshot.screenshotDirectory`. Its default value is `__screenshots__`.

- If you did not set `browser.screenshotDirectory`, no changes are required.
- If you did set `browser.screenshotDirectory`, you must now explicitly configure the new option:

  ```ts
  export default defineConfig({
    test: {
      browser: {
        screenshotDirectory: 'my-screenshots',
        expect: { // [!code ++]
          toMatchScreenshot: { // [!code ++]
            screenshotDirectory: 'my-screenshots', // [!code ++]
          }, // [!code ++]
        }, // [!code ++]
      },
    },
  })
  ```

  Then either move existing reference screenshots to the new location or regenerate them.

## Worker and Concurrency Ids Are 1-based

Worker and pool identifiers now start at `1` instead of `0`. This changes the values of the `VITEST_POOL_ID` and `VITEST_WORKER_ID` environment variables, which now range from `1` to the worker count. Update any logic that derives a value from these ids, such as a per-worker database name or an array index.

For custom reporters, the `TestModule` diagnostics now expose both ids: the existing `workerId` (now 1-based) and a new `concurrencyId`.

```ts
import type { Reporter, TestModule } from 'vitest/node'

class MyReporter implements Reporter {
  onTestModuleEnd(testModule: TestModule) {
    const { workerId, concurrencyId } = testModule.diagnostic()
  }
}
```

Node.js and browser tests run in separate pools and do not share these ids, so the same value can appear in both.

## `resolveConfig` Returns the Resolved Vite Config

The `resolveConfig` helper from `vitest/node` no longer returns a `{ vitestConfig, viteConfig }` pair. It resolves the config without creating a Vite server and returns the resolved Vite config; the fully resolved Vitest config is available on its `test` property:

```ts
import { resolveConfig } from 'vitest/node'

const { viteConfig, vitestConfig } = await resolveConfig(options) // [!code --]
const viteConfig = await resolveConfig(options) // [!code ++]
const vitestConfig = viteConfig.test // [!code ++]
```

The Vitest 4 limitations are gone: the returned config now includes fully resolved `projects`, and `viteConfig.test` no longer holds partially resolved options.

## Package Migration

The following packages are deprecated as of this release. They will no longer receive feature updates, but security fixes will continue to be backported:

- `@vitest/runner`
- `@vitest/ws-client`

`vitest` also no longer depends on `@vitest/expect`: the assertion code is bundled into `vitest` itself. The package is still published and usable on its own, but it no longer shares state with Vitest's `expect`. Interact with Vitest's assertions through the `vitest` entry point (`expect`, `expect.extend`, `chai`) instead.

The `@vitest/browser-webdriverio` provider has been moved to the vitest-community organization. Going forward, WebdriverIO support is community-maintained and addressed on a per-issue basis. If you use it, update your dependency to the new package and report any issues in the new repository.

## Removed Deprecated Entrypoints

Several entry points were marked as deprecated in Vitest 4.1. This release removes them entirely.

- `vitest/coverage`: use `vitest/node` instead
- `vitest/reporters`: use `vitest/node` instead
- `vitest/environments`: use `vitest/runtime` instead
- `vitest/snapshot`: use `vitest/runtime` instead
- `vitest/runners`: use `TestRunner` from `vitest` instead
- `vitest/suite`: use static methods on `TestRunner` from vitest instead (for example, `TestRunner.getCurrentTest()`)
- `vitest/mocker` is removed completely, use `@vitest/mocker` package directly (this was published by accident at one point and never removed)
- `vitest/internal/module-runner` is removed
