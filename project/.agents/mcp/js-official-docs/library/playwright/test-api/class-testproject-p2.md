---
title: "class: TestProject (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-testproject.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: TestProject (part 2 of 2)

## property: TestProject.testMatch
* since: v1.10
- type: ?<[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute file path. Strings are treated as glob patterns.

By default, Playwright looks for files matching the following glob pattern: `**/*.@(spec|test).?(c|m)[jt]s?(x)`. This means JavaScript or TypeScript files with `".test"` or `".spec"` suffix, for example `login-screen.wrong-credentials.spec.ts`.

Use [`property: TestConfig.testMatch`] to change this option for all projects.

## property: TestProject.timeout
* since: v1.10
- type: ?<[int]>

Timeout for each test in milliseconds. Defaults to 30 seconds.

This is a base timeout for all tests. Each test can configure its own timeout with [`method: Test.setTimeout`]. Each file or a group of tests can configure the timeout with [`method: Test.describe.configure`].

Use [`property: TestConfig.timeout`] to change this option for all projects.

## property: TestProject.use
* since: v1.10
- type: ?<[TestOptions]>

Options for all tests in this project, for example [`property: TestOptions.browserName`]. Learn more about configuration and see available options.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
```

Use [`property: TestConfig.use`] to change this option for all projects.

## property: TestProject.workers
* since: v1.52
- type: ?<[int]|[string]>

The maximum number of concurrent worker processes to use for parallelizing tests from this project. Can also be set as percentage of logical CPU cores, e.g. `'50%'.`

This could be useful, for example, when all tests from a project share a single resource like a test account, and therefore cannot be executed in parallel. Limiting workers to one for such a project will prevent simultaneous use of the shared resource.

Note that the global [`property: TestConfig.workers`] limit applies to the total number of worker processes. However, Playwright will limit the number of workers used for this project by the value of [`property: TestProject.workers`].

By default, there is no limit per project. See [`property: TestConfig.workers`] for the default of the total worker limit.

**Usage**

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 10,  // total workers limit

  projects: [
    {
      name: 'runs in parallel',
    },
    {
      name: 'one at a time',
      workers: 1,  // workers limit for this project
    },
  ],
});
```
