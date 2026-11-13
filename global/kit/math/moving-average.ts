import { mean } from './mean.ts';

/**
 * Gives the mean of each window of N consecutive values.
 *
 * Formula: mean(values[i .. i + N - 1]) for each i
 * @param values - The values; the list is not changed.
 * @param windowSize - Number of values in each window, an integer of 1 or more.
 * @returns A new list; the inputs are not changed.
 * @throws {RangeError} windowSize must be an integer of at least 1.
 * @example
 * movingAverage([1, 2, 3, 4, 5], 3); // [2, 3, 4]
 * @see docs/math/statistics.md
 */
export function movingAverage(
  values: readonly number[],
  windowSize: number,
): number[] {
  if (!Number.isInteger(windowSize) || windowSize < 1) {
    throw new RangeError('windowSize must be an integer of at least 1');
  }

  const windowCount = Math.max(
    0,
    values.length - windowSize + 1,
  );

  return Array.from(
    { length: windowCount },
    (
      _unused,
      index,
    ) => mean(values.slice(
      index,
      index + windowSize,
    )),
  );
}
