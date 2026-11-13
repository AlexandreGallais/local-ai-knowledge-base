import { normalizeAngleDegrees } from './normalize-angle-degrees.ts';
import { radiansToDegrees } from './radians-to-degrees.ts';

/**
 * Gives the direction of a vector from 0 to 360 degrees, 0 on +x, y axis of the caller.
 *
 * Formula: norm(atan2(deltaY, deltaX) * 180 / pi)
 * @param deltaX - Horizontal component of the vector.
 * @param deltaY - Vertical component of the vector.
 * @returns The number the formula gives.
 * @example
 * angleOfVectorDegrees(1, 0); // 0
 * @see docs/math/angles.md
 */
export function angleOfVectorDegrees(
  deltaX: number,
  deltaY: number,
): number {
  return normalizeAngleDegrees(radiansToDegrees(Math.atan2(
    deltaY,
    deltaX,
  )));
}
