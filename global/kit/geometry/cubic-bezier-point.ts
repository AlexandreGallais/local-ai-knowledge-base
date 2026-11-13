import type { CubicBezier } from './shapes.ts';
import type { Point } from './types.ts';

/**
 * Gives the point of a cubic Bezier curve at t.
 *
 * Formula: (1-t)^3*p0 + 3*(1-t)^2*t*p1 + 3*(1-t)*t^2*p2 + t^3*p3
 * Edge cases: t is not a distance: t = 0.5 is not the middle of the length in general.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns A new point, in user units.
 * @example
 * cubicBezierPoint({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5); // {'x':5,'y':7.5}
 * @see docs/geometry/
 */
export function cubicBezierPoint(
  curve: CubicBezier,
  t: number,
): Point {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  const {
    p0,
    p1,
    p2,
    p3,
  } = curve;

  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}
