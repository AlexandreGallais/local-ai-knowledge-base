import type { TemperatureUnit } from './types.ts';

const CELSIUS_TO = {
  degC: (celsius: number): number => celsius,
  degF: (celsius: number): number => celsius * 1.8 + 32,
  k: (celsius: number): number => celsius + 273.15,
} as const;

const CELSIUS_FROM = {
  degC: (value: number): number => value,
  degF: (value: number): number => (value - 32) / 1.8,
  k: (value: number): number => value - 273.15,
} as const;

/**
 * Converts a temperature (a point on a scale) between degrees Celsius, kelvins and degrees Fahrenheit.
 *
 * Formula: through degrees Celsius: F = C * 9 / 5 + 32, K = C + 273.15
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertTemperature(100, 'degC', 'degF'); // 212
 * @see docs/math/units.md
 */
export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
): number {
  return from === to ? value : CELSIUS_TO[to](CELSIUS_FROM[from](value));
}
