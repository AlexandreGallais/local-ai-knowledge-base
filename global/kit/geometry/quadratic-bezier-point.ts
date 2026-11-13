import type { QuadraticBezier } from './shapes.ts';
import type { Point } from './types.ts';

/**
 * Gives the point of a quadratic Bezier curve at t.
 *
 * Formula: (1-t)^2*p0 + 2*(1-t)*t*p1 + t^2*p2
 * Edge cases: t = 0 gives p0, t = 1 gives p2. The curve does not pass through p1.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns A new point, in user units.
 * @example
 * quadraticBezierPoint({ p0: {x:0,y:0}, p1: {x:5,y:10}, p2: {x:10,y:0} }, 0.5); // {'x':5,'y':5}
 * @see docs/geometry/
 */
export function quadraticBezierPoint(
  curve: QuadraticBezier,
  t: number,
): Point {
  const mt = 1 - t;
  const {
    p0,
    p1,
    p2,
  } = curve;

  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}
