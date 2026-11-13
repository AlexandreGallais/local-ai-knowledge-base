/**
 * Smooths a measure: moves the previous output a fraction of the way to the new sample.
 *
 * Formula: previous + factor * (sample - previous)
 * @param previous - Output of the previous step.
 * @param sample - New measured value.
 * @param smoothingFactor - Share of the gap closed at each step, above 0 and up to 1.
 * @returns The number the formula gives.
 * @throws {RangeError} smoothingFactor must be above 0 and at most 1.
 * @example
 * exponentialSmoothing(71, 70, 0.1); // 70.9
 * @see docs/math/filters-thresholds.md
 */
export function exponentialSmoothing(
  previous: number,
  sample: number,
  smoothingFactor: number,
): number {
  if (!(smoothingFactor > 0 && smoothingFactor <= 1)) {
    throw new RangeError('smoothingFactor must be above 0 and at most 1');
  }

  return previous + smoothingFactor * (sample - previous);
}
