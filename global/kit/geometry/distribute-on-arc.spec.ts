import {
  describe,
  expect,
  it,
} from 'vitest';

import { distributeOnArc } from './distribute-on-arc.ts';

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

describe('distributeOnArc', () => {
  it('distributeOnArc({ center: {x:0,y:0}, radius: 10, startAngleDegrees: -180, endAngleDegrees: 0 }, 5).map(p => p.angleDegrees)', () => {
    const result = distributeOnArc(
      {
        center: {
          x: 0,
          y: 0,
        },
        endAngleDegrees: 0,
        radius: 10,
        startAngleDegrees: -180,
      },
      5,
    ).map((p) => p.angleDegrees);

    expect(rounded(result)).toEqual([
      -180,
      -135,
      -90,
      -45,
      0,
    ]);
  });

  it('distributeOnArc({ center: {x:0,y:0}, radius: 10, startAngleDegrees: -180, endAngleDegrees: 0 }, 3)', () => {
    const result = distributeOnArc(
      {
        center: {
          x: 0,
          y: 0,
        },
        endAngleDegrees: 0,
        radius: 10,
        startAngleDegrees: -180,
      },
      3,
    );

    expect(rounded(result)).toEqual([
      {
        angleDegrees: -180,
        x: -10,
        y: 0,
      },
      {
        angleDegrees: -90,
        x: 0,
        y: -10,
      },
      {
        angleDegrees: 0,
        x: 10,
        y: 0,
      },
    ]);
  });

  it('distributeOnArc({ center: {x:0,y:0}, radius: 10, startAngleDegrees: -180, endAngleDegrees: 0 }, 1)', () => {
    const result = distributeOnArc(
      {
        center: {
          x: 0,
          y: 0,
        },
        endAngleDegrees: 0,
        radius: 10,
        startAngleDegrees: -180,
      },
      1,
    );

    expect(rounded(result)).toEqual([{
      angleDegrees: -90,
      x: 0,
      y: -10,
    }]);
  });
});
