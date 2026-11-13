import type { Rect } from './types.ts';

/**
 * Grows a rectangle by a margin on each side.
 *
 * Formula: x - m, y - m, width + 2m, height + 2m
 * Edge cases: With m = stroke-width / 2 it gives the stroke box of a rect, circle or ellipse only. A mitre join or a square cap goes further.
 * @param rect - The rectangle, in user units.
 * @param margin - Space added on each side, in user units; negative shrinks.
 * @returns A new rectangle, in user units.
 * @example
 * expandRect({x:10,y:10,width:20,height:20},5); // {'x':5,'y':5,'width':30,'height':30}
 * @see docs/geometry/
 */
export function expandRect(
  rect: Rect,
  margin: number,
): Rect {
  return {
    height: rect.height + 2 * margin,
    width: rect.width + 2 * margin,
    x: rect.x - margin,
    y: rect.y - margin,
  };
}
