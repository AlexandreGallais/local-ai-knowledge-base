/**
 * Writes a number for an SVG attribute: fixed decimals, no trailing zero, never -0.
 *
 * Formula: round to `decimals` places, then `String`
 * Edge cases: NaN or Infinity: throws `RangeError`. -0 is written `0`. `String(1e-7)` is `1e-7`: rounding first avoids it.
 * @param value - Number to write; finite.
 * @param decimals - Number of decimals kept, an integer from 0 to 15.
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @throws {RangeError} formatNumber: value must be finite.
 * @example
 * formatNumber(6.123e-16, 3); // '0'
 * @see docs/geometry/
 */
export function formatNumber(
  value: number,
  decimals: number,
): string {
  if (!Number.isFinite(value)) {
    throw new RangeError('formatNumber: value must be finite');
  }

  const factor = 10 ** decimals;
  const rounded = Math.round(value * factor) / factor;

  return String(rounded === 0 ? 0 : rounded);
}
