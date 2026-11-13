import {
  describe,
  expect,
  it,
} from 'vitest';

import { clientToUserPoint } from './client-to-user-point.ts';

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

describe('clientToUserPoint', () => {
  it('clientToUserPoint([2,0,0,2,0,50], {x:100,y:100})', () => {
    const result = clientToUserPoint(
      [
        2,
        0,
        0,
        2,
        0,
        50,
      ],
      {
        x: 100,
        y: 100,
      },
    );

    expect(rounded(result)).toEqual({
      x: 50,
      y: 25,
    });
  });
});
