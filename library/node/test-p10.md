---
title: "Test runner (part 10 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 10 of 14)

## Class: `TestsStream`

* Extends {Readable}

A successful call to `run()` method will return a new {TestsStream}
object, streaming a series of events representing the execution of the tests.
`TestsStream` will emit events, in the order of the tests definition

Some of the events are guaranteed to be emitted in the same order as the tests
are defined, while others are emitted in the order that the tests execute.

The following tables summarize all events by scope.

Test scoped events are emitted once per test or suite. Most of them come in
pairs: a declaration ordered event, buffered so that events are emitted in the
same order as the tests are defined, and one or more corresponding execution
ordered events, emitted immediately as the tests execute.

| Declaration ordered (buffered) | Execution ordered (immediate)                         |
| ------------------------------ | ----------------------------------------------------- |
| `'test:start'`             | `'test:enqueue'` followed by `'test:dequeue'` |
| `'test:pass'`              | `'test:complete'` (`details.passed` is `true`)    |
| `'test:fail'`              | `'test:complete'` (`details.passed` is `false`)   |
| `'test:plan'`              |                                                       |
| `'test:diagnostic'`        |                                                       |
|                                | `'test:log'`                                      |

`'test:log'` is deliberately execution ordered only: it is the live
counterpart of `'test:diagnostic'`'s buffered reporting.

File scoped and global events are always emitted immediately, in execution
order.

File scoped events are emitted once per test file:

| Event                | Notes                                          |
| -------------------- | ---------------------------------------------- |
| `'test:stderr'`  | Only emitted if the `--test` flag is passed.   |
| `'test:stdout'`  | Only emitted if the `--test` flag is passed.   |
| `'test:summary'` | Per file, only when process isolation is used. |

Global events are emitted once per test run:

| Event                        | Notes                                |
| ---------------------------- | ------------------------------------ |
| `'test:summary'`         | The final cumulative summary.        |
| `'test:coverage'`        | Only when code coverage is enabled.  |
| `'test:interrupted'`     | Only when the run receives `SIGINT`. |
| `'test:watch:drained'`   | Watch mode only.                     |
| `'test:watch:restarted'` | Watch mode only.                     |

The root test also emits `'test:plan'` and `'test:diagnostic'` events
at the end of the run to report run level totals.

### Event lifecycle

The tables above group the events; the diagram below places them on a
timeline. The declaration ordered events form the main spine, buffered so that
a reporter sees them in source order, while each execution ordered twin is
emitted immediately, when the work actually happens. In particular,
`'test:start'` marks when a test begins _reporting_ its own and its
subtests' status, not when its body begins executing; that moment is
`'test:dequeue'`.

```text
                     node:test reporter event lifecycle
   main spine = DECLARATION order (buffered; matches source order)
   right side = EXECUTION order (emitted immediately); ◄ marks each twin

  LEAF TEST
  ─────────
   ┌──────────────┐                   test:enqueue
   │ test:start   │ ◄──── twins ────  (queued for execution;
   └──────────────┘                    type: 'suite' | 'test')
        │  begins REPORTING           test:dequeue
        │  (not the start of          (about to run; emitted right
        │   the test body)             before the test body runs)
        │
        │     [ between the twins, on the execution timeline, the test
        │       body runs: context.log() emits test:log live, and
        │       test:stdout / test:stderr stream with --test ]
        │
        ▼
   ┌───────────────────────┐
   │ test:pass │ test:fail │ ◄──── twin ────  test:complete
   └───────────────────────┘   result         (details.passed says which)
        │
        ▼
   test:diagnostic    the test's own context.diagnostic() messages,
                      buffered while it runs, flushed after its result

  SUITE / PARENT TEST   (each subtest is the whole LEAF flow above)
  ───────────────────
   test:start ─► [ full flow of each subtest ... ] ─►
        test:plan (count = subtests) ─► test:pass │ test:fail ─►
        test:diagnostic

  RUN-LEVEL FINALE   (root, after all top-level tests)
  ────────────────
   test:plan         top-level count
        │
        ▼
   test:diagnostic   x N   tests, suites, pass, fail, cancelled,
        │                  skipped, todo, duration_ms (+ coverage errors)
        ▼
   test:coverage     only if coverage is enabled
        │
        ▼
   test:summary  ─►  stream ends

  INTERRUPTION   (SIGINT, e.g. Ctrl+C, while tests are still running)
  ────────────
   test:interrupted   the innermost tests still running at that moment
        │             (not emitted if none were running)
        ▼
   the run exits immediately — the buffered spine never flushes, so
   neither the finale above nor those tests' own results are emitted
```

### Event: `'test:coverage'`

* `data` {Object}
  * `summary` {Object} An object containing the coverage report.
    * `files` {Array} An array of coverage reports for individual files. Each
      report is an object with the following schema:
      * `path` {string} The absolute path of the file.
      * `totalLineCount` {number} The total number of lines.
      * `totalBranchCount` {number} The total number of branches.
      * `totalFunctionCount` {number} The total number of functions.
      * `coveredLineCount` {number} The number of covered lines.
      * `coveredBranchCount` {number} The number of covered branches.
      * `coveredFunctionCount` {number} The number of covered functions.
      * `coveredLinePercent` {number} The percentage of lines covered.
      * `coveredBranchPercent` {number} The percentage of branches covered.
      * `coveredFunctionPercent` {number} The percentage of functions covered.
      * `functions` {Array} An array of functions representing function
        coverage.
        * `name` {string} The name of the function.
        * `line` {number} The line number where the function is defined.
        * `count` {number} The number of times the function was called.
      * `branches` {Array} An array of branches representing branch coverage.
        * `line` {number} The line number where the branch is defined.
        * `count` {number} The number of times the branch was taken.
      * `lines` {Array} An array of lines representing line
        numbers and the number of times they were covered.
        * `line` {number} The line number.
        * `count` {number} The number of times the line was covered.
    * `thresholds` {Object} An object containing whether or not the coverage for
      each coverage type.
      * `function` {number} The function coverage threshold.
      * `branch` {number} The branch coverage threshold.
      * `line` {number} The line coverage threshold.
    * `totals` {Object} An object containing a summary of coverage for all
      files.
      * `totalLineCount` {number} The total number of lines.
      * `totalBranchCount` {number} The total number of branches.
      * `totalFunctionCount` {number} The total number of functions.
      * `coveredLineCount` {number} The number of covered lines.
      * `coveredBranchCount` {number} The number of covered branches.
      * `coveredFunctionCount` {number} The number of covered functions.
      * `coveredLinePercent` {number} The percentage of lines covered.
      * `coveredBranchPercent` {number} The percentage of branches covered.
      * `coveredFunctionPercent` {number} The percentage of functions covered.
    * `workingDirectory` {string} The working directory when code coverage
      began. This is useful for displaying relative path names in case the tests
      changed the working directory of the Node.js process.
  * `nesting` {number} The nesting level of the test.

Emitted when code coverage is enabled and all tests have completed.

### Event: `'test:complete'`

* `data` {Object}
  * `column` {number|undefined} The column number where the test is defined, or
    `undefined` if the test was run through the REPL.
  * `details` {Object} Additional execution metadata.
    * `passed` {boolean} Whether the test passed or not.
    * `duration_ms` {number} The duration of the test in milliseconds.
    * `error` {Error|undefined} An error wrapping the error thrown by the test
      if it did not pass.
      * `cause` {Error} The actual error thrown by the test.
    * `type` {string|undefined} The type of the test, used to denote whether
      this is a suite.
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

Emitted when a test completes its execution.
This event is not emitted in the same order as the tests are
defined.
The corresponding declaration ordered events are `'test:pass'` and `'test:fail'`.

### Event: `'test:dequeue'`

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

Emitted when a test is dequeued, right before it is executed.
This event is not guaranteed to be emitted in the same order as the tests are
defined. The corresponding declaration ordered event is `'test:start'`.

### Event: `'test:diagnostic'`

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
  * `message` {string} The diagnostic message.
  * `nesting` {number} The nesting level of the test.
  * `level` {string} The severity level of the diagnostic message.
    Possible values are:
    * `'info'`: Informational messages.
    * `'warn'`: Warnings.
    * `'error'`: Errors.

Emitted when `context.diagnostic` is called.
This event is guaranteed to be emitted in the same order as the tests are
defined.
