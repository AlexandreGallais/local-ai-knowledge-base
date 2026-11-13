import { modulo } from './modulo.ts';

/**
 * Brings an angle into the range 0 (included) to 360 (excluded).
 *
 * Formula: modulo(angle, 360)
 * @param angleDeg - Angle to work on, in degrees; any real number.
 * @returns The number the formula gives.
 * @example
 * normalizeAngleDegrees(-90); // 270
 * @see docs/math/angles.md
 */
export function normalizeAngleDegrees(angleDeg: number): number {
  return modulo(
    angleDeg,
    360,
  );
}
