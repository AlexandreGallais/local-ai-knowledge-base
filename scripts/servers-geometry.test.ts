import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { distributeOnCircle } from '../global/kit/geometry/distribute-on-circle.ts';
import { resolvePlacement } from '../global/tools/placement.ts';
import {
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const GLOBAL = join(dirname(fileURLToPath(import.meta.url)), '..', 'global');
const EXAMPLE = readFileSync(join(GLOBAL, 'docs', 'placement', 'example.placement.json'), 'utf8');
let client: Client;

before(() => {
  client = startServer(join(GLOBAL, 'servers', 'geometry.ts'), { BASE_ROOT: GLOBAL });
});
after(() => {
  client.close();
});
describe('the geometry server', () => {
  it('lists the kit functions that match a query, with their signature', async () => {
    const result = await client.call('list_functions', { query: 'circle' });

    assert.equal(result.isError, false);
    assert.match(result.text, /geometry: distributeOnCircle\(circle: Circle, count: number, startAngleDegrees: number\): readonly PlacedPoint\[\] - Places N points/);
  });
  it('places six objects on a circle exactly as the kit does', async () => {
    const result = await client.call('call_function', {
      name: 'distributeOnCircle',
      arguments: '[{"center":{"x":0,"y":0},"radius":10}, 6, 0]',
    });
    const points = JSON.parse(result.text) as {
      x: number;
      y: number;
      angleDegrees: number;
    }[];

    assert.deepEqual(
      points,
      distributeOnCircle(
        {
          center: {
            x: 0,
            y: 0,
          },
          radius: 10,
        },
        6,
        0,
      ),
    );
    assert.deepEqual(points.map((point) => point.angleDegrees), [
      0,
      60,
      120,
      180,
      240,
      300,
    ]);
    assert.ok(points.every((point) => Math.abs(Math.hypot(point.x, point.y) - 10) < 1e-9));
  });
  it('resolves the example placement exactly as the resolver does', async () => {
    const result = await client.call('resolve_placement', { config: EXAMPLE });

    assert.deepEqual(JSON.parse(result.text), resolvePlacement(JSON.parse(EXAMPLE)));
  });
  it('refuses an unknown function, bad JSON and a RangeError of the kit, in one line', async () => {
    const unknown = await client.call('call_function', {
      name: 'squareRoot',
      arguments: '[4]',
    });
    const badJson = await client.call('call_function', {
      name: 'clamp',
      arguments: '[1, 2',
    });
    const range = await client.call('call_function', {
      name: 'distributeOnCircle',
      arguments: '[{"center":{"x":0,"y":0},"radius":10}, 0, 0]',
    });

    assert.match(unknown.text, /No function "squareRoot" in the kit/);
    assert.match(badJson.text, /"arguments" is not valid JSON/);
    assert.match(range.text, /^distributeOnCircle: distributeOnCircle: count must be an integer >= 1$/);
    assert.ok(unknown.isError && badJson.isError && range.isError);
  });
});
