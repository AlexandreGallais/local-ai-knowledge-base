/**
 * Gives the middle value of a sorted copy; the mean of the two middle values for an even count.
 *
 * Formula: middle of a sorted copy
 * @param values - The values; the list is not changed.
 * @returns The number the formula gives.
 * @throws {RangeError} values must not be empty.
 * @example
 * median([3, 1, 2]); // 2
 * @see docs/math/statistics.md
 */
export function median(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError('values must not be empty');
  }

  if (values.some((value) => Number.isNaN(value))) {
    return Number.NaN;
  }

  const sorted = values.toSorted((
    left,
    right,
  ) => left - right);
  const middle = Math.floor(sorted.length / 2);
  const upper = sorted[middle] ?? Number.NaN;
  const lower = sorted.length % 2 === 1 ? upper : sorted[middle - 1] ?? Number.NaN;

  return lower + (upper - lower) / 2;
}
