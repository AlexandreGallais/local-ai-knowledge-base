import {
  describe,
  expect,
  it,
} from 'vitest';

import { polarToCartesian } from './polar-to-cartesian.ts';

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

describe('polarToCartesian', () => {
  it('polarToCartesian({x:100,y:100},50,0)', () => {
    const result = polarToCartesian(
      {
        x: 100,
        y: 100,
      },
      50,
      0,
    );

    expect(rounded(result)).toEqual({
      x: 150,
      y: 100,
    });
  });

  it('polarToCartesian({x:100,y:100},50,90)', () => {
    const result = polarToCartesian(
      {
        x: 100,
        y: 100,
      },
      50,
      90,
    );

    expect(rounded(result)).toEqual({
      x: 100,
      y: 150,
    });
  });

  it('polarToCartesian({x:100,y:100},50,-90)', () => {
    const result = polarToCartesian(
      {
        x: 100,
        y: 100,
      },
      50,
      -90,
    );

    expect(rounded(result)).toEqual({
      x: 100,
      y: 50,
    });
  });

  it('polarToCartesian({x:0,y:0},10,45)', () => {
    const result = polarToCartesian(
      {
        x: 0,
        y: 0,
      },
      10,
      45,
    );

    expect(rounded(result)).toEqual({
      x: 7.071067812,
      y: 7.071067812,
    });
  });
});
