---
title: "Reporters (part 2 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-reporters-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Reporters (part 2 of 3)

## Built-in reporters

All built-in reporters show detailed information about failures, and mostly differ in verbosity for successful runs.

### List reporter

List reporter is default (except on CI where the `dot` reporter is default). It prints a line for each test being run.

```bash
npx playwright test --reporter=list
```

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'list',
});
```

Here is an example output in the middle of a test run. Failures will be listed at the end by default.
```bash
npx playwright test --reporter=list
Running 124 tests using 6 workers

 1  ✓ should access error in env (438ms)
 2  ✓ handle long test names (515ms)
 3  x 1) render expected (691ms)
 4  ✓ should timeout (932ms)
 5    should repeat each:
 6  ✓ should respect enclosing .gitignore (569ms)
 7    should teardown env after timeout:
 8    should respect excluded tests:
 9  ✓ should handle env beforeEach error (638ms)
10    should respect enclosing .gitignore:
```

You can opt into the step rendering via passing the following config option:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list', { printSteps: true }]],
});
```

You can print failures inline as soon as they are available instead of waiting until the end of the run:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list', { printFailuresInline: true }]],
});
```

You can omit test tags that are automatically appended to test titles:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list', { omitTags: true }]],
});
```

List report supports the following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_LIST_PRINT_STEPS` | `printSteps` | Whether to print each step on its own line. | `false`
| `PLAYWRIGHT_LIST_PRINT_FAILURES_INLINE` | `printFailuresInline` | Whether to print failure details immediately after a failed test instead of at the end. | `false`
| `PLAYWRIGHT_LIST_OMIT_TAGS` | `omitTags` | Whether to omit test tags that are automatically appended to test titles. | `false`
| `PLAYWRIGHT_FORCE_TTY` | | Whether to produce output suitable for a live terminal. Supports `true`, `1`, `false`, `0`, `[WIDTH]`, and `[WIDTH]x[HEIGHT]`. `[WIDTH]` and `[WIDTH]x[HEIGHT]` specifies the TTY dimensions. | `true` when terminal is in TTY mode, `false` otherwise.
| `FORCE_COLOR` | | Whether to produce colored output. | `true` when terminal is in TTY mode, `false` otherwise.
| `NO_COLOR` | | Whether to disable colored output (no-color.org). Any non-empty value disables colors. | unset

### Line reporter

Line reporter is more concise than the list reporter. It uses a single line to report last finished test, and prints failures when they occur. Line reporter is useful for large test suites where it shows the progress but does not spam the output by listing all the tests.

```bash
npx playwright test --reporter=line
```

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'line',
});
```

Here is an example output in the middle of a test run. Failures are reported inline.
```bash
npx playwright test --reporter=line
Running 124 tests using 6 workers
  1) dot-reporter.spec.ts:20:1 › render expected ===================================================

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

[23/124] gitignore.spec.ts - should respect nested .gitignore
```

Line report supports the following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_LINE_OMIT_TAGS` | `omitTags` | Whether to omit test tags that are automatically appended to test titles. | `false`
| `PLAYWRIGHT_FORCE_TTY` | | Whether to produce output suitable for a live terminal. Supports `true`, `1`, `false`, `0`, `[WIDTH]`, and `[WIDTH]x[HEIGHT]`. `[WIDTH]` and `[WIDTH]x[HEIGHT]` specifies the TTY dimensions. | `true` when terminal is in TTY mode, `false` otherwise.
| `FORCE_COLOR` | | Whether to produce colored output. | `true` when terminal is in TTY mode, `false` otherwise.
| `NO_COLOR` | | Whether to disable colored output (no-color.org). Any non-empty value disables colors. | unset

### Dot reporter

Dot reporter is very concise - it only produces a single character per successful test run. It is the default on CI and useful where you don't want a lot of output.

```bash
npx playwright test --reporter=dot
```

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'dot',
});
```

Here is an example output in the middle of a test run. Failures will be listed at the end.
```bash
npx playwright test --reporter=dot
Running 124 tests using 6 workers
······F·············································
```

One character is displayed for each test that has run, indicating its status:

| Character | Description
|---|---|
| `·` | Passed
| `F` | Failed
| `×` | Failed or timed out - and will be retried
| `±` | Passed on retry (flaky)
| `T` | Timed out
| `°` | Skipped

Dot report supports the following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_DOT_OMIT_TAGS` | `omitTags` | Whether to omit test tags that are automatically appended to test titles. | `false`
| `PLAYWRIGHT_FORCE_TTY` | | Whether to produce output suitable for a live terminal. Supports `true`, `1`, `false`, `0`, `[WIDTH]`, and `[WIDTH]x[HEIGHT]`. `[WIDTH]` and `[WIDTH]x[HEIGHT]` specifies the TTY dimensions. | `true` when terminal is in TTY mode, `false` otherwise.
| `FORCE_COLOR` | | Whether to produce colored output. | `true` when terminal is in TTY mode, `false` otherwise.
| `NO_COLOR` | | Whether to disable colored output (no-color.org). Any non-empty value disables colors. | unset

### Failures reporter

The failures reporter prints failures and successful retries as they occur, followed by a summary.

```bash
npx playwright test --reporter=failures
```

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'failures',
});
```

Use [`property: TestConfig.quiet`] to suppress test stdout and stderr.

Failures report supports the following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option | Description | Default |
|---|---|---|---|
| `PLAYWRIGHT_FAILURES_OMIT_TAGS` | `omitTags` | Whether to omit test tags appended to test titles. | `false` |
| `PLAYWRIGHT_FORCE_TTY` | | Whether to produce output suitable for a live terminal. | `true` when terminal is in TTY mode, `false` otherwise |
| `FORCE_COLOR` | | Whether to produce colored output. | `true` when terminal is in TTY mode, `false` otherwise |
| `NO_COLOR` | | Whether to disable colored output. | unset |

### HTML reporter

HTML reporter produces a self-contained folder that contains report for the test run that can be served as a web page.

```bash
npx playwright test --reporter=html
```

By default, HTML report is opened automatically if some of the tests failed. You can control this behavior via the
`open` property in the Playwright config or the `PLAYWRIGHT_HTML_OPEN` environmental variable. The possible values for that property are `always`, `never` and `on-failure`
(default).

You can also configure `host` and `port` that are used to serve the HTML report.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]],
});
```

By default, the report is written into the `playwright-report` folder in the package.json directory or current working directory (if no package.json is found). One can override
that location using the `PLAYWRIGHT_HTML_OUTPUT_DIR` environment variable or a reporter configuration.

In configuration file, pass <example-value> directly:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'my-report' }]],
});
```

If you are uploading attachments from a data folder to another location, you can use `attachmentsBaseURL` option to let html report know where to look for them.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { attachmentsBaseURL: 'https://external-storage.com/' }]],
});
```

A quick way of opening the last test run report is:

```bash
npx playwright show-report
```

Or if there is a custom folder name:

```bash
npx playwright show-report my-report
```

You can also pass a `.zip` archive — for example one downloaded from a CI artifact. The archive must contain `index.html` at its top level. Playwright will extract it to a temporary directory and serve the report:

```bash
npx playwright show-report playwright-report.zip
```

HTML report supports the following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_HTML_TITLE` | `title` | A title to display in the generated report. | No title is displayed by default
| `PLAYWRIGHT_HTML_ONLY_FAILURES` | `onlyFailures` | Include only tests with unexpected outcomes, flaky tests (including successful retries), and interrupted tests. See Report only failures. | `false`
| `PLAYWRIGHT_HTML_OUTPUT_DIR` | `outputFolder` | Directory to save the report to. | `playwright-report`
| `PLAYWRIGHT_HTML_OPEN` | `open` | When to open the html report in the browser, one of `'always'`, `'never'` or `'on-failure'` | `'on-failure'`
| `PLAYWRIGHT_HTML_HOST` | `host` | When report opens in the browser, it will be served bound to this hostname. | `localhost`
| `PLAYWRIGHT_HTML_PORT` | `port` | When report opens in the browser, it will be served on this port. | `9323` or any available port when `9323` is not available.
| `PLAYWRIGHT_HTML_ATTACHMENTS_BASE_URL` | `attachmentsBaseURL` | A separate location where attachments from the `data` subdirectory are uploaded. Only needed when you upload report and `data` separately to different locations. | `data/`
| `PLAYWRIGHT_HTML_NO_COPY_PROMPT` | `noCopyPrompt` | If true, disable rendering of the Copy prompt for errors. Supports `true`, `1`, `false`, and `0`. | `false`
| `PLAYWRIGHT_HTML_NO_SNIPPETS` | `noSnippets` | If true, disable rendering code snippets in the action log. If there is a top level error, that report section with code snippet will still render. Supports `true`, `1`, `false`, and `0`. | `false`
| `PLAYWRIGHT_HTML_DO_NOT_INLINE_ASSETS` | `doNotInlineAssets` | If true, JavaScript, CSS and report data are written as separate files alongside `index.html` instead of being embedded inline. Use this when serving the report under a strict Content Security Policy that disallows inline scripts and styles. Supports `true`, `1`, `false`, and `0`. | `false`
| `PLAYWRIGHT_HTML_MERGE_FILES` | `mergeFiles` | If true, tests are grouped by their top-level `test.describe()` title instead of the file they belong to. Supports `true`, `1`, `false`, and `0`. | `false`

### Blob reporter

Blob reports contain all the details about the test run and can be used later to produce any other report. Their primary function is to facilitate the merging of reports from sharded tests.

```bash
npx playwright test --reporter=blob
```

By default, the report is written into the `blob-report` directory in the package.json directory or current working directory (if no package.json is found).

The report file name looks like `report-<hash>.zip` or `report-<hash>-<shard_number>.zip` when sharding is used. The hash is an optional value computed from `--grep`, `--grep-invert`, `--project`, [`property: TestConfig.tag`] and file filters passed as command line arguments. The hash guarantees that running Playwright with different command line options will produce different but stable between runs report names. The output file name can be overridden in the configuration file or passed as `'PLAYWRIGHT_BLOB_OUTPUT_FILE'` environment variable.

<Tabs
  groupId="blob-report"
  defaultValue="shards"
  values={[
    {label: 'Shards', value: 'shards'},
    {label: 'Environments', value: 'environments'},
  ]
}>

<TabItem value="shards">

When using blob report to merge multiple shards, you don't have to pass any options.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'blob',
});
```

</TabItem>

<TabItem value="environments">

When running tests in different environments, you might want to use [`property: TestConfig.tag`] to add a global tag corresponding to the environment. This tag will bring clarity to the merged report, and it will be used to produce a unique blob report name.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'blob',
  tag: process.env.CI_ENVIRONMENT_NAME,  // for example "@APIv2" or "@linux"
});
```

</TabItem>

</Tabs>

Blob report supports following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_BLOB_OUTPUT_DIR` | `outputDir` | Directory to save the output. Existing content is deleted before writing the new report. | `blob-report`
| `PLAYWRIGHT_BLOB_OUTPUT_NAME` | `fileName` | Report file name. | `report-<hash>-<shard_number>.zip`
| `PLAYWRIGHT_BLOB_OUTPUT_FILE` | `outputFile` | Full path to the output file. If defined, `outputDir` and `fileName` will be ignored. | `undefined`
