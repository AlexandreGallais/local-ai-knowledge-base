import type {
  AspectRatio,
  ViewBoxFit,
} from './shapes.ts';
import type {
  Matrix,
  Point,
  Rect,
} from './types.ts';

function viewBoxScales(
  viewBox: Rect,
  viewport: Rect,
  fit: ViewBoxFit,
): Point {
  const x = viewport.width / viewBox.width;
  const y = viewport.height / viewBox.height;
  const uniform = fit === 'meet'
    ? Math.min(
        x,
        y,
      )
    : Math.max(
        x,
        y,
      );

  return fit === 'none'
    ? {
        x,
        y,
      }
    : {
        x: uniform,
        y: uniform,
      };
}

const ALIGN_SHARE = {
  max: 1,
  mid: 0.5,
  min: 0,
} as const;

/**
 * Gives the matrix from viewBox units to viewport pixels, as preserveAspectRatio sets it.
 *
 * Formula: sx = vp.width / vb.width; sy = vp.height / vb.height; meet: both = min; slice: both = max; tx = vp.x - vb.x*sx; ty = vp.y - vb.y*sy; mid adds half the free space, max adds all of it
 * Edge cases: viewBox width or height <= 0: throws `RangeError` (SVG: negative is an error, zero disables rendering). `none` ignores the alignment and scales each axis apart.
 * @param viewBox - The viewBox, in user units.
 * @param viewport - The viewport, in screen pixels.
 * @param aspect - preserveAspectRatio: alignX, alignY (min, mid or max) and fit (meet, slice or none).
 * @returns A new matrix [a, b, c, d, e, f].
 * @throws {RangeError} viewBoxMatrix: viewBox width and height must be > 0.
 * @example
 * viewBoxMatrix({x:0,y:0,width:100,height:50}, {x:0,y:0,width:200,height:200}, { alignX: 'mid', alignY: 'mid', fit: 'meet' }); // [2,0,0,2,0,50]
 * @see docs/geometry/
 */
export function viewBoxMatrix(
  viewBox: Rect,
  viewport: Rect,
  aspect: AspectRatio,
): Matrix {
  if (viewBox.width <= 0 || viewBox.height <= 0) {
    throw new RangeError('viewBoxMatrix: viewBox width and height must be > 0');
  }

  const scale = viewBoxScales(
    viewBox,
    viewport,
    aspect.fit,
  );
  const shareX = aspect.fit === 'none' ? 0 : ALIGN_SHARE[aspect.alignX];
  const shareY = aspect.fit === 'none' ? 0 : ALIGN_SHARE[aspect.alignY];
  const x = viewport.x - viewBox.x * scale.x + (viewport.width - viewBox.width * scale.x) * shareX;
  const y = viewport.y - viewBox.y * scale.y + (viewport.height - viewBox.height * scale.y) * shareY;

  return [
    scale.x,
    0,
    0,
    scale.y,
    x,
    y,
  ];
}
