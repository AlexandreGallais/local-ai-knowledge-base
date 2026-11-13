import { clamp } from './clamp.ts';

/**
 * Gives the progress of an animation from its start time and duration, from 0 to 1.
 *
 * Formula: clamp((now - start) / duration, 0, 1)
 * @param startTimeMs - Time the animation started, in milliseconds.
 * @param durationMs - Duration of the animation, in milliseconds.
 * @param nowMs - Current time, in milliseconds, on the clock of startTimeMs.
 * @returns The number the formula gives.
 * @example
 * computeProgress(1000, 2000, 1500); // 0.25
 * @see docs/math/time-animation.md
 */
export function computeProgress(
  startTimeMs: number,
  durationMs: number,
  nowMs: number,
): number {
  if (!(durationMs > 0)) {
    return 1;
  }

  return clamp(
    (nowMs - startTimeMs) / durationMs,
    0,
    1,
  );
}
