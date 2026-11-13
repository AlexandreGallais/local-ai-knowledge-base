import type { Segment } from './shapes.ts';
import type { Point } from './types.ts';

/**
 * Gives the area of a polygon, signed by the direction of its vertices (shoelace formula).
 *
 * Formula: 1/2 * sum(x_i*y_(i+1) - x_(i+1)*y_i)
 * Edge cases: With y down, a positive area means the points turn clockwise on screen (the reverse of the usual maths rule). Wrong for a polygon that crosses itself.
 * @param points - The points, in order, in user units.
 * @returns The number the formula gives.
 * @example
 * polygonSignedArea(square); // 16
 * @see docs/geometry/
 */
export function polygonSignedArea(points: readonly Point[]): number {
  return edges(points).reduce(
    (
      sum,
      {
        end,
        start,
      },
    ) => sum + start.x * end.y - end.x * start.y,
    0,
  ) / 2;
}

function edges(points: readonly Point[]): readonly Segment[] {
  return points.map((
    start,
    index,
  ) => ({
    end: points[(index + 1) % points.length] ?? start,
    start,
  }));
}
