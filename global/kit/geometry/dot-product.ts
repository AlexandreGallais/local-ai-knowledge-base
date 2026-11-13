import type { Point } from './types.ts';

/**
 * Gives the dot product of two vectors: 0 when they are perpendicular.
 *
 * Formula: a.x*b.x + a.y*b.y = |a|*|b|*cos(angle)
 * Edge cases: 0 when the vectors are perpendicular.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns The number the formula gives.
 * @example
 * dotProduct({x:1,y:2},{x:3,y:4}); // 11
 * @see docs/geometry/
 */
export function dotProduct(
  a: Point,
  b: Point,
): number {
  return a.x * b.x + a.y * b.y;
}
