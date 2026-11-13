import type {
  CubicBezier,
  QuadraticBezier,
} from './shapes.ts';

/**
 * Gives the cubic Bezier curve equal to a quadratic one.
 *
 * Formula: [p0, p0 + 2/3*(p1 - p0), p2 + 2/3*(p1 - p2), p2]
 * Edge cases: The curve is the same, exactly.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @returns A new cubic Bezier curve, its four points in user units.
 * @example
 * quadraticToCubic({ p0: {x:0,y:0}, p1: {x:6,y:12}, p2: {x:12,y:0} }); // [{'x':0,'y':0},{'x':4,'y':8},{'x':8,'y':8},{'x':12,'y':0}]
 * @see docs/geometry/
 */
export function quadraticToCubic(curve: QuadraticBezier): CubicBezier {
  const {
    p0,
    p1,
    p2,
  } = curve;

  return {
    p0,
    p1: {
      x: p0.x + (2 / 3) * (p1.x - p0.x),
      y: p0.y + (2 / 3) * (p1.y - p0.y),
    },
    p2: {
      x: p2.x + (2 / 3) * (p1.x - p2.x),
      y: p2.y + (2 / 3) * (p1.y - p2.y),
    },
    p3: p2,
  };
}
