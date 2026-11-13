import type {
  Point,
  Rect,
} from './types.ts';

/**
 * Gives where the line from the center of a rectangle toward a point leaves the rectangle.
 *
 * Formula: d = target - centre; scale = min(halfWidth / |d.x|, halfHeight / |d.y|); point = centre + d * scale
 * Edge cases: Target on the centre: throws `RangeError`. Use it to start a connecting line on the border of a symbol.
 * @param rect - The rectangle, in user units.
 * @param target - Point the line goes toward, in user units.
 * @returns A new point, in user units.
 * @throws {RangeError} rectEdgePointToward: target is the centre of the rectangle.
 * @example
 * rectEdgePointToward({x:0,y:0,width:40,height:20},{x:100,y:10}); // {'x':40,'y':10}
 * @see docs/geometry/
 */
export function rectEdgePointToward(
  rect: Rect,
  target: Point,
): Point {
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  const dx = target.x - cx;
  const dy = target.y - cy;

  if (dx === 0 && dy === 0) {
    throw new RangeError('rectEdgePointToward: target is the centre of the rectangle');
  }

  const scaleX = dx === 0 ? Number.POSITIVE_INFINITY : rect.width / 2 / Math.abs(dx);
  const scaleY = dy === 0 ? Number.POSITIVE_INFINITY : rect.height / 2 / Math.abs(dy);
  const scale = Math.min(
    scaleX,
    scaleY,
  );

  return {
    x: cx + dx * scale,
    y: cy + dy * scale,
  };
}
