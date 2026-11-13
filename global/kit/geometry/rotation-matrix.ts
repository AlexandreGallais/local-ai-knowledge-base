import type { Matrix } from './types.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the matrix of rotate(angle) around the origin, clockwise on screen.
 *
 * Formula: [cos, sin, -sin, cos, 0, 0]
 * Edge cases: Rotation about the origin of the current system, not about the element.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * rotationMatrix(90); // [0,1,-1,0,0,0]
 * @see docs/geometry/
 */
export function rotationMatrix(angleDegrees: number): Matrix {
  const angle = degreesToRadians(angleDegrees);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return [
    cos,
    sin,
    -sin,
    cos,
    0,
    0,
  ];
}
