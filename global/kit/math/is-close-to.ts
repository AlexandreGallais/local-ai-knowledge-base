import type { Tolerance } from './inputs.ts';

/**
 * Tells whether two computed numbers are equal within a tolerance.
 *
 * Formula: abs(a - b) <= max(absoluteTolerance, relativeTolerance * max(abs(a), abs(b)))
 * @param actual - Computed value to check.
 * @param expected - Value it should be close to.
 * @param tolerance - Largest difference accepted: absolute near zero, relative (a share of the larger magnitude, 0 by default) elsewhere.
 * @returns True when the condition of the formula holds.
 * @example
 * isCloseTo(0.1 + 0.2, 0.3, { absolute: 1e-12 }); // true
 * @see docs/math/compare-numbers.md
 */
export function isCloseTo(
  actual: number,
  expected: number,
  tolerance: Tolerance,
): boolean {
  if (actual === expected) {
    return true;
  }

  if (!Number.isFinite(actual) || !Number.isFinite(expected)) {
    return false;
  }

  const scale = Math.max(
    Math.abs(actual),
    Math.abs(expected),
  );

  return Math.abs(actual - expected) <= Math.max(
    tolerance.absolute,
    (tolerance.relative ?? 0) * scale,
  );
}
