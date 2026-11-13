import type { LineIntersection } from './results.ts';
import type { Segment } from './shapes.ts';

import { interpolatePoints } from './interpolate-points.ts';

interface Determinants {
  readonly denominator: number;
  readonly numeratorA: number;
  readonly numeratorB: number;
}

/**
 * Gives where two infinite lines cross, each given by two points.
 *
 * Formula: den = (y4-y3)(x2-x1) - (x4-x3)(y2-y1); ua = ((x4-x3)(y1-y3) - (y4-y3)(x1-x3)) / den; ub = ((x2-x1)(y1-y3) - (y2-y1)(x1-x3)) / den; point = p1 + ua*(p2 - p1)
 * Edge cases: den = 0: `parallel`; den = 0 and both numerators 0: `coincident`. The lines are infinite: ua and ub can be outside [0, 1].
 * @param a - First line, through its start and end points, in user units.
 * @param b - Second line, through its start and end points, in user units.
 * @returns A new LineIntersection value, as described above.
 * @example
 * intersectLines({ start: {x:0,y:0}, end: {x:10,y:10} }, { start: {x:0,y:10}, end: {x:10,y:0} }); // {'kind':'point','point':{'x':5,'y':5},'ua':0.5,'ub':0.5}
 * @see docs/geometry/
 */
export function intersectLines(
  a: Segment,
  b: Segment,
): LineIntersection {
  const {
    denominator,
    numeratorA,
    numeratorB,
  } = lineDeterminants(
    a,
    b,
  );

  if (denominator === 0) {
    return numeratorA === 0 && numeratorB === 0 ? { kind: 'coincident' } : { kind: 'parallel' };
  }

  const ua = numeratorA / denominator;

  return {
    kind: 'point',
    point: interpolatePoints(
      a.start,
      a.end,
      ua,
    ),
    ua,
    ub: numeratorB / denominator,
  };
}

function lineDeterminants(
  a: Segment,
  b: Segment,
): Determinants {
  const {
    end: p2,
    start: p1,
  } = a;
  const {
    end: p4,
    start: p3,
  } = b;

  return {
    denominator: (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y),
    numeratorA: (p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x),
    numeratorB: (p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x),
  };
}
