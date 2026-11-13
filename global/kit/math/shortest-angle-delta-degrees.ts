import { normalizeAngleDegrees } from './normalize-angle-degrees.ts';

/**
 * Gives the signed shortest turn from one angle to another, from -180 to 180.
 *
 * Formula: d = norm(to) - norm(from); d - 360 when d > 180; d + 360 when d < -180
 * @param fromDeg - Start angle, in degrees.
 * @param toDeg - End angle, in degrees.
 * @returns The number the formula gives.
 * @example
 * shortestAngleDeltaDegrees(350, 10); // 20
 * @see docs/math/angles.md
 */
export function shortestAngleDeltaDegrees(
  fromDeg: number,
  toDeg: number,
): number {
  const delta = normalizeAngleDegrees(toDeg) - normalizeAngleDegrees(fromDeg);

  if (delta > 180) {
    return delta - 360;
  }

  return delta < -180 ? delta + 360 : delta;
}
