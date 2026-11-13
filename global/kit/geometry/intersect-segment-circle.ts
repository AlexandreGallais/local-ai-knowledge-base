import type {
  Circle,
  Segment,
} from './shapes.ts';
import type { Point } from './types.ts';

import { interpolatePoints } from './interpolate-points.ts';
import { intersectLineCircle } from './intersect-line-circle.ts';

/**
 * Gives where a segment crosses a circle: 0, 1 or 2 points.
 *
 * Formula: the points of intersectLineCircle whose u is in [0, 1]
 * Edge cases: A segment fully inside the circle gives no point.
 * @param segment - The segment from start to end, in user units.
 * @param circle - Center and radius of the circle, in user units.
 * @returns A new list; the inputs are not changed.
 * @example
 * intersectSegmentCircle({ start: {x:-10,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 }); // [{'x':-5,'y':0},{'x':5,'y':0}]
 * @see docs/geometry/
 */
export function intersectSegmentCircle(
  segment: Segment,
  circle: Circle,
): readonly Point[] {
  return intersectLineCircle(
    segment,
    circle,
  )
    .filter((u) => u >= 0 && u <= 1)
    .map((u) => interpolatePoints(
      segment.start,
      segment.end,
      u,
    ));
}
