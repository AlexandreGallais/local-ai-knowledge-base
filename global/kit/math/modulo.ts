/**
 * Gives the floored modulo: the result has the sign of the divisor, unlike %.
 *
 * Formula: ((dividend % divisor) + divisor) % divisor
 * @param dividend - Number to wrap.
 * @param divisor - Size of the cycle, finite and not 0.
 * @returns The number the formula gives.
 * @throws {RangeError} divisor must be finite and not 0.
 * @example
 * modulo(-1, 360); // 359
 * @see docs/math/range-operations.md
 */
export function modulo(
  dividend: number,
  divisor: number,
): number {
  if (!Number.isFinite(divisor) || divisor === 0) {
    throw new RangeError('divisor must be finite and not 0');
  }

  return ((dividend % divisor) + divisor) % divisor;
}
