import type {
  ArcConversion,
  EndpointArc,
} from './results.ts';
import type { Point } from './types.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';
import { signedAngleBetweenVectors } from './signed-angle-between-vectors.ts';

interface ArcFrame {
  readonly cosPhi: number;
  readonly rx: number;
  readonly ry: number;
  readonly sinPhi: number;
  readonly x1p: number;
  readonly y1p: number;
}

/**
 * Turns the endpoint form of an SVG arc command into its center, radii and angles.
 *
 * Formula: SVG 2, B.2.4 and B.2.5. (1) x1p, y1p = rotate(-phi) of half the chord. (2) L = x1p^2/rx^2 + y1p^2/ry^2; if L > 1, multiply rx and ry by sqrt(L). (3) cxp, cyp = +-sqrt((rx^2*ry^2 - rx^2*y1p^2 - ry^2*x1p^2) / (rx^2*y1p^2 + ry^2*x1p^2)) * (rx*y1p/ry, -ry*x1p/rx), sign + when largeArc != sweep. (4) centre = rotate(phi) of (cxp, cyp) + chord middle. (5) start angle and sweep by signed angles; sweep < 0 when the sweep flag is 0.
 * Edge cases: Equal end points: `omitted`. rx = 0 or ry = 0: `line`. Negative radius: absolute value. Radii too small: scaled up. Clamp the square root argument at 0.
 * @param arc - Center and radius, in user units, then start and end angles in degrees, 0 on +x, clockwise on screen.
 * @returns A new ArcConversion value, as described above.
 * @example
 * arcEndpointToCenter({x1:0,y1:0,rx:10,ry:10,rotationDegrees:0,largeArc:false,sweep:true,x2:10,y2:10}); // {'kind':'arc','cx':0,'cy':10,'rx':10,'ry':10,'rotationDegrees':0,'startAngleDegrees':-90,' ...
 * @see docs/geometry/
 */
export function arcEndpointToCenter(arc: EndpointArc): ArcConversion {
  if (arc.x1 === arc.x2 && arc.y1 === arc.y2) {
    return { kind: 'omitted' };
  }

  if (arc.rx === 0 || arc.ry === 0) {
    return { kind: 'line' };
  }

  const frame = arcFrame(arc);
  const center = rotatedCenter(
    arc,
    frame,
  );
  const [
    start,
    end,
  ] = unitVectors(
    frame,
    center,
  );

  return {
    cx: frame.cosPhi * center.x - frame.sinPhi * center.y + (arc.x1 + arc.x2) / 2,
    cy: frame.sinPhi * center.x + frame.cosPhi * center.y + (arc.y1 + arc.y2) / 2,
    kind: 'arc',
    rotationDegrees: arc.rotationDegrees,
    rx: frame.rx,
    ry: frame.ry,
    startAngleDegrees: signedAngleBetweenVectors(
      {
        x: 1,
        y: 0,
      },
      start,
    ),
    sweepAngleDegrees: sweepOf(
      start,
      end,
      arc.sweep,
    ),
  };
}

function arcFrame(arc: EndpointArc): ArcFrame {
  const phi = degreesToRadians(arc.rotationDegrees);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const halfDx = (arc.x1 - arc.x2) / 2;
  const halfDy = (arc.y1 - arc.y2) / 2;
  const x1p = cosPhi * halfDx + sinPhi * halfDy;
  const y1p = -sinPhi * halfDx + cosPhi * halfDy;
  const lambda = (x1p * x1p) / (arc.rx * arc.rx) + (y1p * y1p) / (arc.ry * arc.ry);
  const scale = lambda > 1 ? Math.sqrt(lambda) : 1;

  return {
    cosPhi,
    rx: Math.abs(arc.rx) * scale,
    ry: Math.abs(arc.ry) * scale,
    sinPhi,
    x1p,
    y1p,
  };
}

function rotatedCenter(
  arc: EndpointArc,
  frame: ArcFrame,
): Point {
  const {
    rx,
    ry,
    x1p,
    y1p,
  } = frame;
  const numerator = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const denominator = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const magnitude = Math.sqrt(Math.max(
    0,
    numerator / denominator,
  ));
  const coefficient = arc.largeArc === arc.sweep ? -magnitude : magnitude;

  return {
    x: (coefficient * rx * y1p) / ry,
    y: (-coefficient * ry * x1p) / rx,
  };
}

function sweepOf(
  start: Point,
  end: Point,
  sweep: boolean,
): number {
  const angle = signedAngleBetweenVectors(
    start,
    end,
  ) % 360;

  if (!sweep && angle > 0) {
    return angle - 360;
  }

  return sweep && angle < 0 ? angle + 360 : angle;
}

function unitVectors(
  frame: ArcFrame,
  center: Point,
): readonly [
  Point,
  Point,
] {
  return [
    {
      x: (frame.x1p - center.x) / frame.rx,
      y: (frame.y1p - center.y) / frame.ry,
    },
    {
      x: (-frame.x1p - center.x) / frame.rx,
      y: (-frame.y1p - center.y) / frame.ry,
    },
  ];
}
