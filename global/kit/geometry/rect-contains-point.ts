import type {
  Point,
  Rect,
} from './types.ts';

/**
 * Tells whether a point is inside a rectangle, edges included.
 *
 * Formula: x <= p.x <= x + width and y <= p.y <= y + height
 * Edge cases: The edges are inside.
 * @param rect - The rectangle, in user units.
 * @param p - The point, in user units.
 * @returns True when the condition of the formula holds.
 * @example
 * rectContainsPoint({x:0,y:0,width:10,height:10},{x:10,y:5}); // true
 * @see docs/geometry/
 */
export function rectContainsPoint(
  rect: Rect,
  p: Point,
): boolean {
  return p.x >= rect.x && p.x <= rect.x + rect.width && p.y >= rect.y && p.y <= rect.y + rect.height;
}
