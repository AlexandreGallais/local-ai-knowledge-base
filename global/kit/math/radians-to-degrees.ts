/**
 * Converts an angle from radians, as Math.atan2 gives it, to degrees.
 *
 * Formula: radians * 180 / pi
 * @param angleRad - Angle to convert, in radians, as Math.atan2 gives it.
 * @returns The number the formula gives.
 * @example
 * radiansToDegrees(Math.PI); // 180
 * @see docs/math/angles.md
 */
export function radiansToDegrees(angleRad: number): number {
  return (angleRad * 180) / Math.PI;
}
