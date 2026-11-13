import type { NumberRange } from './inputs.ts';

import { clamp } from './clamp.ts';
import { inverseLerp } from './inverse-lerp.ts';
import { lerp } from './lerp.ts';

/**
 * Maps a value from an input range to an output range, held inside the output range.
 *
 * Formula: lerp(outputStart, outputEnd, clamp(inverseLerp(inputStart, inputEnd, value), 0, 1))
 * @param value - Number in the input range.
 * @param input - The input range: start and end, not equal.
 * @param output - The output range: start and end.
 * @returns The number the formula gives.
 * @example
 * mapRangeClamped(-10, { start: 10, end: 130 }, { start: 0, end: 960 }); // 0
 * @see docs/math/range-operations.md
 */
export function mapRangeClamped(
  value: number,
  input: NumberRange,
  output: NumberRange,
): number {
  return lerp(
    output.start,
    output.end,
    clamp(
      inverseLerp(
        input.start,
        input.end,
        value,
      ),
      0,
      1,
    ),
  );
}
