import {
  describe,
  expect,
  it,
} from 'vitest';

import { intersectLines } from './intersect-lines.ts';

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

describe('intersectLines', () => {
  it('intersectLines({ start: {x:0,y:0}, end: {x:10,y:10} }, { start: {x:0,y:10}, end: {x:10,y:0} })', () => {
    const result = intersectLines(
      {
        end: {
          x: 10,
          y: 10,
        },
        start: {
          x: 0,
          y: 0,
        },
      },
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
          y: 10,
        },
      },
    );

    expect(rounded(result)).toEqual({
      kind: 'point',
      point: {
        x: 5,
        y: 5,
      },
      ua: 0.5,
      ub: 0.5,
    });
  });

  it('intersectLines({ start: {x:0,y:0}, end: {x:10,y:0} }, { start: {x:0,y:5}, end: {x:10,y:5} })', () => {
    const result = intersectLines(
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
          y: 0,
        },
      },
      {
        end: {
          x: 10,
          y: 5,
        },
        start: {
          x: 0,
          y: 5,
        },
      },
    );

    expect(rounded(result)).toEqual({ kind: 'parallel' });
  });

  it('intersectLines({ start: {x:0,y:0}, end: {x:10,y:0} }, { start: {x:5,y:0}, end: {x:20,y:0} })', () => {
    const result = intersectLines(
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
          y: 0,
        },
      },
      {
        end: {
          x: 20,
          y: 0,
        },
        start: {
          x: 5,
          y: 0,
        },
      },
    );

    expect(rounded(result)).toEqual({ kind: 'coincident' });
  });
});
