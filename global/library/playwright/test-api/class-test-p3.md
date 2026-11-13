---
title: "class: Test (part 3 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-test.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Test (part 3 of 4)

## method: Test.extend
* since: v1.10
- returns: <[Test]>

Extends the `test` object by defining fixtures and/or options that can be used in the tests.

**Usage**

First define a fixture and/or an option.

```js
const base = require('@playwright/test');
const { TodoPage } = require('./todo-page');

// Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
exports.test = base.test.extend({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultItem: ['Do stuff', { option: true }],

  // Define a fixture. Note that it can use built-in fixture "page"
  // and a new option "defaultItem".
  todoPage: async ({ page, defaultItem }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo(defaultItem);
    await use(todoPage);
    await todoPage.removeAll();
  },
});
```

```js
import { test as base } from '@playwright/test';
import { TodoPage } from './todo-page';

export type Options = { defaultItem: string };

// Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
export const test = base.extend<Options & { todoPage: TodoPage }>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultItem: ['Do stuff', { option: true }],

  // Define a fixture. Note that it can use built-in fixture "page"
  // and a new option "defaultItem".
  todoPage: async ({ page, defaultItem }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo(defaultItem);
    await use(todoPage);
    await todoPage.removeAll();
  },
});
```

Then use the fixture in the test.

```js
import { test } from './my-test';

test('test 1', async ({ todoPage }) => {
  await todoPage.addToDo('my todo');
  // ...
});
```

Configure the option in config file.

```js
// @ts-check

module.exports = defineConfig({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'wellbeing',
      use: { defaultItem: 'Exercise!' },
    },
  ]
});
```

```js
import { defineConfig } from '@playwright/test';
import type { Options } from './my-test';

export default defineConfig<Options>({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'wellbeing',
      use: { defaultItem: 'Exercise!' },
    },
  ]
});
```

Learn more about fixtures and parametrizing tests.

### param: Test.extend.fixtures
* since: v1.10
- `fixtures` <[Object]>

An object containing fixtures and/or options. Learn more about fixtures format.

## method: Test.abort
* since: v1.60

Aborts the currently running test by throwing an error. The test is immediately marked as failed and execution stops. This is useful from inside a fixture or a route handler when you have detected an unrecoverable misuse and want to fail the test right away.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('does not publish to shared page', async ({ page }) => {
  await page.route('**/publish', route => {
    test.abort('Tests must not publish to the shared page. Use the `clone` option.');
    return route.abort();
  });
  // ...
});
```

### param: Test.abort.message
* since: v1.60
- `message` ?<[string]>

Optional message describing the reason for the abort. It will be included in the failure error.

## method: Test.fail
* since: v1.10

Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful for documentation purposes to acknowledge that some functionality is broken until it is fixed.

To declare a "failing" test:
* `test.fail(title, body)`
* `test.fail(title, details, body)`

To annotate test as "failing" at runtime:
* `test.fail(condition, description)`
* `test.fail(callback, description)`
* `test.fail()`
* `test.fail(description)`

**Usage**

You can declare a test as failing, so that Playwright ensures it actually fails.

```js
import { test, expect } from '@playwright/test';

test.fail('not yet ready', async ({ page }) => {
  // ...
});
```

If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based on some condition. We recommend passing a `description` argument in this case.

```js
import { test, expect } from '@playwright/test';

test('fail in WebKit', async ({ page, browserName }) => {
  test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
  // ...
});
```

You can mark all tests in a file or [`method: Test.describe`] group as "should fail" based on some condition with a single `test.fail(callback, description)` call.

```js
import { test, expect } from '@playwright/test';

test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');

test('fail in WebKit 1', async ({ page }) => {
  // ...
});
test('fail in WebKit 2', async ({ page }) => {
  // ...
});
```

You can also call `test.fail()` without a condition inside the test body to always mark the test as failed, optionally with a `description`. We recommend declaring a failing test with `test.fail(title, body)` instead.

```js
import { test, expect } from '@playwright/test';

test('less readable', async ({ page }) => {
  test.fail();
  // ...
});
```

### param: Test.fail.title
* since: v1.42
- `title` ?<[string]>

Test title.

### param: Test.fail.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.fail.body
* since: v1.42
- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

### param: Test.fail.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "should fail" when the condition is `true`.

### param: Test.fail.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as "should fail" when the return value is `true`.

### param: Test.fail.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.

## method: Test.fail.only
* since: v1.49

You can use `test.fail.only` to focus on a specific test that is expected to fail. This is particularly useful when debugging a failing test or working on a specific issue.

To declare a focused "failing" test:
* `test.fail.only(title, body)`
* `test.fail.only(title, details, body)`

**Usage**

You can declare a focused failing test, so that Playwright runs only this test and ensures it actually fails.

```js
import { test, expect } from '@playwright/test';

test.fail.only('focused failing test', async ({ page }) => {
  // This test is expected to fail
});
test('not in the focused group', async ({ page }) => {
  // This test will not run
});
```

### param: Test.fail.only.title
* since: v1.49

- `title` ?<[string]>

Test title.

### param: Test.fail.only.details
* since: v1.49

- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for test details description.

### param: Test.fail.only.body
* since: v1.49

- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

## method: Test.fixme
* since: v1.10

Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()` call.

To declare a "fixme" test:
* `test.fixme(title, body)`
* `test.fixme(title, details, body)`

To annotate test as "fixme" at runtime:
* `test.fixme(condition, description)`
* `test.fixme(callback, description)`
* `test.fixme()`
* `test.fixme(description)`

**Usage**

You can declare a test as to be fixed, and Playwright will not run it.

```js
import { test, expect } from '@playwright/test';

test.fixme('to be fixed', async ({ page }) => {
  // ...
});
```

If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the test, but abort it immediately after the `test.fixme` call.

```js
import { test, expect } from '@playwright/test';

test('to be fixed in Safari', async ({ page, browserName }) => {
  test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
  // ...
});
```

You can mark all tests in a file or [`method: Test.describe`] group as "fixme" based on some condition with a single `test.fixme(callback, description)` call.

```js
import { test, expect } from '@playwright/test';

test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');

test('to be fixed in Safari 1', async ({ page }) => {
  // ...
});
test('to be fixed in Safari 2', async ({ page }) => {
  // ...
});
```

You can also call `test.fixme()` without a condition inside the test body to always mark the test as "fixme", optionally with a `description`. We recommend using `test.fixme(title, body)` instead.

```js
import { test, expect } from '@playwright/test';

test('less readable', async ({ page }) => {
  test.fixme();
  // ...
});
```

### param: Test.fixme.title
* since: v1.10
- `title` ?<[string]>

Test title.

### param: Test.fixme.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.fixme.body
* since: v1.10
- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

### param: Test.fixme.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "fixme" when the condition is `true`.

### param: Test.fixme.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "fixme", based on test fixtures. Test or tests are marked as "fixme" when the return value is `true`.

### param: Test.fixme.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.

## method: Test.info
* since: v1.10
- returns: <[TestInfo]>

Returns information about the currently running test. This method can only be called during the test execution, otherwise it throws.

**Usage**

```js
test('example test', async ({ page }) => {
  // ...
  await test.info().attach('screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
```

## method: Test.only
* since: v1.10

Declares a focused test. If there are some focused tests or suites, all of them will be run but nothing else.

* `test.only(title, body)`
* `test.only(title, details, body)`

**Usage**

```js
test.only('focus this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});
```

### param: Test.only.title
* since: v1.10
- `title` <[string]>

Test title.

### param: Test.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.only.body
* since: v1.10
- `body` <[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

## method: Test.setTimeout
* since: v1.10

Changes the timeout for the test. Zero means no timeout. Learn more about various timeouts.

Timeout for the currently running test is available through [`property: TestInfo.timeout`].

**Usage**

* Changing test timeout.

  ```js
  test('very slow test', async ({ page }) => {
    test.setTimeout(120000);
    // ...
  });
  ```

* Changing timeout from a slow `beforeEach` hook. Note that this affects the test timeout that is shared with `beforeEach` hooks.

  ```js
  test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    test.setTimeout(testInfo.timeout + 30000);
  });
  ```

* Changing timeout for a `beforeAll` or `afterAll` hook. Note this affects the hook's timeout, not the test timeout.

  ```js
  test.beforeAll(async () => {
    // Set timeout for this hook.
    test.setTimeout(60000);
  });
  ```

* Changing timeout for all tests in a [`method: Test.describe`] group.

  ```js
  test.describe('group', () => {
    // Applies to all tests in this group.
    test.describe.configure({ timeout: 60000 });

    test('test one', async () => { /* ... */ });
    test('test two', async () => { /* ... */ });
    test('test three', async () => { /* ... */ });
  });
  ```

### param: Test.setTimeout.timeout
* since: v1.10
- `timeout` <[int]>

Timeout in milliseconds.
