---
title: "class: TestInfo (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-testinfo.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: TestInfo (part 2 of 2)

## property: TestInfo.status
* since: v1.10
- type: "TestStatus" ?<"passed"|"failed"|"timedOut"|"skipped"|"interrupted">

Actual status for the currently running test. Available after the test has finished in [`method: Test.afterEach`] hook and fixtures.

Status is usually compared with the [`property: TestInfo.expectedStatus`]:

```js
import { test, expect } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);
});
```

## property: TestInfo.timeout
* since: v1.10
- type: <[int]>

Timeout in milliseconds for the currently running test. Zero means no timeout. Learn more about various timeouts.

Timeout is usually specified in the configuration file

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30000);
});
```

## property: TestInfo.title
* since: v1.10
- type: <[string]>

The title of the currently running test as passed to `test(title, testFunction)`.

## property: TestInfo.titlePath
* since: v1.10
- type: <[Array]<[string]>>

The full title path starting with the test file name.

## property: TestInfo.workerIndex
* since: v1.10
- type: <[int]>

The unique index of the worker process that is running the test. When a worker is restarted, for example after a failure, the new worker process gets a new unique `workerIndex`.

Also available as `process.env.TEST_WORKER_INDEX`. Learn more about parallelism and sharding with Playwright Test.
