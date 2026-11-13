import type { Point } from './types.ts';

/**
 * Gives the straight distance between two points.
 *
 * Formula: sqrt((b.x-a.x)^2 + (b.y-a.y)^2)
 * Edge cases: 0 for the same point.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns The number the formula gives.
 * @example
 * distanceBetween({x:1,y:1},{x:4,y:5}); // 5
 * @see docs/geometry/
 */
export function distanceBetween(
  a: Point,
  b: Point,
): number {
  return Math.hypot(
    b.x - a.x,
    b.y - a.y,
  );
}
