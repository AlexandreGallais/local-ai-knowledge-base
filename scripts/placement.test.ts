import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { distanceBetween } from '../global/kit/geometry/distance-between.ts';
import { distributeOnCircle } from '../global/kit/geometry/distribute-on-circle.ts';
import { shortestAngleDeltaDegrees } from '../global/kit/math/shortest-angle-delta-degrees.ts';
import { resolvePlacement } from '../global/tools/placement.ts';
import type { PlacementConfig } from '../global/tools/placement.ts';

const box = {
  width: 10,
  height: 10,
};

test('six objects on a circle of radius 10 are 60 degrees apart and 10 from the centre', () => {
  const center = {
    x: 3,
    y: -7,
  };
  const points = distributeOnCircle(
    {
      center,
      radius: 10,
    },
    6,
    15,
  );

  points.forEach((point, index) => {
    assert.ok(Math.abs(distanceBetween(center, point) - 10) < 1e-9);
    const next = points[(index + 1) % 6];

    assert.ok(next !== undefined);
    assert.ok(Math.abs(shortestAngleDeltaDegrees(point.angleDegrees, next.angleDegrees) - 60) < 1e-9);
    assert.ok(Math.abs(distanceBetween(point, next) - 10) < 1e-9);
  });
});
test('a chain of three dependent elements is placed whatever the order of the rules', () => {
  const config: PlacementConfig = {
    version: 1,
    elements: {
      a: box,
      b: box,
      c: box,
    },
    rules: [
      {
        type: 'attach',
        element: 'c',
        anchor: 'center-left',
        to: 'b.center-right',
        dx: 5,
      },
      {
        type: 'attach',
        element: 'b',
        anchor: 'center-left',
        to: 'a.center-right',
        dx: 5,
      },
      {
        type: 'fixed',
        element: 'a',
        x: 0,
        y: 0,
      },
    ],
  };
  const result = resolvePlacement(config);

  assert.ok(result.ok);
  assert.deepEqual(result.order, [
    3,
    2,
    1,
  ]);
  assert.deepEqual(
    [
      result.elements['a']?.x,
      result.elements['b']?.x,
      result.elements['c']?.x,
    ],
    [
      0,
      15,
      30,
    ],
  );
  assert.deepEqual(
    [
      result.elements['a']?.y,
      result.elements['b']?.y,
      result.elements['c']?.y,
    ],
    [
      0,
      0,
      0,
    ],
  );
});
test('a loop is refused and its elements are named', () => {
  const result = resolvePlacement({
    version: 1,
    elements: {
      a: box,
      b: box,
      c: box,
      d: box,
    },
    rules: [
      {
        type: 'fixed',
        element: 'd',
        x: 0,
        y: 0,
      },
      {
        type: 'attach',
        element: 'a',
        to: 'c',
      },
      {
        type: 'attach',
        element: 'b',
        to: 'a',
      },
      {
        type: 'attach',
        element: 'c',
        to: 'b',
      },
    ],
  });

  assert.ok(!result.ok);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0]?.code, 'CYCLE');
  assert.match(result.errors[0]?.message ?? '', /^a -> b -> c -> a \(rules #2, #3, #4\)/);
});
test('an element attached to itself is a loop', () => {
  const result = resolvePlacement({
    version: 1,
    elements: { a: box },
    rules: [
      {
        type: 'attach',
        element: 'a',
        to: 'a.top-left',
      },
    ],
  });

  assert.ok(!result.ok);
  assert.equal(result.errors[0]?.code, 'CYCLE');
  assert.match(result.errors[0]?.message ?? '', /^a -> a/);
});
test('two rules that set the same axis of one element are a conflict', () => {
  const result = resolvePlacement({
    version: 1,
    elements: {
      a: box,
      b: box,
    },
    rules: [
      {
        type: 'fixed',
        element: 'a',
        x: 0,
        y: 0,
      },
      {
        type: 'attach',
        element: 'b',
        to: 'a',
      },
      {
        type: 'align',
        elements: ['b'],
        edge: 'left',
        to: 'a',
      },
    ],
  });

  assert.ok(!result.ok);
  assert.deepEqual(result.errors.map((issue) => issue.message), ['"b" x is set by rule #2 (attach) and by rule #3 (align). Keep one.']);
});
test('an element with one axis only is refused', () => {
  const result = resolvePlacement({
    version: 1,
    elements: {
      a: box,
      b: box,
    },
    rules: [
      {
        type: 'fixed',
        element: 'a',
        x: 0,
        y: 0,
      },
      {
        type: 'align',
        elements: ['b'],
        edge: 'left',
        to: 'a',
      },
    ],
  });

  assert.ok(!result.ok);
  assert.deepEqual(result.errors.map((issue) => issue.message), ['"b" has no rule for y. Add a rule that sets it.']);
});
test('unknown elements and anchors are all reported at once', () => {
  const result = resolvePlacement({
    version: 1,
    elements: {
      a: box,
      b: box,
    },
    rules: [
      {
        type: 'fixed',
        element: 'a',
        x: 0,
        y: 0,
      },
      {
        type: 'attach',
        element: 'b',
        to: 'dail.center',
      },
      {
        type: 'attach',
        element: 'b',
        to: 'a.top',
      },
    ],
  });

  assert.ok(!result.ok);
  assert.deepEqual(result.errors.map((issue) => issue.code), [
    'UNKNOWN_ELEMENT',
    'UNKNOWN_ANCHOR',
    'CONFLICT',
    'CONFLICT',
  ]);
});
test('one axis from one element, the other axis from another element', () => {
  const result = resolvePlacement({
    version: 1,
    elements: {
      a: box,
      b: {
        width: 30,
        height: 20,
      },
      c: box,
    },
    rules: [
      {
        type: 'fixed',
        element: 'a',
        x: 100,
        y: 0,
      },
      {
        type: 'fixed',
        element: 'b',
        x: 0,
        y: 50,
      },
      {
        type: 'align',
        elements: ['c'],
        edge: 'left',
        to: 'a',
      },
      {
        type: 'align',
        elements: ['c'],
        edge: 'center-y',
        to: 'b',
      },
    ],
  });

  assert.ok(result.ok);
  assert.deepEqual(
    [
      result.elements['c']?.x,
      result.elements['c']?.y,
    ],
    [
      100,
      55,
    ],
  );
});
test('distribution between two elements, then elements that do not fit', () => {
  const elements = {
    left: box,
    right: box,
    p: box,
    q: box,
    r: box,
  };
  const config: PlacementConfig = {
    version: 1,
    elements,
    rules: [
      {
        type: 'fixed',
        element: 'left',
        x: 0,
        y: 0,
      },
      {
        type: 'fixed',
        element: 'right',
        x: 110,
        y: 0,
      },
      {
        type: 'distribute',
        elements: [
          'p',
          'q',
          'r',
        ],
        axis: 'x',
        mode: 'space-evenly',
        start: 'left.center-right',
        end: 'right.center-left',
      },
      {
        type: 'align',
        elements: [
          'p',
          'q',
          'r',
        ],
        edge: 'top',
        to: 'left',
      },
    ],
  };
  const result = resolvePlacement(config);

  assert.ok(result.ok);
  assert.deepEqual(
    [
      result.elements['p']?.x,
      result.elements['q']?.x,
      result.elements['r']?.x,
    ],
    [
      27.5,
      55,
      82.5,
    ],
  );
  const tight = resolvePlacement({
    ...config,
    rules: [
      {
        type: 'fixed',
        element: 'left',
        x: 0,
        y: 0,
      },
      {
        type: 'fixed',
        element: 'right',
        x: 30,
        y: 0,
      },
      ...config.rules.slice(2),
    ],
  });

  assert.ok(!tight.ok);
  assert.equal(tight.errors[0]?.message, 'rule #3 (distribute): the elements need 30 but only 20 is available.');
});
test('grid, rotation toward an element, radial rotation on a circle', () => {
  const result = resolvePlacement({
    version: 1,
    canvas: {
      width: 200,
      height: 100,
    },
    elements: {
      hub: box,
      g1: box,
      g2: box,
      g3: box,
      arrow: box,
      n1: box,
      n2: box,
    },
    rules: [
      {
        type: 'attach',
        element: 'hub',
        to: 'canvas.center',
      },
      {
        type: 'grid',
        elements: [
          'g1',
          'g2',
          'g3',
        ],
        origin: {
          x: 0,
          y: 0,
        },
        columns: 2,
        cellWidth: 20,
        cellHeight: 20,
        gapX: 4,
        gapY: 4,
      },
      {
        type: 'fixed',
        element: 'arrow',
        anchor: 'center',
        x: 100,
        y: 20,
      },
      {
        type: 'rotate',
        element: 'arrow',
        toward: 'hub.center',
      },
      {
        type: 'circle',
        elements: [
          'n1',
          'n2',
        ],
        around: 'hub',
        radius: 30,
        startAngle: 0,
        endAngle: 90,
        rotate: 'radial',
      },
    ],
  });

  assert.ok(result.ok);
  assert.deepEqual(
    [
      result.elements['hub']?.x,
      result.elements['hub']?.y,
    ],
    [
      95,
      45,
    ],
  );
  assert.deepEqual(
    [
      result.elements['g3']?.x,
      result.elements['g3']?.y,
    ],
    [
      5,
      29,
    ],
  );
  assert.equal(result.elements['arrow']?.rotation, 90);
  assert.equal(result.elements['arrow']?.transform, 'translate(95 15) rotate(90 5 5)');
  assert.equal(result.elements['n2']?.rotation, 90);
  assert.ok(Math.abs((result.elements['n2']?.centerY ?? 0) - 80) < 1e-9);
});
test('the example config places the dial, eight lamps, and a chain of three', () => {
  const config = JSON.parse(readFileSync(new URL('../global/docs/placement/example.placement.json', import.meta.url), 'utf8')) as PlacementConfig;
  const result = resolvePlacement(config);

  assert.ok(result.ok);
  assert.deepEqual(result.order, [
    4,
    3,
    2,
    1,
    5,
    6,
  ]);
  assert.equal(result.elements['lamp-1']?.transform, 'translate(94 64)');
  assert.equal(result.elements['lamp-3']?.transform, 'translate(174 144)');
  assert.equal(result.elements['valve']?.transform, 'translate(298 130)');
  assert.equal(result.elements['tag']?.transform, 'translate(310 174)');
});

// The shape drawn for each element of the example: a circle for the dial and the lamps, else a box.
function exampleShape(id: string, width: number, height: number): string {
  return id === 'dial' || id.startsWith('lamp-') ? `<circle cx="${String(width / 2)}" cy="${String(height / 2)}" r="${String(width / 2)}"/>` : `<rect width="${String(width)}" height="${String(height)}"/>`;
}

test('the example config gives the SVG of the format document', () => {
  const config = JSON.parse(readFileSync(new URL('../global/docs/placement/example.placement.json', import.meta.url), 'utf8')) as PlacementConfig;
  const expected = readFileSync(new URL('../global/docs/placement/example.svg', import.meta.url), 'utf8');
  const result = resolvePlacement(config);

  assert.ok(result.ok);
  const groups = Object
    .entries(config.elements)
    .map(([
      id,
      spec,
    ]) => `  <g id="${id}" transform="${result.elements[id]?.transform ?? ''}">${exampleShape(id, spec.width, spec.height)}</g>`);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${String(config.canvas?.width)} ${String(config.canvas?.height)}" fill="none" stroke="#333333">`,
    ...groups,
    '</svg>',
    '',
  ].join('\n');

  assert.equal(svg, expected);
});
