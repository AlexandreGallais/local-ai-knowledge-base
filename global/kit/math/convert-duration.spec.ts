import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertDuration } from './convert-duration.ts';

describe('convertDuration', () => {
  it('convertDuration(90, \'min\', \'h\')', () => {
    const result = convertDuration(
      90,
      'min',
      'h',
    );

    expect(result).toBe(1.5);
  });

  it('convertDuration(1, \'day\', \'s\')', () => {
    const result = convertDuration(
      1,
      'day',
      's',
    );

    expect(result).toBe(86_400);
  });
});
