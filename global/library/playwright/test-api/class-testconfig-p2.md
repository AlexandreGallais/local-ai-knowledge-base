---
title: "class: TestConfig (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-testconfig.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: TestConfig (part 2 of 2)

## property: TestConfig.reporter
* since: v1.10
- type: "BuiltInReporter" ?<[string]|[Array]<[Object]>|"list"|"dot"|"failures"|"line"|"github"|"json"|"junit"|"null"|"html"|"blob"|"perfetto">
  - `0` <[string]> Reporter name or module or file path
  - `1` <[Object]> An object with reporter options if any

The list of reporters to use. Each reporter can be:
* A builtin reporter name like `'list'` or `'json'`.
* A module name like `'my-awesome-reporter'`.
* A relative path to the reporter like `'./reporters/my-awesome-reporter.js'`.

You can pass <example-value> to the reporter in a tuple like `['json', { outputFile: './report.json' }]`. If the property is not specified, Playwright uses the `'dot'` reporter when the CI environment variable is set, and the `'list'` reporter otherwise.

Learn more in the reporters guide.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'line',
});
```

## property: TestConfig.reportSlowTests
* since: v1.10
- type: ?<[null]|[Object]>
  - `max` <[int]> The maximum number of slow test files to report. Defaults to `5`.
  - `threshold` <[float]> Test file duration in milliseconds that is considered slow. Defaults to 5 minutes.

Whether to report slow test files. Pass `null` to disable this feature.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reportSlowTests: null,
});
```

**Details**

Test files that took more than `threshold` milliseconds are considered slow, and the slowest ones are reported, no more than `max` number of them. Passing zero as `max` reports all test files that exceed the threshold.

## property: TestConfig.respectGitIgnore
* since: v1.45
- type: ?<[boolean]>

Whether to skip entries from `.gitignore` when searching for test files. By default, if neither [`property: TestConfig.testDir`] nor [`property: TestProject.testDir`] are explicitly specified, Playwright will ignore any test files matching `.gitignore` entries.

## property: TestConfig.retries
* since: v1.10
- type: ?<[int]>

The maximum number of retry attempts given to failed tests. By default failing tests are not retried. Learn more about test retries.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
});
```

## property: TestConfig.retryStrategy
* since: v1.62
- type: "RetryStrategy" ?<"immediate"|"isolated">

Controls when failed tests are retried. Defaults to `'immediate'`.
* `'immediate'` - A failed test is retried as soon as a worker is available, interleaved with the rest of the run. This is the default.
* `'isolated'` - Retries are run at the end, after all other tests have finished, one by one in a single worker. This minimizes the interference between retried tests and the rest of the suite, at the expense of the total run time.

Learn more about test retries.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
  retryStrategy: 'isolated',
});
```

## property: TestConfig.shard
* since: v1.10
- type: ?<[null]|[Object]>
  - `current` <[int]> The index of the shard to execute, one-based.
  - `total` <[int]> The total number of shards.

Shard tests and execute only the selected shard. Specify in the one-based form like `{ total: 5, current: 2 }`.

Learn more about parallelism and sharding with Playwright Test.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  shard: { total: 10, current: 3 },
});
```

## property: TestConfig.tag
* since: v1.57
- type: ?<[string]|[Array]<[string]>>

Tag or tags prepended to each test in the report. Useful for tagging your test run to differentiate between CI environments.

Note that each tag must start with `@` symbol. Learn more about tagging.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tag: process.env.CI_ENVIRONMENT_NAME,  // for example "@APIv2"
});
```

## property: TestConfig.testDir
* since: v1.10
- type: ?<[string]>

Directory that will be recursively scanned for test files. Defaults to the directory of the configuration file.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
});
```

## property: TestConfig.testIgnore
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Files matching one of these patterns are not executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

For example, `'**/test-assets/**'` will ignore any files in the `test-assets` directory.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testIgnore: '**/test-assets/**',
});
```

## property: TestConfig.testMatch
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

By default, Playwright looks for files matching the following glob pattern: `**/*.@(spec|test).?(c|m)[jt]s?(x)`. This means JavaScript or TypeScript files with `".test"` or `".spec"` suffix, for example `login-screen.wrong-credentials.spec.ts`.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: /.*\.e2e\.js/,
});
```

## property: TestConfig.timeout
* since: v1.10
- type: ?<[int]>

Timeout for each test in milliseconds. Defaults to 30 seconds.

This is a base timeout for all tests. In addition, each test can configure its own timeout with [`method: Test.setTimeout`]. Learn more about various timeouts.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 5 * 60 * 1000,
});
```

## property: TestConfig.tsconfig
* since: v1.49
- type: ?<[string]>

Path to a single `tsconfig` applicable to all imported files. By default, `tsconfig` for each imported file is looked up separately. Note that `tsconfig` property has no effect while the configuration file or any of its dependencies are loaded. Ignored when `--tsconfig` command line option is specified.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tsconfig: './tsconfig.test.json',
});
```

## property: TestConfig.updateSnapshots
* since: v1.10
- type: "UpdateSnapshots" ?<"all"|"changed"|"missing"|"none"|"default">

Whether to update expected snapshots with the actual results produced by the test run. Defaults to `'default'`.
* `'all'` - All tests that are executed will update snapshots.
* `'changed'` - All tests that are executed will update snapshots that did not match. Matching snapshots will not be updated. Also creates missing snapshots.
* `'missing'` - Missing snapshots are created, for example when authoring a new test and running it for the first time. Tests that only create missing snapshots pass.
* `'none'` - No snapshots are updated.
* `'default'` - Missing snapshots are created, but the tests that create them fail, so that the run does not silently pass in CI. This is the default.

Learn more about snapshots.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  updateSnapshots: 'default',
});
```

## property: TestConfig.updateSourceMethod
* since: v1.50
- type: "UpdateSourceMethod" ?<"overwrite"|"3way"|"patch">

Defines how to update snapshots in the source code.
* `'patch'` - Create a unified diff file that can be used to update the source code later. This is the default.
* `'3way'` - Generate merge conflict markers in source code. This allows user to manually pick relevant changes, as if they are resolving a merge conflict in the IDE.
* `'overwrite'` - Overwrite the source code with the new snapshot values.

## property: TestConfig.use
* since: v1.10
- type: ?<[TestOptions]>

Global options for all tests, for example [`property: TestOptions.browserName`]. Learn more about configuration and see available options.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
  },
});
```

## property: TestConfig.webServer
* since: v1.10
- type: ?<[Object]|[Array]<[Object]>>
  - `command` <[string]> Shell command to start. For example `npm run start`..
  - `cwd` ?<[string]> Current working directory of the spawned process, defaults to the directory of the configuration file.
  - `env` ?<[Object]<[string], [string]>> Environment variables to set for the command, `process.env` by default.
  - `gracefulShutdown` ?<[Object]> How to shut down the process. If unspecified, the process group is forcefully `SIGKILL`ed. If set to `{ signal: 'SIGTERM', timeout: 500 }`, the process group is sent a `SIGTERM` signal, followed by `SIGKILL` if it doesn't exit within 500ms. You can also use `SIGINT` as the signal instead. A `0` timeout means no `SIGKILL` will be sent. Windows doesn't support `SIGTERM` and `SIGINT` signals, so this option is ignored on Windows. Note that shutting down a Docker container requires `SIGTERM`.
    - `signal` <["SIGINT"|"SIGTERM"]>
    - `timeout` <[int]>
  - `ignoreHTTPSErrors` ?<[boolean]> Whether to ignore HTTPS errors when fetching the `url`. Defaults to `false`.
  - `name` ?<[string]> Specifies a custom name for the web server. This name will be prefixed to log messages. Defaults to `[WebServer]`.
  - `port` ?<[int]> The port that your http server is expected to appear on. It does wait until it accepts connections. Either `port` or `url` should be specified.
  - `reuseExistingServer` ?<[boolean]> If true, it will re-use an existing server on the `port` or `url` when available. If no server is running on that `port` or `url`, it will run the command to start a new server. If `false`, it will throw if an existing process is listening on the `port` or `url`. This should be commonly set to `!process.env.CI` to allow the local dev server when running tests locally.
  - `stderr` ?<["pipe"|"ignore"]> Whether to pipe the stderr of the command to the process stderr or ignore it. Defaults to `"pipe"`.
  - `stdout` ?<["pipe"|"ignore"]> If `"pipe"`, it will pipe the stdout of the command to the process stdout. If `"ignore"`, it will ignore the stdout of the command. Default to `"ignore"`.
  - `wait` ?<[Object]> Consider command started only when given output has been produced.
    - `stdout` ?<[RegExp]> Regular expression to wait for in the `stdout` of the command output. Named capture groups are stored in the environment, for example `/Listening on port (?<my_server_port>\d+)/` will store the port number in `process.env['MY_SERVER_PORT']`.
    - `stderr` ?<[RegExp]> Regular expression to wait for in the `stderr` of the command output. Named capture groups are stored in the environment, for example `/Listening on port (?<my_server_port>\d+)/` will store the port number in `process.env['MY_SERVER_PORT']`.
  - `timeout` ?<[int]> How long to wait for the process to start up and be available in milliseconds. Defaults to 60000.
  - `url` ?<[string]> The url on your http server that is expected to return a 2xx, 3xx, 400, 401, 402, or 403 status code when the server is ready to accept connections. Redirects (3xx status codes) are being followed and the new location is checked. Either `port` or `url` should be specified.

Launch a development web server (or multiple) during the tests.

**Details**

If the port is specified, Playwright Test will wait for it to be available on `127.0.0.1` or `::1`, before running the tests. If the url is specified, Playwright Test will wait for the URL to return a 2xx, 3xx, 400, 401, 402, or 403 status code before running the tests.

For continuous integration, you may want to use the `reuseExistingServer: !process.env.CI` option which does not use an existing server on the CI. To see the stdout, you can set the `DEBUG=pw:webserver` environment variable.

The `port` (but not the `url`) gets passed over to Playwright as a [`property: TestOptions.baseURL`]. For example port `8080` produces `baseURL` equal `http://localhost:8080`. If `webServer` is specified as an array, you must explicitly configure the `baseURL` (even if it only has one entry).

:::note
It is also recommended to specify [`property: TestOptions.baseURL`] in the config, so that tests could use relative urls.
:::

**Usage**

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000/',
  },
});
```

Now you can use a relative path when navigating the page:

```js
import { test } from '@playwright/test';

test('test', async ({ page }) => {
  // This will result in http://localhost:3000/foo
  await page.goto('/foo');
});
```

Multiple web servers (or background processes) can be launched:

```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: [
    {
      command: 'npm run start',
      url: 'http://localhost:3000',
      name: 'Frontend',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run backend',
      url: 'http://localhost:3333',
      name: 'Backend',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
    }
  ],
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

If your webserver runs on varying ports, use `wait` to capture the port:

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

```js
import { test, expect } from '@playwright/test';

test.use({ baseURL: `http://localhost:${process.env.MY_SERVER_PORT ?? 3000}` });

test('homepage', async ({ page }) => {
  await page.goto('/');
});
```

## property: TestConfig.workers
* since: v1.10
- type: ?<[int]|[string]>

The maximum number of concurrent worker processes to use for parallelizing tests. Can also be set as percentage of logical CPU cores, e.g. `'50%'.`

Playwright Test uses worker processes to run tests. There is always at least one worker process, but more can be used to speed up test execution.

Defaults to half of the number of logical CPU cores. Learn more about parallelism and sharding with Playwright Test.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 3,
});
```
