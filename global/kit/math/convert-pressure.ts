const PASCAL_PER_UNIT = {
  atm: 101_325,
  bar: 100_000,
  hpa: 100,
  kpa: 1000,
  mbar: 100,
  mmHg: 133.3224,
  mpa: 1_000_000,
  pa: 1,
  psi: 6894.757,
} as const;

export type PressureUnit = keyof typeof PASCAL_PER_UNIT;

/**
 * Converts a pressure between units through the pascal.
 *
 * Formula: value * factor[from] / factor[to]
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertPressure(1, 'bar', 'pa'); // 100_000
 * @see docs/math/units.md
 */
export function convertPressure(
  value: number,
  from: PressureUnit,
  to: PressureUnit,
): number {
  return (value * PASCAL_PER_UNIT[from]) / PASCAL_PER_UNIT[to];
}
