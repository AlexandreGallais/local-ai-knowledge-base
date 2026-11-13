import type { Point } from './types.ts';

/**
 * Gives the point at a fraction t of the way from the first point to the second.
 *
 * Formula: a + (b - a) * t
 * Edge cases: t = 0 gives a, t = 1 gives b. t outside [0, 1] extrapolates: clamp first if that is not wanted.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns A new point, in user units.
 * @example
 * interpolatePoints({x:0,y:0},{x:10,y:20},0.25); // {'x':2.5,'y':5}
 * @see docs/geometry/
 */
export function interpolatePoints(
  a: Point,
  b: Point,
  t: number,
): Point {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}
