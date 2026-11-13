/**
 * Turns a random value from 0 to 1 into an integer of a range, both bounds included.
 *
 * Formula: floor(unitValue * (maximum - minimum + 1)) + minimum
 * @param unitValue - Random value from 0 (included) to 1 (excluded).
 * @param minimum - Lower bound, included.
 * @param maximum - Upper bound, included.
 * @returns The number the formula gives.
 * @throws {RangeError} minimum and maximum must be integers, minimum at most maximum.
 * @throws {RangeError} unitValue must be 0 or more and below 1.
 * @example
 * randomInteger(0, 1, 6); // 1
 * @see docs/math/random.md
 */
export function randomInteger(
  unitValue: number,
  minimum: number,
  maximum: number,
): number {
  if (!Number.isInteger(minimum) || !Number.isInteger(maximum) || minimum > maximum) {
    throw new RangeError('minimum and maximum must be integers, minimum at most maximum');
  }

  if (!(unitValue >= 0 && unitValue < 1)) {
    throw new RangeError('unitValue must be 0 or more and below 1');
  }

  return Math.floor(unitValue * (maximum - minimum + 1)) + minimum;
}
