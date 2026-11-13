---
title: "Command-line API (part 6 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 6 of 10)

### `--process-timeout=duration`

> Stability: 1.1 - Active development

Exits the process with code `124` if it is still running after `duration`,
measured from the start of the process. `duration` is a positive integer
followed by a unit: `ms`, `s`, `m`, or `h`, for example `500ms`, `30s`, `5m`, or
`1h`. The exit code matches the one used by the `timeout(1)` command.

Before exiting, Node.js prints what the main thread was doing and which
resources were keeping the event loop alive to stderr:

```console
$ node --process-timeout=5s server.js
(node:25418) Process timed out after 5s (--process-timeout). Exiting with code 124.
Main thread was not executing JavaScript.
Resources keeping the event loop alive:
    TCPServerWrap (listening on [::]:3000, fd 20)
    Timeout x2 (next due in 2931ms)
```

If the main thread was executing JavaScript, its stack trace is printed instead.
Use `--report-on-process-timeout` to also generate a diagnostic report.

The process exits without emitting the `'beforeExit'` and `'exit'` events, as
the JavaScript code may be what keeps the process running. Code coverage and
profiles, such as those enabled with `NODE_V8_COVERAGE=dir` or
`--cpu-prof`, are still written.

If the main thread does not respond within two seconds, for example because it
is blocked in a synchronous operation such as `child_process.execSync()`,
Node.js exits immediately without printing the stack trace and resources.

This option is not allowed in `NODE_OPTIONS`, and it cannot be combined
with the options that enable the inspector, such as `--inspect`,
`--inspect-brk`, `--inspect-wait`, `--inspect-port`, and
`--inspect-publish-uid`, nor with `node inspect`, `--run`, or
`--build-snapshot`. While it is in effect, `inspector.open()` and
`session.connectToMainThread()` throw, and requests to activate the
inspector with `SIGUSR1` are ignored.

Child processes that inherit `process.execArgv`, such as those created with
`child_process.fork()`, apply the timeout from their own start. With
`--watch`, the timeout applies to each run of the application rather than
to the process that watches for changes. When
running tests from the command line, the test runner process applies the
timeout to the whole run, and each test file that runs in its own process
applies it as well.

### `--prof`

Generate V8 profiler output.

### `--prof-process`

Process V8 profiler output generated using the V8 option `--prof`.

### `--redirect-warnings=file`

Write process warnings to the given file instead of printing to stderr. The
file will be created if it does not exist, and will be appended to if it does.
If an error occurs while attempting to write the warning to the file, the
warning will be written to stderr instead.

The `file` name may be an absolute path. If it is not, the default directory it
will be written to is controlled by the
`--diagnostic-dir` command-line option.

### `--report-compact`

Write reports in a compact format, single-line JSON, more easily consumable
by log processing systems than the default multi-line format designed for
human consumption.

### `--report-dir=directory`, `--report-directory=directory`

Location at which the report will be generated.

### `--report-exclude-env`

When `--report-exclude-env` is passed the diagnostic report generated will not
contain the `environmentVariables` data.

### `--report-exclude-network`

Exclude `header.networkInterfaces` from the diagnostic report. By default
this is not set and the network interfaces are included.

### `--report-filename=filename`

Name of the file to which the report will be written.

If the filename is set to `'stdout'` or `'stderr'`, the report is written to
the stdout or stderr of the process respectively.

### `--report-on-fatalerror`

Enables the report to be triggered on fatal errors (internal errors within
the Node.js runtime such as out of memory) that lead to termination of the
application. Useful to inspect various diagnostic data elements such as heap,
stack, event loop state, resource consumption etc. to reason about the fatal
error.

### `--report-on-process-timeout`

> Stability: 1.1 - Active development

Enables the report to be generated when `--process-timeout` expires, in
addition to the summary printed to stderr. Useful to inspect the JavaScript
and native stacks, the event loop state, and resource consumption to reason
about why the process did not exit. Requires `--process-timeout`.

Worker threads that do not provide their part of the report within two
seconds, for example because they are blocked in a synchronous operation such
as `child_process.execSync()`, are left out of it.

### `--report-on-signal`

Enables report to be generated upon receiving the specified (or predefined)
signal to the running Node.js process. The signal to trigger the report is
specified through `--report-signal`.

### `--report-signal=signal`

Sets or resets the signal for report generation (not supported on Windows).
Default signal is `SIGUSR2`.

### `--report-uncaught-exception`

Enables report to be generated when the process exits due to an uncaught
exception. Useful when inspecting the JavaScript stack in conjunction with
native stack and other runtime environment data.

### `-r`, `--require module`

Preload the specified module at startup.

Follows `require()`'s module resolution
rules. `module` may be either a path to a file, or a node module name.

Modules preloaded with `--require` will run before modules preloaded with `--import`.

Modules are preloaded into the main thread as well as any worker threads,
forked processes, or clustered processes.

### `--run`

This runs a specified command from a package.json's `"scripts"` object.
If a missing `"command"` is provided, it will list the available scripts.

Passing `--run` without a command lists the available scripts and exits
with a non-zero exit code:

```console
$ node --run
Available scripts are:
  test: node --test
```

`--run` will traverse up to the root directory and finds a `package.json`
file to run the command from.

`--run` prepends `./node_modules/.bin` for each ancestor of
the current directory, to the `PATH` in order to execute the binaries from
different folders where multiple `node_modules` directories are present, if
`ancestor-folder/node_modules/.bin` is a directory.

`--run` executes the command in the directory containing the related `package.json`.

For example, the following command will run the `test` script of
the `package.json` in the current folder:

```console
$ node --run test
```

You can also pass arguments to the command. Any argument after `--` will
be appended to the script:

```console
$ node --run test -- --verbose
```

#### Intentional limitations

`node --run` is not meant to match the behaviors of `npm run` or of the `run`
commands of other package managers. The Node.js implementation is intentionally
more limited, in order to focus on top performance for the most common use
cases.
Some features of other `run` implementations that are intentionally excluded
are:

* Running `pre` or `post` scripts in addition to the specified script.
* Defining package manager-specific environment variables.

#### Environment variables

The following environment variables are set when running a script with `--run`:

* `NODE_RUN_SCRIPT_NAME`: The name of the script being run. For example, if
  `--run` is used to run `test`, the value of this variable will be `test`.
* `NODE_RUN_PACKAGE_JSON_PATH`: The path to the `package.json` that is being
  processed.

Environment variables loaded from a file with `--env-file` are not applied
to the command executed by `--run`.

### `--secure-heap-min=n`

When using `--secure-heap`, the `--secure-heap-min` flag specifies the
minimum allocation from the secure heap. The minimum value is `2`.
The maximum value is the lesser of `--secure-heap` or `2147483647`.
The value given must be a power of two.

### `--secure-heap=n`

Initializes an OpenSSL secure heap of `n` bytes. When initialized, the
secure heap is used for selected types of allocations within OpenSSL
during key generation and other operations. This is useful, for instance,
to prevent sensitive information from leaking due to pointer overruns
or underruns.

The secure heap is a fixed size and cannot be resized at runtime so,
if used, it is important to select a large enough heap to cover all
application uses.

The heap size given must be a power of two. Any value less than 2
will disable the secure heap.

The secure heap is disabled by default.

The secure heap is not available on Windows.

See `CRYPTO_secure_malloc_init` for more details.

### `--snapshot-blob=path`

> Stability: 1 - Experimental

When used with `--build-snapshot`, `--snapshot-blob` specifies the path
where the generated snapshot blob is written to. If not specified, the
generated blob is written to `snapshot.blob` in the current working directory.

When used without `--build-snapshot`, `--snapshot-blob` specifies the
path to the blob that is used to restore the application state.

When loading a snapshot, Node.js checks that:

1. The version, architecture, and platform of the running Node.js binary
   are exactly the same as that of the binary that generates the snapshot.
2. The V8 flags and CPU features are compatible with that of the binary
   that generates the snapshot.

If they don't match, Node.js refuses to load the snapshot and exits with
status code 1.

### `--test`

Starts the Node.js command line test runner. This flag cannot be combined with
`--watch-path`, `--check`, `--eval`, `--interactive`, or the inspector.
See the documentation on running tests from the command line
for more details.

### `--test-concurrency`

The maximum number of test files that the test runner CLI will execute
concurrently. If `--test-isolation` is set to `'none'`, this flag is ignored and
concurrency is one. Otherwise, concurrency defaults to
`os.availableParallelism() - 1`.

### `--test-coverage-branches=threshold`

> Stability: 1 - Experimental

Require a minimum percent of covered branches. If code coverage does not reach
the threshold specified, the process will exit with code `1`.

### `--test-coverage-exclude`

> Stability: 1 - Experimental

Excludes specific files from code coverage using a glob pattern, which can match
both absolute and relative file paths.

This option may be specified multiple times to exclude multiple glob patterns.

If both `--test-coverage-exclude` and `--test-coverage-include` are provided,
files must meet **both** criteria to be included in the coverage report.

By default all the matching test files are excluded from the coverage report.
Specifying this option will override the default behavior.

### `--test-coverage-functions=threshold`

> Stability: 1 - Experimental

Require a minimum percent of covered functions. If code coverage does not reach
the threshold specified, the process will exit with code `1`.

### `--test-coverage-include`

> Stability: 1 - Experimental

Includes specific files in code coverage using a glob pattern, which can match
both absolute and relative file paths.

This option may be specified multiple times to include multiple glob patterns.

If both `--test-coverage-exclude` and `--test-coverage-include` are provided,
files must meet **both** criteria to be included in the coverage report.

### `--test-coverage-include-all`

> Stability: 1 - Experimental

Includes source files that were never loaded by the test run in the coverage
report, where they are reported as having zero coverage.

Candidate files are searched for in the current working directory, and are
subject to the same `--test-coverage-include` and `--test-coverage-exclude`
filtering as the rest of the report.

### `--test-coverage-lines=threshold`

> Stability: 1 - Experimental

Require a minimum percent of covered lines. If code coverage does not reach
the threshold specified, the process will exit with code `1`.

### `--test-force-exit`

Configures the test runner to exit the process once all known tests have
finished executing even if the event loop would otherwise remain active.

### `--test-global-setup=module`

> Stability: 1.0 - Early development

Specify a module that will be evaluated before all tests are executed and
can be used to setup global state or fixtures for tests.

See the documentation on global setup and teardown for more details.

### `--test-isolation=mode`

Configures the type of test isolation used in the test runner. When `mode` is
`'process'`, each test file is run in a separate child process. When `mode` is
`'none'`, all test files run in the same process as the test runner. The default
isolation mode is `'process'`. This flag is ignored if the `--test` flag is not
present. See the test runner execution model section for more information.

### `--test-name-pattern`

A regular expression that configures the test runner to only execute tests
whose name matches the provided pattern. See the documentation on
filtering tests by name for more details.

If both `--test-name-pattern` and `--test-skip-pattern` are supplied,
tests must satisfy **both** requirements in order to be executed.

### `--test-only`

Configures the test runner to only execute top level tests that have the `only`
option set. This flag is not necessary when test isolation is disabled.

### `--test-random-seed`

Set the seed used to randomize test execution order. This applies to both test
file execution order and queued tests within each file. Providing this flag
enables randomization implicitly, even without `--test-randomize`.

The value must be an integer between `0` and `4294967295`.

This flag cannot be used with `--watch` or `--test-rerun-failures`.

### `--test-randomize`

Randomize test execution order. This applies to both test file execution order
and queued tests within each file. This can help detect tests that rely on
shared state or execution order.

The seed used for randomization is printed in the test summary and can be
reused with `--test-random-seed`.

For detailed behavior and examples, see
randomizing tests execution order.

This flag cannot be used with `--watch` or `--test-rerun-failures`.

### `--test-reporter`

A test reporter to use when running tests. See the documentation on
test reporters for more details.

### `--test-reporter-destination`

The destination for the corresponding test reporter. See the documentation on
test reporters for more details.

### `--test-rerun-failures`

A path to a file allowing the test runner to persist the state of the test
suite between runs. The test runner will use this file to determine which tests
have already succeeded or failed, allowing for re-running of failed tests
without having to re-run the entire test suite. The test runner will create this
file if it does not exist.
See the documentation on test reruns for more details.
