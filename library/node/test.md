---
title: "Test runner (part 1 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner

> Stability: 2 - Stable

The `node:test` module facilitates the creation of JavaScript tests.
To access it:

```mjs
import test from 'node:test';
```

```cjs
const test = require('node:test');
```

This module is only available under the `node:` scheme.

Tests created via the `test` module consist of a single function that is
processed in one of three ways:

1. A synchronous function that is considered failing if it throws an exception,
   and is considered passing otherwise.
2. A function that returns a `Promise` that is considered failing if the
   `Promise` rejects, and is considered passing if the `Promise` fulfills.
3. A function that receives a callback function. If the callback receives any
   truthy value as its first argument, the test is considered failing. If a
   falsy value is passed as the first argument to the callback, the test is
   considered passing. If the test function receives a callback function and
   also returns a `Promise`, the test will fail.

The following example illustrates how tests are written using the
`test` module.

```js
test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1);
});

test('synchronous failing test', (t) => {
  // This test fails because it throws an exception.
  assert.strictEqual(1, 2);
});

test('asynchronous passing test', async (t) => {
  // This test passes because the Promise returned by the async
  // function is settled and not rejected.
  assert.strictEqual(1, 1);
});

test('asynchronous failing test', async (t) => {
  // This test fails because the Promise returned by the async
  // function is rejected.
  assert.strictEqual(1, 2);
});

test('failing test using Promises', (t) => {
  // Promises can be used directly as well.
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('this will cause the test to fail'));
    });
  });
});

test('callback passing test', (t, done) => {
  // done() is the callback function. When the setImmediate() runs, it invokes
  // done() with no arguments.
  setImmediate(done);
});

test('callback failing test', (t, done) => {
  // When the setImmediate() runs, done() is invoked with an Error object and
  // the test fails.
  setImmediate(() => {
    done(new Error('callback failure'));
  });
});
```

If any tests fail, the process exit code is set to `1`.

## Subtests

The test context's `test()` method allows subtests to be created.
It allows you to structure your tests in a hierarchical manner,
where you can create nested tests within a larger test.
This method behaves identically to the top level `test()` function.
The following example demonstrates the creation of a
top level test with two subtests.

```js
test('top level test', async (t) => {
  await t.test('subtest 1', (t) => {
    assert.strictEqual(1, 1);
  });

  await t.test('subtest 2', (t) => {
    assert.strictEqual(2, 2);
  });
});
```

> **Note:** `beforeEach` and `afterEach` hooks are triggered
> between each subtest execution.

In this example, `await` is used to ensure that both subtests have completed.
This is necessary because tests do not wait for their subtests to
complete, unlike tests created within suites.
Any subtests that are still outstanding when their parent finishes
are cancelled and treated as failures. Any subtest failures cause the parent
test to fail.

## Rerunning failed tests

The test runner supports persisting the state of the run to a file, allowing
the test runner to rerun failed tests without having to re-run the entire test suite.
Use the `--test-rerun-failures` command-line option to specify a file path where the
state of the run is stored. if the state file does not exist, the test runner will
create it.
the state file is a JSON file that contains an array of run attempts.
Each run attempt is an object mapping successful tests to the attempt they have passed in.
The key identifying a test in this map is the test file path, with the line and column where the test is defined.
in a case where a test defined in a specific location is run multiple times,
for example within a function or a loop,
a counter will be appended to the key, to disambiguate the test runs.
note changing the order of test execution or the location of a test can lead the test runner
to consider tests as passed on a previous attempt,
meaning `--test-rerun-failures` should be used when tests run in a deterministic order.

example of a state file:

```json
[
  {
    "test.js:10:5": { "passed_on_attempt": 0, "name": "test 1" }
  },
  {
    "test.js:10:5": { "passed_on_attempt": 0, "name": "test 1" },
    "test.js:20:5": { "passed_on_attempt": 1, "name": "test 2" }
  }
]
```

in this example, there are two run attempts, with two tests defined in `test.js`,
the first test succeeded on the first attempt, and the second test succeeded on the second attempt.

When the `--test-rerun-failures` option is used, the test runner will only run tests that have not yet passed.
A `todo` test that fails counts as not yet passed and is rerun, even though its failure does not
cause the test run to fail.

```bash
node --test-rerun-failures /path/to/state/file
```

## `describe()` and `it()` aliases

Suites and tests can also be written using the `describe()` and `it()`
functions. `describe()` is an alias for `suite()`, and `it()` is an
alias for `test()`.

```js
describe('A thing', () => {
  it('should work', () => {
    assert.strictEqual(1, 1);
  });

  it('should be ok', () => {
    assert.strictEqual(2, 2);
  });

  describe('a nested thing', () => {
    it('should work', () => {
      assert.strictEqual(3, 3);
    });
  });
});
```

`describe()` and `it()` are imported from the `node:test` module.

```mjs
import { describe, it } from 'node:test';
```

```cjs
const { describe, it } = require('node:test');
```

## Skipping tests

Individual tests can be skipped by passing the `skip` option to the test, or by
calling the test context's `skip()` method as shown in the
following example.

```js
// The skip option is used, but no message is provided.
test('skip option', { skip: true }, (t) => {
  // This code is never executed.
});

// The skip option is used, and a message is provided.
test('skip option with message', { skip: 'this is skipped' }, (t) => {
  // This code is never executed.
});

test('skip() method', (t) => {
  // Make sure to return here as well if the test contains additional logic.
  t.skip();
});

test('skip() method with message', (t) => {
  // Make sure to return here as well if the test contains additional logic.
  t.skip('this is skipped');
});
```

## TODO tests

Individual tests can be marked as flaky or incomplete by passing the `todo`
option to the test, or by calling the test context's `todo()` method, as shown
in the following example. These tests represent a pending implementation or bug
that needs to be fixed. TODO tests are executed, but are not treated as test
failures, and therefore do not affect the process exit code. If a test is marked
as both TODO and skipped, the TODO option is ignored.

```js
// The todo option is used, but no message is provided.
test('todo option', { todo: true }, (t) => {
  // This code is executed, but not treated as a failure.
  throw new Error('this does not fail the test');
});

// The todo option is used, and a message is provided.
test('todo option with message', { todo: 'this is a todo test' }, (t) => {
  // This code is executed.
});

test('todo() method', (t) => {
  t.todo();
});

test('todo() method with message', (t) => {
  t.todo('this is a todo test and is not treated as a failure');
  throw new Error('this does not fail the test');
});
```

## Expecting tests to fail

This flips the pass/fail reporting for a specific test or suite: a flagged test
case must throw in order to pass, and a flagged test case that does not throw
fails.

In each of the following, `doTheThing()` fails to return `true`, but since the
tests are flagged `expectFailure`, they pass.

```js
it.expectFailure('should do the thing', () => {
  assert.strictEqual(doTheThing(), true);
});

it('should do the thing', { expectFailure: true }, () => {
  assert.strictEqual(doTheThing(), true);
});

it('should do the thing', { expectFailure: 'feature not implemented' }, () => {
  assert.strictEqual(doTheThing(), true);
});
```

If the value of `expectFailure` is a {RegExp|Function|Object|Error}
the tests will pass only if they throw a matching value.
See `assert.throws` for how each value type is handled.

Each of the following tests fails _despite_ being flagged `expectFailure`
because the failure does not match the specific **expected** failure.

```js
it('fails because regex does not match', {
  expectFailure: /expected message/,
}, () => {
  throw new Error('different message');
});

it('fails because object matcher does not match', {
  expectFailure: { code: 'ERR_EXPECTED' },
}, () => {
  const err = new Error('boom');
  err.code = 'ERR_ACTUAL';
  throw err;
});
```

To supply both a reason and specific error for `expectFailure`, use `{ label, match }`.

```js
it('should fail with specific error and reason', {
  expectFailure: {
    label: 'reason for failure',
    match: /error message/,
  },
}, () => {
  assert.strictEqual(doTheThing(), true);
});
```

`skip` and/or `todo` are mutually exclusive to `expectFailure`, and `skip` or `todo`
will "win" when both are applied (`skip` wins against both, and `todo` wins
against `expectFailure`).

These tests will be skipped (and not run):

```js
it.expectFailure('should do the thing', { skip: true }, () => {
  assert.strictEqual(doTheThing(), true);
});

it.skip('should do the thing', { expectFailure: true }, () => {
  assert.strictEqual(doTheThing(), true);
});
```

These tests will be marked "todo" (silencing errors):

```js
it.expectFailure('should do the thing', { todo: true }, () => {
  assert.strictEqual(doTheThing(), true);
});

it.todo('should do the thing', { expectFailure: true }, () => {
  assert.strictEqual(doTheThing(), true);
});
```

## `only` tests

If Node.js is started with the `--test-only` command-line option, or test
isolation is disabled, it is possible to skip all tests except for a selected
subset by passing the `only` option to the tests that should run. When a test
with the `only` option is set, all subtests are also run.
If a suite has the `only` option set, all tests within the suite are run,
unless it has descendants with the `only` option set, in which case only those
tests are run.

When using subtests within a `test()`/`it()`, it is required to mark
all ancestor tests with the `only` option to run only a
selected subset of tests.

The test context's `runOnly()`
method can be used to implement the same behavior at the subtest level. Tests
that are not executed are omitted from the test runner output.

```js
// Assume Node.js is run with the --test-only command-line option.
// The suite's 'only' option is set, so these tests are run.
test('this test is run', { only: true }, async (t) => {
  // Within this test, all subtests are run by default.
  await t.test('running subtest');

  // The test context can be updated to run subtests with the 'only' option.
  t.runOnly(true);
  await t.test('this subtest is now skipped');
  await t.test('this subtest is run', { only: true });

  // Switch the context back to execute all tests.
  t.runOnly(false);
  await t.test('this subtest is now run');

  // Explicitly do not run these tests.
  await t.test('skipped subtest 3', { only: false });
  await t.test('skipped subtest 4', { skip: true });
});

// The 'only' option is not set, so this test is skipped.
test('this test is not run', () => {
  // This code is not run.
  throw new Error('fail');
});

describe('a suite', () => {
  // The 'only' option is set, so this test is run.
  it('this test is run', { only: true }, () => {
    // This code is run.
  });

  it('this test is not run', () => {
    // This code is not run.
    throw new Error('fail');
  });
});

describe.only('a suite', () => {
  // The 'only' option is set, so this test is run.
  it('this test is run', () => {
    // This code is run.
  });

  it('this test is run', () => {
    // This code is run.
  });
});
```

## Filtering tests by name

The `--test-name-pattern` command-line option can be used to only run
tests whose name matches the provided pattern, and the
`--test-skip-pattern` option can be used to skip tests whose name
matches the provided pattern. Test name patterns are interpreted as
JavaScript regular expressions. The `--test-name-pattern` and
`--test-skip-pattern` options can be specified multiple times in order to run
nested tests. For each test that is executed, any corresponding test hooks,
such as `beforeEach()`, are also run. Tests that are not executed are omitted
from the test runner output.

Given the following test file, starting Node.js with the
`--test-name-pattern="test [1-3]"` option would cause the test runner to execute
`test 1`, `test 2`, and `test 3`. If `test 1` did not match the test name
pattern, then its subtests would not execute, despite matching the pattern. The
same set of tests could also be executed by passing `--test-name-pattern`
multiple times (e.g. `--test-name-pattern="test 1"`,
`--test-name-pattern="test 2"`, etc.).

```js
test('test 1', async (t) => {
  await t.test('test 2');
  await t.test('test 3');
});

test('Test 4', async (t) => {
  await t.test('Test 5');
  await t.test('test 6');
});
```

Test name patterns can also be specified using regular expression literals. This
allows regular expression flags to be used. In the previous example, starting
Node.js with `--test-name-pattern="/test [4-5]/i"` (or `--test-skip-pattern="/test [4-5]/i"`)
would match `Test 4` and `Test 5` because the pattern is case-insensitive.

To match a single test with a pattern, you can prefix it with all its ancestor
test names separated by space, to ensure it is unique.
For example, given the following test file:

```js
describe('test 1', (t) => {
  it('some test');
});

describe('test 2', (t) => {
  it('some test');
});
```

Starting Node.js with `--test-name-pattern="test 1 some test"` would match
only `some test` in `test 1`.

Test name patterns do not change the set of files that the test runner executes.

If both `--test-name-pattern` and `--test-skip-pattern` are supplied,
tests must satisfy **both** requirements in order to be executed.
