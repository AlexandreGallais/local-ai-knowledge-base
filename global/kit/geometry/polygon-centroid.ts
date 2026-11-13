import type { Segment } from './shapes.ts';
import type { Point } from './types.ts';

import { polygonSignedArea } from './polygon-signed-area.ts';

/**
 * Gives the center of mass of a polygon.
 *
 * Formula: cx = 1/(6A) * sum((x_i + x_(i+1)) * cross_i); cy = 1/(6A) * sum((y_i + y_(i+1)) * cross_i), with cross_i = x_i*y_(i+1) - x_(i+1)*y_i and A the signed area
 * Edge cases: Area 0: throws `RangeError`. It is not the mean of the points, and it can be outside a concave polygon.
 * @param points - The points, in order, in user units.
 * @returns A new point, in user units.
 * @throws {RangeError} polygonCentroid: polygon area is zero.
 * @example
 * polygonCentroid(square); // {'x':2,'y':2}
 * @see docs/geometry/
 */
export function polygonCentroid(points: readonly Point[]): Point {
  const area = polygonSignedArea(points);

  if (area === 0) {
    throw new RangeError('polygonCentroid: polygon area is zero');
  }

  const sums = centroidSums(points);

  return {
    x: sums.x / (6 * area),
    y: sums.y / (6 * area),
  };
}

function centroidSums(points: readonly Point[]): Point {
  return edges(points).reduce(
    (
      total,
      {
        end,
        start,
      },
    ) => {
      const cross = start.x * end.y - end.x * start.y;

      return {
        x: total.x + (start.x + end.x) * cross,
        y: total.y + (start.y + end.y) * cross,
      };
    },
    {
      x: 0,
      y: 0,
    },
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
