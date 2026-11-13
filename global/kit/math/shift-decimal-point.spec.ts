import {
  describe,
  expect,
  it,
} from 'vitest';

import { shiftDecimalPoint } from './shift-decimal-point.ts';

describe('shiftDecimalPoint', () => {
  it('shiftDecimalPoint(1.005, 2)', () => {
    const result = shiftDecimalPoint(
      1.005,
      2,
    );

    expect(result).toBe(100.5);
  });

  it('shiftDecimalPoint(100.5, -2)', () => {
    const result = shiftDecimalPoint(
      100.5,
      -2,
    );

    expect(result).toBe(1.005);
  });

  it('shiftDecimalPoint(1e-7, 2)', () => {
    const result = shiftDecimalPoint(
      1e-7,
      2,
    );

    expect(result).toBe(0.00001);
  });

  it('shiftDecimalPoint(1e21, -2)', () => {
    const result = shiftDecimalPoint(
      1e21,
      -2,
    );

    expect(result).toBe(1e19);
  });
});
