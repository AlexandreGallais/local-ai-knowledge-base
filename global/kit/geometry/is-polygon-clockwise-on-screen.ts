import type { Point } from './types.ts';

import { polygonSignedArea } from './polygon-signed-area.ts';

/**
 * Tells whether the vertices of a polygon turn clockwise on screen, y axis down.
 *
 * Formula: polygonSignedArea(points) > 0
 * Edge cases: True for (0,0), (4,0), (4,4), (0,4): right, then down, then left.
 * @param points - The points, in order, in user units.
 * @returns True when the condition of the formula holds.
 * @example
 * isPolygonClockwiseOnScreen(square); // true
 * @see docs/geometry/
 */
export function isPolygonClockwiseOnScreen(points: readonly Point[]): boolean {
  return polygonSignedArea(points) > 0;
}
