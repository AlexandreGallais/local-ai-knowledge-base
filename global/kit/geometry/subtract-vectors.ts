import type { Point } from './types.ts';

/**
 * Gives the vector that goes from the second point to the first.
 *
 * Formula: (a.x - b.x, a.y - b.y). The vector from b to a.
 * Edge cases: Order matters: `subtractVectors(to, from)`.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns A new point, in user units.
 * @example
 * subtractVectors({x:4,y:6},{x:1,y:2}); // {'x':3,'y':4}
 * @see docs/geometry/
 */
export function subtractVectors(
  a: Point,
  b: Point,
): Point {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}
