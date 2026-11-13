import { variance } from './variance.ts';

/**
 * Gives the standard deviation of a list: the square root of its variance.
 *
 * Formula: sqrt(variance(values, kind))
 * @param values - The values; the list is not changed.
 * @param kind - "sample" divides by n - 1, "population" by n.
 * @returns The number the formula gives.
 * @example
 * standardDeviation([4, 7, 13, 16], 'sample'); // 5.477_225_575_051_661
 * @see docs/math/statistics.md
 */
export function standardDeviation(
  values: readonly number[],
  kind: 'population' | 'sample',
): number {
  return Math.sqrt(variance(
    values,
    kind,
  ));
}
