import {
  describe,
  expect,
  it,
} from 'vitest';

import { radiusForChord } from './radius-for-chord.ts';

describe('radiusForChord', () => {
  it('radiusForChord(6, 10)', () => {
    const result = radiusForChord(
      6,
      10,
    );

    expect(result).toBeCloseTo(
      10,
      8,
    );
  });

  it('radiusForChord(8, 20)', () => {
    const result = radiusForChord(
      8,
      20,
    );

    expect(result).toBeCloseTo(
      26.131259298,
      8,
    );
  });

  it('radiusForChord(1, 10)', () => {
    expect(() => radiusForChord(
      1,
      10,
    )).toThrow(RangeError);
  });
});
