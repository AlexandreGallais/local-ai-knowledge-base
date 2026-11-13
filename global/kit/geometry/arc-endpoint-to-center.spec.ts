import {
  describe,
  expect,
  it,
} from 'vitest';

import { arcEndpointToCenter } from './arc-endpoint-to-center.ts';

// Rounds every number to 9 decimals, as the values of the research report are.
function rounded(value: unknown): unknown {
  return JSON.parse(JSON.stringify(
    value,
    (
      _key,
      item: unknown,
    ) => typeof item === 'number' ? Number(item.toFixed(9)) + 0 : item,
  ));
}

describe('arcEndpointToCenter', () => {
  it('arcEndpointToCenter({x1:0,y1:0,rx:10,ry:10,rotationDegrees:0,largeArc:false,sweep:true,x2:10,y2:10})', () => {
    const result = arcEndpointToCenter({
      largeArc: false,
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      sweep: true,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 10,
    });

    expect(rounded(result)).toEqual({
      cx: 0,
      cy: 10,
      kind: 'arc',
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      startAngleDegrees: -90,
      sweepAngleDegrees: 90,
    });
  });

  it('arcEndpointToCenter({ x1: 0, y1: 0, rx: 10, ry: 10, rotationDegrees: 0, largeArc: false, sweep: false, x2: 10, y2: 10 })', () => {
    const result = arcEndpointToCenter({
      largeArc: false,
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      sweep: false,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 10,
    });

    expect(rounded(result)).toEqual({
      cx: 10,
      cy: 0,
      kind: 'arc',
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      startAngleDegrees: 180,
      sweepAngleDegrees: -90,
    });
  });

  it('arcEndpointToCenter({ x1: 0, y1: 0, rx: 10, ry: 10, rotationDegrees: 0, largeArc: true, sweep: true, x2: 10, y2: 10 })', () => {
    const result = arcEndpointToCenter({
      largeArc: true,
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      sweep: true,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 10,
    });

    expect(rounded(result)).toEqual({
      cx: 10,
      cy: 0,
      kind: 'arc',
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      startAngleDegrees: 180,
      sweepAngleDegrees: 270,
    });
  });

  it('arcEndpointToCenter({ x1: 0, y1: 0, rx: 1, ry: 1, rotationDegrees: 0, largeArc: false, sweep: true, x2: 10, y2: 0 })', () => {
    const result = arcEndpointToCenter({
      largeArc: false,
      rotationDegrees: 0,
      rx: 1,
      ry: 1,
      sweep: true,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 0,
    });

    expect(rounded(result)).toEqual({
      cx: 5,
      cy: 0,
      kind: 'arc',
      rotationDegrees: 0,
      rx: 5,
      ry: 5,
      startAngleDegrees: 180,
      sweepAngleDegrees: 180,
    });
  });

  it('arcEndpointToCenter({ x1: 0, y1: 0, rx: 0, ry: 0, rotationDegrees: 0, largeArc: false, sweep: true, x2: 10, y2: 10 })', () => {
    const result = arcEndpointToCenter({
      largeArc: false,
      rotationDegrees: 0,
      rx: 0,
      ry: 0,
      sweep: true,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 10,
    });

    expect(rounded(result)).toEqual({ kind: 'line' });
  });

  it('arcEndpointToCenter({ x1: 0, y1: 0, rx: 10, ry: 10, rotationDegrees: 0, largeArc: false, sweep: true, x2: 0, y2: 0 })', () => {
    const result = arcEndpointToCenter({
      largeArc: false,
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      sweep: true,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    });

    expect(rounded(result)).toEqual({ kind: 'omitted' });
  });
});
