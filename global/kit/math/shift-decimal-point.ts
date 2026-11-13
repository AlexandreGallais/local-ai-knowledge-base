/**
 * Moves the decimal point of a number through its decimal text, without a multiplication error.
 *
 * Formula: value * 10^places, written on the decimal text
 * @param value - Number the formula works on.
 * @param places - Number of places the decimal point moves; negative moves it left.
 * @returns The number the formula gives.
 * @example
 * shiftDecimalPoint(1.005, 2); // 100.5
 * @see docs/math/rounding.md
 */
export function shiftDecimalPoint(
  value: number,
  places: number,
): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  const [
    mantissa = '0',
    exponent = '0',
  ] = String(value).split('e');

  return Number(`${mantissa}e${String(Number(exponent) + places)}`);
}
