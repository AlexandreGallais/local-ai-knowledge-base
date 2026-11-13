/**
 * Rounds to the nearest integer; a half goes away from zero, never to minus zero.
 *
 * Formula: sign(x) * round(abs(x))
 * @param value - Number the formula works on.
 * @returns The number the formula gives.
 * @example
 * roundHalfAwayFromZero(2.5); // 3
 * @see docs/math/rounding.md
 */
export function roundHalfAwayFromZero(value: number): number {
  return Math.sign(value) * Math.round(Math.abs(value)) + 0;
}
