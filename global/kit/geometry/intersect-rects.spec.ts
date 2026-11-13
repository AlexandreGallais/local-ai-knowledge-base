import {
  describe,
  expect,
  it,
} from 'vitest';

import { intersectRects } from './intersect-rects.ts';

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

describe('intersectRects', () => {
  it('intersectRects({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10})', () => {
    const result = intersectRects(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        height: 10,
        width: 10,
        x: 5,
        y: 5,
      },
    );

    expect(rounded(result)).toEqual({
      height: 5,
      width: 5,
      x: 5,
      y: 5,
    });
  });

  it('intersectRects({x:0,y:0,width:10,height:10},{x:20,y:0,width:5,height:5})', () => {
    const result = intersectRects(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        height: 5,
        width: 5,
        x: 20,
        y: 0,
      },
    );

    expect(result).toBe(null);
  });
});
