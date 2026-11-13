/**
 * Gives the change from one value to another, in percent of the first.
 *
 * Formula: (to - from) * 100 / abs(from)
 * @param from - Value before the change; not 0.
 * @param to - Value after the change.
 * @returns The number the formula gives.
 * @throws {RangeError} from must not be 0.
 * @example
 * percentChange(50, 75); // 50
 * @see docs/math/range-operations.md
 */
export function percentChange(
  from: number,
  to: number,
): number {
  if (from === 0) {
    throw new RangeError('from must not be 0');
  }

  return ((to - from) * 100) / Math.abs(from);
}
