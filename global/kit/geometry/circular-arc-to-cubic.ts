import type {
  Arc,
  CubicBezier,
} from './shapes.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';
import { polarToCartesian } from './polar-to-cartesian.ts';

/**
 * Approximates an arc of a circle by cubic Bezier curves of 90 degrees at most.
 *
 * Formula: k = 4/3 * tan(sweep / 4); control 1 = start + k*r*(tangent at start); control 2 = end - k*r*(tangent at end)
 * Edge cases: |sweep| > 90: throws `RangeError`; split the arc first. A quarter circle has k = 0.5522847498. The result is an approximation.
 * @param arc - Center and radius, in user units, then start and end angles in degrees, 0 on +x, clockwise on screen.
 * @returns A new cubic Bezier curve, its four points in user units.
 * @throws {RangeError} circularArcToCubic: split the arc into parts of 90 degrees or less.
 * @example
 * circularArcToCubic({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 90 }); // [{'x':10,'y':0},{'x':10,'y':5.522847498},{'x':5.522847498,'y':10},{'x':0,'y':10}]
 * @see docs/geometry/
 */
export function circularArcToCubic(arc: Arc): CubicBezier {
  const sweep = arc.endAngleDegrees - arc.startAngleDegrees;

  if (Math.abs(sweep) > 90) {
    throw new RangeError('circularArcToCubic: split the arc into parts of 90 degrees or less');
  }

  const k = (4 / 3) * Math.tan(degreesToRadians(sweep) / 4) * arc.radius;
  const start = polarToCartesian(
    arc.center,
    arc.radius,
    arc.startAngleDegrees,
  );
  const end = polarToCartesian(
    arc.center,
    arc.radius,
    arc.endAngleDegrees,
  );
  const a0 = degreesToRadians(arc.startAngleDegrees);
  const a1 = degreesToRadians(arc.endAngleDegrees);

  return {
    p0: start,
    p1: {
      x: start.x - k * Math.sin(a0),
      y: start.y + k * Math.cos(a0),
    },
    p2: {
      x: end.x + k * Math.sin(a1),
      y: end.y - k * Math.cos(a1),
    },
    p3: end,
  };
}
