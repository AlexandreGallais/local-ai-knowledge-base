import {
  describe,
  expect,
  it,
} from 'vitest';

import { splitCubicBezier } from './split-cubic-bezier.ts';

const P0 = {
  x: 0,
  y: 0,
};
const P1 = {
  x: 0,
  y: 10,
};
const P2 = {
  x: 10,
  y: 10,
};
const P3 = {
  x: 10,
  y: 0,
};

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

describe('splitCubicBezier', () => {
  it('splitCubicBezier({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5)', () => {
    const result = splitCubicBezier(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      0.5,
    );

    expect(rounded(result)).toEqual([
      {
        p0: {
          x: 0,
          y: 0,
        },
        p1: {
          x: 0,
          y: 5,
        },
        p2: {
          x: 2.5,
          y: 7.5,
        },
        p3: {
          x: 5,
          y: 7.5,
        },
      },
      {
        p0: {
          x: 5,
          y: 7.5,
        },
        p1: {
          x: 7.5,
          y: 7.5,
        },
        p2: {
          x: 10,
          y: 5,
        },
        p3: {
          x: 10,
          y: 0,
        },
      },
    ]);
  });
});
