import {
  describe,
  expect,
  it,
} from 'vitest';

import { rectEdgePointToward } from './rect-edge-point-toward.ts';

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

describe('rectEdgePointToward', () => {
  it('rectEdgePointToward({x:0,y:0,width:40,height:20},{x:100,y:10})', () => {
    const result = rectEdgePointToward(
      {
        height: 20,
        width: 40,
        x: 0,
        y: 0,
      },
      {
        x: 100,
        y: 10,
      },
    );

    expect(rounded(result)).toEqual({
      x: 40,
      y: 10,
    });
  });

  it('rectEdgePointToward({x:0,y:0,width:40,height:20},{x:20,y:-50})', () => {
    const result = rectEdgePointToward(
      {
        height: 20,
        width: 40,
        x: 0,
        y: 0,
      },
      {
        x: 20,
        y: -50,
      },
    );

    expect(rounded(result)).toEqual({
      x: 20,
      y: 0,
    });
  });

  it('rectEdgePointToward({x:0,y:0,width:40,height:20},{x:60,y:50})', () => {
    const result = rectEdgePointToward(
      {
        height: 20,
        width: 40,
        x: 0,
        y: 0,
      },
      {
        x: 60,
        y: 50,
      },
    );

    expect(rounded(result)).toEqual({
      x: 30,
      y: 20,
    });
  });
});
