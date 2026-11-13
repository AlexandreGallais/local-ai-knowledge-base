import {
  describe,
  expect,
  it,
} from 'vitest';

import { describeArc } from './describe-arc.ts';

describe('describeArc', () => {
  it('describeArc({ center: {x:100,y:100}, radius: 50, startAngleDegrees: 0, endAngleDegrees: 90 })', () => {
    const result = describeArc({
      center: {
        x: 100,
        y: 100,
      },
      endAngleDegrees: 90,
      radius: 50,
      startAngleDegrees: 0,
    });

    expect(result).toBe('M 150 100 A 50 50 0 0 1 100 150');
  });

  it('describeArc({ center: {x:100,y:100}, radius: 50, startAngleDegrees: -90, endAngleDegrees: 180 })', () => {
    const result = describeArc({
      center: {
        x: 100,
        y: 100,
      },
      endAngleDegrees: 180,
      radius: 50,
      startAngleDegrees: -90,
    });

    expect(result).toBe('M 100 50 A 50 50 0 1 1 50 100');
  });

  it('describeArc({ center: {x:100,y:100}, radius: 50, startAngleDegrees: 90, endAngleDegrees: 0 })', () => {
    const result = describeArc({
      center: {
        x: 100,
        y: 100,
      },
      endAngleDegrees: 0,
      radius: 50,
      startAngleDegrees: 90,
    });

    expect(result).toBe('M 100 150 A 50 50 0 0 0 150 100');
  });

  it('describeArc({ center: {x:100,y:100}, radius: 50, startAngleDegrees: 0, endAngleDegrees: 360 })', () => {
    const result = describeArc({
      center: {
        x: 100,
        y: 100,
      },
      endAngleDegrees: 360,
      radius: 50,
      startAngleDegrees: 0,
    });

    expect(result).toBe('M 150 100 A 50 50 0 1 1 50 100 A 50 50 0 1 1 150 100');
  });
});
