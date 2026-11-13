import type { Rect } from './types.ts';

/**
 * Gives the area two rectangles share.
 *
 * Formula: x = max of the lefts; right = min of the rights; same for y
 * Edge cases: No common point: `null`. Rectangles that touch give a rectangle of width or height 0.
 * @param a - First rectangle, in user units.
 * @param b - Second rectangle, in user units.
 * @returns A new Rect | null value, as described above.
 * @example
 * intersectRects({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10}); // {'x':5,'y':5,'width':5,'height':5}
 * @see docs/geometry/
 */
export function intersectRects(
  a: Rect,
  b: Rect,
): null | Rect {
  const x = Math.max(
    a.x,
    b.x,
  );
  const y = Math.max(
    a.y,
    b.y,
  );
  const width = Math.min(
    a.x + a.width,
    b.x + b.width,
  ) - x;
  const height = Math.min(
    a.y + a.height,
    b.y + b.height,
  ) - y;

  return width < 0 || height < 0
    ? null
    : {
        height,
        width,
        x,
        y,
      };
}
