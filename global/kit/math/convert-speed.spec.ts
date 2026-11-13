import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertSpeed } from './convert-speed.ts';

describe('convertSpeed', () => {
  it('convertSpeed(1, \'kn\', \'mPerS\')', () => {
    const result = convertSpeed(
      1,
      'kn',
      'mPerS',
    );

    expect(result).toBe(0.514_444_444_444_444_5);
  });

  it('convertSpeed(10, \'mPerS\', \'kmPerH\')', () => {
    const result = convertSpeed(
      10,
      'mPerS',
      'kmPerH',
    );

    expect(result).toBe(36);
  });
});
