import {
  describe,
  expect,
  it,
} from 'vitest';

import { angleOfVector } from './angle-of-vector.ts';

describe('angleOfVector', () => {
  it('angleOfVector({x:0,y:5})', () => {
    const result = angleOfVector({
      x: 0,
      y: 5,
    });

    expect(result).toBeCloseTo(
      90,
      8,
    );
  });

  it('angleOfVector({x:-1,y:0})', () => {
    const result = angleOfVector({
      x: -1,
      y: 0,
    });

    expect(result).toBeCloseTo(
      180,
      8,
    );
  });

  it('angleOfVector({x:1,y:-1})', () => {
    const result = angleOfVector({
      x: 1,
      y: -1,
    });

    expect(result).toBeCloseTo(
      -45,
      8,
    );
  });
});
