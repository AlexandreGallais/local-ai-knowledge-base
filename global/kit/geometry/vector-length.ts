import type { Point } from './types.ts';

/**
 * Gives the length of a vector, as Math.hypot does.
 *
 * Formula: sqrt(v.x^2 + v.y^2), with `Math.hypot`
 * Edge cases: Never negative.
 * @param v - Vector to work on, in user units.
 * @returns The number the formula gives.
 * @example
 * vectorLength({x:3,y:4}); // 5
 * @see docs/geometry/
 */
export function vectorLength(v: Point): number {
  return Math.hypot(
    v.x,
    v.y,
  );
}
