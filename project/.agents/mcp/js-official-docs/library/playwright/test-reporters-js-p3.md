---
title: "Reporters (part 3 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-reporters-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Reporters (part 3 of 3)

### JSON reporter

JSON reporter produces an object with all information about the test run.

Most likely you want to write the JSON to a file. When running with `--reporter=json`, use `PLAYWRIGHT_JSON_OUTPUT_NAME` environment variable:

```bash
PLAYWRIGHT_JSON_OUTPUT_NAME=results.json npx playwright test --reporter=json
```

```batch
set PLAYWRIGHT_JSON_OUTPUT_NAME=results.json
npx playwright test --reporter=json
```

```powershell
$env:PLAYWRIGHT_JSON_OUTPUT_NAME="results.json"
npx playwright test --reporter=json
```

In configuration file, pass <example-value> directly:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['json', { outputFile: 'results.json' }]],
});
```

JSON report supports following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_JSON_OUTPUT_DIR` | | Directory to save the output file. Ignored if output file is specified. | `cwd` or config directory.
| `PLAYWRIGHT_JSON_ONLY_FAILURES` | `onlyFailures` | Include only tests with unexpected outcomes, flaky tests (including successful retries), and interrupted tests. See Report only failures. | `false`
| `PLAYWRIGHT_JSON_OUTPUT_NAME` | | Base file name for the output, relative to the output dir. | JSON report is printed to the stdout.
| `PLAYWRIGHT_JSON_OUTPUT_FILE` | `outputFile` | Full path to the output file. If defined, `PLAYWRIGHT_JSON_OUTPUT_DIR` and `PLAYWRIGHT_JSON_OUTPUT_NAME` will be ignored. | JSON report is printed to the stdout.

### JUnit reporter

JUnit reporter produces a JUnit-style xml report.

Most likely you want to write the report to an xml file. When running with `--reporter=junit`, use `PLAYWRIGHT_JUNIT_OUTPUT_NAME` environment variable:

```bash
PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml npx playwright test --reporter=junit
```

```batch
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml
npx playwright test --reporter=junit
```

```powershell
$env:PLAYWRIGHT_JUNIT_OUTPUT_NAME="results.xml"
npx playwright test --reporter=junit
```

In configuration file, pass <example-value> directly:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['junit', { outputFile: 'results.xml' }]],
});
```

JUnit report supports following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_JUNIT_OUTPUT_DIR` | | Directory to save the output file. Ignored if output file is specified. | `cwd` or config directory.
| `PLAYWRIGHT_JUNIT_ONLY_FAILURES` | `onlyFailures` | Include only tests with unexpected outcomes, flaky tests (including successful retries), and interrupted tests. Retains every attempt regardless of `includeRetries`. See Report only failures. | `false`
| `PLAYWRIGHT_JUNIT_OUTPUT_NAME` | | Base file name for the output, relative to the output dir. | JUnit report is printed to the stdout.
| `PLAYWRIGHT_JUNIT_OUTPUT_FILE` | `outputFile` | Full path to the output file. If defined, `PLAYWRIGHT_JUNIT_OUTPUT_DIR` and `PLAYWRIGHT_JUNIT_OUTPUT_NAME` will be ignored. | JUnit report is printed to the stdout.
| `PLAYWRIGHT_JUNIT_STRIP_ANSI` | `stripANSIControlSequences` | Whether to remove ANSI control sequences from the text before writing it in the report. | By default output text is added as is.
| `PLAYWRIGHT_JUNIT_INCLUDE_PROJECT_IN_TEST_NAME` | `includeProjectInTestName` | Whether to include Playwright project name in every test case as a name prefix. | By default not included.
| `PLAYWRIGHT_JUNIT_OMIT_TAGS` | `omitTags` | Whether to omit test tags that are automatically appended to failure details. | `false`
| `PLAYWRIGHT_JUNIT_SUITE_ID` |  | Value of the `id` attribute on the root `<testsuites/>` report entry. | Empty string.
| `PLAYWRIGHT_JUNIT_SUITE_NAME` |  | Value of the `name` attribute on the root `<testsuites/>` report entry. | Empty string.

### Perfetto reporter

Perfetto reporter produces a Trace Event Format json file that can be opened in the Perfetto UI or in `chrome://tracing`. It renders the test run as a timeline with a lane per worker, where every test is a slice containing its before/after hooks, fixtures and steps as nested slices. Every slice carries the details of the test or step in its trace event arguments, including source locations, [`property: TestStep.params`], tags, annotations, errors, stdio and paths to the attachment files.

```bash
npx playwright test --reporter=perfetto
```

By default the report is written to `test-results/perfetto.json`. When the output file name ends with `.gz`, the
report is gzipped on the fly, which both viewers accept and which is worth it for large test runs.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['perfetto', { outputFile: 'perfetto.json.gz' }]],
});
```

Perfetto report supports following configuration options and environment variables:

| Environment Variable Name | Reporter Config Option| Description | Default
|---|---|---|---|
| `PLAYWRIGHT_PERFETTO_OUTPUT_DIR` | | Directory to save the output file. Ignored if output file is specified. | `test-results`
| `PLAYWRIGHT_PERFETTO_OUTPUT_NAME` | | Base file name for the output, relative to the output dir. | `perfetto.json`
| `PLAYWRIGHT_PERFETTO_OUTPUT_FILE` | `outputFile` | Full path to the output file. If defined, `PLAYWRIGHT_PERFETTO_OUTPUT_DIR` and `PLAYWRIGHT_PERFETTO_OUTPUT_NAME` will be ignored. | `undefined`

### GitHub Actions annotations

You can use the built in `github` reporter to get automatic failure annotations when running in GitHub actions.

Note that all other reporters work on GitHub Actions as well, but do not provide annotations. Also, it is not recommended to
use this annotation type if running your tests with a matrix strategy as the stack trace failures will multiply and obscure the
GitHub file view.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // 'github' for GitHub Actions CI to generate annotations, plus a concise 'dot'
  // default 'list' when running locally
  reporter: process.env.CI ? 'github' : 'list',
});
```

The `github` reporter accepts `omitTags` (or the `PLAYWRIGHT_GITHUB_OMIT_TAGS` environment variable) to suppress test tags in its annotations, for example `reporter: [['github', { omitTags: true }]]`.

## Custom reporters

You can create a custom reporter by implementing a class with some of the reporter methods. Learn more about the [Reporter] API.

```js
import type {
  FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;
```

Now use this reporter with [`property: TestConfig.reporter`].

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: './my-awesome-reporter.ts',
});
```

Or just pass the reporter file path as `--reporter` command line option:

```bash
npx playwright test --reporter="./myreporter/my-awesome-reporter.ts"
```

Here's a short list of open source reporter implementations that you can take a look at when writing your own reporter:

* Allure Reporter
* Github Actions Reporter
* Mail Reporter
* ReportPortal
* Monocart
