import type { Segment } from './shapes.ts';
import type { Point } from './types.ts';

import { crossProduct } from './cross-product.ts';
import { subtractVectors } from './subtract-vectors.ts';

/**
 * Tells whether a polygon is convex.
 *
 * Formula: the cross product of each pair of consecutive edges has the same sign
 * Edge cases: Three points in a line give a cross product of 0: skip it.
 * @param points - The points, in order, in user units.
 * @returns True when the condition of the formula holds.
 * @example
 * isPolygonConvex(square); // true
 * @see docs/geometry/
 */
export function isPolygonConvex(points: readonly Point[]): boolean {
  const turns = edges(points).map((
    {
      end,
      start,
    },
    index,
  ) => {
    const after = points[(index + 2) % points.length] ?? end;

    return Math.sign(crossProduct(
      subtractVectors(
        end,
        start,
      ),
      subtractVectors(
        after,
        end,
      ),
    ));
  });
  const signs = new Set(turns.filter((sign) => sign !== 0));

  return signs.size <= 1;
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
