/*
 * Copyright (c) 2026 Example Corp.
 */

import {
  describe,
  expect,
  it,
} from 'vitest';

import { formatPressure } from './format-pressure.ts';

describe('formatPressure', () => {
  it('writes bars with two decimals', () => {
    expect(formatPressure(
      125_000,
      'bar',
    )).toBe('1.25 bar');
  });
  it('writes kilopascals with two decimals', () => {
    expect(formatPressure(
      1500,
      'kPa',
    )).toBe('1.50 kPa');
  });
});
