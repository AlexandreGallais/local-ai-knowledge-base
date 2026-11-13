import {
  describe,
  expect,
  it,
} from 'vitest';

import { rotationMatrix } from './rotation-matrix.ts';
import { transformRect } from './transform-rect.ts';

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

describe('transformRect', () => {
  it('transformRect(rotationMatrix(45), {x:0,y:0,width:10,height:10})', () => {
    const result = transformRect(
      rotationMatrix(45),
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
    );

    expect(rounded(result)).toEqual({
      height: 14.142135624,
      width: 14.142135624,
      x: -7.071067812,
      y: 0,
    });
  });

  it('transformRect([2,0,0,2,0,50], {x:10,y:10,width:20,height:20})', () => {
    const result = transformRect(
      [
        2,
        0,
        0,
        2,
        0,
        50,
      ],
      {
        height: 20,
        width: 20,
        x: 10,
        y: 10,
      },
    );

    expect(rounded(result)).toEqual({
      height: 40,
      width: 40,
      x: 20,
      y: 70,
    });
  });
});
