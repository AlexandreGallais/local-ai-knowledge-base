import type { Rect } from './types.ts';

/**
 * Gives the smallest rectangle that holds two rectangles.
 *
 * Formula: the smallest rectangle that holds both
 * Edge cases: An empty rectangle at (0, 0) still pulls the union to the origin: skip elements that are not drawn.
 * @param a - First rectangle, in user units.
 * @param b - Second rectangle, in user units.
 * @returns A new rectangle, in user units.
 * @example
 * unionRects({x:0,y:0,width:10,height:10},{x:20,y:5,width:10,height:10}); // {'x':0,'y':0,'width':30,'height':15}
 * @see docs/geometry/
 */
export function unionRects(
  a: Rect,
  b: Rect,
): Rect {
  const x = Math.min(
    a.x,
    b.x,
  );
  const y = Math.min(
    a.y,
    b.y,
  );

  return {
    height: Math.max(
      a.y + a.height,
      b.y + b.height,
    ) - y,
    width: Math.max(
      a.x + a.width,
      b.x + b.width,
    ) - x,
    x,
    y,
  };
}
