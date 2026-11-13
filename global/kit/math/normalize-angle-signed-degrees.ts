import { modulo } from './modulo.ts';

/**
 * Brings an angle into the range -180 (included) to 180 (excluded).
 *
 * Formula: modulo(angle + 180, 360) - 180
 * @param angleDeg - Angle to work on, in degrees; any real number.
 * @returns The number the formula gives.
 * @example
 * normalizeAngleSignedDegrees(190); // -170
 * @see docs/math/angles.md
 */
export function normalizeAngleSignedDegrees(angleDeg: number): number {
  return modulo(
    angleDeg + 180,
    360,
  ) - 180;
}
