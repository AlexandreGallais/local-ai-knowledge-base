import type { Point } from './types.ts';

import { radiansToDegrees } from '../math/radians-to-degrees.ts';

/**
 * Gives the direction of a vector in degrees, from -180 to 180, clockwise on screen.
 *
 * Formula: atan2(v.y, v.x) in degrees, in (-180, 180]
 * Edge cases: The argument order of `Math.atan2` is (y, x). The zero vector gives 0.
 * @param v - Vector to work on, in user units.
 * @returns The number the formula gives.
 * @example
 * angleOfVector({x:0,y:5}); // 90
 * @see docs/geometry/
 */
export function angleOfVector(v: Point): number {
  return radiansToDegrees(Math.atan2(
    v.y,
    v.x,
  ));
}
