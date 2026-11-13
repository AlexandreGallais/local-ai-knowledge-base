import {
  describe,
  expect,
  it,
} from 'vitest';

import { arcCenterToEndpoint } from './arc-center-to-endpoint.ts';

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

describe('arcCenterToEndpoint', () => {
  it('arcCenterToEndpoint({cx:0,cy:10,rx:10,ry:10,rotationDegrees:0,startAngleDegrees:-90,sweepAngleDegrees:90})', () => {
    const result = arcCenterToEndpoint({
      cx: 0,
      cy: 10,
      rotationDegrees: 0,
      rx: 10,
      ry: 10,
      startAngleDegrees: -90,
      sweepAngleDegrees: 90,
    });

    expect(rounded(result)).toEqual({
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
  });
});
