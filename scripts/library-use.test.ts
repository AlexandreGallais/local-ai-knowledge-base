// Tests of the use of the official documentation library: the second-level rule of AGENTS.md and
// look-up-api, and its commands on the real library.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function read(path: string): string {
  return readFileSync(join(ROOT, path), 'utf8');
}

function run(command: string, args: string[]): string {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

describe('library in AGENTS.md and look-up-api', () => {
  it('names the library as the second level, after the documents of the base', () => {
    const rule = read('code/AGENTS.md')
      .split('\n')
      .find((line) => line.startsWith('5. ')) ?? '';

    assert.ok(rule.indexOf('`## Index`') < rule.indexOf('library/<tool>/index.md'));
    assert.match(rule, /Never read a whole index or folder of `library\/`/);
    assert.match(read('code/.agents/skills/look-up-api/SKILL.md'), /grep -i -m 10 "<words>" library\/<tool>\/index\.md/);
  });
  it('finds a section of the library with the commands of look-up-api, without reading a whole file', () => {
    const lines = run('grep', [
      '-i',
      '-m',
      '10',
      'rotateSelf',
      'library/mdn-svg/index.md',
    ])
      .trim()
      .split('\n');
    const path = /\]\((library\/[^)]+)\)/.exec(lines[0] ?? '')?.[1] ?? '';
    const headings = run('grep', [
      '-n',
      '^## ',
      path,
    ]);

    assert.ok(lines.length <= 10);
    assert.match(path, /^library\/mdn-svg\/api\/dommatrix\/rotateself\.md$/);
    assert.match(headings, /## Syntax/);
  });
});
