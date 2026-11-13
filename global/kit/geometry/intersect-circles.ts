import type { CircleIntersection } from './results.ts';
import type { Circle } from './shapes.ts';
import type { Point } from './types.ts';

import { distanceBetween } from './distance-between.ts';

interface Chord {
  readonly base: Point;
  readonly halfLength: number;
  readonly unit: Point;
}

/**
 * Gives where two circles cross: 0, 1 or 2 points.
 *
 * Formula: d = |c1 - c0|; a = (r0^2 - r1^2 + d^2) / 2d; h = sqrt(r0^2 - a^2); p2 = c0 + a*(c1 - c0)/d; points = p2 +- h*(perpendicular of (c1 - c0))/d
 * Edge cases: d > r0 + r1: `separate`. d < |r0 - r1|: `contained`. d = 0 and r0 = r1: `coincident`. Tangent circles: one point.
 * @param a - First circle: center and radius, in user units.
 * @param b - Second circle: center and radius, in user units.
 * @returns A new CircleIntersection value, as described above.
 * @example
 * intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:8,y:0}, radius: 5 }); // {'kind':'points','points':[{'x':4,'y':-3},{'x':4,'y':3}]}
 * @see docs/geometry/
 */
export function intersectCircles(
  a: Circle,
  b: Circle,
): CircleIntersection {
  const d = distanceBetween(
    a.center,
    b.center,
  );

  return circleRelation(
    a,
    b,
    d,
  ) ?? {
    kind: 'points',
    points: crossingPoints(
      a,
      b,
      d,
    ),
  };
}

function circleRelation(
  a: Circle,
  b: Circle,
  d: number,
): CircleIntersection | undefined {
  if (d === 0 && a.radius === b.radius) {
    return { kind: 'coincident' };
  }

  if (d > a.radius + b.radius) {
    return { kind: 'separate' };
  }

  return d < Math.abs(a.radius - b.radius) ? { kind: 'contained' } : undefined;
}

function commonChord(
  a: Circle,
  b: Circle,
  d: number,
): Chord {
  const along = (a.radius * a.radius - b.radius * b.radius + d * d) / (2 * d);
  const unit = {
    x: (b.center.x - a.center.x) / d,
    y: (b.center.y - a.center.y) / d,
  };

  return {
    base: {
      x: a.center.x + along * unit.x,
      y: a.center.y + along * unit.y,
    },
    halfLength: Math.sqrt(Math.max(
      0,
      a.radius * a.radius - along * along,
    )),
    unit,
  };
}

function crossingPoints(
  a: Circle,
  b: Circle,
  d: number,
): readonly Point[] {
  const {
    base,
    halfLength: h,
    unit,
  } = commonChord(
    a,
    b,
    d,
  );
  const first = {
    x: base.x + h * unit.y,
    y: base.y - h * unit.x,
  };

  return h === 0
    ? [first]
    : [
        first,
        {
          x: base.x - h * unit.y,
          y: base.y + h * unit.x,
        },
      ];
}
