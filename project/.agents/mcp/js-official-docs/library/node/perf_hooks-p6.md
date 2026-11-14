---
title: "Performance measurement APIs (part 6 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs (part 6 of 7)

### `histogram.qrde([options])`

* `options` {Object}
  * `bins` {number} The number of equal-probability density bins to return.
    Must be between 1 and 1000. Cannot be used with `probabilities`.
    **Default:** `100`.
  * `probabilities` {number\[]} Custom probability boundaries. The array must
    contain between 2 and 1001 strictly increasing values, start with `0`, and
    end with `1`. Cannot be used with `bins`.
  * `dequantize` {string} Controls whether repeated bucket values are spread
    deterministically over their equivalent-value ranges. May be `'none'`,
    `'hdr'`, or `'all'`. **Default:** `'hdr'`.
  * `cache` {boolean} When `true`, retains the expanded histogram snapshot for
    reuse by subsequent calls with `cache: true`. The snapshot is invalidated
    when the histogram is modified. **Default:** `false`.
* Returns: {Promise} Fulfills with an {Object} containing:
  * `probabilities` {Float64Array} The probability boundaries used by the
    estimate.
  * `quantiles` {Float64Array} The quantiles at the probability boundaries.
  * `densities` {Float64Array} The density within each quantile interval.
  * `count` {bigint} The number of values in the histogram snapshot.
  * `bucketCount` {number} The number of occupied HDR buckets.
  * `corrections` {number} The number of non-monotonic floating-point results
    that were clamped to the preceding quantile.
  * `dequantize` {string} The selected dequantization mode.

Returns a quantile-respectful density estimate based on the Harrell-Davis
quantile estimator. By default, `bins` generates equal probability boundaries.
The `probabilities` option can instead focus the estimate on regions such as
p90, p99, p99.9, and p99.99. The density for interval `i` contains probability
mass `probabilities[i + 1] - probabilities[i]`. The histogram is snapshotted
when the method is called. Snapshot expansion and the estimate are calculated
in the libuv thread pool. Highly concentrated beta weights use a second-order
asymptotic approximation to avoid numerical convergence loss at large sample
counts.

Setting `cache` to `true` avoids repeating snapshot capture and expansion when
several estimates are requested from an unchanged histogram. The retained
snapshot uses memory proportional to the number of occupied HDR buckets and is
released when the histogram is next modified.

QRDE temporarily uses approximately one additional HDR count array plus 32
bytes per occupied bucket. With `cache: true`, the expanded 32-byte-per-bucket
snapshot remains allocated. The following estimates use `lowest: 1` and
`highest: Number.MAX_SAFE_INTEGER` and exclude allocator and JavaScript object
overhead:

| `figures` | Histogram | Maximum expanded snapshot | Peak cache-miss QRDE |
| --------- | --------: | ------------------------: | -------------------: |
| 1         |   6.3 KiB |                    25 KiB |               31 KiB |
| 2         |    47 KiB |                   188 KiB |              235 KiB |
| 3         |   352 KiB |                   1.4 MiB |              1.7 MiB |
| 4         |   5.0 MiB |                    20 MiB |               25 MiB |
| 5         |    37 MiB |                   148 MiB |              185 MiB |

The maximum snapshot column assumes every representable bucket is occupied.
Lower `highest` values reduce histogram and temporary copy sizes. Concurrent
calls that miss the cache each require their own temporary copy and expanded
snapshot.

HDR histograms aggregate observations into equivalent-value buckets. The
`'hdr'` dequantization mode models repeated values in buckets wider than one
unit as a continuous uniform distribution over the bucket resolution. This
reduces density artifacts introduced by HDR quantization while preserving
repeated unit-resolution values as point masses. The `'all'` mode also
dequantizes repeated unit-resolution values. Use `'none'` to calculate the
grouped Harrell-Davis estimator using bucket midpoints directly.

An empty histogram returns the requested `probabilities` but produces empty
`quantiles` and `densities` arrays. A non-dequantized interval whose quantile
boundaries are equal has an infinite density.

### `histogram.reset()`

Resets the collected histogram data and increments `histogram.resetCount`.

### `histogram.resetCount`

* Type: {number}

The number of times values have been removed from this histogram by `reset()`
or, for a {RecordableHistogram}, `subtract()`. A snapshot has the `resetCount`
of its source at the time it was taken, so comparing the `resetCount` of two
snapshots shows whether the source was reset between them. See
`histogram.diff()`.

### `histogram.skewness`

* Type: {number}

The skewness of the recorded values. Measures the asymmetry of the
distribution. A positive value indicates a right-skewed distribution
(longer right tail, common for latency data); a negative value
indicates a left-skewed distribution.

### `histogram.snapshot()`

* Returns: {Histogram}

Returns a new, independent {Histogram} containing a copy of this histogram's
current state: its configuration, recorded values, `exceeds` count, and EWMA
state. Values recorded into this histogram after this method returns, and later
calls to `reset()`, do not change the returned histogram. This provides a stable
view of a histogram that is still recording, such as an enabled {ELDHistogram}.

Values cannot be recorded into the returned histogram. Taking a snapshot copies
every bucket, so both its time and memory cost depend on the histogram's
`lowest`, `highest`, and `figures` configuration rather than on the number of
recorded values.

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');

const histogram = monitorEventLoopDelay();
histogram.enable();

setTimeout(() => {
  const snapshot = histogram.snapshot();
  console.log(snapshot.percentile(99));
  histogram.disable();
}, 1000);
```

### `histogram.stddev`

* Type: {number}

The standard deviation of the recorded event loop delays.

### `histogram.welchTest(other[, options])`

* `other` {Histogram} The histogram to compare against.
* `options` {Object}
  * `confidence` {number} Confidence level for the interval, between 0 and 1.
    **Default:** `0.95`.
* Returns: {Object}
  * `tStatistic` {number} The Welch t-statistic.
  * `degreesOfFreedom` {number} Welch-Satterthwaite degrees of freedom.
  * `pValue` {number} Two-tailed p-value.
  * `confidenceInterval` {Object}
    * `lower` {number} Lower bound of the confidence interval on the
      difference of means.
    * `upper` {number} Upper bound.

Performs Welch's t-test comparing the means of this histogram and `other`.
The p-value indicates the probability of observing a difference at least this
extreme under the null hypothesis that the two distributions have the same
mean. Both histograms must have at least 2 recorded values; otherwise the
result has `pValue` 1 and `tStatistic` 0.

## Class: `ELDHistogram extends Histogram`

A `Histogram` that records event loop delay, returned by
`perf_hooks.monitorEventLoopDelay()`.

### `histogram.disable()`

* Returns: {boolean}

Disables event loop delay sampling. Returns `true` if sampling was
stopped, `false` if it was already stopped.

### `histogram.enable()`

* Returns: {boolean}

Enables event loop delay sampling. Returns `true` if sampling was
started, `false` if it was already started.

### `histogramSymbol.dispose`

Disables event loop delay sampling when the histogram is disposed.

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');
{
  using hist = monitorEventLoopDelay({ resolution: 20 });
  hist.enable();
  // The histogram will be disabled when the block is exited.
}
```

### Cloning an `ELDHistogram`

{ELDHistogram} instances can be cloned via {MessagePort}. On the receiving end,
the histogram is cloned as a plain {Histogram} object that does not implement
the `enable()` and `disable()` methods.

## Class: `RecordableHistogram extends Histogram`

### `histogram.add(other)`

* `other` {RecordableHistogram}

Adds the values from `other` to this histogram.

### `histogram.record(val)`

* `val` {number|bigint} The amount to record in the histogram. Must be an
  integer greater than or equal to `0`.

Values smaller than the histogram's `lowest` option, including `0`, might not
be distinguishable from each other.

### `histogram.recordDelta()`

Calculates the amount of time (in nanoseconds) that has passed since the
previous call to `recordDelta()` and records that amount in the histogram.

### `histogram.recordCorrected(val, expectedInterval)`

* `val` {number|bigint} The value to record. Must be an integer greater than or
  equal to `0`.
* `expectedInterval` {number|bigint} The expected recording interval.

Records a value with coordinated omission correction. When a system stall
prevents timely recording, this method backfills intermediate values at
`expectedInterval` steps between the previously recorded value and `val`.
This compensates for measurement gaps that would otherwise underrepresent
latency.

### `histogram.subtract(other)`

* `other` {RecordableHistogram}

Subtracts the values of `other` from this histogram. Both histograms should
have compatible configurations. Bucket counts that would become negative
are clamped to zero. Increments `histogram.resetCount`.

## Class: `SlidingWindowHistogram`

Records values into a lazily rotated ring of histogram chunks. Instances are
created using `perf_hooks.createSlidingWindowHistogram()` and cannot be
constructed directly. A `SlidingWindowHistogram` does not extend {Histogram};
call `snapshot()` to materialize the current window as a {Histogram}.

`SlidingWindowHistogram` instances cannot be cloned or transferred through a
{MessagePort}.

### `slidingWindowHistogram.record(val)`

* `val` {number|bigint} The amount to record. Must be an integer greater than or
  equal to `0`.

Records `val` in the current chunk. For a count-based window, every call that
reaches the native histogram counts toward rotation, including values which
exceed the configured `highest` value.

### `slidingWindowHistogram.reset()`

Invalidates all chunks in the current window. Allocated chunks are reset
lazily when reused.

### `slidingWindowHistogram.snapshot()`

* Returns: {Histogram}

Materializes the current window as a new, independent {Histogram}. Values
recorded or expired after this method returns do not change the returned
histogram. Materialization allocates one histogram and merges every retained
chunk.
