/**
 * Rounds to a number of significant digits.
 *
 * Formula: Number(x.toPrecision(digits))
 * @param value - Number the formula works on.
 * @param digits - Number of significant digits, an integer from 1 to 21.
 * @returns The number the formula gives.
 * @throws {RangeError} digits must be an integer from 1 to 21.
 * @example
 * roundToSignificant(123_456, 3); // 123_000
 * @see docs/math/rounding.md
 */
export function roundToSignificant(
  value: number,
  digits: number,
): number {
  if (!Number.isInteger(digits) || digits < 1 || digits > 21) {
    throw new RangeError('digits must be an integer from 1 to 21');
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  return Number(value.toPrecision(digits));
}
