import type { FixedTimestep } from './inputs.ts';
import type { FixedTimestepResult } from './types.ts';

import { clamp } from './clamp.ts';

/**
 * Advances a fixed time step simulation by one frame: the number of steps to run and the time left.
 *
 * Formula: total = rest + clamp(frame, 0, cap); steps = floor(total / step); rest = total - steps * step; alpha = rest / step
 * @param accumulatorMs - Time left from the previous frame, in milliseconds.
 * @param frameTimeMs - Time of the frame just drawn, in milliseconds.
 * @param timestep - stepMs, the fixed step in whole milliseconds, and maximumFrameTimeMs, the cap of one frame.
 * @returns A new FixedTimestepResult value, as described above.
 * @throws {RangeError} stepMs must be above 0.
 * @example
 * advanceFixedTimestep(0, 16, { stepMs: 10, maximumFrameTimeMs: 250 }); // { stepCount: 1, accumulatorMs: 6, alpha: 0.6 }
 * @see docs/math/time-animation.md
 */
export function advanceFixedTimestep(
  accumulatorMs: number,
  frameTimeMs: number,
  timestep: FixedTimestep,
): FixedTimestepResult {
  if (!(timestep.stepMs > 0)) {
    throw new RangeError('stepMs must be above 0');
  }

  const total = accumulatorMs + clamp(
    frameTimeMs,
    0,
    timestep.maximumFrameTimeMs,
  );
  const stepCount = Math.floor(total / timestep.stepMs);
  const remainder = total - stepCount * timestep.stepMs;

  return {
    accumulatorMs: remainder,
    alpha: remainder / timestep.stepMs,
    stepCount,
  };
}
