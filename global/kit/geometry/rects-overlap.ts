import type { Rect } from './types.ts';

/**
 * Tells whether two rectangles share an area.
 *
 * Formula: a.x < b.right and b.x < a.right and a.y < b.bottom and b.y < a.bottom
 * Edge cases: Two rectangles that only touch do not overlap.
 * @param a - First rectangle, in user units.
 * @param b - Second rectangle, in user units.
 * @returns True when the condition of the formula holds.
 * @example
 * rectsOverlap({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10}); // true
 * @see docs/geometry/
 */
export function rectsOverlap(
  a: Rect,
  b: Rect,
): boolean {
  return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}
