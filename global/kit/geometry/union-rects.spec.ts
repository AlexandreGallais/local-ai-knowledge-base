import {
  describe,
  expect,
  it,
} from 'vitest';

import { unionRects } from './union-rects.ts';

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

describe('unionRects', () => {
  it('unionRects({x:0,y:0,width:10,height:10},{x:20,y:5,width:10,height:10})', () => {
    const result = unionRects(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        height: 10,
        width: 10,
        x: 20,
        y: 5,
      },
    );

    expect(rounded(result)).toEqual({
      height: 15,
      width: 30,
      x: 0,
      y: 0,
    });
  });
});
