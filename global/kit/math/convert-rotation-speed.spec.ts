import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertRotationSpeed } from './convert-rotation-speed.ts';

describe('convertRotationSpeed', () => {
  it('convertRotationSpeed(1, \'rpm\', \'degPerS\')', () => {
    const result = convertRotationSpeed(
      1,
      'rpm',
      'degPerS',
    );

    expect(result).toBe(6);
  });

  it('convertRotationSpeed(60, \'rpm\', \'turnPerS\')', () => {
    const result = convertRotationSpeed(
      60,
      'rpm',
      'turnPerS',
    );

    expect(result).toBe(1);
  });

  it('convertRotationSpeed(3000, \'rpm\', \'radPerS\')', () => {
    const result = convertRotationSpeed(
      3000,
      'rpm',
      'radPerS',
    );

    expect(result).toBeCloseTo(
      314.159_265_358_979_3,
      9,
    );
  });
});
