import {
  describe,
  expect,
  it,
} from 'vitest';

import { cartesianToPolar } from './cartesian-to-polar.ts';

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

describe('cartesianToPolar', () => {
  it('cartesianToPolar({x:100,y:100},{x:100,y:150})', () => {
    const result = cartesianToPolar(
      {
        x: 100,
        y: 100,
      },
      {
        x: 100,
        y: 150,
      },
    );

    expect(rounded(result)).toEqual({
      angleDegrees: 90,
      radius: 50,
    });
  });
});
