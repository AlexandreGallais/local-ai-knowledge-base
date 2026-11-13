import {
  describe,
  expect,
  it,
} from 'vitest';

import { countDecimals } from './count-decimals.ts';

describe('countDecimals', () => {
  it('countDecimals(0.1)', () => {
    const result = countDecimals(0.1);

    expect(result).toBe(1);
  });

  it('countDecimals(1.25)', () => {
    const result = countDecimals(1.25);

    expect(result).toBe(2);
  });

  it('countDecimals(5)', () => {
    const result = countDecimals(5);

    expect(result).toBe(0);
  });

  it('countDecimals(1.5e-7)', () => {
    const result = countDecimals(1.5e-7);

    expect(result).toBe(8);
  });
});
