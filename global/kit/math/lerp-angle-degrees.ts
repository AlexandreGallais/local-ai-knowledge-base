import { normalizeAngleDegrees } from './normalize-angle-degrees.ts';
import { shortestAngleDeltaDegrees } from './shortest-angle-delta-degrees.ts';

/**
 * Interpolates between two angles along the shortest turn.
 *
 * Formula: norm(from + shortestDelta(from, to) * t)
 * @param fromDeg - Start angle, in degrees.
 * @param toDeg - End angle, in degrees.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns The number the formula gives.
 * @example
 * lerpAngleDegrees(350, 10, 0.5); // 0
 * @see docs/math/angles.md
 */
export function lerpAngleDegrees(
  fromDeg: number,
  toDeg: number,
  t: number,
): number {
  return normalizeAngleDegrees(fromDeg + shortestAngleDeltaDegrees(
    fromDeg,
    toDeg,
  ) * t);
}
