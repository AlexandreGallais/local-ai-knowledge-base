---
title: "Test runner (part 14 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 14 of 14)

### `context.runOnly(shouldRunOnlyTests)`

* `shouldRunOnlyTests` {boolean} Whether or not to run `only` tests.

If `shouldRunOnlyTests` is truthy, the test context will only run tests that
have the `only` option set. Otherwise, all tests are run. If Node.js was not
started with the `--test-only` command-line option, this function is a
no-op.

```js
test('top level test', (t) => {
  // The test context can be set to run subtests with the 'only' option.
  t.runOnly(true);
  return Promise.all([
    t.test('this subtest is now skipped'),
    t.test('this subtest is run', { only: true }),
  ]);
});
```

### `context.signal`

* Type: {AbortSignal}

Can be used to abort test subtasks when the test has been aborted.

```js
test('top level test', async (t) => {
  await fetch('some/uri', { signal: t.signal });
});
```

### `context.skip([message])`

* `message` {string} Optional skip message.

This function causes the test's output to indicate the test as skipped. If
`message` is provided, it is included in the output. Calling `skip()` does
not terminate execution of the test function. This function does not return a
value.

```js
test('top level test', (t) => {
  // Make sure to return here as well if the test contains additional logic.
  t.skip('this is skipped');
});
```

### `context.todo([message])`

* `message` {string} Optional `TODO` message.

This function adds a `TODO` directive to the test's output. If `message` is
provided, it is included in the output. Calling `todo()` does not terminate
execution of the test function. This function does not return a value.

```js
test('top level test', (t) => {
  // This test is marked as `TODO`
  t.todo('this is a todo');
});
```

### `context.test(name[, fn])`

* `name` {string} The name of the subtest, which is displayed when reporting
  test results. **Default:** The `name` property of `fn`, or `'<anonymous>'` if
  `fn` does not have a name.
* `options` {Object} Configuration options for the subtest. The following
  properties are supported:
  * `concurrency` {number|boolean|null} If a number is provided,
    then that many tests would run asynchronously (they are still managed by the single-threaded event loop).
    If `true`, it would run all subtests in parallel.
    If `false`, it would only run one test at a time.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `null`.
  * `only` {boolean} If truthy, and the test context is configured to run
    `only` tests, then this test will be run. Otherwise, the test is skipped.
    **Default:** `false`.
  * `signal` {AbortSignal} Allows aborting an in-progress test.
  * `skip` {boolean|string} If truthy, the test is skipped. If a string is
    provided, that string is displayed in the test results as the reason for
    skipping the test. **Default:** `false`.
  * `tags` {string\[]} An array of string labels associated with the subtest.
    Used together with `--experimental-test-tag-filter` to filter which
    tests run. Tags inherit from the parent test or suite by union. See
    Test tags. **Default:** `[]`.
  * `todo` {boolean|string} If truthy, the test marked as `TODO`. If a string
    is provided, that string is displayed in the test results as the reason why
    the test is `TODO`. **Default:** `false`.
  * `timeout` {number} A number of milliseconds the test will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.
  * `plan` {number} The number of assertions and subtests expected to be run in the test.
    If the number of assertions run in the test does not match the number
    specified in the plan, the test will fail.
    **Default:** `undefined`.
* `fn` {Function|AsyncFunction} The function under test. The first argument
  to this function is a `TestContext` object. If the test uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* Returns: {Promise} Fulfilled with `undefined` once the test completes.

This function is used to create subtests under the current test. This function
behaves in the same fashion as the top level `test()` function.

```js
test('top level test', async (t) => {
  await t.test(
    'This is a subtest',
    { only: false, skip: false, concurrency: 1, todo: false, plan: 1 },
    (t) => {
      t.assert.ok('some relevant assertion here');
    },
  );
});
```

### `context.waitFor(condition[, options])`

* `condition` {Function|AsyncFunction} An assertion function that is invoked
  periodically until it completes successfully or the defined polling timeout
  elapses. Successful completion is defined as not throwing or rejecting. This
  function does not accept any arguments, and is allowed to return any value.
* `options` {Object} An optional configuration object for the polling operation.
  The following properties are supported:
  * `interval` {number} The number of milliseconds to wait after an unsuccessful
    invocation of `condition` before trying again. **Default:** `50`.
  * `timeout` {number} The poll timeout in milliseconds. If `condition` has not
    succeeded by the time this elapses, an error occurs. **Default:** `1000`.
* Returns: {Promise} Fulfilled with the value returned by `condition`.

This method polls a `condition` function until that function either returns
successfully or the operation times out.

## Class: `SuiteContext`

An instance of `SuiteContext` is passed to each suite function in order to
interact with the test runner. However, the `SuiteContext` constructor is not
exposed as part of the API.

### `context.filePath`

The absolute path of the test file that created the current suite. If a test
file imports additional modules that generate suites, the imported suites will
return the path of the root test file.

### `context.fullName`

The name of the suite and each of its ancestors, separated by `>`.

### `context.name`

The name of the suite.

### `context.signal`

* Type: {AbortSignal}

Can be used to abort test subtasks when the test has been aborted.

### `context.passed`

* Type: {boolean}

Indicates whether the suite and all of its subtests have passed.

### `context.attempt`

* Type: {number}

The attempt number of the suite. This value is zero-based, so the first attempt is `0`,
the second attempt is `1`, and so on. This property is useful in conjunction with the
`--test-rerun-failures` option to determine the attempt number of the current run.

### `context.diagnostic(message)`

* `message` {string} A diagnostic message to output.

Output a diagnostic message. This is typically used for logging information
about the current suite or its tests.

```js
test.describe('my suite', (suite) => {
  suite.diagnostic('Suite diagnostic message');
});
```

### `context.log(message[, data])`

* `message` {string} Message to be reported.
* `data` {any} Optional structured payload attached to the message. The test
  runner passes it through untouched.

Write a log message to the output. The resulting `'test:log'` event is
emitted immediately, in the order that the tests execute.

```js
test.describe('my suite', (suite) => {
  suite.log('Suite log message');
});
```
