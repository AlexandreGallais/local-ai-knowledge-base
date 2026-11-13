import type { Matrix } from './types.ts';

/**
 * Multiplies two matrices: the second one acts first on a point.
 *
 * Formula: m * n = [m.a*n.a + m.c*n.b, m.b*n.a + m.d*n.b, m.a*n.c + m.c*n.d, m.b*n.c + m.d*n.d, m.a*n.e + m.c*n.f + m.e, m.b*n.e + m.d*n.f + m.f]
 * Edge cases: Not commutative. In m * n, n acts on the point first. Same result as `m.multiply(n)` of `DOMMatrix`.
 * @param m - First matrix [a, b, c, d, e, f], applied last to a point.
 * @param n - Second matrix [a, b, c, d, e, f], applied first to a point.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * multiplyMatrices(translationMatrix(100,0), rotationMatrix(90)); // [0,1,-1,0,100,0]
 * @see docs/geometry/
 */
export function multiplyMatrices(
  m: Matrix,
  n: Matrix,
): Matrix {
  return [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4],
    m[1] * n[4] + m[3] * n[5] + m[5],
  ];
}
