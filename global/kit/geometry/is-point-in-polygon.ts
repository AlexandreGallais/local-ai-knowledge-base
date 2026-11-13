import type { Segment } from './shapes.ts';
import type { Point } from './types.ts';

/**
 * Tells whether a point is inside a polygon (ray casting).
 *
 * Formula: cast a ray to the right; count the edges it crosses; odd = inside
 * Edge cases: A point exactly on an edge or on a vertex has no defined answer: test it apart with distancePointToSegment.
 * @param point - The point, in user units.
 * @param polygon - Vertices of the polygon, in order, in user units.
 * @returns True when the condition of the formula holds.
 * @example
 * isPointInPolygon({x:1,y:1}, lShape); // true
 * @see docs/geometry/
 */
export function isPointInPolygon(
  point: Point,
  polygon: readonly Point[],
): boolean {
  return edges(polygon).reduce(
    (
      isInside,
      {
        end: a,
        start: b,
      },
    ) => {
      const crosses = a.y > point.y !== b.y > point.y && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;

      return crosses ? !isInside : isInside;
    },
    false,
  );
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
