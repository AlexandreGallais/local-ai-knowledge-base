import { lerp } from './lerp.ts';

/**
 * Gives count + 1 values evenly spaced from start to end, both included.
 *
 * Formula: lerp(start, end, i / count) for i from 0 to count
 * @param start - Value at the start of the range.
 * @param end - Value at the end of the range.
 * @param count - Number of items, an integer of 1 or more.
 * @returns A new list; the inputs are not changed.
 * @throws {RangeError} count must be an integer of at least 1.
 * @example
 * linearSteps(0, 100, 4); // [0, 25, 50, 75, 100]
 * @see docs/math/range-operations.md
 */
export function linearSteps(
  start: number,
  end: number,
  count: number,
): number[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('count must be an integer of at least 1');
  }

  return Array.from(
    { length: count + 1 },
    (
      _unused,
      index,
    ) => lerp(
      start,
      end,
      index / count,
    ),
  );
}
