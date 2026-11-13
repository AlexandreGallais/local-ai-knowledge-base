import {
  describe,
  expect,
  it,
} from 'vitest';

import { pointOnEllipse } from './point-on-ellipse.ts';

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

describe('pointOnEllipse', () => {
  it('pointOnEllipse({ cx: 0, cy: 0, rx: 20, ry: 10, rotationDegrees: 0 }, 90)', () => {
    const result = pointOnEllipse(
      {
        cx: 0,
        cy: 0,
        rotationDegrees: 0,
        rx: 20,
        ry: 10,
      },
      90,
    );

    expect(rounded(result)).toEqual({
      x: 0,
      y: 10,
    });
  });

  it('pointOnEllipse({ cx: 0, cy: 0, rx: 20, ry: 10, rotationDegrees: 90 }, 0)', () => {
    const result = pointOnEllipse(
      {
        cx: 0,
        cy: 0,
        rotationDegrees: 90,
        rx: 20,
        ry: 10,
      },
      0,
    );

    expect(rounded(result)).toEqual({
      x: 0,
      y: 20,
    });
  });
});
