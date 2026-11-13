import {
  describe,
  expect,
  it,
} from 'vitest';

import { distributeSizes } from './distribute-sizes.ts';

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

describe('distributeSizes', () => {
  it('distributeSizes([20,20,20], { start: 0, end: 200 }, \'space-between\')', () => {
    const result = distributeSizes(
      [
        20,
        20,
        20,
      ],
      {
        end: 200,
        start: 0,
      },
      'space-between',
    );

    expect(rounded(result)).toEqual([
      0,
      90,
      180,
    ]);
  });

  it('distributeSizes([20,20,20], { start: 0, end: 200 }, \'space-around\')', () => {
    const result = distributeSizes(
      [
        20,
        20,
        20,
      ],
      {
        end: 200,
        start: 0,
      },
      'space-around',
    );

    expect(rounded(result)).toEqual([
      23.333333333,
      90,
      156.666666667,
    ]);
  });

  it('distributeSizes([20,20,20], { start: 0, end: 200 }, \'space-evenly\')', () => {
    const result = distributeSizes(
      [
        20,
        20,
        20,
      ],
      {
        end: 200,
        start: 0,
      },
      'space-evenly',
    );

    expect(rounded(result)).toEqual([
      35,
      90,
      145,
    ]);
  });

  it('distributeSizes([10,30,20], { start: 100, end: 200 }, \'space-between\')', () => {
    const result = distributeSizes(
      [
        10,
        30,
        20,
      ],
      {
        end: 200,
        start: 100,
      },
      'space-between',
    );

    expect(rounded(result)).toEqual([
      100,
      130,
      180,
    ]);
  });

  it('distributeSizes([20], { start: 0, end: 200 }, \'space-between\')', () => {
    const result = distributeSizes(
      [20],
      {
        end: 200,
        start: 0,
      },
      'space-between',
    );

    expect(rounded(result)).toEqual([0]);
  });

  it('distributeSizes([150,100], { start: 0, end: 200 }, \'space-between\')', () => {
    expect(() => distributeSizes(
      [
        150,
        100,
      ],
      {
        end: 200,
        start: 0,
      },
      'space-between',
    )).toThrow(RangeError);
  });
});
