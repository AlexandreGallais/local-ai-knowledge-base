import type { Point } from './types.ts';

/**
 * Multiplies both components of a vector by one factor.
 *
 * Formula: (v.x * factor, v.y * factor)
 * Edge cases: A negative factor reverses the vector.
 * @param v - Vector to work on, in user units.
 * @param factor - Multiplier; a negative one reverses the vector.
 * @returns A new point, in user units.
 * @example
 * scaleVector({x:3,y:4},2); // {'x':6,'y':8}
 * @see docs/geometry/
 */
export function scaleVector(
  v: Point,
  factor: number,
): Point {
  return {
    x: v.x * factor,
    y: v.y * factor,
  };
}
