---
title: "Benchmark runner (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/bench.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Benchmark runner (part 2 of 3)

## `bench(name, fn)`

* `name` {string} The benchmark name. **Default:** The `name` property of `fn`,
  or `'<anonymous>'` when `fn` has no name.
* `options` {Object}
  * `diagnosticChannels` {Array} String diagnostics channel names, deduplicated
    and inherited from containing suites by union. Symbol values in the array
    are silently ignored. **Default:** `[]`.
  * `only` {boolean} When any benchmark or containing suite has `only` set,
    benchmarks without `only` in their hierarchy are skipped. **Default:**
    `false`.
  * `params` {Object} String, finite number, or boolean metadata identifying
    this benchmark configuration. Parameter keys are sorted when constructing
    the stable benchmark identity. **Default:** An empty object.
  * `samples` {number} The maximum number of measured callback invocations.
    Must be a positive 32-bit unsigned integer. The benchmark may finish earlier
    by calling `context.done()`. **Default:** `30`.
  * `signal` {AbortSignal} Allows aborting this benchmark.
  * `skip` {boolean|string} If truthy, the benchmark is skipped. A string is
    included in the result as the skip reason. **Default:** `false`.
  * `tags` {string\[]} Labels associated with the benchmark. Tags are
    lowercased, deduplicated, and inherited from containing suites by union.
    **Default:** `[]`.
  * `timeout` {number} The number of milliseconds after which the benchmark
    fails. **Default:** `Infinity`.
  * `warmup` {number} The number of unreported callback invocations before
    measured samples. Must be a 32-bit unsigned integer. **Default:** `10`.
* `fn` {Function|AsyncFunction} The benchmark function. It receives a
  {BenchContext}.
* Returns: {Promise} Fulfilled with the benchmark result after a top-level
  benchmark finishes, or with `undefined` immediately when declared in a
  suite.

Warmup invocations use the same callback and timing contract as measured
samples, but their samples are discarded. An exception, rejection, timeout,
abort, missing timing call, or duplicate timing call stops the current
benchmark. Later benchmarks continue to run.

After a timeout or abort, the runner briefly waits for asynchronous benchmark
work to settle before continuing. If it remains pending, all later benchmarks
that were selected to run fail without running so that their measurements
cannot overlap with that work.

For each warmup and measured callback, the runner subscribes to the configured
diagnostics channels. Each publication queues a context diagnostic whose
`message` is `{ name, message }`, containing the string channel name and the
published message. Subscriptions are removed when the callback settles or is
aborted.

A timeout or abort cannot interrupt synchronous JavaScript and does not forcibly
cancel asynchronous work that ignores `context.signal`.

The `benchId` is based on the declaration source file, hierarchical suite and
benchmark names, and canonicalized parameters. It is stable for repeated runs
from the same source location, but the embedded source value is not normalized
across checkout roots, module formats, operating systems, or path casing.

Execution scope is represented separately. A `runId` identifies one logical
run, while `fileRunId` identifies a file runner or child execution within that
run. The `entryFile` field records which entry-file import caused a declaration
and is `null` for declarations made by preload modules.
The same `benchId` can therefore occur under multiple `fileRunId` values when
entry files use a shared declaration helper. Declaring the same `benchId` more
than once within one file execution scope reports an error rather than merging
the samples.

### `bench.skip(name, fn)`

Shorthand for `bench(name, { ...options, skip: true }, fn)`.

### `bench.only(name, fn)`

Shorthand for `bench(name, { ...options, only: true }, fn)`.

## `suite(name, fn)`

* `name` {string} The suite name. **Default:** The `name` property of `fn`, or
  `'<anonymous>'` when `fn` has no name.
* `options` {Object}
  * `diagnosticChannels` {Array} String diagnostics channel names inherited by
    nested suites and benchmarks. Symbol values in the array are silently
    ignored. **Default:** `[]`.
  * `only` {boolean} Selects all benchmarks nested in this suite. **Default:**
    `false`.
  * `skip` {boolean|string} Skips all benchmarks nested in this suite.
    **Default:** `false`.
  * `tags` {string\[]} Labels inherited by nested suites and benchmarks.
    **Default:** `[]`.
* `fn` {Function|AsyncFunction} A function that declares nested suites,
  benchmarks, and hooks.
* Returns: {Promise} Fulfilled when a top-level suite finishes, or with
  `undefined` immediately when declared in another suite.

Suite functions run while declarations are collected. Promise-returning suite
functions are awaited before benchmark execution begins.

## `describe(name, fn)`

Alias for `suite()`.

## `before(fn)`

* `fn` {Function|AsyncFunction} The hook function.

Registers a hook that runs once before the benchmarks in the current suite.

## `after(fn)`

* `fn` {Function|AsyncFunction} The hook function.

Registers a hook that runs once after the benchmarks in the current suite.

## `beforeEach(fn)`

* `fn` {Function|AsyncFunction} The hook function. It receives an object with
  the benchmark's `name`, `params`, and `signal`.

Registers a hook that runs once before each complete logical benchmark in the
current suite. It does not run before every sample. Per-sample setup belongs in
the benchmark function before `context.start()` or `context.record()`.

## `afterEach(fn)`

* `fn` {Function|AsyncFunction} The hook function. It receives an object with
  the benchmark's `name`, `params`, and `signal`.

Registers a hook that runs once after each complete logical benchmark in the
current suite. It does not run after every sample. Per-sample cleanup belongs
in the benchmark function after `context.end()` or `context.record()`.

## `run([options])`

* `options` {Object}
  * `namePattern` {string|RegExp} Only runs benchmarks whose full hierarchical
    name matches the pattern. String values are interpreted as JavaScript
    regular expressions.
  * `samples` {number} Overrides the maximum number of measured callback
    invocations for every benchmark. Must be a positive 32-bit unsigned integer.
  * `signal` {AbortSignal} Allows aborting in-progress benchmark execution.
  * `warmup` {number} Overrides the number of unreported warmup callback
    invocations for every benchmark. Must be a 32-bit unsigned integer.
  * `yieldBetweenSamples` {boolean} Schedule an event loop turn between sample
    callbacks. **Default:** `true`, or the value passed to `createRunner()` for
    an explicit runner.
* Returns: {BenchmarksStream}

Returns the object-mode event stream for the in-process benchmark run. Call
`run()` during the same turn in which benchmarks are declared, before automatic
execution begins. Calling `run()` is optional when the returned stream is not
needed. An explicit runner created by `createRunner()` does not run
automatically, so its `run()` function may be called later.

If any benchmark fails, the process exit code is set to `1` once the run
finishes, unless `process.exitCode` has already been set.

```mjs
import { bench, run } from 'node:bench';

bench('example', { samples: 3 }, (b) => {
  b.start();
  doWork();
  b.end(1);
});

for await (const { type, data } of run()) {
  if (type === 'bench:complete' && data.error === undefined) {
    console.log(data.name, data.summary.mean);
  }
}
```

## `runFile(path[, options])`

* `path` {string|Buffer|URL} The path of one benchmark module.
* `options` {Object}
  * `env` {Object} The child process environment. Property values must be
    strings or `undefined`. This replaces, rather than extends, the parent
    environment. **Default:** A snapshot of `process.env`.
  * `execArgv` {string\[]} Node.js command-line options for the child process.
    This replaces, rather than extends, inherited options. Benchmark runner
    options, positional arguments, and options that select another execution
    mode are not allowed. **Default:** Compatible options inherited from the
    current process.
  * `signal` {AbortSignal} Terminates the child process when aborted.
* Returns: {BenchmarksStream}

Runs exactly one benchmark module in a fresh child process and returns its
object-mode event stream. A relative `path` is resolved from the current working
directory when `runFile()` is called. `path` is not interpreted as a glob.
Unless the signal is aborted or the stream is destroyed before startup, every
call uses a new child. Input discovery, ordering, concurrency, retries, and
multi-file scheduling remain the caller's responsibility.

When the Permission Model is enabled, the caller must have file system read
access to `path` and permission to create child processes.

Records use advanced child process serialization, preserving supported
structured values such as `bigint` and errors. Child writes to stdout and stderr
become `'bench:diagnostic'` records. A permission failure, module loading error,
abnormal child exit, or cancellation also emits an error diagnostic and produces
a terminal `'bench:summary'` whose `success` property is `false`; these execution
failures do not error the stream. If module evaluation fails after declaring
benchmarks, those declarations still run before the unsuccessful summary.

`env`, effective inherited options, and an explicitly provided `execArgv` are
copied when `runFile()` is called. The runner removes `NODE_OPTIONS`, replaces
IPC-related environment variables, and sets its private child-context, run
identity, and file identity variables, overriding properties with those names
in `env`. Pass child Node.js options through `execArgv`, not `NODE_OPTIONS`.
Standard `child_process` environment propagation still applies, including
`NODE_V8_COVERAGE`, permission-model options, and required z/OS variables.
Aborting `signal` before the child starts produces an `AbortError` diagnostic
without spawning it. Aborting during execution sends `SIGTERM` to the child and
escalates to `SIGKILL` if it does not exit. Destroying the returned stream
follows the same termination procedure.

## Class: `BenchContext`

An instance of `BenchContext` is passed to every benchmark invocation. A new
instance is created for every warmup and measured sample.

### `context.index`

* {number}

The zero-based invocation index within the current `context.phase`. Warmup and
measured samples have separate index sequences.

### `context.name`

* {string}

The benchmark name.

### `context.params`

* {Object}

The benchmark's canonicalized parameter metadata.

### `context.phase`

* {string}

The current sample phase. It is `'warmup'` for an unreported warmup invocation
and `'measurement'` for a measured invocation.

### `context.signal`

* {AbortSignal}

An abort signal that is triggered when the benchmark is aborted, times out, or
finishes.

### `context.start()`

Starts the measured region using `process.hrtime.bigint()`. Calling `start()`
more than once is an error.

### `context.end(operations[, options])`

* `operations` {number} The number of completed operations. Must be a positive
  safe integer.
* `options` {Object}
  * `detail` {any} Additional structured-cloneable sample data. With CLI process
    isolation, it must also be supported by advanced child process
    serialization.
* Returns: {Object} The sample's `operations`, `duration_ns`, computed `rate`,
  and optional cloned `detail`.

Ends the measured region. The end timestamp is captured before `operations` is
validated. Calling `end()` before `start()`, calling it more than once, or
recording a zero-duration sample is an error. When provided, `detail` is cloned
after the end timestamp is captured, so cloning time is outside the measured
region.

### `context.record(sample)`

* `sample` {Object}
  * `operations` {number} The number of completed operations. Must be a positive
    safe integer.
  * `duration_ns` {bigint} An externally measured positive duration in
    nanoseconds no greater than `Number.MAX_SAFE_INTEGER`.
  * `detail` {any} Additional structured-cloneable sample data. With CLI process
    isolation, it must also be supported by advanced child process
    serialization.
* Returns: {Object} The normalized sample, including its computed `rate` and
  optional cloned `detail`.

Records a measurement made by another clock or execution environment. This is
useful when a higher-level tool measures work in a worker and needs to exclude
message transport from the duration. `record()` is mutually exclusive with
`start()` and `end()` within one callback and must be called exactly once.

### `context.diagnostic(message[, options])`

* `message` {any} A structured-cloneable diagnostic value. With CLI process
  isolation, it must also be supported by advanced child process serialization.
* `options` {Object}
  * `level` {string} Either `'info'` or `'warning'`. **Default:** `'info'`.
  * `detail` {any} Additional structured-cloneable diagnostic data. With CLI
    process isolation, it must also be supported by advanced child process
    serialization.
* Returns: {undefined}

Queues a diagnostic associated with the current benchmark, phase, and sample
index. Multiple diagnostics preserve call order. They are emitted after the
sample callback settles and before that sample's `'bench:sample'` event. Warmup
diagnostics are emitted even though warmup samples are not. Diagnostics queued
before a callback failure are emitted before the failed `'bench:complete'`
event and do not themselves cause the benchmark to fail. If a timeout or abort
wins before the callback settles, queued diagnostics might not be emitted.

The message and detail are cloned synchronously. Options are also validated
synchronously. Calling `diagnostic()` between `context.start()` and
`context.end()` therefore includes that work in the measured duration. Invalid
arguments or an uncloneable message or detail violate the sample contract.

### `context.done()`

Requests successful benchmark completion after the current measured sample.
The callback must still call either `start()` and `end()`, or `record()`.
Calling `done()` during a warmup invocation is an error. The configured
`samples` value remains the maximum number of measured invocations if `done()`
is not called.
