/**
 * Moves a value to the nearest line of a grid.
 *
 * Formula: origin + round((value - origin) / step) * step
 * Edge cases: step <= 0: throws `RangeError`. `Math.round` rounds a half up: -2.5 gives -2, 2.5 gives 3.
 * @param value - Position to snap, in user units.
 * @param step - Size of the step, above 0.
 * @param origin - Origin of the grid, in user units.
 * @returns The number the formula gives.
 * @throws {RangeError} snapToGrid: step must be > 0.
 * @example
 * snapToGrid(23, 10, 0); // 20
 * @see docs/geometry/
 */
export function snapToGrid(
  value: number,
  step: number,
  origin: number,
): number {
  if (!(step > 0)) {
    throw new RangeError('snapToGrid: step must be > 0');
  }

  const snapped = origin + Math.round((value - origin) / step) * step;

  return snapped === 0 ? 0 : snapped;
}
