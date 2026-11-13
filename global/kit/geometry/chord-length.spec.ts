import {
  describe,
  expect,
  it,
} from 'vitest';

import { chordLength } from './chord-length.ts';

describe('chordLength', () => {
  it('chordLength(10, 60)', () => {
    const result = chordLength(
      10,
      60,
    );

    expect(result).toBeCloseTo(
      10,
      8,
    );
  });

  it('chordLength(10, 180)', () => {
    const result = chordLength(
      10,
      180,
    );

    expect(result).toBeCloseTo(
      20,
      8,
    );
  });

  it('chordLength(80, 45)', () => {
    const result = chordLength(
      80,
      45,
    );

    expect(result).toBeCloseTo(
      61.229349178,
      8,
    );
  });
});
