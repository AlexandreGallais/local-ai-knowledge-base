import {
  describe,
  expect,
  it,
} from 'vitest';
import { formatFlow } from './format-flow.ts';

describe('proof of t05', () => {
  it('writes the flow in the unit asked, with two decimals', () => {
    expect(formatFlow(1.5, 'm3/h')).toBe('1.50 m3/h');
    expect(formatFlow(0.6, 'L/min')).toBe('10.00 L/min');
  });
});
