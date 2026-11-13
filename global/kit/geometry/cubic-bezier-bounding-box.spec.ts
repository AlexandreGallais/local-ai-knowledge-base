import {
  describe,
  expect,
  it,
} from 'vitest';

import { cubicBezierBoundingBox } from './cubic-bezier-bounding-box.ts';

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

describe('cubicBezierBoundingBox', () => {
  it('cubicBezierBoundingBox({ p0: P0, p1: P1, p2: P2, p3: P3 })', () => {
    const result = cubicBezierBoundingBox({
      p0: P0,
      p1: P1,
      p2: P2,
      p3: P3,
    });

    expect(rounded(result)).toEqual({
      height: 7.5,
      width: 10,
      x: 0,
      y: 0,
    });
  });

  it('cubicBezierBoundingBox({ p0: {x:0,y:0}, p1: {x:10,y:0}, p2: {x:20,y:0}, p3: {x:30,y:0} })', () => {
    const result = cubicBezierBoundingBox({
      p0: {
        x: 0,
        y: 0,
      },
      p1: {
        x: 10,
        y: 0,
      },
      p2: {
        x: 20,
        y: 0,
      },
      p3: {
        x: 30,
        y: 0,
      },
    });

    expect(rounded(result)).toEqual({
      height: 0,
      width: 30,
      x: 0,
      y: 0,
    });
  });
});
