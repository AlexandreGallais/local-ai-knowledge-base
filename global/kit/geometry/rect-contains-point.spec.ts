import {
  describe,
  expect,
  it,
} from 'vitest';

import { rectContainsPoint } from './rect-contains-point.ts';

describe('rectContainsPoint', () => {
  it('rectContainsPoint({x:0,y:0,width:10,height:10},{x:10,y:5})', () => {
    const result = rectContainsPoint(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 5,
      },
    );

    expect(result).toBe(true);
  });

  it('rectContainsPoint({x:0,y:0,width:10,height:10},{x:10.1,y:5})', () => {
    const result = rectContainsPoint(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        x: 10.1,
        y: 5,
      },
    );

    expect(result).toBe(false);
  });
});
