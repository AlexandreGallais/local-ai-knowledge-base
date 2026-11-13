import {
  describe,
  expect,
  it,
} from 'vitest';

import { splitDuration } from './split-duration.ts';

describe('splitDuration', () => {
  it('splitDuration(3661)', () => {
    const result = splitDuration(3661);

    expect(result).toEqual({
      hours: 1,
      milliseconds: 0,
      minutes: 1,
      seconds: 1,
      sign: 1,
    });
  });

  it('splitDuration(59.9996)', () => {
    const result = splitDuration(59.9996);

    expect(result).toEqual({
      hours: 0,
      milliseconds: 0,
      minutes: 1,
      seconds: 0,
      sign: 1,
    });
  });
});
