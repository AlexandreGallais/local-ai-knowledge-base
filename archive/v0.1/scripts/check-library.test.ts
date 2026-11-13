import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import {
  libraryPath,
  renderIndex,
  renderNotices,
} from './library-build.ts';
import { checkLibrary } from './check-library.ts';
import type { Source } from './library-sources.ts';

const SOURCE: Source = {
  tool: 'demo',
  title: 'Demo docs',
  repository: 'https://example.invalid/demo.git',
  ref: 'v1',
  version: '1.0',
  license: 'MIT',
  attribution: 'Demo authors',
  flavor: 'markdown',
  core: true,
  paths: ['docs/'],
  docs: ['docs'],
};
const COMMIT = 'a'.repeat(40);

function page(title: string, body = 'Some text.'): string {
  return `---\ntitle: "${title}"\ntool: "demo"\nversion: "1.0"\nsource: "https://example.invalid/demo/blob/${COMMIT}/docs/x.md"\ncommit: "${COMMIT}"\nlicense: "MIT"\n---\n\n# ${title}\n\n${body}\n`;
}

const INDEX = renderIndex(SOURCE, COMMIT, [
  {
    path: 'guide.md',
    title: 'Guide',
    summary: 'Some text.',
    content: page('Guide'),
  },
]);
const NOTICES = renderNotices([SOURCE], {
  demo: {
    commit: COMMIT,
    files: 1,
    bytes: 100,
    built: '2026-11-13',
  },
});

function library(files: Record<string, string>, source: Partial<Source> = SOURCE): string {
  const root = mkdtempSync(join(tmpdir(), 'library-'));
  const all: Record<string, string> = {
    'library/sources.json': JSON.stringify({ sources: [source] }),
    'library/demo/guide.md': page('Guide'),
    'library/demo/index.md': INDEX,
    'THIRD_PARTY_NOTICES.md': NOTICES,
    ...files,
  };

  for (const [
    path,
    content,
  ] of Object.entries(all)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

function messages(root: string): string[] {
  return checkLibrary(root).map((item) => `${item.file}: ${item.message}`);
}

describe('check of the library', () => {
  it('accepts a library whose files have their header, are indexed and are small', () => {
    assert.deepEqual(messages(library({})), []);
  });
  it('refuses a source without license', () => {
    const {
      license: _license,
      ...withoutLicense
    } = SOURCE;

    assert.deepEqual(messages(library({}, withoutLicense)), ['library/sources.json: demo: missing license']);
  });
  it('refuses a file missing from the index of its tool', () => {
    assert.deepEqual(messages(library({ 'library/demo/extra.md': page('Extra') })), ['library/demo/extra.md: not listed in library/demo/index.md']);
  });
  it('refuses a file of more than 16 KB and a file without its header', () => {
    const found = messages(library({ 'library/demo/guide.md': `${page('Guide', 'x'.repeat(17_000))}` }));

    assert.equal(found.length, 1);
    assert.match(found[0] ?? '', /guide\.md: \d+ bytes, more than 16384/);
    assert.match(messages(library({ 'library/demo/guide.md': '# Guide\n' })).join('\n'), /guide\.md: missing header field title/);
  });
  it('refuses a tool without its notice in THIRD_PARTY_NOTICES.md', () => {
    assert.deepEqual(messages(library({ 'THIRD_PARTY_NOTICES.md': '# Third-party notices\n' })), ['THIRD_PARTY_NOTICES.md: no notice for demo']);
  });
});
describe('paths of the library', () => {
  it('names an index page after its folder, drops .mdx and .md.in, and keeps the root page apart', () => {
    assert.equal(libraryPath(SOURCE, 'docs/api/dommatrix/index.md'), 'api/dommatrix.md');
    assert.equal(libraryPath(SOURCE, 'docs/rules/no-floating-promises.mdx'), 'rules/no-floating-promises.md');
    assert.equal(libraryPath(SOURCE, 'docs/podman-run.1.md.in'), 'podman-run.1.md');
    assert.equal(libraryPath(SOURCE, 'docs/index.md'), 'overview.md');
    assert.equal(libraryPath(SOURCE, 'docs/release-notes/TypeScript 6.0.md'), 'release-notes/TypeScript-6.0.md');
  });
});
