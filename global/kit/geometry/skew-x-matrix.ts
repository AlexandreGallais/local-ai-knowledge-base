import type { Matrix } from './types.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the matrix of skewX(angle).
 *
 * Formula: [1, 0, tan(a), 1, 0, 0]
 * Edge cases: a = 90: tan is huge, the result is unusable.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * skewXMatrix(45); // [1,0,1,1,0,0]
 * @see docs/geometry/
 */
export function skewXMatrix(angleDegrees: number): Matrix {
  return [
    1,
    0,
    Math.tan(degreesToRadians(angleDegrees)),
    1,
    0,
    0,
  ];
}
