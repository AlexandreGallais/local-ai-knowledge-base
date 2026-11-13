/**
 * Keeps a value between a minimum and a maximum.
 *
 * Formula: min(max(value, minimum), maximum)
 * @param value - Number to keep in range.
 * @param minimum - Lower bound, included.
 * @param maximum - Upper bound, included.
 * @returns The number the formula gives.
 * @throws {RangeError} minimum must not be above maximum.
 * @example
 * clamp(5, 0, 10); // 5
 * @see docs/math/range-operations.md
 */
export function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  if (minimum > maximum) {
    throw new RangeError('minimum must not be above maximum');
  }

  return Math.min(
    Math.max(
      value,
      minimum,
    ),
    maximum,
  );
}
