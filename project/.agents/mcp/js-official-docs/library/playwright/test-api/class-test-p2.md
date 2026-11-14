---
title: "class: Test (part 2 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-test.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Test (part 2 of 4)

## method: Test.describe.configure
* since: v1.10

Configures the enclosing scope. Can be executed either on the top level or inside a describe. Configuration applies to the entire scope, regardless of whether it run before or after the test declaration.

Learn more about the execution modes here.

**Usage**

* Running tests in parallel.

  ```js
  // Run all the tests in the file concurrently using parallel workers.
  test.describe.configure({ mode: 'parallel' });
  test('runs in parallel 1', async ({ page }) => {});
  test('runs in parallel 2', async ({ page }) => {});
  ```

* Running tests in order, retrying each failed test independently.

  This is the default mode. It can be useful to set it explicitly to override project configuration that uses `fullyParallel`.

  ```js
  // Tests in this file run in order. Retries, if any, run independently.
  test.describe.configure({ mode: 'default' });
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
  ```

* Running tests serially, retrying from the start. If one of the serial tests fails, all subsequent tests are skipped.

  :::note
  Running serially is not recommended. It is usually better to make your tests isolated, so they can be run independently.
  :::

  ```js
  // Annotate tests as inter-dependent.
  test.describe.configure({ mode: 'serial' });
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
  ```

* Configuring retries and timeout for each test.

  ```js
  // Each test in the file will be retried twice and have a timeout of 20 seconds.
  test.describe.configure({ retries: 2, timeout: 20_000 });
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
  ```

* Declaring locks for all tests in a scope.

  ```js
  test.describe.configure({ lock: 'user-settings' });
  test('update user settings', async ({ page }) => {});
  test('reset user settings', async ({ page }) => {});
  ```

* Run multiple describes in parallel, but tests inside each describe in order.

  ```js
  test.describe.configure({ mode: 'parallel' });

  test.describe('A, runs in parallel with B', () => {
    test.describe.configure({ mode: 'default' });
    test('in order A1', async ({ page }) => {});
    test('in order A2', async ({ page }) => {});
  });

  test.describe('B, runs in parallel with A', () => {
    test.describe.configure({ mode: 'default' });
    test('in order B1', async ({ page }) => {});
    test('in order B2', async ({ page }) => {});
  });
  ```

### option: Test.describe.configure.lock
* since: v1.64
- `lock` <[string]|[Array]<[string]>>

Additional named locks for all tests in the enclosing scope, including nested groups.  Locks are added to those declared in [`method: Test.describe`] details and previous calls to [`method: Test.describe.configure`].

### option: Test.describe.configure.mode
* since: v1.10
- `mode` "TestMode" <"default"|"parallel"|"serial">

Execution mode. Learn more about the execution modes here.

### option: Test.describe.configure.retries
* since: v1.28
- `retries` <[int]>

The number of retries for each test.

### option: Test.describe.configure.timeout
* since: v1.28
- `timeout` <[int]>

Timeout for each test in milliseconds. Overrides [`property: TestProject.timeout`] and [`property: TestConfig.timeout`].

## method: Test.describe.fixme
* since: v1.25

Declares a test group similarly to [`method: Test.describe`]. Tests in this group are marked as "fixme" and will not be executed.

* `test.describe.fixme(title, callback)`
* `test.describe.fixme(callback)`
* `test.describe.fixme(title, details, callback)`

**Usage**

```js
test.describe.fixme('broken tests that should be fixed', () => {
  test('example', async ({ page }) => {
    // This test will not run
  });
});
```

You can also omit the title.

```js
test.describe.fixme(() => {
  // ...
});
```

### param: Test.describe.fixme.title
* since: v1.25
- `title` ?<[string]>

Group title.

### param: Test.describe.fixme.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.fixme.callback
* since: v1.25
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.fixme`]. Any tests added in this callback will belong to the group, and will not be run.

## method: Test.describe.only
* since: v1.10

Declares a focused group of tests. If there are some focused tests or suites, all of them will be run but nothing else.

* `test.describe.only(title, callback)`
* `test.describe.only(callback)`
* `test.describe.only(title, details, callback)`

**Usage**

```js
test.describe.only('focused group', () => {
  test('in the focused group', async ({ page }) => {
    // This test will run
  });
});
test('not in the focused group', async ({ page }) => {
  // This test will not run
});
```

You can also omit the title.

```js
test.describe.only(() => {
  // ...
});
```

### param: Test.describe.only.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.only.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.only`]. Any tests added in this callback will belong to the group.

## method: Test.describe.parallel
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a group of tests that could be run in parallel. By default, tests in a single test file run one after another, but using [`method: Test.describe.parallel`] allows them to run in parallel.

* `test.describe.parallel(title, callback)`
* `test.describe.parallel(callback)`
* `test.describe.parallel(title, details, callback)`

**Usage**

```js
test.describe.parallel('group', () => {
  test('runs in parallel 1', async ({ page }) => {});
  test('runs in parallel 2', async ({ page }) => {});
});
```

Note that parallel tests are executed in separate processes and cannot share any state or global variables. Each of the parallel tests executes all relevant hooks.

You can also omit the title.

```js
test.describe.parallel(() => {
  // ...
});
```

### param: Test.describe.parallel.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.parallel.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.parallel.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.parallel`]. Any tests added in this callback will belong to the group.

## method: Test.describe.parallel.only
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a focused group of tests that could be run in parallel. This is similar to [`method: Test.describe.parallel`], but focuses the group. If there are some focused tests or suites, all of them will be run but nothing else.

* `test.describe.parallel.only(title, callback)`
* `test.describe.parallel.only(callback)`
* `test.describe.parallel.only(title, details, callback)`

**Usage**

```js
test.describe.parallel.only('group', () => {
  test('runs in parallel 1', async ({ page }) => {});
  test('runs in parallel 2', async ({ page }) => {});
});
```

You can also omit the title.

```js
test.describe.parallel.only(() => {
  // ...
});
```

### param: Test.describe.parallel.only.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.parallel.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.parallel.only.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.parallel.only`]. Any tests added in this callback will belong to the group.

## method: Test.describe.serial
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a group of tests that should always be run serially. If one of the tests fails, all subsequent tests are skipped. All tests in a group are retried together.

:::note
Using serial is not recommended. It is usually better to make your tests isolated, so they can be run independently.
:::

* `test.describe.serial(title, callback)`
* `test.describe.serial(title)`
* `test.describe.serial(title, details, callback)`

**Usage**

```js
test.describe.serial('group', () => {
  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
});
```

You can also omit the title.

```js
test.describe.serial(() => {
  // ...
});
```

### param: Test.describe.serial.title
* since: v1.10
- `title` ?<[string]>

Group title.

### param: Test.describe.serial.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.serial.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.serial`]. Any tests added in this callback will belong to the group.

## method: Test.describe.serial.only
* since: v1.10
* discouraged: See [`method: Test.describe.configure`] for the preferred way of configuring the execution mode.

Declares a focused group of tests that should always be run serially. If one of the tests fails, all subsequent tests are skipped. All tests in a group are retried together. If there are some focused tests or suites, all of them will be run but nothing else.

:::note
Using serial is not recommended. It is usually better to make your tests isolated, so they can be run independently.
:::

* `test.describe.serial.only(title, callback)`
* `test.describe.serial.only(title)`
* `test.describe.serial.only(title, details, callback)`

**Usage**

```js
test.describe.serial.only('group', () => {
  test('runs first', async ({ page }) => {
  });
  test('runs second', async ({ page }) => {
  });
});
```

You can also omit the title.

```js
test.describe.serial.only(() => {
  // ...
});
```

### param: Test.describe.serial.only.title
* since: v1.10
- `title` <[string]>

Group title.

### param: Test.describe.serial.only.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.serial.only.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.serial.only`]. Any tests added in this callback will belong to the group.

## method: Test.describe.skip
* since: v1.10

Declares a skipped test group, similarly to [`method: Test.describe`]. Tests in the skipped group are never run.

* `test.describe.skip(title, callback)`
* `test.describe.skip(title)`
* `test.describe.skip(title, details, callback)`

**Usage**

```js
test.describe.skip('skipped group', () => {
  test('example', async ({ page }) => {
    // This test will not run
  });
});
```

You can also omit the title.

```js
test.describe.skip(() => {
  // ...
});
```

### param: Test.describe.skip.title
* since: v1.10
- `title` <[string]>

Group title.

### param: Test.describe.skip.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.describe`] for details description.

### param: Test.describe.skip.callback
* since: v1.10
- `callback` <[function]>

A callback that is run immediately when calling [`method: Test.describe.skip`]. Any tests added in this callback will belong to the group, and will not be run.

## property: Test.expect
* since: v1.10
- type: <[Object]>

`expect` function can be used to create test assertions. Read more about test assertions.

**Usage**

```js
test('example', async ({ page }) => {
  await test.expect(page).toHaveTitle('Title');
});
```
