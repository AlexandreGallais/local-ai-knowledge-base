/**
 * Counts the decimals of the shortest text of a number.
 *
 * Formula: digits after the point of String(value), exponent included
 * @param value - Number the formula works on.
 * @returns The number the formula gives.
 * @throws {RangeError} value must be finite.
 * @example
 * countDecimals(0.1); // 1
 * @see docs/math/rounding.md
 */
export function countDecimals(value: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be finite');
  }

  const [
    mantissa = '',
    exponent = '0',
  ] = String(Math.abs(value)).split('e');
  const fractionLength = (mantissa.split('.')[1] ?? '').length;

  return Math.max(
    0,
    fractionLength - Number(exponent),
  );
}
