import type { RotationSpeedUnit } from './types.ts';

const DEGREES_PER_SECOND_PER_UNIT = {
  degPerS: 1,
  radPerS: 180 / Math.PI,
  rpm: 6,
  turnPerS: 360,
} as const;

/**
 * Converts a rotation speed between degrees per second, revolutions per minute, turns per second and radians per second.
 *
 * Formula: through degrees per second: rpm * 6, turnPerS * 360
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertRotationSpeed(1, 'rpm', 'degPerS'); // 6
 * @see docs/math/units.md
 */
export function convertRotationSpeed(
  value: number,
  from: RotationSpeedUnit,
  to: RotationSpeedUnit,
): number {
  return from === to ? value : (value * DEGREES_PER_SECOND_PER_UNIT[from]) / DEGREES_PER_SECOND_PER_UNIT[to];
}
