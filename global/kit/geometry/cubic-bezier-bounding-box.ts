import type { CubicBezier } from './shapes.ts';
import type { Rect } from './types.ts';

import { cubicBezierPoint } from './cubic-bezier-point.ts';
import { rectFromPoints } from './rect-from-points.ts';

/**
 * Gives the bounding box of a cubic Bezier curve itself, not of its control points.
 *
 * Formula: per axis, the roots in (0, 1) of a*t^2 + b*t + c with a = 3*(-p0 + 3*p1 - 3*p2 + p3), b = 6*(p0 - 2*p1 + p2), c = 3*(p1 - p0); box of the curve at these t and at 0 and 1
 * Edge cases: The box of the control points is larger: here its height is 10, the curve reaches 7.5. a = 0: the equation is linear.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @returns A new rectangle, in user units.
 * @example
 * cubicBezierBoundingBox({ p0: P0, p1: P1, p2: P2, p3: P3 }); // {'x':0,'y':0,'width':10,'height':7.5}
 * @see docs/geometry/
 */
export function cubicBezierBoundingBox(curve: CubicBezier): Rect {
  const ts = [
    0,
    1,
    ...extremaOnAxis(
      curve,
      'x',
    ),
    ...extremaOnAxis(
      curve,
      'y',
    ),
  ];

  return rectFromPoints(ts.map((t) => cubicBezierPoint(
    curve,
    t,
  )));
}

function extremaOnAxis(
  curve: CubicBezier,
  axis: 'x' | 'y',
): readonly number[] {
  const {
    p0,
    p1,
    p2,
    p3,
  } = curve;
  const a = 3 * (-p0[axis] + 3 * p1[axis] - 3 * p2[axis] + p3[axis]);
  const b = 6 * (p0[axis] - 2 * p1[axis] + p2[axis]);
  const c = 3 * (p1[axis] - p0[axis]);

  return quadraticRoots(
    a,
    b,
    c,
  ).filter((t) => t > 0 && t < 1);
}

function quadraticRoots(
  a: number,
  b: number,
  c: number,
): readonly number[] {
  if (a === 0) {
    return b === 0 ? [] : [-c / b];
  }

  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return [];
  }

  const root = Math.sqrt(discriminant);

  return [
    (-b + root) / (2 * a),
    (-b - root) / (2 * a),
  ];
}
