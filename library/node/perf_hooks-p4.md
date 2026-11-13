---
title: "Performance measurement APIs (part 4 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs (part 4 of 7)

## `perf_hooks.createHistogram([options])`

* `options` {Object}
  * `lowest` {number|bigint} The lowest discernible value. Must be an integer
    value greater than 0. **Default:** `1`.
  * `highest` {number|bigint} The highest recordable value. Must be an integer
    value that is equal to or greater than two times `lowest`.
    **Default:** `Number.MAX_SAFE_INTEGER`.
  * `figures` {number} The number of accuracy digits. Must be a number between
    `1` and `5`. **Default:** `3`.
  * `halfLife` {number} The EWMA half-life in number of samples. When set to
    a value greater than 0, the histogram tracks an exponentially weighted
    moving average and standard deviation, accessible via
    `histogram.ewmaMean` and `histogram.ewmaStddev`. After `halfLife`
    recordings, a value's influence has decayed to 50%. **Default:** `0`
    (disabled).
  * `threshold` {number} An SLO threshold value. When set together with
    `halfLife`, the histogram tracks a smoothed error rate for values
    exceeding this threshold, accessible via `histogram.ewmaErrorRate` and
    `histogram.burnRate()`. **Default:** `0` (disabled).
* Returns: {RecordableHistogram}

Returns a {RecordableHistogram}.

## `perf_hooks.createSlidingWindowHistogram(options)`

* `options` {Object}
  * `chunks` {number} The number of histogram chunks retained. Must be an
    integer between `1` and `1024`.
  * `chunkDuration` {number} The duration of each chunk in milliseconds. Must
    be an integer between `1` and `18_446_744_073_709`. Exactly one of
    `chunkDuration` and `recordsPerChunk` must be specified.
  * `recordsPerChunk` {number} The number of calls to `record()` assigned to
    each chunk. Must be an integer between `1` and `Number.MAX_SAFE_INTEGER`.
    Exactly one of `chunkDuration` and `recordsPerChunk` must be specified.
  * `lowest` {number|bigint} The lowest discernible value. Must be an integer
    value greater than `0`. **Default:** `1`.
  * `highest` {number|bigint} The highest recordable value. Must be an integer
    value that is equal to or greater than two times `lowest`.
    **Default:** `Number.MAX_SAFE_INTEGER`.
  * `figures` {number} The number of accuracy digits. Must be an integer between
    `1` and `5`. **Default:** `3`.
* Returns: {SlidingWindowHistogram}

Creates a {SlidingWindowHistogram} that retains the latest `chunks` histogram
chunks. Rotation is lazy and does not create a timer. Time-based rotation is
evaluated when `record()` or `snapshot()` is called. Count-based rotation is
evaluated when `record()` is called.

One histogram chunk is allocated during construction. Additional chunks are
allocated lazily. The maximum native memory used by the window scales with
`chunks` and with the `lowest`, `highest`, and `figures` histogram options.

The window boundary has chunk-level precision. With `N` chunks of duration
`D`, a recorded value is retained for between `(N - 1) * D` and `N * D`
milliseconds. Once a count-based window is populated, it retains between
`(N - 1) * C + 1` and `N * C` recording attempts, where `C` is
`recordsPerChunk`. Recording attempts which exceed `highest` are included when
determining count-based rotation.

```js
const { createSlidingWindowHistogram } = require('node:perf_hooks');

const window = createSlidingWindowHistogram({
  chunks: 6,
  chunkDuration: 10_000,
});

window.record(20_000_000);

// Materialize the current window as an independent Histogram.
const snapshot = window.snapshot();
console.log(snapshot.percentile(99));
```

## `perf_hooks.importHistogram(data)`

* `data` {Uint8Array} A CBOR-encoded histogram previously produced by
  `histogram.export()`.
* Returns: {RecordableHistogram}

Reconstructs a histogram from a CBOR-encoded `Uint8Array`. The returned
histogram is a full {RecordableHistogram} with all bucket data, configuration,
and EWMA state restored. New values can be recorded into it.

Data in any format version produced by `histogram.export()` can be
imported. See histogram export format compatibility for details.

```js
const { createHistogram, importHistogram } = require('node:perf_hooks');

const h = createHistogram();
for (let i = 1; i <= 1000; i++) h.record(i);

// Serialize and reconstruct
const data = h.export();
const h2 = importHistogram(data);

console.log(h2.count);          // 1000
console.log(h2.percentile(99)); // Same as h.percentile(99)
```

## `perf_hooks.eventLoopUtilization([utilization1[, utilization2]])`

* `utilization1` {Object} The result of a previous call to
  `eventLoopUtilization()`.
* `utilization2` {Object} The result of a previous call to
  `eventLoopUtilization()` prior to `utilization1`.
* Returns: {Object}
  * `idle` {number}
  * `active` {number}
  * `utilization` {number}

The `eventLoopUtilization()` function returns an object that contains the
cumulative duration of time the event loop has been both idle and active as a
high resolution milliseconds timer. The `utilization` value is the calculated
Event Loop Utilization (ELU).

If bootstrapping has not yet finished on the main thread the properties have
the value of `0`. The ELU is immediately available on Worker threads since
bootstrap happens within the event loop.

Both `utilization1` and `utilization2` are optional parameters.

If `utilization1` is passed, then the delta between the current call's `active`
and `idle` times, as well as the corresponding `utilization` value are
calculated and returned (similar to `process.hrtime()`).

If `utilization1` and `utilization2` are both passed, then the delta is
calculated between the two arguments. This is a convenience option because,
unlike `process.hrtime()`, calculating the ELU is more complex than a
single subtraction.

ELU is similar to CPU utilization, except that it only measures event loop
statistics and not CPU usage. It represents the percentage of time the event
loop has spent outside the event loop's event provider (e.g. `epoll_wait`).
No other CPU idle time is taken into consideration. The following is an example
of how a mostly idle process will have a high ELU.

```mjs
import { eventLoopUtilization } from 'node:perf_hooks';
import { spawnSync } from 'node:child_process';

setImmediate(() => {
  const elu = eventLoopUtilization();
  spawnSync('sleep', ['5']);
  console.log(eventLoopUtilization(elu).utilization);
});
```

```cjs
const { eventLoopUtilization } = require('node:perf_hooks');
const { spawnSync } = require('node:child_process');

setImmediate(() => {
  const elu = eventLoopUtilization();
  spawnSync('sleep', ['5']);
  console.log(eventLoopUtilization(elu).utilization);
});
```

Although the CPU is mostly idle while running this script, the value of
`utilization` is `1`. This is because the call to
`child_process.spawnSync()` blocks the event loop from proceeding.

Passing in a user-defined object instead of the result of a previous call to
`eventLoopUtilization()` will lead to undefined behavior. The return values
are not guaranteed to reflect any correct state of the event loop.

## `perf_hooks.monitorEventLoopDelay([options])`

* `options` {Object}
  * `samplePerIteration` {boolean} When `true`, samples are taken once per
    event loop iteration. **Default:** `false`.
  * `resolution` {number} The sampling rate in milliseconds for interval-based
    sampling. Must be greater than zero. This option is ignored when
    `samplePerIteration` is `true`. **Default:** `10`.
  * `lowest` {number|bigint} The lowest discernible delay, in nanoseconds. Must
    be an integer value greater than `0`. **Default:** `1` when
    `samplePerIteration` is `true`, otherwise `1000`.
  * `highest` {number|bigint} The highest recordable delay, in nanoseconds.
    Must be an integer value that is equal to or greater than two times
    `lowest`. **Default:** `2n ** 63n - 1n`.
  * `figures` {number} The number of accuracy digits. Must be an integer
    between `1` and `5`. **Default:** `3`.
* Returns: {ELDHistogram}

_This property is an extension by Node.js. It is not available in Web browsers._

Creates a histogram object that samples and reports the event loop delay over
time. The delays will be reported in nanoseconds.

By default, the histogram is updated by a timer using the configured
`resolution`. When `samplePerIteration` is `true`, samples are taken once per
event loop iteration using `uv_prepare_t` and `uv_check_t` hooks. In that mode,
the histogram does not keep the loop alive or force additional iterations when
the application is idle.
The two sampling modes produce significantly different results and should not
be compared directly.

The `lowest`, `highest`, and `figures` options configure the histogram as they
do for `perf_hooks.createHistogram()`. `lowest` must be greater than `0`
because an event loop delay of zero is not possible: the event loop has a
minimal overhead, and the measurement itself depends on the event loop turning.
Delays greater than `highest` are not recorded, and are counted by
`histogram.exceeds` instead. With interval-based sampling, every sample
includes the `resolution`, so `highest` should be well above
`resolution * 1e6`. The histogram's memory use depends on these options, not
on the number of samples.

```mjs
import { monitorEventLoopDelay } from 'node:perf_hooks';

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();
// Do something.
h.disable();
console.log(h.min);
console.log(h.max);
console.log(h.mean);
console.log(h.stddev);
console.log(h.percentiles);
console.log(h.percentile(50));
console.log(h.percentile(99));
```

```cjs
const { monitorEventLoopDelay } = require('node:perf_hooks');
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();
// Do something.
h.disable();
console.log(h.min);
console.log(h.max);
console.log(h.mean);
console.log(h.stddev);
console.log(h.percentiles);
console.log(h.percentile(50));
console.log(h.percentile(99));
```

## `perf_hooks.timerify(fn[, options])`

* `fn` {Function}
* `options` {Object}
  * `histogram` {RecordableHistogram} A histogram object created using
    `perf_hooks.createHistogram()` that will record runtime durations in
    nanoseconds.

_This property is an extension by Node.js. It is not available in Web browsers._

Wraps a function within a new function that measures the running time of the
wrapped function. A `PerformanceObserver` must be subscribed to the `'function'`
event type in order for the timing details to be accessed.

```mjs
import { timerify, performance, PerformanceObserver } from 'node:perf_hooks';

function someFunction() {
  console.log('hello world');
}

const wrapped = timerify(someFunction);

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);

  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// A performance timeline entry will be created
wrapped();
```

```cjs
const {
  timerify,
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

function someFunction() {
  console.log('hello world');
}

const wrapped = timerify(someFunction);

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);

  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// A performance timeline entry will be created
wrapped();
```

If the wrapped function returns a promise, a finally handler will be attached
to the promise and the duration will be reported once the finally handler is
invoked.
