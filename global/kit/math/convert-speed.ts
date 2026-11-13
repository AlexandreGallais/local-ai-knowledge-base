const KILOMETER_PER_HOUR_PER_UNIT = {
  kmPerH: 1,
  kn: 1.852,
  mPerS: 3.6,
} as const;

export type SpeedUnit = keyof typeof KILOMETER_PER_HOUR_PER_UNIT;

/**
 * Converts a speed between kilometers per hour, knots and meters per second.
 *
 * Formula: value * factor[from] / factor[to]
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertSpeed(1, 'kn', 'mPerS'); // 0.514_444_444_444_444_5
 * @see docs/math/units.md
 */
export function convertSpeed(
  value: number,
  from: SpeedUnit,
  to: SpeedUnit,
): number {
  return (value * KILOMETER_PER_HOUR_PER_UNIT[from]) / KILOMETER_PER_HOUR_PER_UNIT[to];
}
