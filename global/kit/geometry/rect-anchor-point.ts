import type { AnchorName } from './shapes.ts';
import type {
  Point,
  Rect,
} from './types.ts';

/**
 * Gives one of the nine anchor points of a rectangle, as its center or top-left corner.
 *
 * Formula: x = left, middle or right edge; y = top, middle or bottom edge
 * Edge cases: Nine names: top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right.
 * @param rect - The rectangle, in user units.
 * @param anchor - Name of the anchor point of the rectangle, as "top-left" or "center".
 * @returns A new point, in user units.
 * @example
 * rectAnchorPoint({x:10,y:20,width:100,height:40},'center'); // {'x':60,'y':40}
 * @see docs/geometry/
 */
export function rectAnchorPoint(
  rect: Rect,
  anchor: AnchorName,
): Point {
  return {
    x: rect.x + rect.width * anchorShare(
      anchor,
      'left',
      'right',
    ),
    y: rect.y + rect.height * anchorShare(
      anchor,
      'top',
      'bottom',
    ),
  };
}

function anchorShare(
  anchor: AnchorName,
  low: string,
  high: string,
): number {
  if (anchor.includes(low)) {
    return 0;
  }

  return anchor.includes(high) ? 1 : 0.5;
}
