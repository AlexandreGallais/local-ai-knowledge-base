import {
  describe,
  expect,
  it,
} from 'vitest';

import { arcLength } from './arc-length.ts';

describe('arcLength', () => {
  it('arcLength(10, 90)', () => {
    const result = arcLength(
      10,
      90,
    );

    expect(result).toBeCloseTo(
      15.707963268,
      8,
    );
  });

  it('arcLength(10, 360)', () => {
    const result = arcLength(
      10,
      360,
    );

    expect(result).toBeCloseTo(
      62.831853072,
      8,
    );
  });
});
