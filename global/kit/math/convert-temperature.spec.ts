import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertTemperature } from './convert-temperature.ts';

describe('convertTemperature', () => {
  it('convertTemperature(100, \'degC\', \'degF\')', () => {
    const result = convertTemperature(
      100,
      'degC',
      'degF',
    );

    expect(result).toBe(212);
  });

  it('convertTemperature(-40, \'degC\', \'degF\')', () => {
    const result = convertTemperature(
      -40,
      'degC',
      'degF',
    );

    expect(result).toBe(-40);
  });

  it('convertTemperature(0, \'degC\', \'k\')', () => {
    const result = convertTemperature(
      0,
      'degC',
      'k',
    );

    expect(result).toBe(273.15);
  });
});
