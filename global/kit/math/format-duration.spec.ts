import {
  describe,
  expect,
  it,
} from 'vitest';

import { formatDuration } from './format-duration.ts';

describe('formatDuration', () => {
  it('formatDuration(3661)', () => {
    const result = formatDuration(3661);

    expect(result).toBe('01:01:01');
  });

  it('formatDuration(360_000)', () => {
    const result = formatDuration(360_000);

    expect(result).toBe('100:00:00');
  });

  it('formatDuration(-90)', () => {
    const result = formatDuration(-90);

    expect(result).toBe('-00:01:30');
  });

  it('formatDuration(-0.4)', () => {
    const result = formatDuration(-0.4);

    expect(result).toBe('00:00:00');
  });
});
