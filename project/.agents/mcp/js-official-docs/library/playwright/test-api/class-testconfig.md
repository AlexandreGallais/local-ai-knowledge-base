---
title: "class: TestConfig (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-testconfig.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: TestConfig
* since: v1.10
* langs: js

Playwright Test provides many options to configure how your tests are collected and executed, for example `timeout` or `testDir`. These options are described in the [TestConfig] object in the configuration file. This type describes format of the configuration file, to access resolved configuration parameters at run time use [FullConfig].

Playwright Test supports running multiple test projects at the same time. Project-specific options should be put to [`property: TestConfig.projects`], but top-level [TestConfig] can also define base options shared between all projects.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: 'list',
  testDir: './tests',
});
```

## property: TestConfig.build
* since: v1.35
- type: ?<[Object]>
  - `external` ?<[Array]<[string]>> Paths to exclude from the transpilation expressed as a list of glob patterns. Typically heavy JS bundles that your test uses are listed here.

Playwright transpiler configuration.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  build: {
    external: ['**/*bundle.js'],
  },
});
```

## property: TestConfig.captureGitInfo
* since: v1.51
- type: ?<[Object]>
  - `commit` ?<boolean> Whether to capture commit and pull request information such as hash, author, timestamp.
  - `diff` ?<boolean> Whether to capture commit diff.

These settings control whether git information is captured and stored in the config [`property: TestConfig.metadata`].

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  captureGitInfo: { commit: true, diff: true }
});
```

**Details**

* Capturing `commit` information is useful when you'd like to see it in your HTML (or a third party) report.
* Capturing `diff` information is useful to enrich the report with the actual source diff. This information can be used to provide intelligent advice on how to fix the test.

:::note
Default values for these settings depend on the environment. When tests run as a part of CI where it is safe to obtain git information, the default value is `true`, `false` otherwise.
:::

:::note
The structure of the git commit metadata is subject to change.
:::

## property: TestConfig.expect
* since: v1.10
- type: ?<[Object]>
  - `timeout` ?<[int]> Default timeout for async expect matchers in milliseconds, defaults to 5000ms.
  - `toHaveScreenshot` ?<[Object]> Configuration for the [`method: PageAssertions.toHaveScreenshot#1`] method.
    - `animations` "ScreenshotAnimations" ?<"allow"|"disabled"> See [`option: Page.screenshot.animations`] in [`method: Page.screenshot`]. Defaults to `"disabled"`.
    - `caret` "ScreenshotCaret" ?<"hide"|"initial"> See [`option: Page.screenshot.caret`] in [`method: Page.screenshot`]. Defaults to `"hide"`.
    - `maxDiffPixels` ?<[int]> An acceptable amount of pixels that could be different, unset by default. Note that `threshold` defines which pixels are considered different.
    - `maxDiffPixelRatio` ?<[float]> An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by default. Note that `threshold` defines which pixels are considered different.
    - `scale` "ScreenshotScale" ?<"css"|"device"> See [`option: Page.screenshot.scale`] in [`method: Page.screenshot`]. Defaults to `"css"`.
    - `stylePath` ?<[string]|[Array]<[string]>> See [`option: Page.screenshot.style`] in [`method: Page.screenshot`].
    - `threshold` ?<[float]> An acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and `1` (lax). `"pixelmatch"` comparator computes color difference in YIQ color space and defaults `threshold` value to `0.2`.
    - `type` "ScreenshotType" ?<"png"|"webp"> Format of the screenshots taken when the snapshot name is omitted, defaults to `"png"`. Snapshots with an explicit name use the format matching their `.png` or `.webp` extension.
    - `pathTemplate` ?<[string]> A template controlling location of the screenshots. See [`property: TestConfig.snapshotPathTemplate`] for details.
  - `toMatchAriaSnapshot` ?<[Object]> Configuration for the [`method: LocatorAssertions.toMatchAriaSnapshot#2`] method.
    - `pathTemplate` ?<[string]> A template controlling location of the aria snapshots. See [`property: TestConfig.snapshotPathTemplate`] for details.
    - `children` ?<["contain" | "equal" | "deep-equal"]> Controls how children of the snapshot root are matched against the actual accessibility tree. This is equivalent to adding a `/children` property at the top of every aria snapshot template. Individual snapshots can override this by including an explicit `/children` property.
  - `toMatchSnapshot` ?<[Object]> Configuration for the [`method: SnapshotAssertions.toMatchSnapshot#1`] method.
    - `maxDiffPixels` ?<[int]> An acceptable amount of pixels that could be different, unset by default. Note that `threshold` defines which pixels are considered different.
    - `maxDiffPixelRatio` ?<[float]> An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by default. Note that `threshold` defines which pixels are considered different.
    - `threshold` ?<[float]> An acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and `1` (lax). `"pixelmatch"` comparator computes color difference in YIQ color space and defaults `threshold` value to `0.2`.
  - `toPass` ?<[Object]> Configuration for the expect(value).toPass() method.
    - `intervals` ?<[Array]<[int]>> Probe intervals for toPass <example-value> in milliseconds.
    - `timeout` ?<[int]> Timeout for toPass <example-value> in milliseconds.

Configuration for the `expect` assertion library. Learn more about various timeouts.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
      maxDiffPixels: 10,
    },
  },
});
```

## property: TestConfig.failOnFlakyTests
* since: v1.52
- type: ?<[boolean]>

Whether to exit with an error if any tests are marked as flaky. Useful on CI.

Also available in the command line with the `--fail-on-flaky-tests` option.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  failOnFlakyTests: !!process.env.CI,
});
```

## property: TestConfig.forbidOnly
* since: v1.10
- type: ?<[boolean]>

Whether to exit with an error if any tests or groups are marked as [`method: Test.only`] or [`method: Test.describe.only`]. Useful on CI.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
});
```

## property: TestConfig.fullyParallel
* since: v1.20
- type: ?<[boolean]>

Playwright Test runs tests in parallel. In order to achieve that, it runs several worker processes that run at the same time.
By default, **test files** are run in parallel. Tests in a single file are run in order, in the same worker process.

You can configure entire test run to concurrently execute all tests in all files using this option.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
});
```

## property: TestConfig.globalSetup
* since: v1.10
- type: ?<[string]|[Array]<[string]>>

Path to the global setup file. This file will be required and run before all the tests. It must export a single function that takes a [FullConfig] argument. Pass an array of paths to specify multiple global setup files.

Learn more about global setup and teardown.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup',
});
```

## property: TestConfig.globalTeardown
* since: v1.10
- type: ?<[string]|[Array]<[string]>>

Path to the global teardown file. This file will be required and run after all the tests. It must export a single function. See also [`property: TestConfig.globalSetup`]. Pass an array of paths to specify multiple global teardown files.

Learn more about global setup and teardown.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTeardown: './global-teardown',
});
```

## property: TestConfig.globalTimeout
* since: v1.10
- type: ?<[int]>

Maximum time in milliseconds the whole test suite can run. Zero timeout (default) disables this behavior. Useful on CI to prevent broken setup from running too long and wasting resources. Learn more about various timeouts.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
});
```

## property: TestConfig.grep
* since: v1.10
- type: ?<[RegExp]|[Array]<[RegExp]>>

Filter to only run tests with a title matching one of the patterns. For example, passing `grep: /cart/` should only run tests with "cart" in the title. Also available in the command line with the `-g` option. The regular expression will be tested against the string that consists of the project name, the test file name, the `test.describe` name (if any), the test name and the test tags divided by spaces, e.g. `chromium my-test.spec.ts my-suite my-test`.

`grep` option is also useful for tagging tests.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  grep: /smoke/,
});
```

## property: TestConfig.grepInvert
* since: v1.10
- type: ?<[RegExp]|[Array]<[RegExp]>>

Filter to only run tests with a title **not** matching one of the patterns. This is the opposite of [`property: TestConfig.grep`]. Also available in the command line with the `--grep-invert` option.

`grepInvert` option is also useful for tagging tests.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  grepInvert: /manual/,
});
```

## property: TestConfig.ignoreSnapshots
* since: v1.26
- type: ?<[boolean]>

Whether to skip snapshot expectations, such as `expect(value).toMatchSnapshot()` and `await expect(page).toHaveScreenshot()`.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ignoreSnapshots: !process.env.CI,
});
```

## property: TestConfig.maxFailures
* since: v1.10
- type: ?<[int]>

The maximum number of test failures for the whole test suite run. After reaching this number, testing will stop and exit with an error. Setting to zero (default) disables this behavior.

Also available in the command line with the `--max-failures` and `-x` options.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  maxFailures: process.env.CI ? 1 : 0,
});
```

## property: TestConfig.metadata
* since: v1.10
- type: ?<[Metadata]>

Metadata contains key-value pairs to be included in the report. For example, the JSON report will include metadata serialized as JSON.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  metadata: { title: 'acceptance tests' },
});
```

## property: TestConfig.name
* since: v1.10
- type: ?<[string]>

Config name is visible in the report and during test execution, unless overridden by [`property: TestProject.name`].

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  name: 'acceptance tests',
});
```

## property: TestConfig.outputDir
* since: v1.10
- type: ?<[string]>

The output directory for files created during test execution. Defaults to `<package.json-directory>/test-results`.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  outputDir: './test-results',
});
```

**Details**

This directory is cleaned at the start. When running a test, a unique subdirectory inside the [`property: TestConfig.outputDir`] is created, guaranteeing that test running in parallel do not conflict. This directory can be accessed by [`property: TestInfo.outputDir`] and [`method: TestInfo.outputPath`].

Here is an example that uses [`method: TestInfo.outputPath`] to create a temporary file.

```js
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('example test', async ({}, testInfo) => {
  const file = testInfo.outputPath('temporary-file.txt');
  await fs.promises.writeFile(file, 'Put some data to the file', 'utf8');
});
```

## property: TestConfig.snapshotDir
* since: v1.10
* discouraged: Use [`property: TestConfig.snapshotPathTemplate`] to configure snapshot paths.
- type: ?<[string]>

The base directory, relative to the config file, for snapshot files created with `toMatchSnapshot`. Defaults to [`property: TestConfig.testDir`].

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotDir: './snapshots',
});
```

**Details**

The directory for each test can be accessed by [`property: TestInfo.snapshotDir`] and [`method: TestInfo.snapshotPath`].

This path will serve as the base directory for each test file snapshot directory. Setting `snapshotDir` to `'snapshots'`, the [`property: TestInfo.snapshotDir`] would resolve to `snapshots/a.spec.js-snapshots`.

## property: TestConfig.snapshotPathTemplate = %%-test-config-snapshot-path-template-%%
* since: v1.28

## property: TestConfig.preserveOutput
* since: v1.10
- type: "PreserveOutput" ?<"always"|"never"|"failures-only">

Whether to preserve test output in the [`property: TestConfig.outputDir`]. Defaults to `'always'`.
* `'always'` - preserve output for all tests;
* `'never'` - do not preserve output for any tests;
* `'failures-only'` - only preserve output for failed tests.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  preserveOutput: 'always',
});
```

## property: TestConfig.projects
* since: v1.10
- type: ?<[Array]<[TestProject]>>

Playwright Test supports running multiple test projects at the same time. See [TestProject] for more information.

**Usage**

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] }
  ]
});
```

## property: TestConfig.quiet
* since: v1.10
- type: ?<[boolean]>

Whether to suppress stdio and stderr output from the tests.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  quiet: !!process.env.CI,
});
```

## property: TestConfig.repeatEach
* since: v1.10
- type: ?<[int]>

The number of times to repeat each test, useful for debugging flaky tests.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  repeatEach: 3,
});
```
