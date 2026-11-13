/**
 * Moves a value to the nearest guide when it is close enough, else keeps it.
 *
 * Formula: the nearest guide when its distance is <= tolerance, else the value
 * Edge cases: Two guides at the same distance: the last one in the list wins. Give the tolerance in user units: divide a pixel tolerance by the screen scale.
 * @param value - Position to snap, in user units.
 * @param guides - Positions of the guides, in user units.
 * @param tolerance - Largest distance that snaps, in user units.
 * @returns The number the formula gives.
 * @example
 * snapToGuides(98, [0, 100, 200], 5); // 100
 * @see docs/geometry/
 */
export function snapToGuides(
  value: number,
  guides: readonly number[],
  tolerance: number,
): number {
  return guides.reduce(
    (
      best,
      guide,
    ) => {
      const distance = Math.abs(guide - value);

      return distance <= best.distance
        ? {
            distance,
            value: guide,
          }
        : best;
    },
    {
      distance: tolerance,
      value,
    },
  ).value;
}
