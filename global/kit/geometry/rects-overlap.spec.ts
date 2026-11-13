import {
  describe,
  expect,
  it,
} from 'vitest';

import { rectsOverlap } from './rects-overlap.ts';

describe('rectsOverlap', () => {
  it('rectsOverlap({x:0,y:0,width:10,height:10},{x:5,y:5,width:10,height:10})', () => {
    const result = rectsOverlap(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        height: 10,
        width: 10,
        x: 5,
        y: 5,
      },
    );

    expect(result).toBe(true);
  });

  it('rectsOverlap({x:0,y:0,width:10,height:10},{x:10,y:0,width:10,height:10})', () => {
    const result = rectsOverlap(
      {
        height: 10,
        width: 10,
        x: 0,
        y: 0,
      },
      {
        height: 10,
        width: 10,
        x: 10,
        y: 0,
      },
    );

    expect(result).toBe(false);
  });
});
