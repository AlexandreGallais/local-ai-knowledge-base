---
title: "Benchmark runner (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/bench.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Benchmark runner

> Stability: 1.0 - Early Development

The `node:bench` module supports defining and running JavaScript benchmarks in
the current process, and running one benchmark file in a fresh child process.
The module is only available when Node.js is started with the
`--experimental-bench` flag and can only be imported with the `node:` scheme:

```mjs
import { bench, suite } from 'node:bench';
```

```cjs
const { bench, suite } = require('node:bench');
```

## Example benchmark

Save the following as `benchmark.mjs`:

```mjs
import { bench, suite } from 'node:bench';

suite('URL', () => {
  const input = 'https://example.com/a?b=c';

  bench('construct', {
    samples: 30,
    params: { input: 'short' },
  }, (b) => {
    const operations = 10_000;
    let totalLength = 0;

    b.start();
    for (let i = 0; i < operations; i++) {
      totalLength += new URL(input).href.length;
    }
    b.end(operations);

    if (totalLength !== operations * input.length) {
      throw new Error('Unexpected URL result');
    }
  });
});
```

Run the benchmark from the command line:

```console
node --experimental-bench --bench benchmark.mjs
```

Benchmarks are executed serially in declaration order. Declared benchmarks are
scheduled automatically. Call `run()` during the same turn as the declarations
to consume the event stream or configure filtering.
If a benchmark run started automatically or through the module-level `run()`
fails, the process exit code is set to `1` unless `process.exitCode` has
already been set. Runners created with `createRunner()` leave the exit code
to their caller.

## Measurement model

Each warmup and measured sample invokes the benchmark function once with a
fresh {BenchContext}. The function must either call `context.start()` and
`context.end(operations)` exactly once, or call `context.record(sample)` exactly
once to provide an externally measured sample. Setup before `start()` and
cleanup after `end()` are outside the measured region. Promise-returning
functions are awaited.

By default, ten unreported warmup invocations run before the measured samples
so that early samples are less likely to be taken before the measured code has
been optimized. A fixed warmup count does not guarantee a stable optimization
state; inspect raw `samples` and increase `warmup` when early samples are
consistently slower. Set `warmup` to `0` to measure from the first invocation.

By default, an event loop turn occurs between sample invocations. An embedded
runner can disable this using `yieldBetweenSamples`. The runner executes
benchmarks serially, but it does not provide process isolation. Other work in
the process, JIT compilation, garbage collection, CPU frequency changes, and
system load can all affect results. Keep raw samples when comparing results and
investigate noisy or skewed distributions rather than treating a confidence
interval as a pass/fail threshold.

### Measurement integrity

A statistically consistent result does not prove that a benchmark measured the
intended work. An optimizing runtime can remove work whose result is unused or
specialize it more narrowly than the workload being modeled. Framework and loop
overhead can also dominate operations that are too short. To reduce these risks:

* Make values produced by measured work observable outside the measured
  interval, for example by validating an aggregate derived from every result.
  Passing them only through unused local computations is insufficient.
* Perform enough operations in each sample to amortize fixed timer reads and
  calls to `context.start()` and `context.end()`. If loop bookkeeping is material
  relative to one operation, batch multiple operations per iteration and report
  the total operation count.
* Inspect raw `samples` for trends that indicate insufficient warmup or
  optimization tiering, pauses consistent with garbage collection, and
  multimodal distributions.
* Validate surprising results with an independent benchmark shape that performs
  the same intended work differently.

`node:bench` does not force a particular optimization state or infer whether an
engine eliminated work. Such controls and diagnostics are runtime-specific and
heuristic, and do not replace validating the benchmark workload.

### Dynamic sampling and variable batches

Calling `context.done()` during a measured sample completes the benchmark after
that sample. This allows a higher-level tool to treat `samples` as a maximum and
implement a dynamic sampling policy.

The number of operations can differ between samples. Summary statistics treat
each sample's `rate` as one equally weighted observation. In particular,
`summary.mean` is the arithmetic mean of the per-sample rates. It is not the
pooled throughput calculated as:

```text
1_000_000_000 * sum(sample.operations) / sum(sample.duration_ns)
```

The two values can differ when sample durations vary because pooled throughput
weights each per-sample rate by its duration. A higher-level tool that varies
batch sizes should choose the aggregation that matches its analysis. It can
calculate pooled throughput from the raw `samples`; operation counts should be
summed as `bigint` values because their total can exceed
`Number.MAX_SAFE_INTEGER` even though each count cannot.

### Comparing benchmark results

`node:bench` does not designate a benchmark as a baseline or produce a pass/fail
comparison between runs. It exposes raw samples, stable benchmark identities,
parameters, and tags so that comparison policy can remain in higher-level
tools. A tool can use `benchId` to match the same declaration and parameters
across compatible source layouts, and use a tag or its own metadata to identify
a baseline.

Comparison tools should retain the raw sample rates and verify that execution
plans and relevant environment details are comparable. The appropriate analysis
depends on the experimental design and distribution. For example, independent
samples might use Welch's t-test or a rank-based test, while observations that
were deliberately paired require paired analysis. Tools should also consider
effect sizes, uncertainty, and correction when testing multiple benchmarks.
The general-purpose {Histogram} statistics in `node:perf_hooks` can support such
analysis, but the runner does not select a method or significance threshold.

## Reusable runners

The module-level declaration functions use a shared runner and schedule it
automatically. Higher-level tools can create isolated, explicitly started
runners instead:

```mjs
import { createRunner } from 'node:bench';

const runner = createRunner({ yieldBetweenSamples: false });

runner.bench('example', { samples: 100 }, (b) => {
  const operations = chooseOperationCount();
  b.start();
  runOperations(operations);
  const sample = b.end(operations);

  if (hasEnoughData(sample)) b.done();
});

for await (const record of runner.run()) {
  // Consume structured benchmark records.
}
```

Each runner has independent declarations, hooks, filtering, and output. Unlike
the module-level declarations, creating a benchmark on an explicit runner does
not schedule execution. This allows packages to collect declarations and start
them later. Calling the explicit runner's `run()` function prevents additional
declarations and a second call to `run()` is an error.

## Command-line runner

The `--bench` flag runs one or more explicit benchmark files or glob patterns:

```console
node --experimental-bench --bench benchmark.mjs
node --experimental-bench --bench --bench-reporter=json 'benchmarks/**/*.js'
```

Files are sorted and executed serially. The default
`--bench-isolation=process` mode runs each file in a separate child process and
emits one aggregate summary. Structured events are transferred to the parent
without JSON conversion, preserving BigInt durations, errors, and parameter
values. Child writes to stdout and stderr are emitted as diagnostic records so
they do not corrupt reporter output.

`--bench-isolation=none` imports all files into the runner process. This mode
has lower startup overhead, but module, heap, and process state carry between
files, and user writes share stdout and stderr with reporters.

Worker-thread isolation is not a CLI mode. Each newly constructed {Worker} has a
separate V8 isolate, JavaScript heap, and event loop, typically with lower
startup cost than a child process. Reusing a worker preserves its module and heap
state. Workers also share libuv's process-wide thread pool and can share
process-global native or addon state, so they do not provide the same boundary
as process isolation.

Higher-level tools can experiment with worker isolation by loading benchmark
code inside a worker, measuring there, transferring structured sample data, and
passing it to `context.record()`. The reported `duration_ns` can exclude
message transport when the worker captures both timestamps. Tools should
identify worker modules and workloads explicitly. They should not stringify
arbitrary functions or closures to move them between isolates, because closures
cannot be reconstructed with their original lexical environment.

Benchmark files passed to `--bench` should declare benchmarks but must not call
`run()`. The CLI supports `--bench-name-pattern`, `--bench-samples`,
`--bench-warmup`, `--bench-reporter`, and `--bench-reporter-destination`. See
the command-line options documentation for details.

Preload modules passed through `--require` or `--import` should not declare
benchmarks. Such declarations are not associated with an entry file and have
an `entryFile` value of `null`. Their `fileRunId` identifies the runner or child
execution in which they occurred. With process isolation, a preload is evaluated
and its declarations run once for every benchmark child process.

## Benchmark reporters

The built-in reporters are available from the scheme-only
`node:bench/reporters` module:

```mjs
import { json, spec } from 'node:bench/reporters';
```

```cjs
const { json, spec } = require('node:bench/reporters');
```

Reporter values can be passed directly to `stream.compose()`:

```mjs
import { bench, run } from 'node:bench';
import { spec } from 'node:bench/reporters';
import process from 'node:process';

bench('example', (b) => {
  b.start();
  doWork();
  b.end(1);
});

run().compose(spec).pipe(process.stdout);
```

The `spec` reporter buffers results and outputs a concise table containing the
sample count, mean rate, 95% confidence interval for the mean, median rate, and
warnings. A coefficient of variation above 5% is reported as `noisy`, and an
absolute skewness above 1 is reported as `skewed`. The exact human-readable
format is subject to change.

The `json` reporter emits every lifecycle record as newline-delimited JSON.
BigInt values, including `duration_ns`, are encoded as decimal strings. Errors
are represented using their `name`, `message`, `stack`, `code`, `cause`, and
`errors` properties. As required by JSON, non-finite numbers are encoded as
`null`.

Custom reporters use the same composition contract. They can be transforms or
functions accepted by `stream.compose()`. The composed readable can be piped to
any writable destination:

```mjs
import { run } from 'node:bench';
import process from 'node:process';

async function* names(source) {
  for await (const { type, data } of source) {
    if (type === 'bench:complete') {
      yield `${data.name}\n`;
    }
  }
}

run().compose(names).pipe(process.stdout);
```

## `createRunner([options])`

* `options` {Object}
  * `yieldBetweenSamples` {boolean} Schedule an event loop turn between sample
    callbacks. Disabling this also prevents timer-based abort signals from
    firing between synchronous callbacks. Benchmark timeouts continue to be
    checked against a monotonic deadline. **Default:** `true`.
* Returns: {Object} An isolated benchmark runner with bound `after`, `afterEach`,
  `before`, `beforeEach`, `bench`, `describe`, `run`, and `suite` functions.

Creates an explicitly started benchmark runner. Declarations made through one
runner do not interact with declarations made through another runner or through
the module-level functions. Call the returned `run()` function to start the
runner and obtain its {BenchmarksStream}.

Each runner can be started once. Its `run()` function accepts the same options
as the module-level `run()`. `run({ yieldBetweenSamples })` overrides the
value passed to `createRunner()`. Unlike the module-level runner, a failed
benchmark in an explicit runner does not change the process exit code.
