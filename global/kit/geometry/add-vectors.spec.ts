import {
  describe,
  expect,
  it,
} from 'vitest';

import { addVectors } from './add-vectors.ts';

// Rounds every number to 9 decimals, as the values of the research report are.
function rounded(value: unknown): unknown {
  return JSON.parse(JSON.stringify(
    value,
    (
      _key,
      item: unknown,
    ) => typeof item === 'number' ? Number(item.toFixed(9)) + 0 : item,
  ));
}

describe('addVectors', () => {
  it('addVectors({x:1,y:2},{x:3,y:-5})', () => {
    const result = addVectors(
      {
        x: 1,
        y: 2,
      },
      {
        x: 3,
        y: -5,
      },
    );

    expect(rounded(result)).toEqual({
      x: 4,
      y: -3,
    });
  });
});
