---
title: "class: Test (part 1 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-test.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Test
* since: v1.10
* langs: js

Playwright Test provides a `test` function to declare tests and `expect` function to write assertions.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
```

## method: Test.(call)
* since: v1.10

Declares a test.

* `test(title, body)`
* `test(title, details, body)`

**Usage**

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});
```

**Tags**

You can tag tests by providing additional test details. Alternatively, you can include tags in the test title. Note that each tag must start with `@` symbol.

```js
import { test, expect } from '@playwright/test';

test('basic test', {
  tag: '@smoke',
}, async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});

test('another test @smoke', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});
```

Test tags are displayed in the test report, and are available to a custom reporter via `TestCase.tags` property.

You can also filter tests by their tags during test execution:
* in the command line;
* in the config with [`property: TestConfig.grep`] and [`property: TestProject.grep`];

Learn more about tagging.

**Annotations**

You can annotate tests by providing additional test details.

```js
import { test, expect } from '@playwright/test';

test('basic test', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ...
});
```

Test annotations are displayed in the test report, and are available to a custom reporter via `TestCase.annotations` property.

You can also add annotations during runtime by manipulating [`property: TestInfo.annotations`].

Learn more about test annotations.

**Locks**

You can declare named locks to prevent specific tests from running at the same time, while all other tests continue to run in parallel. Tests that share a lock name never run concurrently, even when they are declared in different files or belong to different projects. This is useful when a few tests access a shared resource that does not support concurrent access.

```js
import { test, expect } from '@playwright/test';

test('update user settings', {
  lock: 'user-settings',
}, async ({ page }) => {
  // This test never runs concurrently with other tests
  // that declare the 'user-settings' lock.
});
```

The built-in `-exclusive-` lock runs the test only when no other tests are running.

Learn more about test locks.

### param: Test.(call).title
* since: v1.10
- `title` <[string]>

Test title.

### param: Test.(call).details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]> Annotation type, for example `'issue'`.
    - `description` ?<[string]> Optional annotation description, for example an issue url.
  - `lock` ?<[string]|[Array]<[string]>>

Additional test details.

### param: Test.(call).body
* since: v1.10
- `body` <[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

## method: Test.afterAll
* since: v1.10

Declares an `afterAll` hook that is executed once per worker after all tests.

When called in the scope of a test file, runs after all tests in the file. When called inside a [`method: Test.describe`] group, runs after all tests in the group.

**Details**

When multiple `afterAll` hooks are added, they will run in the order of their registration.

Note that worker process is restarted on test failures, and `afterAll` hook runs again in the new worker. Learn more about workers and failures.

Playwright will continue running all applicable hooks even if some of them have failed.

* `test.afterAll(hookFunction)`
* `test.afterAll(title, hookFunction)`

**Usage**

```js
test.afterAll(async () => {
  console.log('Done with tests');
  // ...
});
```

Alternatively, you can declare a hook **with a title**.

```js
test.afterAll('Teardown', async () => {
  console.log('Done with tests');
  // ...
});
```

### param: Test.afterAll.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.afterAll.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with worker fixtures and optional [TestInfo].

## method: Test.afterEach
* since: v1.10

Declares an `afterEach` hook that is executed after each test.

When called in the scope of a test file, runs after each test in the file. When called inside a [`method: Test.describe`] group, runs after each test in the group.

You can access all the same [Fixtures] as the test body itself, and also the [TestInfo] object that gives a lot of useful information. For example, you can check whether the test succeeded or failed.

* `test.afterEach(hookFunction)`
* `test.afterEach(title, hookFunction)`

**Details**

When multiple `afterEach` hooks are added, they will run in the order of their registration.

Playwright will continue running all applicable hooks even if some of them have failed.

**Usage**

```js
import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }) => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('my test', async ({ page }) => {
  // ...
});
```

Alternatively, you can declare a hook **with a title**.

```js
test.afterEach('Status check', async ({ page }) => {
  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
```

### param: Test.afterEach.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.afterEach.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with fixtures and optional [TestInfo].

## method: Test.beforeAll
* since: v1.10

Declares a `beforeAll` hook that is executed once per worker process before all tests.

When called in the scope of a test file, runs before all tests in the file. When called inside a [`method: Test.describe`] group, runs before all tests in the group.

You can use [`method: Test.afterAll`] to teardown any resources set up in `beforeAll`.

* `test.beforeAll(hookFunction)`
* `test.beforeAll(title, hookFunction)`

**Details**

When multiple `beforeAll` hooks are added, they will run in the order of their registration.

Note that worker process is restarted on test failures, and `beforeAll` hook runs again in the new worker. Learn more about workers and failures.

Playwright will continue running all applicable hooks even if some of them have failed.

**Usage**

```js
import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  console.log('Before tests');
});

test.afterAll(async () => {
  console.log('After tests');
});

test('my test', async ({ page }) => {
  // ...
});
```

Alternatively, you can declare a hook **with a title**.

```js
test.beforeAll('Setup', async () => {
  console.log('Before tests');
});
```

### param: Test.beforeAll.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.beforeAll.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with worker fixtures and optional [TestInfo].

## method: Test.beforeEach
* since: v1.10

Declares a `beforeEach` hook that is executed before each test.

When called in the scope of a test file, runs before each test in the file. When called inside a [`method: Test.describe`] group, runs before each test in the group.

You can access all the same [Fixtures] as the test body itself, and also the [TestInfo] object that gives a lot of useful information. For example, you can navigate the page before starting the test.

You can use [`method: Test.afterEach`] to teardown any resources set up in `beforeEach`.

* `test.beforeEach(hookFunction)`
* `test.beforeEach(title, hookFunction)`

**Details**

When multiple `beforeEach` hooks are added, they will run in the order of their registration.

Playwright will continue running all applicable hooks even if some of them have failed.

**Usage**

```js
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://my.start.url/');
});

test('my test', async ({ page }) => {
  expect(page.url()).toBe('https://my.start.url/');
});
```

Alternatively, you can declare a hook **with a title**.

```js
test.beforeEach('Open start URL', async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://my.start.url/');
});
```

### param: Test.beforeEach.title
* since: v1.38
- `title` ?<[string]>

Hook title.

### param: Test.beforeEach.hookFunction
* since: v1.10
- `hookFunction` <[function]\([Fixtures], [TestInfo]\)>

Hook function that takes one or two arguments: an object with fixtures and optional [TestInfo].

## method: Test.describe
* since: v1.10

Declares a group of tests.

* `test.describe(title, callback)`
* `test.describe(callback)`
* `test.describe(title, details, callback)`

**Usage**

You can declare a group of tests with a title. The title will be visible in the test report as a part of each test's title.

```js
test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

**Anonymous group**

You can also declare a test group without a title. This is convenient to give a group of tests a common option with [`method: Test.use`].

```js
test.describe(() => {
  test.use({ colorScheme: 'dark' });

  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

**Tags**

You can tag all tests in a group by providing additional details. Note that each tag must start with `@` symbol.

```js
import { test, expect } from '@playwright/test';

test.describe('two tagged tests', {
  tag: '@smoke',
}, () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

Learn more about tagging.

**Annotations**

You can annotate all tests in a group by providing additional details.

```js
import { test, expect } from '@playwright/test';

test.describe('two annotated tests', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

Learn more about test annotations.

**Locks**

You can declare named locks for all tests in a group by providing additional details. Tests that share a lock name never run concurrently. Learn more about test locks.

```js
import { test, expect } from '@playwright/test';

test.describe('two tests with a lock', {
  lock: 'user-settings',
}, () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});
```

### param: Test.describe.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>
  - `lock` ?<[string]|[Array]<[string]>>

Additional details for all tests in the group.

### param: Test.describe.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe`]. Any tests declared in this callback will belong to the group.
