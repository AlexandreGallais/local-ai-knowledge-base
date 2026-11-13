import type { Matrix } from './types.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the matrix of skewY(angle).
 *
 * Formula: [1, tan(a), 0, 1, 0, 0]
 * Edge cases: Same as skewXMatrix.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * skewYMatrix(45); // [1,1,0,1,0,0]
 * @see docs/geometry/
 */
export function skewYMatrix(angleDegrees: number): Matrix {
  return [
    1,
    Math.tan(degreesToRadians(angleDegrees)),
    0,
    1,
    0,
    0,
  ];
}
