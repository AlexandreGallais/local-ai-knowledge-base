import type { Segment } from './shapes.ts';
import type { Point } from './types.ts';

import { intersectLines } from './intersect-lines.ts';

/**
 * Gives where two segments cross, or that they do not.
 *
 * Formula: intersectLines, kept only when 0 <= ua <= 1 and 0 <= ub <= 1
 * Edge cases: Parallel or coincident segments give `null`, even when they overlap. End points count as crossing.
 * @param a - First segment, in user units.
 * @param b - Second segment, in user units.
 * @returns A new Point | null value, as described above.
 * @example
 * intersectSegments({ start: {x:0,y:0}, end: {x:10,y:10} }, { start: {x:0,y:10}, end: {x:10,y:0} }); // {'x':5,'y':5}
 * @see docs/geometry/
 */
export function intersectSegments(
  a: Segment,
  b: Segment,
): null | Point {
  const result = intersectLines(
    a,
    b,
  );

  if (result.kind !== 'point') {
    return null;
  }

  return result.ua >= 0 && result.ua <= 1 && result.ub >= 0 && result.ub <= 1 ? result.point : null;
}
