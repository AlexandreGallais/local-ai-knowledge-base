const MILLISECOND_PER_UNIT = {
  day: 86_400_000,
  h: 3_600_000,
  min: 60_000,
  ms: 1,
  s: 1000,
} as const;

export type DurationUnit = keyof typeof MILLISECOND_PER_UNIT;

/**
 * Converts a duration between units through the millisecond.
 *
 * Formula: value * factor[from] / factor[to]
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertDuration(90, 'min', 'h'); // 1.5
 * @see docs/math/units.md
 */
export function convertDuration(
  value: number,
  from: DurationUnit,
  to: DurationUnit,
): number {
  return (value * MILLISECOND_PER_UNIT[from]) / MILLISECOND_PER_UNIT[to];
}
