import type { DurationParts } from './types.ts';

/**
 * Splits a duration in seconds into its sign, hours, minutes, seconds and milliseconds.
 *
 * Formula: rounded to the millisecond, then integer divisions
 * @param durationS - Duration, in seconds; negative values keep their sign.
 * @returns A new DurationParts value, as described above.
 * @throws {RangeError} durationS must be finite.
 * @example
 * splitDuration(3661); // { sign: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 0 }
 * @see docs/math/time-animation.md
 */
export function splitDuration(durationS: number): DurationParts {
  if (!Number.isFinite(durationS)) {
    throw new RangeError('durationS must be finite');
  }

  const totalMs = Math.round(Math.abs(durationS) * 1000);

  return {
    hours: Math.floor(totalMs / 3_600_000),
    milliseconds: totalMs % 1000,
    minutes: Math.floor(totalMs / 60_000) % 60,
    seconds: Math.floor(totalMs / 1000) % 60,
    sign: durationS < 0 ? -1 : 1,
  };
}
