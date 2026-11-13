import {
  describe,
  expect,
  it,
} from 'vitest';

import { distributeOnCircle } from './distribute-on-circle.ts';

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

describe('distributeOnCircle', () => {
  it('distributeOnCircle({ center: {x:0,y:0}, radius: 10 }, 6, 0)', () => {
    const result = distributeOnCircle(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 10,
      },
      6,
      0,
    );

    expect(rounded(result)).toEqual([
      {
        angleDegrees: 0,
        x: 10,
        y: 0,
      },
      {
        angleDegrees: 60,
        x: 5,
        y: 8.660254038,
      },
      {
        angleDegrees: 120,
        x: -5,
        y: 8.660254038,
      },
      {
        angleDegrees: 180,
        x: -10,
        y: 0,
      },
      {
        angleDegrees: 240,
        x: -5,
        y: -8.660254038,
      },
      {
        angleDegrees: 300,
        x: 5,
        y: -8.660254038,
      },
    ]);
  });

  it('distributeOnCircle({ center: {x:0,y:0}, radius: 10 }, 4, -90).map(p => p.angleDegrees)', () => {
    const result = distributeOnCircle(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 10,
      },
      4,
      -90,
    ).map((p) => p.angleDegrees);

    expect(rounded(result)).toEqual([
      -90,
      0,
      90,
      180,
    ]);
  });

  it('distributeOnCircle({ center: {x:0,y:0}, radius: 10 }, 0, 0)', () => {
    expect(() => distributeOnCircle(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 10,
      },
      0,
      0,
    )).toThrow(RangeError);
  });
});
