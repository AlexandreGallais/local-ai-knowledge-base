/**
 * Adds many values with Kahan compensation: the rounding error of each addition is carried to the next.
 *
 * Formula: Kahan summation
 * @param values - The values; the list is not changed.
 * @returns The number the formula gives.
 * @example
 * sumCompensated(Array.from({ length: 10 }, () => 0.1)); // 1
 * @see docs/math/statistics.md
 */
export function sumCompensated(values: readonly number[]): number {
  return values.reduce(
    (
      state,
      value,
    ) => {
      const corrected = value - state.compensation;
      const next = state.sum + corrected;

      return {
        compensation: next - state.sum - corrected,
        sum: next,
      };
    },
    {
      compensation: 0,
      sum: 0,
    },
  ).sum;
}
