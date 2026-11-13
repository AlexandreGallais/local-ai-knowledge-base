/**
 * Gives the position of a value in a range, 0 at the start and 1 at the end.
 *
 * Formula: (value - start) / (end - start)
 * @param start - Value at the start of the range.
 * @param end - Value at the end of the range.
 * @param value - Number whose position in the range is wanted.
 * @returns The number the formula gives.
 * @throws {RangeError} start and end must differ.
 * @example
 * inverseLerp(10, 20, 12.5); // 0.25
 * @see docs/math/range-operations.md
 */
export function inverseLerp(
  start: number,
  end: number,
  value: number,
): number {
  if (start === end) {
    throw new RangeError('start and end must differ');
  }

  return (value - start) / (end - start);
}
