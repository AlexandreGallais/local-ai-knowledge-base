import { mean } from './mean.ts';
import { sumCompensated } from './sum-compensated.ts';

/**
 * Gives the variance of a list, in two passes: n - 1 for a sample, n for a population.
 *
 * Formula: sum((x - mean)^2) / (n - 1) or / n
 * @param values - The values; the list is not changed.
 * @param kind - "sample" divides by n - 1, "population" by n.
 * @returns The number the formula gives.
 * @throws {RangeError} values must hold at least N item(s).
 * @example
 * variance([4, 7, 13, 16], 'sample'); // 30
 * @see docs/math/statistics.md
 */
export function variance(
  values: readonly number[],
  kind: 'population' | 'sample',
): number {
  const minimumCount = kind === 'sample' ? 2 : 1;

  if (values.length < minimumCount) {
    throw new RangeError(`values must hold at least ${String(minimumCount)} item(s)`);
  }

  const average = mean(values);
  const squaredDeviations = values.map((value) => (value - average) ** 2);
  const divisor = kind === 'sample' ? values.length - 1 : values.length;

  return sumCompensated(squaredDeviations) / divisor;
}
