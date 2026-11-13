import type { Point } from './types.ts';

import { radiansToDegrees } from '../math/radians-to-degrees.ts';
import { crossProduct } from './cross-product.ts';
import { dotProduct } from './dot-product.ts';

/**
 * Gives the signed turn from one vector to another, in degrees, from -180 to 180.
 *
 * Formula: atan2(cross(u, v), dot(u, v)) in degrees. Same value as sign(cross) * acos(dot / (|u|*|v|)), without the division.
 * Edge cases: A zero vector gives 0.
 * @param u - First vector.
 * @param v - Second vector.
 * @returns The number the formula gives.
 * @example
 * signedAngleBetweenVectors({x:1,y:0},{x:0,y:1}); // 90
 * @see docs/geometry/
 */
export function signedAngleBetweenVectors(
  u: Point,
  v: Point,
): number {
  return radiansToDegrees(Math.atan2(
    crossProduct(
      u,
      v,
    ),
    dotProduct(
      u,
      v,
    ),
  ));
}
