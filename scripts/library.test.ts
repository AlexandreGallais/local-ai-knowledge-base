import assert from 'node:assert/strict';
import {
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildIndexes } from '../global/tools/build-index.ts';
import {
  parseIndex,
  search,
} from '../global/tools/search.ts';

const GLOBAL = join(dirname(fileURLToPath(import.meta.url)), '..', 'global');
const SOURCES = JSON.parse(readFileSync(join(GLOBAL, 'library', 'sources.json'), 'utf8')) as {
  sources: {
    tool: string;
    license: string;
  }[];
};
const REQUIRED = [
  'mdn-javascript',
  'mdn-html',
  'mdn-css',
  'mdn-api',
  'mdn-http',
  'mdn-accessibility',
  'angular',
  'typescript',
  'rxjs',
  'ngrx-signals',
  'node',
  'npm',
  'vite',
  'vitest',
  'playwright',
  'eslint',
  'typescript-eslint',
  'angular-eslint',
  'stylelint',
];

function topThree(query: string): string[] {
  const folder = join(GLOBAL, 'index');

  if (!existsSync(folder)) {
    buildIndexes(GLOBAL);
  }
  const entries = readdirSync(folder).flatMap((name) => parseIndex(readFileSync(join(folder, name), 'utf8')));

  return search(entries, query, 3).map((hit) => hit.id);
}

describe('the sources of the local documentation', () => {
  it('lists every tool the front needs, each with its license', () => {
    const tools = new Map(SOURCES.sources.map((source) => [
      source.tool,
      source.license,
    ]));

    for (const tool of REQUIRED) {
      assert.ok((tools.get(tool) ?? '') !== '', `${tool} is missing or has no license`);
    }
  });
});
describe('a search over the whole local documentation', () => {
  it('finds DOMMatrix, signalStoreFeature and WebSocket among the first three, in under 2 seconds each', (context) => {
    if (!existsSync(join(GLOBAL, 'library', 'mdn-api'))) {
      context.skip('the library is not fetched: run node scripts/fetch-library.ts');
      return;
    }
    topThree('warm-up');
    const cases = [
      ['DOMMatrix', 'library/mdn-api/dommatrix'],
      ['signalStoreFeature', 'library/ngrx-signals/signals/signal-store/custom-store-features.md'],
      ['WebSocket', 'library/mdn-api/websocket'],
    ];

    for (const [
      query = '',
      expected = '',
    ] of cases) {
      const start = performance.now();
      const ids = topThree(query);
      const seconds = (performance.now() - start) / 1000;

      assert.ok(ids.some((id) => id.startsWith(expected)), `${query}: ${ids.join(', ')}`);
      assert.ok(seconds < 2, `${query}: ${seconds.toFixed(2)} s`);
    }
  });
});
