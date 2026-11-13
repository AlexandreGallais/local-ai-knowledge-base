import type { TemperatureUnit } from './types.ts';

const KELVIN_PER_DIFFERENCE_UNIT = {
  degC: 9,
  degF: 5,
  k: 9,
} as const;

/**
 * Converts a temperature difference (an interval, not a point) between units.
 *
 * Formula: value * factor[from] / factor[to], no offset
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertTemperatureDifference(10, 'degC', 'degF'); // 18
 * @see docs/math/units.md
 */
export function convertTemperatureDifference(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
): number {
  return (value * KELVIN_PER_DIFFERENCE_UNIT[from]) / KELVIN_PER_DIFFERENCE_UNIT[to];
}
