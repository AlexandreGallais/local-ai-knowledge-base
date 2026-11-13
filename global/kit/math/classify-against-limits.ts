import type { AlarmLimits } from './inputs.ts';
import type { LimitZone } from './types.ts';

/**
 * Gives the zone of a value against four alarm limits.
 *
 * Formula: >= highHigh, >= high, <= lowLow, <= low, else normal; NaN is unknown
 * @param value - Measured value, in the unit of the limits.
 * @param limits - The four alarm limits, in the unit of the value.
 * @returns A new LimitZone value, as described above.
 * @example
 * classifyAgainstLimits(5, { lowLowLimit: 10, lowLimit: 20, highLimit: 80, highHighLimit: 90 }); // 'lowLow'
 * @see docs/math/filters-thresholds.md
 */
export function classifyAgainstLimits(
  value: number,
  limits: AlarmLimits,
): LimitZone {
  if (Number.isNaN(value)) {
    return 'unknown';
  }

  if (value >= limits.highHighLimit) {
    return 'highHigh';
  }

  if (value >= limits.highLimit) {
    return 'high';
  }

  if (value <= limits.lowLowLimit) {
    return 'lowLow';
  }

  return value <= limits.lowLimit ? 'low' : 'normal';
}
