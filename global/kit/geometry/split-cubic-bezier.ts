import type { CubicBezier } from './shapes.ts';
import type { Point } from './types.ts';

import { interpolatePoints } from './interpolate-points.ts';

interface Construction {
  readonly p01: Point;
  readonly p012: Point;
  readonly p23: Point;
  readonly p0123: Point;
  readonly p123: Point;
}

/**
 * Cuts a cubic Bezier curve at t into two cubic curves (de Casteljau).
 *
 * Formula: de Casteljau: interpolate the 4 points at t, then the 3 results, then the 2. Left = first point of each level, right = last point of each level.
 * Edge cases: The two halves share the split point.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @param t - Position from 0 (start) to 1 (end).
 * @returns A new list; the inputs are not changed.
 * @example
 * splitCubicBezier({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5); // [[{'x':0,'y':0},{'x':0,'y':5},{'x':2.5,'y':7.5},{'x':5,'y':7.5}],[{'x':5,'y':7.5},{'x':7.5 ...
 * @see docs/geometry/
 */
export function splitCubicBezier(
  curve: CubicBezier,
  t: number,
): readonly [
  CubicBezier,
  CubicBezier,
] {
  const points = construction(
    curve,
    t,
  );

  return [
    {
      p0: curve.p0,
      p1: points.p01,
      p2: points.p012,
      p3: points.p0123,
    },
    {
      p0: points.p0123,
      p1: points.p123,
      p2: points.p23,
      p3: curve.p3,
    },
  ];
}

function between(
  points: readonly Point[],
  t: number,
): readonly Point[] {
  return points
    .slice(1)
    .map((
      point,
      index,
    ) => interpolatePoints(
      points[index] ?? point,
      point,
      t,
    ));
}

function construction(
  curve: CubicBezier,
  t: number,
): Construction {
  const first = between(
    [
      curve.p0,
      curve.p1,
      curve.p2,
      curve.p3,
    ],
    t,
  );
  const second = between(
    first,
    t,
  );
  const middle = between(
    second,
    t,
  )[0] ?? curve.p0;

  return {
    p01: first[0] ?? curve.p0,
    p012: second[0] ?? curve.p0,
    p23: first[2] ?? curve.p3,
    p0123: middle,
    p123: second[1] ?? curve.p3,
  };
}
