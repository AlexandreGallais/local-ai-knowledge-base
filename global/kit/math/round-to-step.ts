import { countDecimals } from './count-decimals.ts';
import { roundHalfAwayFromZero } from './round-half-away-from-zero.ts';
import { roundToDecimals } from './round-to-decimals.ts';

/**
 * Rounds to the nearest multiple of a step, without the float error of the step.
 *
 * Formula: round(x / step) * step, then rounded to the decimals of the step
 * @param value - Number the formula works on.
 * @param step - Size of the step, above 0.
 * @returns The number the formula gives.
 * @throws {RangeError} step must be a finite number above 0.
 * @example
 * roundToStep(0.3, 0.1); // 0.3
 * @see docs/math/rounding.md
 */
export function roundToStep(
  value: number,
  step: number,
): number {
  if (!Number.isFinite(step) || step <= 0) {
    throw new RangeError('step must be a finite number above 0');
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  const multiple = roundHalfAwayFromZero(value / step) * step;

  return roundToDecimals(
    multiple,
    Math.min(
      15,
      countDecimals(step),
    ),
  );
}
