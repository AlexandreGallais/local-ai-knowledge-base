import type {
  CenterArc,
  EndpointArc,
} from './results.ts';

import { pointOnEllipse } from './point-on-ellipse.ts';

/**
 * Turns an arc given by its center and angles into the parameters of the SVG A command.
 *
 * Formula: start = pointOnEllipse(start angle); end = pointOnEllipse(start + sweep); largeArc = |sweep| > 180; sweep flag = sweep > 0
 * Edge cases: |sweep| >= 360 cannot be written as one arc.
 * @param arc - Center and radius, in user units, then start and end angles in degrees, 0 on +x, clockwise on screen.
 * @returns A new EndpointArc value, as described above.
 * @example
 * arcCenterToEndpoint({cx:0,cy:10,rx:10,ry:10,rotationDegrees:0,startAngleDegrees:-90,sweepAngleDegrees:90}); // {'x1':0,'y1':0,'rx':10,'ry':10,'rotationDegrees':0,'largeArc':false,'sweep':true,'x2':10,' ...
 * @see docs/geometry/
 */
export function arcCenterToEndpoint(arc: CenterArc): EndpointArc {
  const start = pointOnEllipse(
    arc,
    arc.startAngleDegrees,
  );
  const end = pointOnEllipse(
    arc,
    arc.startAngleDegrees + arc.sweepAngleDegrees,
  );

  return {
    largeArc: Math.abs(arc.sweepAngleDegrees) > 180,
    rotationDegrees: arc.rotationDegrees,
    rx: arc.rx,
    ry: arc.ry,
    sweep: arc.sweepAngleDegrees > 0,
    x1: start.x,
    x2: end.x,
    y1: start.y,
    y2: end.y,
  };
}
