---
title: "Test runner (part 13 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 13 of 14)

## Class: `TestContext`

An instance of `TestContext` is passed to each test function in order to
interact with the test runner. However, the `TestContext` constructor is not
exposed as part of the API.

### `context.before(fn)`

* `fn` {Function|AsyncFunction} The hook function. The first argument
  to this function is a `TestContext` object. If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function registers a hook that runs before any subtests of the current
test.

### `context.beforeEach(fn)`

* `fn` {Function|AsyncFunction} The hook function. The first argument
  to this function is a `TestContext` object. If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function registers a hook that runs before each subtest of the current
test.

```js
test('top level test', async (t) => {
  t.beforeEach((t) => t.diagnostic(`about to run ${t.name}`));
  await t.test(
    'This is a subtest',
    (t) => {
      // Some relevant assertion here
    },
  );
});
```

### `context.after(fn)`

* `fn` {Function|AsyncFunction} The hook function. The first argument
  to this function is a `TestContext` object. If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function registers a hook that runs after the current test finishes.

```js
test('top level test', async (t) => {
  t.after((t) => t.diagnostic(`finished running ${t.name}`));
  // Some relevant assertion here
});
```

### `context.afterEach(fn)`

* `fn` {Function|AsyncFunction} The hook function. The first argument
  to this function is a `TestContext` object. If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function registers a hook that runs after each subtest of the current
test.

```js
test('top level test', async (t) => {
  t.afterEach((t) => t.diagnostic(`finished running ${t.name}`));
  await t.test(
    'This is a subtest',
    (t) => {
      // Some relevant assertion here
    },
  );
});
```

### `context.assert`

An object containing assertion methods bound to `context`. The top-level
functions from the `node:assert` module are exposed here for the purpose of
creating test plans.

```js
test('test', (t) => {
  t.plan(1);
  t.assert.strictEqual(true, true);
});
```

#### `context.assert.callCount(fn, times[, message])`

* `fn` {Function} A mock function created by the test runner's mocking API.
* `times` {integer} The expected number of calls.
* `message` {string} Optional error message.

Asserts that the mock function `fn` has been called exactly `times` times.

```js
test('mock was called twice', (t) => {
  const fn = t.mock.fn();
  fn();
  fn();
  t.assert.callCount(fn, 2);
});
```

#### `context.assert.called(fn[, message])`

* `fn` {Function} A mock function created by the test runner's mocking API.
* `message` {string} Optional error message.

Asserts that the mock function `fn` has been called at least once.

```js
test('mock was called', (t) => {
  const fn = t.mock.fn();
  fn();
  t.assert.called(fn);
});
```

#### `context.assert.fileSnapshot(value, path[, options])`

* `value` {any} A value to serialize to a string. If Node.js was started with
  the `--test-update-snapshots` flag, the serialized value is written to
  `path`. Otherwise, the serialized value is compared to the contents of the
  existing snapshot file.
* `path` {string} The file where the serialized `value` is written.
* `options` {Object} Optional configuration options. The following properties
  are supported:
  * `serializers` {Array} An array of synchronous functions used to serialize
    `value` into a string. `value` is passed as the only argument to the first
    serializer function. The return value of each serializer is passed as input
    to the next serializer. Once all serializers have run, the resulting value
    is coerced to a string. **Default:** If no serializers are provided, the
    test runner's default serializers are used.

This function serializes `value` and writes it to the file specified by `path`.

```js
test('snapshot test with default serialization', (t) => {
  t.assert.fileSnapshot({ value1: 1, value2: 2 }, './snapshots/snapshot.json');
});
```

This function differs from `context.assert.snapshot()` in the following ways:

* The snapshot file path is explicitly provided by the user.
* Each snapshot file is limited to a single snapshot value.
* No additional escaping is performed by the test runner.

These differences allow snapshot files to better support features such as syntax
highlighting.

#### `context.assert.lastCalledWith(fn[, ...args])`

* `fn` {Function} A mock function created by the test runner's mocking API.
* `...args` {any} The expected arguments.

Asserts that the most recent call to the mock function `fn` received arguments
deeply and strictly equal to `args`, using the same comparison as
`assert.deepStrictEqual()`.

```js
test('mock was last called with arguments', (t) => {
  const fn = t.mock.fn();
  fn(1);
  fn(2);
  t.assert.lastCalledWith(fn, 2);
});
```

#### `context.assert.nthCalledWith(fn, n[, ...args])`

* `fn` {Function} A mock function created by the test runner's mocking API.
* `n` {integer} The 1-based index of the call to check.
* `...args` {any} The expected arguments.

Asserts that the `n`th call to the mock function `fn` received arguments
deeply and strictly equal to `args`, using the same comparison as
`assert.deepStrictEqual()`. `n` starts at `1`, so
`t.assert.nthCalledWith(fn, 1)` checks `fn.mock.calls[0]`.

```js
test('mock was called with arguments on the second call', (t) => {
  const fn = t.mock.fn();
  fn(1);
  fn(2);
  t.assert.nthCalledWith(fn, 2, 2);
});
```

#### `context.assert.snapshot(value[, options])`

* `value` {any} A value to serialize to a string. If Node.js was started with
  the `--test-update-snapshots` flag, the serialized value is written to
  the snapshot file. Otherwise, the serialized value is compared to the
  corresponding value in the existing snapshot file.
* `options` {Object} Optional configuration options. The following properties
  are supported:
  * `serializers` {Array} An array of synchronous functions used to serialize
    `value` into a string. `value` is passed as the only argument to the first
    serializer function. The return value of each serializer is passed as input
    to the next serializer. Once all serializers have run, the resulting value
    is coerced to a string. **Default:** If no serializers are provided, the
    test runner's default serializers are used.

This function implements assertions for snapshot testing.

```js
test('snapshot test with default serialization', (t) => {
  t.assert.snapshot({ value1: 1, value2: 2 });
});

test('snapshot test with custom serialization', (t) => {
  t.assert.snapshot({ value3: 3, value4: 4 }, {
    serializers: [(value) => JSON.stringify(value)],
  });
});
```

### `context.diagnostic(message)`

* `message` {string} Message to be reported.

This function is used to write diagnostics to the output. Any diagnostic
information is included at the end of the test's results. This function does
not return a value.

```js
test('top level test', (t) => {
  t.diagnostic('A diagnostic message');
});
```

### `context.log(message[, data])`

* `message` {string} Message to be reported.
* `data` {any} Optional structured payload attached to the message. The test
  runner passes it through untouched. When tests run with process isolation,
  this value must be compatible with the HTML structured clone algorithm.

This function is used to write a log message to the output. Unlike
`context.diagnostic`, the resulting `'test:log'` event is emitted
immediately, in the order that the tests execute, rather than being buffered
until the test reports its results. This function does not return a value.

```js
test('top level test', (t) => {
  t.log('fetched user', { userId: 42 });
  t.log('retrying flaky endpoint', { attempt: 3 });
});
```

### `context.filePath`

The absolute path of the test file that created the current test. If a test file
imports additional modules that generate tests, the imported tests will return
the path of the root test file.

### `context.fullName`

The name of the test and each of its ancestors, separated by `>`.

### `context.name`

The name of the test.

### `context.passed`

* Type: {boolean} `false` before the test is executed, e.g. in a `beforeEach` hook.

Indicated whether the test succeeded.

### `context.error`

* Type: {Error|null}

The failure reason for the test/case; wrapped and available via `context.error.cause`.

### `context.attempt`

* Type: {number}

The attempt number of the test. This value is zero-based, so the first attempt is `0`,
the second attempt is `1`, and so on. This property is useful in conjunction with the
`--test-rerun-failures` option to determine which attempt the test is currently running.

### `context.tags`

> Stability: 1.0 - Early development

* Type: {string\[]}

A frozen array of the test's flattened lowercased tags, in declaration
order, including any tags inherited from ancestor suites. Empty when the
test has no tags. See Test tags.

### `context.workerId`

* Type: {number|undefined}

The unique identifier of the worker running the current test file. This value is
derived from the `NODE_TEST_WORKER_ID` environment variable. When running tests
with `--test-isolation=process` (the default), each test file runs in a separate
child process and is assigned a worker ID from 1 to N, where N is the number of
concurrent workers. A worker ID is never shared by two test files running at the
same time. Once a test file finishes, its worker ID is reused by the next test
file that starts. When running with `--test-isolation=none`, all tests run in
the same process and the worker ID is always 1. This value is `undefined` when
not running in a test context.

This property is useful for splitting resources (like database connections or
server ports) across concurrent test files:

```mjs
import { test } from 'node:test';
import { process } from 'node:process';

test('database operations', async (t) => {
  // Worker ID is available via context
  console.log(`Running in worker ${t.workerId}`);

  // Or via environment variable (available at import time)
  const workerId = process.env.NODE_TEST_WORKER_ID;
  // Use workerId to allocate separate resources per worker
});
```

### `context.plan(count[,options])`

* `count` {number} The number of assertions and subtests that are expected to run.
* `options` {Object} Additional options for the plan.
  * `wait` {boolean|number} The wait time for the plan:
    * If `true`, the plan waits indefinitely for all assertions and subtests to run.
    * If `false`, the plan performs an immediate check after the test function completes,
      without waiting for any pending assertions or subtests.
      Any assertions or subtests that complete after this check will not be counted towards the plan.
    * If a number, it specifies the maximum wait time in milliseconds
      before timing out while waiting for expected assertions and subtests to be matched.
      If the timeout is reached, the test will fail.
      **Default:** `false`.

This function is used to set the number of assertions and subtests that are expected to run
within the test. If the number of assertions and subtests that run does not match the
expected count, the test will fail.

> Note: To make sure assertions are tracked, `t.assert` must be used instead of `assert` directly.

```js
test('top level test', (t) => {
  t.plan(2);
  t.assert.ok('some relevant assertion here');
  t.test('subtest', () => {});
});
```

When working with asynchronous code, the `plan` function can be used to ensure that the
correct number of assertions are run:

```js
test('planning with streams', (t, done) => {
  function* generate() {
    yield 'a';
    yield 'b';
    yield 'c';
  }
  const expected = ['a', 'b', 'c'];
  t.plan(expected.length);
  const stream = Readable.from(generate());
  stream.on('data', (chunk) => {
    t.assert.strictEqual(chunk, expected.shift());
  });

  stream.on('end', () => {
    done();
  });
});
```

When using the `wait` option, you can control how long the test will wait for the expected assertions.
For example, setting a maximum wait time ensures that the test will wait for asynchronous assertions
to complete within the specified timeframe:

```js
test('plan with wait: 2000 waits for async assertions', (t) => {
  t.plan(1, { wait: 2000 }); // Waits for up to 2 seconds for the assertion to complete.

  const asyncActivity = () => {
    setTimeout(() => {
      t.assert.ok(true, 'Async assertion completed within the wait time');
    }, 1000); // Completes after 1 second, within the 2-second wait time.
  };

  asyncActivity(); // The test will pass because the assertion is completed in time.
});
```

Note: If a `wait` timeout is specified, it begins counting down only after the test function finishes executing.
