/**
 * Gives the radius of the circle on which a chord spans a given angle.
 *
 * Formula: chord / (2 * sin(PI / count)): the radius on which count objects are `chord` apart
 * Edge cases: count must be an integer >= 2.
 * @param count - Number of items, an integer of 1 or more.
 * @param chord - Length of the chord, in user units.
 * @returns The number the formula gives.
 * @throws {RangeError} radiusForChord: count must be an integer >= 2.
 * @example
 * radiusForChord(6, 10); // 10
 * @see docs/geometry/
 */
export function radiusForChord(
  count: number,
  chord: number,
): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new RangeError('radiusForChord: count must be an integer >= 2');
  }

  return chord / (2 * Math.sin(Math.PI / count));
}
