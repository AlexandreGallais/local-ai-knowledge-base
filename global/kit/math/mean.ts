import { sumCompensated } from './sum-compensated.ts';

/**
 * Gives the arithmetic mean of a non-empty list.
 *
 * Formula: sum / count
 * @param values - The values; the list is not changed.
 * @returns The number the formula gives.
 * @throws {RangeError} values must not be empty.
 * @example
 * mean([1, 2, 3, 4]); // 2.5
 * @see docs/math/statistics.md
 */
export function mean(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError('values must not be empty');
  }

  return sumCompensated(values) / values.length;
}
