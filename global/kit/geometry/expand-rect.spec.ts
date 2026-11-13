import {
  describe,
  expect,
  it,
} from 'vitest';

import { expandRect } from './expand-rect.ts';

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

describe('expandRect', () => {
  it('expandRect({x:10,y:10,width:20,height:20},5)', () => {
    const result = expandRect(
      {
        height: 20,
        width: 20,
        x: 10,
        y: 10,
      },
      5,
    );

    expect(rounded(result)).toEqual({
      height: 30,
      width: 30,
      x: 5,
      y: 5,
    });
  });
});
