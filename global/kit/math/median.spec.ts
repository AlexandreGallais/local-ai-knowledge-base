import {
  describe,
  expect,
  it,
} from 'vitest';

import { median } from './median.ts';

describe('median', () => {
  it('median([3, 1, 2])', () => {
    const result = median([
      3,
      1,
      2,
    ]);

    expect(result).toBe(2);
  });

  it('median([4, 1, 3, 2])', () => {
    const result = median([
      4,
      1,
      3,
      2,
    ]);

    expect(result).toBe(2.5);
  });

  it('median([1, 2, 3, 4, 100])', () => {
    const result = median([
      1,
      2,
      3,
      4,
      100,
    ]);

    expect(result).toBe(3);
  });
});
