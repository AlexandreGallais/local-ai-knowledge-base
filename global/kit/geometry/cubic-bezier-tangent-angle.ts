import type { CubicBezier } from './shapes.ts';

import { angleOfVector } from './angle-of-vector.ts';
import { cubicBezierDerivative } from './cubic-bezier-derivative.ts';

/**
 * Gives the direction of a cubic Bezier curve at t, in degrees.
 *
 * Formula: angleOfVector(cubicBezierDerivative(...))
 * Edge cases: Use it to turn an arrow head or a flow marker along a pipe.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns The number the formula gives.
 * @example
 * cubicBezierTangentAngle({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0); // 90
 * @see docs/geometry/
 */
export function cubicBezierTangentAngle(
  curve: CubicBezier,
  t: number,
): number {
  return angleOfVector(cubicBezierDerivative(
    curve,
    t,
  ));
}
