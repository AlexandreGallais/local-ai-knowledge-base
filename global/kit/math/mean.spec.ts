import {
  describe,
  expect,
  it,
} from 'vitest';

import { mean } from './mean.ts';

describe('mean', () => {
  it('mean([1, 2, 3, 4])', () => {
    const result = mean([
      1,
      2,
      3,
      4,
    ]);

    expect(result).toBe(2.5);
  });

  it('mean([1, 2, 3, 4, 100])', () => {
    const result = mean([
      1,
      2,
      3,
      4,
      100,
    ]);

    expect(result).toBe(22);
  });
});
