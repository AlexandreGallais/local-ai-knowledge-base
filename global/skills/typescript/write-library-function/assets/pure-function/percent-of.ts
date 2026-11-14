/**
 * Gives the share of a part in a whole, in percent.
 * @param part - The part, in the unit of `whole`.
 * @param whole - The whole, in any unit; never 0.
 * @returns `part / whole * 100`, in percent, not rounded.
 * @throws {RangeError} When `whole` is 0.
 * @example
 * percentOf(30, 120); // 25
 */
export function percentOf(
  part: number,
  whole: number,
): number {
  if (whole === 0) {
    throw new RangeError('whole must not be 0');
  }

  return part / whole * 100;
}
