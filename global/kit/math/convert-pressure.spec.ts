import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertPressure } from './convert-pressure.ts';

describe('convertPressure', () => {
  it('convertPressure(1, \'bar\', \'pa\')', () => {
    const result = convertPressure(
      1,
      'bar',
      'pa',
    );

    expect(result).toBe(100_000);
  });

  it('convertPressure(2.5, \'bar\', \'mbar\')', () => {
    const result = convertPressure(
      2.5,
      'bar',
      'mbar',
    );

    expect(result).toBe(2500);
  });

  it('convertPressure(1, \'atm\', \'bar\')', () => {
    const result = convertPressure(
      1,
      'atm',
      'bar',
    );

    expect(result).toBe(1.013_25);
  });
});
