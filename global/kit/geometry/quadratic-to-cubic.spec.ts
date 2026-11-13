import {
  describe,
  expect,
  it,
} from 'vitest';

import { quadraticToCubic } from './quadratic-to-cubic.ts';

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

describe('quadraticToCubic', () => {
  it('quadraticToCubic({ p0: {x:0,y:0}, p1: {x:6,y:12}, p2: {x:12,y:0} })', () => {
    const result = quadraticToCubic({
      p0: {
        x: 0,
        y: 0,
      },
      p1: {
        x: 6,
        y: 12,
      },
      p2: {
        x: 12,
        y: 0,
      },
    });

    expect(rounded(result)).toEqual({
      p0: {
        x: 0,
        y: 0,
      },
      p1: {
        x: 4,
        y: 8,
      },
      p2: {
        x: 8,
        y: 8,
      },
      p3: {
        x: 12,
        y: 0,
      },
    });
  });
});
