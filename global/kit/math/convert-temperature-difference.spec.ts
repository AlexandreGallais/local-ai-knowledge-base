import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertTemperatureDifference } from './convert-temperature-difference.ts';

describe('convertTemperatureDifference', () => {
  it('convertTemperatureDifference(10, \'degC\', \'degF\')', () => {
    const result = convertTemperatureDifference(
      10,
      'degC',
      'degF',
    );

    expect(result).toBe(18);
  });

  it('convertTemperatureDifference(18, \'degF\', \'k\')', () => {
    const result = convertTemperatureDifference(
      18,
      'degF',
      'k',
    );

    expect(result).toBe(10);
  });
});
