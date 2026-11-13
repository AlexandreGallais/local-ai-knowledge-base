/**
 * Interpolates between two values; t outside 0 to 1 extrapolates.
 *
 * Formula: start * (1 - t) + end * t
 * @param start - Value at the start of the range.
 * @param end - Value at the end of the range.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns The number the formula gives.
 * @example
 * lerp(10, 20, 0.25); // 12.5
 * @see docs/math/range-operations.md
 */
export function lerp(
  start: number,
  end: number,
  t: number,
): number {
  return start * (1 - t) + end * t;
}
