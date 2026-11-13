import type {
  Matrix,
  Point,
} from './types.ts';

/**
 * Moves a point by a matrix.
 *
 * Formula: (a*x + c*y + e, b*x + d*y + f)
 * Edge cases: For a vector (a direction), drop e and f.
 * @param m - Matrix [a, b, c, d, e, f] of SVG matrix(a b c d e f).
 * @param p - The point, in user units.
 * @returns A new point, in user units.
 * @example
 * applyMatrixToPoint([3,1,-1,3,30,40], {x:10,y:10}); // {'x':50,'y':80}
 * @see docs/geometry/
 */
export function applyMatrixToPoint(
  m: Matrix,
  p: Point,
): Point {
  return {
    x: m[0] * p.x + m[2] * p.y + m[4],
    y: m[1] * p.x + m[3] * p.y + m[5],
  };
}
