import {
  describe,
  expect,
  it,
} from 'vitest';

import { rectAnchorPoint } from './rect-anchor-point.ts';

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

describe('rectAnchorPoint', () => {
  it('rectAnchorPoint({x:10,y:20,width:100,height:40},\'center\')', () => {
    const result = rectAnchorPoint(
      {
        height: 40,
        width: 100,
        x: 10,
        y: 20,
      },
      'center',
    );

    expect(rounded(result)).toEqual({
      x: 60,
      y: 40,
    });
  });

  it('rectAnchorPoint({x:10,y:20,width:100,height:40},\'bottom-right\')', () => {
    const result = rectAnchorPoint(
      {
        height: 40,
        width: 100,
        x: 10,
        y: 20,
      },
      'bottom-right',
    );

    expect(rounded(result)).toEqual({
      x: 110,
      y: 60,
    });
  });

  it('rectAnchorPoint({x:10,y:20,width:100,height:40},\'top-center\')', () => {
    const result = rectAnchorPoint(
      {
        height: 40,
        width: 100,
        x: 10,
        y: 20,
      },
      'top-center',
    );

    expect(rounded(result)).toEqual({
      x: 60,
      y: 20,
    });
  });
});
