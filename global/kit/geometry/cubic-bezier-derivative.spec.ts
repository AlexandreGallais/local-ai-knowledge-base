import {
  describe,
  expect,
  it,
} from 'vitest';

import { cubicBezierDerivative } from './cubic-bezier-derivative.ts';

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

describe('cubicBezierDerivative', () => {
  it('cubicBezierDerivative({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0)', () => {
    const result = cubicBezierDerivative(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      0,
    );

    expect(rounded(result)).toEqual({
      x: 0,
      y: 30,
    });
  });

  it('cubicBezierDerivative({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5)', () => {
    const result = cubicBezierDerivative(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      0.5,
    );

    expect(rounded(result)).toEqual({
      x: 15,
      y: 0,
    });
  });
});
