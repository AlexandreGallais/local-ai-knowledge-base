import type { Point } from './types.ts';

import { formatNumber } from './format-number.ts';

/**
 * Gives the path data of a polyline through points, closed with Z or not.
 *
 * Formula: `M x y L x y ...`, with ` Z` when closed
 * Edge cases: Fewer than two points: throws `RangeError`. After `Z` the current point is the start point of the subpath.
 * @param points - The points, in order, in user units.
 * @param isClosed - True to close the path with Z.
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @throws {RangeError} polylinePath: at least two points are required.
 * @example
 * polylinePath([{x:0,y:0},{x:10,y:0},{x:10,y:10}], true); // 'M 0 0 L 10 0 L 10 10 Z'
 * @see docs/geometry/
 */
export function polylinePath(
  points: readonly Point[],
  isClosed: boolean,
): string {
  if (points.length < 2) {
    throw new RangeError('polylinePath: at least two points are required');
  }

  const body = points
    .map((
      p,
      index,
    ) => `${index === 0 ? 'M' : 'L'} ${coordinate(p.x)} ${coordinate(p.y)}`)
    .join(' ');

  return isClosed ? `${body} Z` : body;
}

function coordinate(value: number): string {
  return formatNumber(
    value,
    3,
  );
}
