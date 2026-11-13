import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertLength } from './convert-length.ts';

describe('convertLength', () => {
  it('convertLength(1, \'nauticalMile\', \'m\')', () => {
    const result = convertLength(
      1,
      'nauticalMile',
      'm',
    );

    expect(result).toBe(1852);
  });

  it('convertLength(1, \'inch\', \'mm\')', () => {
    const result = convertLength(
      1,
      'inch',
      'mm',
    );

    expect(result).toBe(25.4);
  });
});
