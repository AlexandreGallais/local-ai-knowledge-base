const MILLIMETER_PER_UNIT = {
  cm: 10,
  foot: 304.8,
  inch: 25.4,
  km: 1_000_000,
  m: 1000,
  mm: 1,
  nauticalMile: 1_852_000,
} as const;

export type LengthUnit = keyof typeof MILLIMETER_PER_UNIT;

/**
 * Converts a length between units through the millimeter.
 *
 * Formula: value * factor[from] / factor[to]
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertLength(1, 'nauticalMile', 'm'); // 1852
 * @see docs/math/units.md
 */
export function convertLength(
  value: number,
  from: LengthUnit,
  to: LengthUnit,
): number {
  return (value * MILLIMETER_PER_UNIT[from]) / MILLIMETER_PER_UNIT[to];
}
