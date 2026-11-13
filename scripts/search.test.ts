import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import { buildIndexes } from '../global/tools/build-index.ts';
import {
  indexText,
  parseIndex,
  search,
  sections,
  splitName,
  tokenize,
} from '../global/tools/search.ts';

// An invented corpus, written like the documentation the base brings home.
const CORPUS: Record<string, string> = {
  'svg/get-bbox.md': '# SVGGraphicsElement: getBBox() method\n\nReturns the bounding box of the element, in user units.\n\n## Syntax\n\nCall getBBox() with an optional options object.\n\n## Return value\n\nA DOMRect with x, y, width and height.\n',
  'svg/dom-matrix.md': '# DOMMatrix\n\nA 2D or 3D matrix for transforms.\n\n## Multiply\n\nmultiply() returns the product of two matrices.\n',
  'ngrx/signal-store-feature.md': '# signalStoreFeature\n\nGroups state, computed and methods into a reusable feature of a signal store.\n\n## Typed input\n\nDeclare what the feature needs with type().\n',
  'ngrx/signal-store.md': '# signalStore\n\nCreates a store from features.\n\n## Features order\n\nEach feature sees what the features before it added.\n',
  'web/websocket.md': '# WebSocket\n\nOpens a two-way connection to a server.\n\n## Send data\n\nCall send() to send messages to the server.\n',
  'web/fetch.md': '# Fetch API\n\nRequests a resource over the network.\n\n## Response\n\nRead the body with json() or text().\n',
  'layout/circle.md': '# Place items on a circle\n\nSpread N items evenly around a center.\n\n## Angle of item i\n\nThe angle is 2π i / N, from the start angle.\n',
  'css/grid.md': '# CSS grid\n\nLays out items in rows and columns.\n\n## Template\n\ngrid-template-columns sets the columns.\n',
};
const folders: string[] = [];

function makeBase(files: Record<string, string>): string {
  const base = mkdtempSync(join(tmpdir(), 'search-'));

  folders.push(base);
  Object
    .entries(files)
    .forEach(([
      path,
      text,
    ]) => {
      mkdirSync(dirname(join(base, 'library', path)), { recursive: true });
      writeFileSync(join(base, 'library', path), text);
    });
  return base;
}

function corpusEntries(): ReturnType<typeof parseIndex> {
  return parseIndex(indexText(Object
    .entries(CORPUS)
    .flatMap(([
      path,
      text,
    ]) => sections(path, text))));
}

function topIds(query: string): string[] {
  return search(corpusEntries(), query, 3).map((hit) => hit.id.split('#')[0] ?? '');
}

after(() => {
  for (const base of folders) {
    rmSync(base, {
      recursive: true,
      force: true,
    });
  }
});
describe('splitName', () => {
  it('splits names of variables as a person reads them, and keeps the whole name', () => {
    assert.deepEqual(splitName('getBBox').sort(), [
      'bbox',
      'box',
      'get',
      'getbbox',
    ]);
    assert.deepEqual(splitName('signal_store').sort(), [
      'signal',
      'signal_store',
      'store',
    ]);
    assert.deepEqual(splitName('DOMMatrix2D').sort(), [
      'dom',
      'dommatrix',
      'dommatrix2d',
      'matrix',
    ]);
    assert.deepEqual(splitName('rx-method').sort(), [
      'method',
      'rx',
      'rx-method',
    ]);
  });
  it('drops stop words and brings plurals to their stem', () => {
    assert.deepEqual(tokenize('the signals of a store'), [
      'signal',
      'store',
    ]);
  });
});
describe('search', () => {
  it('finds the section of an exact API name among the first three', () => {
    assert.ok(topIds('getBBox').includes('svg/get-bbox.md'));
    assert.ok(topIds('signalStoreFeature').includes('ngrx/signal-store-feature.md'));
    assert.ok(topIds('DOMMatrix').includes('svg/dom-matrix.md'));
    assert.ok(topIds('WebSocket').includes('web/websocket.md'));
  });
  it('finds a section from a sentence, even with words the document does not use', () => {
    assert.ok(topIds('how to place elements evenly around a circle').includes('layout/circle.md'));
    assert.ok(topIds('bounding box of an svg element').includes('svg/get-bbox.md'));
    assert.ok(topIds('send messages to the server over a socket').includes('web/websocket.md'));
  });
  it('returns 10 lines at most', () => {
    const many = Object.fromEntries(Array.from({ length: 25 }, (_, position) => [
      `angular/page-${position}.md`,
      `# Angular page ${position}\n\nAngular signals and components.\n`,
    ]));
    const entries = parseIndex(indexText(Object
      .entries(many)
      .flatMap(([
        path,
        text,
      ]) => sections(path, text))));

    assert.equal(search(entries, 'angular signals', 50).length, 10);
  });
});
describe('the plain-text index', () => {
  it('is the same file when built twice from the same corpus, and reads as text', () => {
    const first = makeBase(CORPUS);
    const second = makeBase(CORPUS);

    assert.deepEqual(buildIndexes(first), buildIndexes(second));
    for (const name of buildIndexes(first)) {
      const text = readFileSync(join(first, 'index', name), 'utf8');

      assert.equal(text, readFileSync(join(second, 'index', name), 'utf8'));
      assert.match(text, /^# local search index/);
      assert.ok([...text].every((character) => character === '\n' || character === '\t' || character >= ' '));
    }
  });
});
