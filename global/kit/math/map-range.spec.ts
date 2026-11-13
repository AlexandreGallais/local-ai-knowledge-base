import {
  describe,
  expect,
  it,
} from 'vitest';

import { mapRange } from './map-range.ts';

describe('mapRange', () => {
  it('mapRange(-10, { start: 10, end: 130 }, { start: 0, end: 960 })', () => {
    const result = mapRange(
      -10,
      {
        end: 130,
        start: 10,
      },
      {
        end: 960,
        start: 0,
      },
    );

    expect(result).toBe(-160);
  });

  it('mapRange(12, { start: 4, end: 20 }, { start: 0, end: 100 })', () => {
    const result = mapRange(
      12,
      {
        end: 20,
        start: 4,
      },
      {
        end: 100,
        start: 0,
      },
    );

    expect(result).toBe(50);
  });

  it('mapRange(22, { start: 4, end: 20 }, { start: 0, end: 100 })', () => {
    const result = mapRange(
      22,
      {
        end: 20,
        start: 4,
      },
      {
        end: 100,
        start: 0,
      },
    );

    expect(result).toBe(112.5);
  });

  it('mapRange(25, { start: 0, end: 100 }, { start: 100, end: 0 })', () => {
    const result = mapRange(
      25,
      {
        end: 100,
        start: 0,
      },
      {
        end: 0,
        start: 100,
      },
    );

    expect(result).toBe(75);
  });
});
