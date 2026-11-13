import {
  describe,
  expect,
  it,
} from 'vitest';

import { clamp } from './clamp.ts';

describe('clamp', () => {
  it('clamp(5, 0, 10)', () => {
    const result = clamp(
      5,
      0,
      10,
    );

    expect(result).toBe(5);
  });

  it('clamp(-1, 0, 10)', () => {
    const result = clamp(
      -1,
      0,
      10,
    );

    expect(result).toBe(0);
  });

  it('clamp(11, 0, 10)', () => {
    const result = clamp(
      11,
      0,
      10,
    );

    expect(result).toBe(10);
  });

  it('clamp(Infinity, 0, 10)', () => {
    const result = clamp(
      Infinity,
      0,
      10,
    );

    expect(result).toBe(10);
  });
});
