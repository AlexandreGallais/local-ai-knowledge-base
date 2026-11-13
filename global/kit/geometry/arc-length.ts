import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the length along an arc of a circle.
 *
 * Formula: r * |angle in radians|
 * Edge cases: Use it for `stroke-dasharray` on a circle gauge.
 * @param radius - Radius, in user units.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns The number the formula gives.
 * @example
 * arcLength(10, 90); // 15.707963268
 * @see docs/geometry/
 */
export function arcLength(
  radius: number,
  angleDegrees: number,
): number {
  return radius * degreesToRadians(Math.abs(angleDegrees));
}
