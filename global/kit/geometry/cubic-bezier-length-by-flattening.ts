import type { CubicBezier } from './shapes.ts';

import { cubicBezierPoint } from './cubic-bezier-point.ts';
import { distanceBetween } from './distance-between.ts';

/**
 * Measures a cubic Bezier curve by adding the lengths of many straight segments: a check of cubicBezierLength.
 *
 * Formula: sum of the distances between curve points at t = i / segments
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @param segments - Number of straight segments used to measure the curve.
 * @returns The number the formula gives.
 * @example
 * cubicBezierLengthByFlattening({ p0: { x: 0, y: 0 }, p1: { x: 0, y: 10 }, p2: { x: 10, y: 10 }, p3: { x: 10, y: 0 } }, 1000); // 19.999992146
 * @see docs/geometry/
 */
export function cubicBezierLengthByFlattening(
  curve: CubicBezier,
  segments: number,
): number {
  const points = Array.from(
    { length: segments + 1 },
    (
      _unused,
      index,
    ) => cubicBezierPoint(
      curve,
      index / segments,
    ),
  );

  return points
    .slice(1)
    .reduce(
      (
        sum,
        point,
        index,
      ) => sum + distanceBetween(
        points[index] ?? point,
        point,
      ),
      0,
    );
}
