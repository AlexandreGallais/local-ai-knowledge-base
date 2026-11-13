import {
  describe,
  expect,
  it,
} from 'vitest';

import { distancePointToSegment } from './distance-point-to-segment.ts';

describe('distancePointToSegment', () => {
  it('distancePointToSegment({x:5,y:5},{x:0,y:0},{x:10,y:0})', () => {
    const result = distancePointToSegment(
      {
        x: 5,
        y: 5,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
    );

    expect(result).toBeCloseTo(
      5,
      8,
    );
  });

  it('distancePointToSegment({x:13,y:4},{x:0,y:0},{x:10,y:0})', () => {
    const result = distancePointToSegment(
      {
        x: 13,
        y: 4,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
    );

    expect(result).toBeCloseTo(
      5,
      8,
    );
  });
});
