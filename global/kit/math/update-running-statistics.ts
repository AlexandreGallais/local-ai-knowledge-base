import type { RunningStatistics } from './types.ts';

/**
 * Adds one value to running statistics with the Welford algorithm, without keeping the values.
 *
 * Formula: n + 1; mean += (x - mean) / n; m2 += (x - oldMean) * (x - newMean)
 * @param state - Statistics so far; { count: 0, mean: 0, sumOfSquaredDeviations: 0 } at first.
 * @param value - Number the formula works on.
 * @returns A new RunningStatistics value, as described above.
 * @example
 * [4, 7, 13, 16].reduce((state, value) => updateRunningStatistics(state, value), { count: 0, mean: 0, sumOfSquaredDeviations: 0 }); // { count: 4, mean: 10, sumOfSquaredDeviations: 90 }
 * @see docs/math/statistics.md
 */
export function updateRunningStatistics(
  state: RunningStatistics,
  value: number,
): RunningStatistics {
  const count = state.count + 1;
  const average = state.mean + (value - state.mean) / count;
  const sumOfSquaredDeviations = state.sumOfSquaredDeviations + (value - state.mean) * (value - average);

  return {
    count,
    mean: average,
    sumOfSquaredDeviations,
  };
}
