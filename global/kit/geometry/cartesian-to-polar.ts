import type { Point } from './types.ts';

import { angleBetweenPoints } from './angle-between-points.ts';
import { distanceBetween } from './distance-between.ts';

/**
 * Gives the radius and the angle of a point around a center.
 *
 * Formula: radius = distance(center, point); angle = atan2(dy, dx) in degrees
 * Edge cases: The point on the centre gives radius 0 and angle 0.
 * @param center - Center of the circle, in user units.
 * @param point - The point, in user units.
 * @returns A new { radius: number; angleDegrees: number } value, as described above.
 * @example
 * cartesianToPolar({x:100,y:100},{x:100,y:150}); // {'radius':50,'angleDegrees':90}
 * @see docs/geometry/
 */
export function cartesianToPolar(
  center: Point,
  point: Point,
): {
  angleDegrees: number;
  radius: number;
} {
  return {
    angleDegrees: angleBetweenPoints(
      center,
      point,
    ),
    radius: distanceBetween(
      center,
      point,
    ),
  };
}
