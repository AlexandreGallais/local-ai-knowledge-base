import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundHalfEven } from './round-half-even.ts';

describe('roundHalfEven', () => {
  it('roundHalfEven(0.5)', () => {
    const result = roundHalfEven(0.5);

    expect(result).toBe(0);
  });

  it('roundHalfEven(1.5)', () => {
    const result = roundHalfEven(1.5);

    expect(result).toBe(2);
  });

  it('roundHalfEven(2.5)', () => {
    const result = roundHalfEven(2.5);

    expect(result).toBe(2);
  });

  it('roundHalfEven(-2.5)', () => {
    const result = roundHalfEven(-2.5);

    expect(result).toBe(-2);
  });

  it('roundHalfEven(12.5)', () => {
    const result = roundHalfEven(12.5);

    expect(result).toBe(12);
  });
});
