import {
  describe,
  expect,
  it,
} from 'vitest';

import { closestPointOnSegment } from './closest-point-on-segment.ts';

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

describe('closestPointOnSegment', () => {
  it('closestPointOnSegment({x:5,y:5},{x:0,y:0},{x:10,y:0})', () => {
    const result = closestPointOnSegment(
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

    expect(rounded(result)).toEqual({
      x: 5,
      y: 0,
    });
  });

  it('closestPointOnSegment({x:15,y:5},{x:0,y:0},{x:10,y:0})', () => {
    const result = closestPointOnSegment(
      {
        x: 15,
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

    expect(rounded(result)).toEqual({
      x: 10,
      y: 0,
    });
  });
});
