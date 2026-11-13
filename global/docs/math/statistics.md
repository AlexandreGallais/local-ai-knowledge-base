---
id: statistics
title: "Statistics of a list of values"
topic: math
summary: "Compensated sum, mean, median, variance and standard deviation, running statistics, moving average."
tool: javascript
version: "ES2025"
checked: 2026-11-13
sources: [S3, S15, S29, S30, S31, S32]
license: MIT, written for this base; facts from the sources below
---

# Statistics of a list of values

Contents: Add many values · Mean · Median · Variance and standard deviation · Statistics of a stream of values · Moving average · Sources

## 1. Add many values

Formula: compensated sum: keep the rounding error of each addition and subtract it from the next value.

Example: ten times `0.1` added in a loop gives `0.9999999999999999`. `sumCompensated` gives `1`.

Pitfall: `Math.sumPrecise` does not exist at the project versions. `sumCompensated([1e20, 0.1, -1e20])` gives `0`: it cannot repair values of very different sizes.

Kit: `sumCompensated` in `kit/math/sum-compensated.ts`. Sources: [S3] [S15] [E]

## 2. Mean

Formula: mean = sum / count.

Example: `mean([1, 2, 3, 4])` gives `2.5`.

Pitfall: An empty list has no mean. The function throws `RangeError`: do not return 0.

Kit: `mean` in `kit/math/mean.ts`. Sources: [S30] [E]

## 3. Median

Formula: sort a copy. Odd count: the middle value. Even count: the mean of the two middle values.

Example: `median([4, 1, 3, 2])` gives `2.5`. `median([1, 2, 3, 4, 100])` gives `3`, and the mean of the same list is `22`.

Pitfall: Sort with a comparator, on a copy. Use the median when a few values are far from the others.

Kit: `median` in `kit/math/median.ts`. Sources: [S30] [E]

## 4. Variance and standard deviation

Formula: variance = sum of (x - mean)^2, divided by count - 1 for a sample, by count for a whole population. Standard deviation = square root of the variance.

Example: `variance([4, 7, 13, 16], 'sample')` gives `30`. With `'population'` it gives `22.5`. `standardDeviation([4, 7, 13, 16], 'sample')` gives `5.477225575051661`.

Pitfall: Do not use "sum of squares minus square of the sum". On the same values plus 1e9 it gives `-170.66666666666666`. Compute the mean first, then the squared differences.

Kit: `variance` in `kit/math/variance.ts`. , `standardDeviation`. Sources: [S31] [S32] [E]

## 5. Statistics of a stream of values

Formula: for each new x: count + 1; newMean = mean + (x - mean) / count; sumOfSquaredDeviations + (x - mean) * (x - newMean).

Example: feeding 4, 7, 13, 16 gives count 4, mean 10, sumOfSquaredDeviations 90. Sample variance = 90 / 3 = 30.

Pitfall: Start from `{ count: 0, mean: 0, sumOfSquaredDeviations: 0 }`. Keep the returned state: the function changes nothing.

Kit: `updateRunningStatistics` in `kit/math/update-running-statistics.ts`. Sources: [S32] [E]

## 6. Moving average

Formula: the mean of the last N values.

Example: `movingAverage([9, 8, 9, 12, 9], 3)` gives `[8.666666666666666, 9.666666666666666, 10]`.

Pitfall: The result is shorter than the input: the first N - 1 values have no average.

Kit: `movingAverage` in `kit/math/moving-average.ts`. Sources: [S29] [E]

## Sources

- [S3] Goldberg D., 1991, "What Every Computer Scientist Should Know About Floating-Point Arithmetic", <https://docs.oracle.com/cd/E19957-01/816-2464/ncg_goldberg.html>.
- [S15] MDN, 2026, "Math.sumPrecise()", <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise>.
- [S29] NIST/SEMATECH, même ouvrage, "Single Moving Average", <https://itl.nist.gov/div898/handbook/pmc/section4/pmc421.htm>.
- [S30] NIST/SEMATECH, même ouvrage, "Measures of Location", <https://itl.nist.gov/div898/handbook/eda/section3/eda351.htm>.
- [S31] NIST/SEMATECH, même ouvrage, "Measures of Scale", <https://itl.nist.gov/div898/handbook/eda/section3/eda356.htm>.
- [S32] Wikipédia (en), « Algorithms for calculating variance », "Algorithms for calculating variance", <https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
