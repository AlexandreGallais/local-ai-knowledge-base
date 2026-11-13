import type { Point } from './types.ts';

import { radiansToDegrees } from '../math/radians-to-degrees.ts';

/**
 * Gives the direction from one point toward another, in degrees, clockwise on screen.
 *
 * Formula: atan2(to.y - from.y, to.x - from.x) in degrees
 * Edge cases: Same point: 0. An element below another is at +90, not -90.
 * @param from - Point the angle is measured from, in user units.
 * @param to - Point the angle is measured toward, in user units.
 * @returns The number the formula gives.
 * @example
 * angleBetweenPoints({x:10,y:10},{x:10,y:30}); // 90
 * @see docs/geometry/
 */
export function angleBetweenPoints(
  from: Point,
  to: Point,
): number {
  return radiansToDegrees(Math.atan2(
    to.y - from.y,
    to.x - from.x,
  ));
}
