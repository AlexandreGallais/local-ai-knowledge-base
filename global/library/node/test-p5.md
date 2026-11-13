---
title: "Test runner (part 5 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 5 of 14)

## `run([options])`

* `options` {Object} Configuration options for running tests. The following
  properties are supported:
  * `concurrency` {number|boolean} If a number is provided,
    then that many test processes would run in parallel, where each process
    corresponds to one test file.
    If `true`, it would run `os.availableParallelism() - 1` test files in
    parallel.
    If `false`, it would only run one test file at a time.
    **Default:** `false`.
  * `cwd` {string} Specifies the current working directory to be used by the test runner.
    Serves as the base path for resolving files as if running tests from the command line from that directory.
    **Default:** `process.cwd()`.
  * `files` {Array} An array containing the list of files to run.
    **Default:** Same as running tests from the command line.
  * `forceExit` {boolean} Configures the test runner to exit the process once
    all known tests have finished executing even if the event loop would
    otherwise remain active. **Default:** `false`.
  * `globPatterns` {Array} An array containing the list of glob patterns to
    match test files. This option cannot be used together with `files`.
    **Default:** Same as running tests from the command line.
  * `inspectPort` {number|Function} Sets inspector port of test child process.
    This can be a number, or a function that takes no arguments and returns a
    number. If a nullish value is provided, each process gets its own port,
    incremented from the primary's `process.debugPort`. This option is ignored
    if the `isolation` option is set to `'none'` as no child processes are
    spawned. **Default:** `undefined`.
  * `isolation` {string} Configures the type of test isolation. If set to
    `'process'`, each test file is run in a separate child process. If set to
    `'none'`, all test files run in the current process. **Default:**
    `'process'`.
  * `only` {boolean} If truthy, the test context will only run tests that
    have the `only` option set
  * `setup` {Function} A function that accepts the `TestsStream` instance
    and can be used to setup listeners before any tests are run.
    **Default:** `undefined`.
  * `execArgv` {Array} An array of CLI flags to pass to the `node` executable when
    spawning the subprocesses. This option has no effect when `isolation` is `'none`'.
    **Default:** `[]`
  * `argv` {Array} An array of CLI flags to pass to each test file when spawning the
    subprocesses. This option has no effect when `isolation` is `'none'`.
    **Default:** `[]`.
  * `signal` {AbortSignal} Allows aborting an in-progress test execution.
  * `testNamePatterns` {string|RegExp|Array} A String, RegExp or a RegExp Array,
    that can be used to only run tests whose name matches the provided pattern.
    Test name patterns are interpreted as JavaScript regular expressions.
    For each test that is executed, any corresponding test hooks, such as
    `beforeEach()`, are also run.
    **Default:** `undefined`.
  * `testSkipPatterns` {string|RegExp|Array} A String, RegExp or a RegExp Array,
    that can be used to exclude running tests whose name matches the provided pattern.
    Test name patterns are interpreted as JavaScript regular expressions.
    For each test that is executed, any corresponding test hooks, such as
    `beforeEach()`, are also run.
    **Default:** `undefined`.
  * `testTagFilters` {string|string\[]} A boolean expression, or an array of
    boolean expressions, used to filter tests by their declared tags.
    Multiple expressions compose by AND. Equivalent to passing
    `--experimental-test-tag-filter` on the command line. See
    Test tags. **Default:** `undefined`.
  * `timeout` {number} A number of milliseconds the test execution will
    fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.
  * `watch` {boolean} Whether to run in watch mode or not. **Default:** `false`.
  * `shard` {Object} Running tests in a specific shard. **Default:** `undefined`.
    * `index` {number} is a positive integer between 1 and `<total>`
      that specifies the index of the shard to run. This option is _required_.
    * `total` {number} is a positive integer that specifies the total number
      of shards to split the test files to. This option is _required_.
  * `randomize` {boolean} Randomize execution order for test files and queued tests.
    This option is not supported with `watch: true`.
    **Default:** `false`.
  * `randomSeed` {number} Seed used when randomizing execution order. If this
    option is set, runs can replay the same randomized order deterministically,
    and setting this option also enables randomization. The value must be an
    integer between `0` and `4294967295`.
    **Default:** `undefined`.
  * `rerunFailuresFilePath` {string} A file path where the test runner will
    store the state of the tests to allow rerunning only the failed tests on a next run.
    see \[Rerunning failed tests]\[] for more information.
    **Default:** `undefined`.
  * `coverage` {boolean} enable code coverage collection.
    **Default:** `false`.
  * `coverageExcludeGlobs` {string|Array} Excludes specific files from code coverage
    using a glob pattern, which can match both absolute and relative file paths.
    This property is only applicable when `coverage` was set to `true`.
    If both `coverageExcludeGlobs` and `coverageIncludeGlobs` are provided,
    files must meet **both** criteria to be included in the coverage report.
    **Default:** `undefined`.
  * `coverageIncludeGlobs` {string|Array} Includes specific files in code coverage
    using a glob pattern, which can match both absolute and relative file paths.
    This property is only applicable when `coverage` was set to `true`.
    If both `coverageExcludeGlobs` and `coverageIncludeGlobs` are provided,
    files must meet **both** criteria to be included in the coverage report.
    **Default:** `undefined`.
  * `coverageIncludeAll` {boolean} Includes source files that were never loaded by
    the test run in the coverage report, where they are reported as having zero
    coverage. Candidate files are searched for in `cwd`, and are subject to the
    same `coverageIncludeGlobs` and `coverageExcludeGlobs` filtering as the rest
    of the report. This property is only applicable when `coverage` was set to
    `true`.
    **Default:** `false`.
  * `lineCoverage` {number} Require a minimum percent of covered lines. If code
    coverage does not reach the threshold specified, the process will exit with code `1`.
    **Default:** `0`.
  * `branchCoverage` {number} Require a minimum percent of covered branches. If code
    coverage does not reach the threshold specified, the process will exit with code `1`.
    **Default:** `0`.
  * `functionCoverage` {number} Require a minimum percent of covered functions. If code
    coverage does not reach the threshold specified, the process will exit with code `1`.
    **Default:** `0`.
  * `env` {Object} Specify environment variables to be passed along to the test process.
    This option is not compatible with `isolation='none'`. These variables will override
    those from the main process, and are not merged with `process.env`.
    **Default:** `process.env`.
* Returns: {TestsStream}

**Note:** `shard` is used to horizontally parallelize test running across
machines or processes, ideal for large-scale executions across varied
environments. It's incompatible with `watch` mode, tailored for rapid
code iteration by automatically rerunning tests on file changes.

```mjs
import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import process from 'node:process';
import path from 'node:path';

run({ files: [path.resolve('./tests/test.js')] })
 .on('test:fail', () => {
   process.exitCode = 1;
 })
 .compose(tap)
 .pipe(process.stdout);
```

```cjs
const { tap } = require('node:test/reporters');
const { run } = require('node:test');
const path = require('node:path');

run({ files: [path.resolve('./tests/test.js')] })
 .on('test:fail', () => {
   process.exitCode = 1;
 })
 .compose(tap)
 .pipe(process.stdout);
```

## `suite(name[, fn])`

* `name` {string} The name of the suite, which is displayed when reporting test
  results. **Default:** The `name` property of `fn`, or `'<anonymous>'` if `fn`
  does not have a name.
* `options` {Object} Optional configuration options for the suite.
  This supports the same options as `test(name[, fn])`.
* `fn` {Function|AsyncFunction} The suite function declaring nested tests and
  suites. The first argument to this function is a `SuiteContext` object.
  **Default:** A no-op function.
* Returns: {Promise} Immediately fulfilled with `undefined`.

The `suite()` function is imported from the `node:test` module.

## `suite.skip(name[, fn])`

Shorthand for skipping a suite. This is the same as
`suite([name], { skip: true }[, fn])`.

## `suite.todo(name[, fn])`

Shorthand for marking a suite as `TODO`. This is the same as
`suite([name], { todo: true }[, fn])`.

## `suite.only(name[, fn])`

Shorthand for marking a suite as `only`. This is the same as
`suite([name], { only: true }[, fn])`.

## `test(name[, fn])`

* `name` {string} The name of the test, which is displayed when reporting test
  results. **Default:** The `name` property of `fn`, or `'<anonymous>'` if `fn`
  does not have a name.
* `options` {Object} Configuration options for the test. The following
  properties are supported:
  * `concurrency` {number|boolean} If a number is provided,
    then that many tests would run asynchronously (they are still managed by the single-threaded event loop).
    If `true`, all scheduled asynchronous tests run concurrently within the
    thread. If `false`, only one test runs at a time.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `false`.
  * `expectFailure` {boolean|string|RegExp|Function|Object|Error} If truthy, the
    test is expected to fail. If a non-empty string is provided, that string is displayed
    in the test results as the reason why the test is expected to fail. If a {RegExp|Function|Object|Error}
    is provided directly (without wrapping in `{ match: … }`), the test passes
    only if the thrown error matches, following the behavior of
    `assert.throws`. To provide both a reason and validation, pass an object
    with `label` (string) and `match` (RegExp, Function, Object, or Error).
    **Default:** `false`.
  * `only` {boolean} If truthy, and the test context is configured to run
    `only` tests, then this test will be run. Otherwise, the test is skipped.
    **Default:** `false`.
  * `signal` {AbortSignal} Allows aborting an in-progress test.
  * `skip` {boolean|string} If truthy, the test is skipped. If a string is
    provided, that string is displayed in the test results as the reason for
    skipping the test. **Default:** `false`.
  * `tags` {string\[]} An array of string labels associated with the test.
    Used together with `--experimental-test-tag-filter` to filter which
    tests run. Tags inherit from suites to nested tests by union. See
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
  * `fn` {Function|AsyncFunction} The function under test. If provided, it will take
    precedence over the `fn` parameter.
  * `name` {string} The name of the test. If provided, it will take precedence over the
    `name` parameter.
* `fn` {Function|AsyncFunction} The function under test. The first argument
  to this function is a `TestContext` object. If the test uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* Returns: {Promise} Fulfilled with `undefined` once
  the test completes, or immediately if the test runs within a suite.

The `test()` function is the value imported from the `test` module. Each
invocation of this function results in reporting the test to the {TestsStream}.

The `TestContext` object passed to the `fn` argument can be used to perform
actions related to the current test. Examples include skipping the test, adding
additional diagnostic information, or creating subtests.

`test()` returns a `Promise` that fulfills once the test completes.
if `test()` is called within a suite, it fulfills immediately.
The return value can usually be discarded for top level tests.
However, the return value from subtests should be used to prevent the parent
test from finishing first and cancelling the subtest
as shown in the following example.

```js
test('top level test', async (t) => {
  // The setTimeout() in the following subtest would cause it to outlive its
  // parent test if 'await' is removed on the next line. Once the parent test
  // completes, it will cancel any outstanding subtests.
  await t.test('longer running subtest', async (t) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  });
});
```

The `timeout` option can be used to fail the test if it takes longer than
`timeout` milliseconds to complete. However, it is not a reliable mechanism for
canceling tests because a running test might block the application thread and
thus prevent the scheduled cancellation.

## `test.skip(name[, fn])`

Shorthand for skipping a test,
same as `test([name], { skip: true }[, fn])`.

## `test.todo(name[, fn])`

Shorthand for marking a test as `TODO`,
same as `test([name], { todo: true }[, fn])`.

## `test.only(name[, fn])`

Shorthand for marking a test as `only`,
same as `test([name], { only: true }[, fn])`.

## `describe(name[, fn])`

Alias for `suite()`.

The `describe()` function is imported from the `node:test` module.

## `describe.skip(name[, fn])`

Shorthand for skipping a suite. This is the same as
`describe([name], { skip: true }[, fn])`.

## `describe.todo(name[, fn])`

Shorthand for marking a suite as `TODO`. This is the same as
`describe([name], { todo: true }[, fn])`.

## `describe.only(name[, fn])`

Shorthand for marking a suite as `only`. This is the same as
`describe([name], { only: true }[, fn])`.

## `it(name[, fn])`

Alias for `test()`.

The `it()` function is imported from the `node:test` module.

## `it.skip(name[, fn])`

Shorthand for skipping a test,
same as `it([name], { skip: true }[, fn])`.

## `it.todo(name[, fn])`

Shorthand for marking a test as `TODO`,
same as `it([name], { todo: true }[, fn])`.
