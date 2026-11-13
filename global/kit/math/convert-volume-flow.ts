const LITER_PER_HOUR_PER_UNIT = {
  lPerH: 1,
  lPerMin: 60,
  lPerS: 3600,
  m3PerH: 1000,
  m3PerS: 3_600_000,
  usGalPerMin: 227.12472,
} as const;

export type VolumeFlowUnit = keyof typeof LITER_PER_HOUR_PER_UNIT;

/**
 * Converts a volume flow between units through the liter per hour.
 *
 * Formula: value * factor[from] / factor[to]
 * @param value - Number the formula works on.
 * @param from - Unit of the given value.
 * @param to - Unit wanted.
 * @returns The number the formula gives.
 * @example
 * convertVolumeFlow(60, 'lPerMin', 'm3PerH'); // 3.6
 * @see docs/math/units.md
 */
export function convertVolumeFlow(
  value: number,
  from: VolumeFlowUnit,
  to: VolumeFlowUnit,
): number {
  return (value * LITER_PER_HOUR_PER_UNIT[from]) / LITER_PER_HOUR_PER_UNIT[to];
}
