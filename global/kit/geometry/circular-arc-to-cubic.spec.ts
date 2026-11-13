import {
  describe,
  expect,
  it,
} from 'vitest';

import { circularArcToCubic } from './circular-arc-to-cubic.ts';

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

describe('circularArcToCubic', () => {
  it('circularArcToCubic({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 90 })', () => {
    const result = circularArcToCubic({
      center: {
        x: 0,
        y: 0,
      },
      endAngleDegrees: 90,
      radius: 10,
      startAngleDegrees: 0,
    });

    expect(rounded(result)).toEqual({
      p0: {
        x: 10,
        y: 0,
      },
      p1: {
        x: 10,
        y: 5.522847498,
      },
      p2: {
        x: 5.522847498,
        y: 10,
      },
      p3: {
        x: 0,
        y: 10,
      },
    });
  });

  it('circularArcToCubic({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 180 })', () => {
    expect(() => circularArcToCubic({
      center: {
        x: 0,
        y: 0,
      },
      endAngleDegrees: 180,
      radius: 10,
      startAngleDegrees: 0,
    })).toThrow(RangeError);
  });
});
