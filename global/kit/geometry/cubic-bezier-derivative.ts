import type { CubicBezier } from './shapes.ts';
import type { Point } from './types.ts';

/**
 * Gives the derivative vector of a cubic Bezier curve at t: its direction and speed.
 *
 * Formula: 3*(1-t)^2*(p1-p0) + 6*(1-t)*t*(p2-p1) + 3*t^2*(p3-p2)
 * Edge cases: The zero vector when p0 = p1 at t = 0 (or p2 = p3 at t = 1): the tangent then needs the next control point.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns A new point, in user units.
 * @example
 * cubicBezierDerivative({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0); // {'x':0,'y':30}
 * @see docs/geometry/
 */
export function cubicBezierDerivative(
  curve: CubicBezier,
  t: number,
): Point {
  const mt = 1 - t;
  const a = 3 * mt * mt;
  const b = 6 * mt * t;
  const c = 3 * t * t;
  const {
    p0,
    p1,
    p2,
    p3,
  } = curve;

  return {
    x: a * (p1.x - p0.x) + b * (p2.x - p1.x) + c * (p3.x - p2.x),
    y: a * (p1.y - p0.y) + b * (p2.y - p1.y) + c * (p3.y - p2.y),
  };
}
