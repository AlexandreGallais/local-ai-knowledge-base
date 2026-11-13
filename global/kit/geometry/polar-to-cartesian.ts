import type { Point } from './types.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the point at a radius and an angle around a center, in SVG coordinates.
 *
 * Formula: x = cx + r*cos(a), y = cy + r*sin(a)
 * Edge cases: `Math.cos(Math.PI / 2)` is 6.1e-17, not 0: compare with a tolerance, round before writing to an attribute.
 * @param center - Center of the circle, in user units.
 * @param radius - Radius, in user units.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns A new point, in user units.
 * @example
 * polarToCartesian({x:100,y:100},50,0); // {'x':150,'y':100}
 * @see docs/geometry/
 */
export function polarToCartesian(
  center: Point,
  radius: number,
  angleDegrees: number,
): Point {
  const angle = degreesToRadians(angleDegrees);

  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle),
  };
}
