---
title: "Test runner (part 11 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 11 of 14)

### Event: `'test:enqueue'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation. May differ from
    `file` when the test is defined in a module imported by the entry file.
  * `file` {string|undefined} The path of the test file,
    `undefined` if test was run through the REPL.
  * `line` {number|undefined} The line number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `name` {string} The test name.
  * `nesting` {number} The nesting level of the test.
  * `parentId` {number|undefined} The `testId` of the enclosing test, or
    `undefined` for top-level tests. Lets custom reporters track lineage
    when concurrent siblings at the same nesting level interleave.
  * `tags` {string\[]} The flattened lowercased tags declared on the test
    and its ancestor suites, in declaration order. Empty for untagged tests.
    See Test tags.
  * `testId` {number} A numeric identifier for this test instance, unique
    within the test file's process. Consistent across all events for the same
    test instance, enabling reliable correlation in custom reporters.
  * `type` {string} The test type. Either `'suite'` or `'test'`.

Emitted when a test is enqueued for execution.

### Event: `'test:fail'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `details` {Object} Additional execution metadata.
    * `duration_ms` {number} The duration of the test in milliseconds.
    * `error` {Error} An error wrapping the error thrown by the test.
      * `cause` {Error} The actual error thrown by the test.
    * `type` {string|undefined} The type of the test, used to denote whether
      this is a suite.
    * `attempt` {number|undefined} The attempt number of the test run,
      present only when using the `--test-rerun-failures` flag.
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation. May differ from
    `file` when the test is defined in a module imported by the entry file.
  * `file` {string|undefined} The path of the test file,
    `undefined` if test was run through the REPL.
  * `line` {number|undefined} The line number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `name` {string} The test name.
  * `nesting` {number} The nesting level of the test.
  * `parentId` {number|undefined} The `testId` of the enclosing test, or
    `undefined` for top-level tests. Lets custom reporters track lineage
    when concurrent siblings at the same nesting level interleave.
  * `tags` {string\[]} The flattened lowercased tags declared on the test
    and its ancestor suites, in declaration order. Empty for untagged tests.
    See Test tags.
  * `testId` {number} A numeric identifier for this test instance, unique
    within the test file's process. Consistent across all events for the same
    test instance, enabling reliable correlation in custom reporters.
  * `testNumber` {number} The ordinal number of the test.
  * `todo` {string|boolean|undefined} Present if `context.todo` is called
  * `skip` {string|boolean|undefined} Present if `context.skip` is called

Emitted when a test fails.
This event is guaranteed to be emitted in the same order as the tests are
defined.
The corresponding execution ordered event is `'test:complete'`.

### Event: `'test:interrupted'`

* `data` {Object}
  * `tests` {Array} An array of objects containing information about the
    interrupted tests.
    * `column` {number|undefined} The column number where the test is defined,
      or `undefined` if the test was run through the REPL.
    * `file` {string|undefined} The path of the test file,
      `undefined` if test was run through the REPL.
    * `line` {number|undefined} The line number where the test is defined, or
      `undefined` if the test was run through the REPL.
    * `name` {string} The test name.
    * `nesting` {number} The nesting level of the test.

Emitted when the test runner is interrupted by a `SIGINT` signal (e.g., when
pressing `Ctrl`+`C`). The event contains information about
the tests that were running at the time of interruption.

When using process isolation (the default), the test name will be the file path
since the parent runner only knows about file-level tests. When using
`--test-isolation=none`, the actual test name is shown.

### Event: `'test:log'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `data` {any} The structured payload passed to `context.log`, or
    `undefined` if none was provided. The test runner does not interpret this
    value.
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation. May differ from
    `file` when the test is defined in a module imported by the entry file.
  * `file` {string|undefined} The path of the test file,
    `undefined` if test was run through the REPL.
  * `line` {number|undefined} The line number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `message` {string} The log message.
  * `name` {string} The test name.
  * `nesting` {number} The nesting level of the test.
  * `parentId` {number|undefined} The `testId` of the enclosing test, or
    `undefined` for top-level tests.
  * `testId` {number} A numeric identifier for the test instance that emitted
    the log message.

Emitted when `context.log` is called. Unlike `'test:diagnostic'`,
this event is emitted immediately, in the order that the tests execute,
making it suitable for reporters that render test output unbuffered.

### Event: `'test:pass'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `details` {Object} Additional execution metadata.
    * `duration_ms` {number} The duration of the test in milliseconds.
    * `type` {string|undefined} The type of the test, used to denote whether
      this is a suite.
    * `attempt` {number|undefined} The attempt number of the test run,
      present only when using the `--test-rerun-failures` flag.
    * `passed_on_attempt` {number|undefined} The attempt number the test passed on,
      present only when using the `--test-rerun-failures` flag.
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation. May differ from
    `file` when the test is defined in a module imported by the entry file.
  * `file` {string|undefined} The path of the test file,
    `undefined` if test was run through the REPL.
  * `line` {number|undefined} The line number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `name` {string} The test name.
  * `nesting` {number} The nesting level of the test.
  * `parentId` {number|undefined} The `testId` of the enclosing test, or
    `undefined` for top-level tests. Lets custom reporters track lineage
    when concurrent siblings at the same nesting level interleave.
  * `tags` {string\[]} The flattened lowercased tags declared on the test
    and its ancestor suites, in declaration order. Empty for untagged tests.
    See Test tags.
  * `testId` {number} A numeric identifier for this test instance, unique
    within the test file's process. Consistent across all events for the same
    test instance, enabling reliable correlation in custom reporters.
  * `testNumber` {number} The ordinal number of the test.
  * `todo` {string|boolean|undefined} Present if `context.todo` is called
  * `skip` {string|boolean|undefined} Present if `context.skip` is called

Emitted when a test passes.
This event is guaranteed to be emitted in the same order as the tests are
defined.
The corresponding execution ordered event is `'test:complete'`.

### Event: `'test:plan'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation. May differ from
    `file` when the test is defined in a module imported by the entry file.
  * `file` {string|undefined} The path of the test file,
    `undefined` if test was run through the REPL.
  * `line` {number|undefined} The line number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `nesting` {number} The nesting level of the test.
  * `count` {number} The number of subtests that have ran.

Emitted when all subtests have completed for a given test.
This event is guaranteed to be emitted in the same order as the tests are
defined.

### Event: `'test:start'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation. May differ from
    `file` when the test is defined in a module imported by the entry file.
  * `file` {string|undefined} The path of the test file,
    `undefined` if test was run through the REPL.
  * `line` {number|undefined} The line number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `name` {string} The test name.
  * `nesting` {number} The nesting level of the test.
  * `parentId` {number|undefined} The `testId` of the enclosing test, or
    `undefined` for top-level tests. Lets custom reporters track lineage
    when concurrent siblings at the same nesting level interleave.
  * `tags` {string\[]} The flattened lowercased tags declared on the test
    and its ancestor suites, in declaration order. Empty for untagged tests.
    See Test tags.
  * `testId` {number} A numeric identifier for this test instance, unique
    within the test file's process. Consistent across all events for the same
    test instance, enabling reliable correlation in custom reporters.

Emitted when a test starts reporting its own and its subtests status.
This event is guaranteed to be emitted in the same order as the tests are
defined.
The corresponding execution ordered event is `'test:dequeue'`.

### Event: `'test:stderr'`

* `data` {Object}
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation.
  * `file` {string} The path of the test file.
  * `message` {string} The message written to `stderr`.

Emitted when a running test writes to `stderr`.
This event is only emitted if `--test` flag is passed.
This event is not guaranteed to be emitted in the same order as the tests are
defined.

### Event: `'test:stdout'`

* `data` {Object}
  * `entryFile` {string|undefined} The path of the test file that was
    executed as the entry point of the child process that emitted this event.
    Only present when tests run with process isolation.
  * `file` {string} The path of the test file.
  * `message` {string} The message written to `stdout`.

Emitted when a running test writes to `stdout`.
This event is only emitted if `--test` flag is passed.
This event is not guaranteed to be emitted in the same order as the tests are
defined.

### Event: `'test:summary'`

* `data` {Object}
  * `counts` {Object} An object containing the counts of various test results.
    * `cancelled` {number} The total number of cancelled tests.
    * `failed` {number} The total number of failed tests.
    * `passed` {number} The total number of passed tests.
    * `skipped` {number} The total number of skipped tests.
    * `suites` {number} The total number of suites run.
    * `tests` {number} The total number of tests run, excluding suites.
    * `todo` {number} The total number of TODO tests.
    * `topLevel` {number} The total number of top level tests and suites.
  * `duration_ms` {number} The duration of the test run in milliseconds.
  * `file` {string|undefined} The path of the test file that generated the
    summary. If the summary corresponds to multiple files, this value is
    `undefined`.
  * `success` {boolean} Indicates whether or not the test run is considered
    successful or not. If any error condition occurs, such as a failing test or
    unmet coverage threshold, this value will be set to `false`.

Emitted when a test run completes. This event contains metrics pertaining to
the completed test run, and is useful for determining if a test run passed or
failed. If process-level test isolation is used, a `'test:summary'` event is
generated for each test file in addition to a final cumulative summary.

### Event: `'test:watch:drained'`

Emitted when no more tests are queued for execution in watch mode.

### Event: `'test:watch:restarted'`

Emitted when one or more tests are restarted due to a file change in watch mode.

## `getTestContext()`

* Returns: {TestContext|SuiteContext|undefined}

Returns the `TestContext` or `SuiteContext` object associated with the
currently executing test or suite, or `undefined` if called outside of a test or
suite. This function can be used to access context information from within the
test or suite function or any async operations within them.

```mjs
import { getTestContext } from 'node:test';

test('example test', async () => {
  const ctx = getTestContext();
  console.log(`Running test: ${ctx.name}`);
});

describe('example suite', () => {
  const ctx = getTestContext();
  console.log(`Running suite: ${ctx.name}`);
});
```

When called from a test, returns a `TestContext`.
When called from a suite, returns a `SuiteContext`.

If called from outside a test or suite (e.g., at the top level of a module or in
a setTimeout callback after execution has completed), this function returns
`undefined`.

When called from within a hook (before, beforeEach, after, afterEach), this
function returns the context of the test or suite that the hook is associated
with.
