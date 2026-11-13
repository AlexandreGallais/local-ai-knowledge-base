import type { NumberRange } from './inputs.ts';

import { inverseLerp } from './inverse-lerp.ts';
import { lerp } from './lerp.ts';

/**
 * Maps a value from an input range to an output range, extrapolating outside it.
 *
 * Formula: lerp(outputStart, outputEnd, inverseLerp(inputStart, inputEnd, value))
 * @param value - Number in the input range.
 * @param input - The input range: start and end, not equal.
 * @param output - The output range: start and end.
 * @returns The number the formula gives.
 * @example
 * mapRange(-10, { start: 10, end: 130 }, { start: 0, end: 960 }); // -160
 * @see docs/math/range-operations.md
 */
export function mapRange(
  value: number,
  input: NumberRange,
  output: NumberRange,
): number {
  return lerp(
    output.start,
    output.end,
    inverseLerp(
      input.start,
      input.end,
      value,
    ),
  );
}
