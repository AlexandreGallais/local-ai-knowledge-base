import type { AngleUnit } from './types.ts';

const DEGREES_PER_ANGLE_UNIT = {
  deg: 1,
  rad: 180 / Math.PI,
  turn: 360,
} as const;

/**
 * Converts an angle between degrees, radians and turns.
 *
 * Formula: through degrees: rad = deg * pi / 180, turn = deg / 360
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertAngle(180, 'deg', 'rad'); // Math.PI
 * @see docs/math/units.md
 */
export function convertAngle(
  value: number,
  from: AngleUnit,
  to: AngleUnit,
): number {
  return from === to ? value : (value * DEGREES_PER_ANGLE_UNIT[from]) / DEGREES_PER_ANGLE_UNIT[to];
}
