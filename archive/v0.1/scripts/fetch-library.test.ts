import assert from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
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
import { pathToFileURL } from 'node:url';
import { git } from './library-sources.ts';
import {
  fetchSource,
  type Source,
  sourceProblems,
} from './fetch-library.ts';

function write(root: string, files: Record<string, string>): void {
  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
}

function commitAll(root: string, message: string): string {
  git(root, [
    'add',
    '-A',
  ]);
  git(root, [
    '-c',
    'user.name=Test',
    '-c',
    'user.email=test@example.invalid',
    'commit',
    '--quiet',
    '-m',
    message,
  ]);
  return git(root, [
    'rev-parse',
    'HEAD',
  ]).trim();
}

// A fake documentation repository: tag v1 on a first commit, then a second commit on main.
function fakeRepository(): {
  url: string;
  tagged: string;
} {
  const root = mkdtempSync(join(tmpdir(), 'docs-repo-'));

  git(root, [
    'init',
    '--quiet',
    '-b',
    'main',
  ]);
  write(root, {
    'docs/guide/a.md': '# A at v1\n',
    'docs/b.md': '# B\n',
    'other/c.md': '# Not documentation\n',
    'README.md': '# Repository\n',
  });
  const tagged = commitAll(root, 'first');

  git(root, [
    'tag',
    'v1',
  ]);
  write(root, { 'docs/guide/a.md': '# A after v1\n' });
  commitAll(root, 'second');
  return {
    url: pathToFileURL(root).href,
    tagged,
  };
}

function source(url: string): Source {
  return {
    tool: 'demo',
    title: 'Demo docs',
    repository: url,
    ref: 'v1',
    version: '1.0',
    license: 'MIT',
    attribution: 'Demo authors',
    flavor: 'markdown',
    core: true,
    paths: ['docs/'],
    docs: ['docs'],
  };
}

describe('fetch of a library source', () => {
  it('takes only the paths of the source, at the reference given, and notes the commit', () => {
    const repository = fakeRepository();
    const cache = mkdtempSync(join(tmpdir(), 'library-cache-'));
    const fetched = fetchSource(source(repository.url), cache);

    assert.equal(fetched.commit, repository.tagged);
    assert.equal(readFileSync(join(fetched.folder, 'docs/guide/a.md'), 'utf8'), '# A at v1\n');
    assert.ok(existsSync(join(fetched.folder, 'docs/b.md')));
    assert.ok(!existsSync(join(fetched.folder, 'other/c.md')));
  });
  it('refuses a source without license and a bad tool name', () => {
    const {
      license: _license,
      ...withoutLicense
    } = source('file:///nowhere');

    assert.deepEqual(sourceProblems(withoutLicense), ['demo: missing license']);
    assert.deepEqual(sourceProblems({
      ...source('file:///nowhere'),
      tool: 'Demo Docs',
    }), ['Demo Docs: tool name must be lower-case words joined by hyphens']);
  });
});
