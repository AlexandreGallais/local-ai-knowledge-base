import {
  describe,
  expect,
  it,
} from 'vitest';

import { snapToGuides } from './snap-to-guides.ts';

describe('snapToGuides', () => {
  it('snapToGuides(98, [0, 100, 200], 5)', () => {
    const result = snapToGuides(
      98,
      [
        0,
        100,
        200,
      ],
      5,
    );

    expect(result).toBeCloseTo(
      100,
      8,
    );
  });

  it('snapToGuides(90, [0, 100, 200], 5)', () => {
    const result = snapToGuides(
      90,
      [
        0,
        100,
        200,
      ],
      5,
    );

    expect(result).toBeCloseTo(
      90,
      8,
    );
  });
});
