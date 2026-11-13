---
title: "Performance measurement APIs (part 5 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs (part 5 of 7)

## Class: `Histogram`

### `histogram.burnRate(sloTarget)`

* `sloTarget` {number} The SLO target as a fraction between 0 and 1
  (exclusive). For example, `0.999` for a 99.9% SLO.
* Returns: {number}

Returns the SLO burn rate: `ewmaErrorRate / (1 - sloTarget)`. A burn rate
of 1 means the error budget will be exactly exhausted over the SLO window.
A burn rate greater than 1 means it is being consumed faster than allowed.
Requires the histogram to have been created with both `halfLife` and
`threshold` options.

```js
const { createHistogram } = require('node:perf_hooks');

// Track latency with a 200ms SLO threshold, half-life of 100 samples
const h = createHistogram({ halfLife: 100, threshold: 200_000_000 });

// ... record latency values ...

// Check burn rate against a 99.9% SLO
const rate = h.burnRate(0.999);
if (rate > 1) {
  console.log(`SLO burn rate: ${rate.toFixed(2)}x — error budget depleting`);
}
```

### `histogram.count`

* Type: {number}

The number of samples recorded by the histogram.

### `histogram.countBigInt`

* Type: {bigint}

The number of samples recorded by the histogram.

### `histogram.ccdf(value)`

* `value` {number} The value to query.
* Returns: {number} A probability between 0.0 and 1.0.

Returns the complementary cumulative distribution function (CCDF) value
for the given value, representing the probability that a recorded value
will exceed `value`. Equivalent to `1 - histogram.cdf(value)`.

### `histogram.cdf(value)`

* `value` {number} The value to query.
* Returns: {number} A probability between 0.0 and 1.0.

Returns the cumulative distribution function (CDF) value for the given
value, representing the probability that a recorded value will be less
than or equal to `value`. This is the inverse operation of
`histogram.percentile()`.

### `histogram.cliffsD(other)`

* `other` {Histogram} The histogram to compare against.
* Returns: {number} A value between -1.0 and 1.0.

Computes Cliff's delta, a non-parametric effect size measure. Returns
the probability that a random value from this histogram exceeds a random
value from `other`, minus the reverse probability. A value of 1 means every
value in this histogram exceeds every value in `other`; -1 means the
opposite; 0 means no tendency in either direction.

### `histogram.cohensD(other)`

* `other` {Histogram} The histogram to compare against.
* Returns: {number} The effect size.

Computes Cohen's d effect size, the standardized difference between the
means of this histogram and `other`, using the pooled standard deviation.
Positive values indicate this histogram has a higher mean. By convention,
|d| < 0.2 is a small effect, 0.5 is medium, and 0.8 or greater is large.
Both histograms must have at least 2 recorded values; otherwise returns 0.

### `histogram.countAt(value)`

* `value` {number} The value to query.
* Returns: {number}

Returns the number of recorded values that fall within the equivalent
value range of the given value.

### `histogram.diff(other)`

* `other` {Histogram} An earlier snapshot of this histogram.
* Returns: {Histogram}

Returns a new {Histogram} containing the values recorded in this histogram after
`other` was taken. Neither histogram is changed. To get the values recorded
during each interval without calling `reset()`, compute each difference from a
snapshot and keep that snapshot as the baseline for the next interval:

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');

const histogram = monitorEventLoopDelay();
histogram.enable();
let previous = histogram.snapshot();

setInterval(() => {
  const current = histogram.snapshot();
  // After a reset, use everything recorded since the reset.
  const delta = current.resetCount === previous.resetCount ?
    current.diff(previous) : current;
  console.log(delta.percentile(99));
  previous = current;
}, 10_000);
```

The `count`, `exceeds`, and bucket counts of the returned histogram are the
differences between the two histograms. Its `min` and `max` are computed from
the buckets of the difference, it has no EWMA state, and its `resetCount` is
`0`.

This method throws:

* `ERR_INVALID_ARG_VALUE` if `other` has a different `lowest`, `highest`, or
  `figures` configuration.
* `ERR_INVALID_STATE` if values have been removed from this histogram since
  `other` was taken, which is the case when the `resetCount` of the two
  histograms differs.
* `ERR_INVALID_ARG_VALUE` if `other` contains values that are not in this
  histogram, for example because the histograms were passed in the wrong order.

### `histogram.exceeds`

* Type: {number}

The number of values that were not recorded because they exceeded the
histogram's highest recordable value.

### `histogram.exceedsBigInt`

* Type: {bigint}

The number of values that were not recorded because they exceeded the
histogram's highest recordable value.

### `histogram.export()`

* Returns: {Uint8Array}

Serializes the histogram to a CBOR-encoded (RFC 8949) `Uint8Array`
suitable for transmission or persistent storage. The encoding uses a
delta-encoded sparse representation of the bucket counts, so the output size
scales with the number of distinct recorded values rather than the total
bucket count.

The output includes all histogram configuration, bucket data, and EWMA
state (when enabled). It can be reconstructed into a new histogram using
`perf_hooks.importHistogram()`.

The CBOR payload is a map with integer keys:

| Key | Type    | Field                                         |
| --- | ------- | --------------------------------------------- |
| 0   | uint    | Format version (currently 2)                  |
| 1   | uint    | Lowest discernible value                      |
| 2   | uint    | Highest trackable value                       |
| 3   | uint    | Significant figures                           |
| 4   | uint    | Total count                                   |
| 5   | uint    | Min value                                     |
| 6   | uint    | Max value                                     |
| 7   | uint    | Normalizing index offset                      |
| 8   | float64 | Conversion ratio                              |
| 9   | uint    | Counts array length                           |
| 10  | array   | Delta-encoded sparse counts `[delta, c, ...]` |
| 11  | map     | EWMA state (omitted when disabled)            |

Any standard CBOR decoder can parse the output.

#### Histogram export format compatibility

`perf_hooks.importHistogram()` accepts every format version that
`histogram.export()` has produced:

* Version 1 was produced by Node.js v26.9.0. Data with a version 1 key, or
  without a version key, is imported with the original semantics: keys
  that are not listed above are rejected.
* Version 2 has the same layout as version 1. Keys that are not recognized
  are ignored, so later versions of Node.js can add fields to version 2
  data without changing the version, and the data remains importable.

Data with any other version is rejected.

When the total count, min, or max value is absent, it is derived from the
bucket counts. A total count that is present must match the bucket counts.

### `histogram.ewmaMean`

* Type: {number}

The exponentially weighted moving average of recorded values. Only active
when the histogram was created with a `halfLife` option greater than 0.
Returns `0` when EWMA is disabled or no values have been recorded.

### `histogram.ewmaStddev`

* Type: {number}

The exponentially weighted moving standard deviation. Only active when the
histogram was created with a `halfLife` option greater than 0. Returns `0`
when EWMA is disabled or no values have been recorded.

### `histogram.ewmaErrorRate`

* Type: {number}

The EWMA-smoothed probability of a recorded value exceeding the configured
`threshold`. Only active when the histogram was created with both `halfLife`
and `threshold` options. Returns `0` when not enabled or no values have been
recorded.

### `histogram.ksTest(other)`

* `other` {Histogram} The histogram to compare against.
* Returns: {number} The KS D-statistic, between 0.0 and 1.0.

Computes the Kolmogorov-Smirnov test statistic comparing this histogram's
distribution to `other`. A value of 0 indicates identical distributions;
values close to 1 indicate completely disjoint distributions. Useful for
detecting performance regressions by comparing before/after histograms.

### `histogram.kurtosis`

* Type: {number}

The excess kurtosis of the recorded values. Measures the heaviness of the
distribution's tails relative to a normal distribution. Positive values
indicate heavier tails (more extreme outliers); negative values indicate
lighter tails.

### `histogram.linearBuckets(stepSize)`

* `stepSize` {number} The width of each linear bucket.
* Returns: {Map} A map of bucket boundary values to counts.

Returns the histogram data rebucketed into linearly-spaced intervals
of `stepSize`. Useful for visualization and export.

### `histogram.logBuckets(firstBucket, base)`

* `firstBucket` {number} The value of the first bucket boundary.
* `base` {number} The logarithmic base for bucket width growth. Must be > 1.
* Returns: {Map} A map of bucket boundary values to counts.

Returns the histogram data rebucketed into logarithmically-spaced
intervals, where each bucket's width is multiplied by `base`.
Useful for visualization and export.

### `histogram.mannWhitneyTest(other)`

* `other` {Histogram} The histogram to compare against.
* Returns: {Object}
  * `uStatistic` {number} The Mann-Whitney U statistic.
  * `zScore` {number} The z-score (normal approximation).
  * `pValue` {number} Two-tailed p-value.

Performs a Mann-Whitney U test comparing whether this histogram tends to
produce larger or smaller values than `other`. Unlike `welchTest()`, this is a
non-parametric test that makes no assumptions about the shape of the
distributions. Uses the normal approximation with tie correction for the
p-value.

### `histogram.max`

* Type: {number}

The maximum recorded event loop delay.

### `histogram.maxBigInt`

* Type: {bigint}

The maximum recorded event loop delay.

### `histogram.mean`

* Type: {number}

The mean of the recorded event loop delays.

### `histogram.meanCI([options])`

* `options` {Object}
  * `confidence` {number} The confidence level for the interval, between
    0 and 1 (exclusive). **Default:** `0.95`.
* Returns: {Object}
  * `mean` {number} The mean estimate, equivalent to `histogram.mean`.
  * `lower` {number} The lower bound of the confidence interval.
  * `upper` {number} The upper bound of the confidence interval.

Returns a two-sided confidence interval for the mean using Student's
t-distribution and the sample standard error. A higher confidence level
produces a wider interval. This interval assumes that samples are independent
and approximately normally distributed, although the approximation is robust
for sufficiently large samples.

The result reflects the histogram's configured precision and is calculated
from the values represented by its buckets. With fewer than two recorded
values, `lower` and `upper` are `NaN`. When all recorded values are equal,
`lower` and `upper` equal `mean`.

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();
for (let i = 1; i <= 100; i++) h.record(i);

const { mean, lower, upper } = h.meanCI();
console.log(`mean=${mean}, 95% CI=[${lower}, ${upper}]`);
```

### `histogram.min`

* Type: {number}

The minimum recorded event loop delay.

### `histogram.minBigInt`

* Type: {bigint}

The minimum recorded event loop delay.

### `histogram.percentile(percentile)`

* `percentile` {number} A percentile value in the range (0, 100].
* Returns: {number}

Returns the value at the given percentile.

### `histogram.percentileBigInt(percentile)`

* `percentile` {number} A percentile value in the range (0, 100].
* Returns: {bigint}

Returns the value at the given percentile.

### `histogram.percentileCI(percentile[, options])`

* `percentile` {number} A percentile value in the range (0, 100].
* `options` {Object}
  * `confidence` {number} The confidence level for the interval, between
    0 and 1 (exclusive). **Default:** `0.95`.
* Returns: {Object}
  * `value` {number} The point estimate (same as `histogram.percentile()`).
  * `lower` {number} The lower bound of the confidence interval.
  * `upper` {number} The upper bound of the confidence interval.

Returns a confidence interval for the given percentile using the exact
binomial method. With fewer samples, the interval will be wider, reflecting
the greater uncertainty in the percentile estimate. Requires at least 2
recorded values; with fewer than 2, `lower` and `upper` will equal `value`.

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();
for (let i = 0; i < 1000; i++) {
  h.record(Math.floor(Math.random() * 100));
}

const ci = h.percentileCI(99);
console.log(ci.value);  // The p99 point estimate
console.log(ci.lower);  // The lower bound (95% confidence)
console.log(ci.upper);  // The upper bound (95% confidence)
```

### `histogram.percentiles`

* Type: {Map}

Returns a `Map` object detailing the accumulated percentile distribution.

### `histogram.percentilesBigInt`

* Type: {Map}

Returns a `Map` object detailing the accumulated percentile distribution.

### `histogram.percentilesAt(percentiles)`

* `percentiles` {number\[]} An array of percentile values in the range (0, 100].
* Returns: {Map} A map of percentile values to their corresponding histogram
  values.

Returns the values at the specified percentiles, computed in a single
efficient pass over the histogram data. More efficient than calling
`histogram.percentile()` multiple times.
