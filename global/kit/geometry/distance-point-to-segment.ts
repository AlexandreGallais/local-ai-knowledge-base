import type { Point } from './types.ts';

import { closestPointOnSegment } from './closest-point-on-segment.ts';
import { distanceBetween } from './distance-between.ts';

/**
 * Gives the shortest distance from a point to a segment.
 *
 * Formula: distance(p, closestPointOnSegment(p, a, b))
 * Edge cases: Use it to test a click near a line.
 * @param p - The point, in user units.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns The number the formula gives.
 * @example
 * distancePointToSegment({x:5,y:5},{x:0,y:0},{x:10,y:0}); // 5
 * @see docs/geometry/
 */
export function distancePointToSegment(
  p: Point,
  a: Point,
  b: Point,
): number {
  return distanceBetween(
    p,
    closestPointOnSegment(
      p,
      a,
      b,
    ),
  );
}
