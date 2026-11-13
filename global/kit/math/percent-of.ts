/**
 * Gives the share of a part in a whole, in percent.
 *
 * Formula: part * 100 / whole
 * @param part - The part, in the unit of whole.
 * @param whole - The whole, in any unit; not 0.
 * @returns The number the formula gives.
 * @throws {RangeError} whole must not be 0.
 * @example
 * percentOf(1, 8); // 12.5
 * @see docs/math/range-operations.md
 */
export function percentOf(
  part: number,
  whole: number,
): number {
  if (whole === 0) {
    throw new RangeError('whole must not be 0');
  }

  return (part * 100) / whole;
}
