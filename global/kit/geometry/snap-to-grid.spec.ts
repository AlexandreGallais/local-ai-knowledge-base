import {
  describe,
  expect,
  it,
} from 'vitest';

import { snapToGrid } from './snap-to-grid.ts';

describe('snapToGrid', () => {
  it('snapToGrid(23, 10, 0)', () => {
    const result = snapToGrid(
      23,
      10,
      0,
    );

    expect(result).toBeCloseTo(
      20,
      8,
    );
  });

  it('snapToGrid(25, 10, 0)', () => {
    const result = snapToGrid(
      25,
      10,
      0,
    );

    expect(result).toBeCloseTo(
      30,
      8,
    );
  });

  it('snapToGrid(-25, 10, 0)', () => {
    const result = snapToGrid(
      -25,
      10,
      0,
    );

    expect(result).toBeCloseTo(
      -20,
      8,
    );
  });

  it('snapToGrid(23, 10, 5)', () => {
    const result = snapToGrid(
      23,
      10,
      5,
    );

    expect(result).toBeCloseTo(
      25,
      8,
    );
  });

  it('snapToGrid(-3, 10, 0)', () => {
    const result = snapToGrid(
      -3,
      10,
      0,
    );

    expect(result).toBeCloseTo(
      0,
      8,
    );
  });
});
