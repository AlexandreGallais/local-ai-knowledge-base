import { describe, expect, it } from 'vitest';

import { clamp } from './clamp';

describe('clamp', () => {
  it('keeps a value between its bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it('gives the bound a value goes beyond', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });
});
