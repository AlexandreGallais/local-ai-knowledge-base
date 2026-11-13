---
title: "Test runner (part 2 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 2 of 14)

## Test tags

> Stability: 1.0 - Early development

Tags annotate tests and suites with arbitrary string labels. The
`--experimental-test-tag-filter` CLI flag (or the `testTagFilters`
option on `run()`) selects tests by a boolean expression over those
labels.

Tags are an alternative to encoding metadata into test names. They are
useful for cross-cutting axes such as subsystem, speed bucket, flakiness,
or environment, where a name pattern would be brittle.

### Authoring tagged tests

Pass a `tags` array on any of `test()`, `it()`, `suite()`, or `describe()`.
Tags inherit from a suite to its child tests by union—a test inside a
suite tagged `['db']` that declares its own `tags: ['integration']`
effectively has both tags.

```mjs
import { describe, it } from 'node:test';

describe('database', { tags: ['db'] }, () => {
  it('reads a row');                                            // tags: ['db']
  it('writes a row', { tags: ['integration'] });                // tags: ['db', 'integration']
  it('reconnects after disconnect', { tags: ['flaky'] });       // tags: ['db', 'flaky']
});
```

```cjs
const { describe, it } = require('node:test');

describe('database', { tags: ['db'] }, () => {
  it('reads a row');                                            // tags: ['db']
  it('writes a row', { tags: ['integration'] });                // tags: ['db', 'integration']
  it('reconnects after disconnect', { tags: ['flaky'] });       // tags: ['db', 'flaky']
});
```

Tag values must be non-empty strings that contain no whitespace, no
operator characters (`& | ! ( ) *`), and are not the reserved words
`'and'`, `'or'`, or `'not'` in any casing. Tags are matched
case-insensitively; the canonical form is lowercase. Duplicates within a
single `tags` array are collapsed on the lowercased form, preserving the
first-seen declaration order.

Hooks (`before`, `after`, `beforeEach`, `afterEach`) do not declare their
own tags. They run as part of their owning suite, which carries the
suite's tags.

### Filtering syntax

The filter expression supports:

* Identifiers—any non-whitespace, non-operator characters. A literal
  identifier matches a tag of the same value (case-insensitive).
* `*` wildcards inside an identifier match any sequence of characters.
  A bare `*` matches any tagged test.
* Boolean operators with two equivalent forms:
  * `and` / `&&`
  * `or` / `||`
  * `not` / `!`
* Parentheses for grouping.

The word forms (`and`, `or`, `not`) require whitespace separation; the
punctuation forms do not.

#### Operator precedence

The expression is evaluated with the standard precedence
`not > and > or`. Binary operators are left-associative.

| Expression     | Equivalent grouping |
| -------------- | ------------------- |
| `a or b and c` | `a or (b and c)`    |
| `not a and b`  | `(not a) and b`     |

Use parentheses to override:

| Expression                     | Selects                                    |
| ------------------------------ | ------------------------------------------ |
| `(unit or smoke) and not slow` | unit-or-smoke tests that are not also slow |
| `db && !flaky`                 | db tests that are not flaky                |
| `*`                            | every tagged test                          |

#### Untagged tests

Untagged tests behave as if they have an empty tag set. As a result:

| Filter expression        | Untagged test | Why                                              |
| ------------------------ | ------------- | ------------------------------------------------ |
| `db`                     | excluded      | Positive match against an empty tag set is false |
| `*`                      | excluded      | The bare wildcard requires at least one tag      |
| `db or unit`             | excluded      | Both branches are false against an empty tag set |
| `not flaky`              | included      | Negation against an empty tag set is true        |
| `not flaky and not slow` | included      | Both negations are true against an empty tag set |
| `db or not flaky`        | included      | The negated branch is true                       |

For example, `--experimental-test-tag-filter='not flaky'` runs every test
that is not tagged `flaky`, including all untagged tests.

#### Composing multiple filters

`--experimental-test-tag-filter` may be specified more than once on the
command line. Multiple expressions compose by AND—a test must satisfy
every expression to run. The same applies to passing an array to
`testTagFilters` on `run()`. The tag filter is also AND'd with
`--test-name-pattern`, `--test-skip-pattern`, and `.only`
filtering.

#### Reading tags from inside a test

The `TestContext` object exposes the test's tags as a frozen array
through `context.tags`, so tests can branch on their own metadata.

#### Errors

A tag value that violates the validation rules above throws
`ERR_INVALID_ARG_VALUE` at the registration site, before any test runs.
A non-array `tags` value throws `ERR_INVALID_ARG_TYPE`. A malformed
filter expression on the CLI causes the test runner to exit with a
non-zero status before running any test files.

## Extraneous asynchronous activity

Once a test function finishes executing, the results are reported as quickly
as possible while maintaining the order of the tests. However, it is possible
for the test function to generate asynchronous activity that outlives the test
itself. The test runner handles this type of activity, but does not delay the
reporting of test results in order to accommodate it.

In the following example, a test completes with two `setImmediate()`
operations still outstanding. The first `setImmediate()` attempts to create a
new subtest. Because the parent test has already finished and output its
results, the new subtest is immediately marked as failed, and reported later
to the {TestsStream}.

The second `setImmediate()` creates an `uncaughtException` event.
`uncaughtException` and `unhandledRejection` events originating from a completed
test are marked as failed by the `test` module and reported as diagnostic
warnings at the top level by the {TestsStream}.

```js
test('a test that creates asynchronous activity', (t) => {
  setImmediate(() => {
    t.test('subtest that is created too late', (t) => {
      throw new Error('error1');
    });
  });

  setImmediate(() => {
    throw new Error('error2');
  });

  // The test finishes after this line.
});
```

## Watch mode

> Stability: 1 - Experimental

The Node.js test runner supports running in watch mode by passing the `--watch` flag:

```bash
node --test --watch
```

In watch mode, the test runner will watch for changes to test files and
their dependencies. When a change is detected, the test runner will
rerun the tests affected by the change.
The test runner will continue to run until the process is terminated.

## Global setup and teardown

> Stability: 1.0 - Early development

The test runner supports specifying a module that will be evaluated before all tests are executed and
can be used to setup global state or fixtures for tests. This is useful for preparing resources or setting up
shared state that is required by multiple tests.

This module can export any of the following:

* A `globalSetup` function which runs once before all tests start
* A `globalTeardown` function which runs once after all tests complete

The module is specified using the `--test-global-setup` flag when running tests from the command line.

```cjs
// setup-module.js
async function globalSetup() {
  // Setup shared resources, state, or environment
  console.log('Global setup executed');
  // Run servers, create files, prepare databases, etc.
}

async function globalTeardown() {
  // Clean up resources, state, or environment
  console.log('Global teardown executed');
  // Close servers, remove files, disconnect from databases, etc.
}

module.exports = { globalSetup, globalTeardown };
```

```mjs
// setup-module.mjs
export async function globalSetup() {
  // Setup shared resources, state, or environment
  console.log('Global setup executed');
  // Run servers, create files, prepare databases, etc.
}

export async function globalTeardown() {
  // Clean up resources, state, or environment
  console.log('Global teardown executed');
  // Close servers, remove files, disconnect from databases, etc.
}
```

If the global setup function throws an error, no tests will be run and the process will exit with a non-zero exit code.
The global teardown function will not be called in this case.

## Running tests from the command line

The Node.js test runner can be invoked from the command line by passing the
`--test` flag:

```bash
node --test
```

By default, Node.js will run all files matching these patterns:

* `**/*.test.{cjs,mjs,js}`
* `**/*-test.{cjs,mjs,js}`
* `**/*_test.{cjs,mjs,js}`
* `**/test-*.{cjs,mjs,js}`
* `**/test.{cjs,mjs,js}`
* `**/test/**/*.{cjs,mjs,js}`

Unless `--no-strip-types` is supplied, the following
additional patterns are also matched:

* `**/*.test.{cts,mts,ts}`
* `**/*-test.{cts,mts,ts}`
* `**/*_test.{cts,mts,ts}`
* `**/test-*.{cts,mts,ts}`
* `**/test.{cts,mts,ts}`
* `**/test/**/*.{cts,mts,ts}`

Alternatively, one or more glob patterns can be provided as the
final argument(s) to the Node.js command, as shown below.
Glob patterns follow the behavior of `glob(7)`.
The glob patterns should be enclosed in double quotes on the command line to
prevent shell expansion, which can reduce portability across systems.

```bash
node --test "**/*.test.js" "**/*.spec.js"
```

### Randomizing tests execution order

> Stability: 1.0 - Early development

The test runner can randomize execution order to help detect
order-dependent tests. When enabled, the runner randomizes both discovered
test files and queued tests within each file. Use `--test-randomize` to
enable this mode.

```bash
node --test --test-randomize
```

When randomization is enabled, the test runner prints the seed used for the run
as a diagnostic message:

```text
Randomized test order seed: 12345
```

Use `--test-random-seed=<number>` to replay the same randomized order
deterministically. Supplying `--test-random-seed` also enables randomization,
so `--test-randomize` is optional when a seed is provided:

```bash
node --test --test-random-seed=12345
```

In most test files, randomization works automatically. One important exception
is when subtests are awaited one by one. In that pattern, each subtest starts
only after the previous one finishes, so the runner keeps declaration order
instead of randomizing it.

Example: this runs sequentially and is **not** randomized.

```mjs
import test from 'node:test';

test('math', async (t) => {
  for (const name of ['adds', 'subtracts', 'multiplies']) {
    // Sequentially awaiting each subtest preserves declaration order.
    await t.test(name, async () => {});
  }
});
```

```cjs
const test = require('node:test');

test('math', async (t) => {
  for (const name of ['adds', 'subtracts', 'multiplies']) {
    // Sequentially awaiting each subtest preserves declaration order.
    await t.test(name, async () => {});
  }
});
```

Using suite-style APIs such as `describe()`/`it()` or `suite()`/`test()`
still allows randomization, because sibling tests are enqueued together.

Example: this remains eligible for randomization.

```mjs
import { describe, it } from 'node:test';

describe('math', () => {
  it('adds', () => {});
  it('subtracts', () => {});
  it('multiplies', () => {});
});
```

```cjs
const { describe, it } = require('node:test');

describe('math', () => {
  it('adds', () => {});
  it('subtracts', () => {});
  it('multiplies', () => {});
});
```

`--test-randomize` and `--test-random-seed` are not supported with `--watch` mode.

Matching files are executed as test files.
More information on the test file execution can be found
in the test runner execution model section.

### Test runner execution model

When process-level test isolation is enabled, each matching test file is
executed in a separate child process. The maximum number of child processes
running at any time is controlled by the `--test-concurrency` flag. If the
child process finishes with an exit code of 0, the test is considered passing.
Otherwise, the test is considered to be a failure. Test files must be executable
by Node.js, but are not required to use the `node:test` module internally.

Each test file is executed as if it was a regular script. That is, if the test
file itself uses `node:test` to define tests, all of those tests will be
executed within a single application thread, regardless of the value of the
`concurrency` option of `test()`.

When process-level test isolation is disabled, each matching test file is
imported into the test runner process. Once all test files have been loaded, the
top level tests are executed with a concurrency of one. Because the test files
are all run within the same context, it is possible for tests to interact with
each other in ways that are not possible when isolation is enabled. For example,
if a test relies on global state, it is possible for that state to be modified
by a test originating from another file.

#### Child process option inheritance

When running tests in process isolation mode (the default), spawned child processes
inherit Node.js options from the parent process, including those specified in
configuration files. However, certain flags are filtered out to enable proper
test runner functionality:

* `--test` - Prevented to avoid recursive test execution
* `--experimental-test-coverage` - Managed by the test runner
* `--experimental-test-tag-filter` - Filter expressions are validated by the parent
  process and re-emitted to child processes
* `--watch` - Watch mode is handled at the parent level
* `--test-reporter` - Reporting is managed by the parent process
* `--test-reporter-destination` - Output destinations are controlled by the parent
* `--config-file` - Config file paths are managed by the parent
* `--test-randomize` - Randomization is managed by the parent process and
  propagated to child processes
* `--test-random-seed` - Randomization seed is managed by the parent process and
  propagated to child processes

All other Node.js options from command line arguments, environment variables,
and configuration files are inherited by the child processes.
