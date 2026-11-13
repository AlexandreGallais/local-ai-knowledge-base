import type { Point } from './types.ts';

/**
 * Gives the 2D cross product: its sign tells on which side the second vector turns.
 *
 * Formula: a.x*b.y - a.y*b.x = |a|*|b|*sin(angle)
 * Edge cases: 0 when the vectors are parallel. With y down, a positive value means b is clockwise from a on screen.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns The number the formula gives.
 * @example
 * crossProduct({x:1,y:0},{x:0,y:1}); // 1
 * @see docs/geometry/
 */
export function crossProduct(
  a: Point,
  b: Point,
): number {
  return a.x * b.y - a.y * b.x;
}
