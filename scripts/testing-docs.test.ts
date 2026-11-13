// Tests of the testing topics: every old-to-new row has its "Since" version, AGENTS.md gives a test
// command for C# and Angular, and the version check lists the Angular testing documents.
import assert from 'node:assert/strict';
import {
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
import { fileURLToPath } from 'node:url';
import { checkVersions } from './check-versions.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TABLES = [
  'code/docs/dotnet-testing/test-old-to-new.md',
  'code/docs/angular-testing/test-old-to-new.md',
];

function read(path: string): string {
  return readFileSync(join(ROOT, path), 'utf8');
}

const DATA_ROW = /^\| (?!Old \||---)/;

// The "Since" cell of every data row: the tables of these documents all start with "| Old | New | Since |".
function sinceCells(text: string): string[] {
  const rows = text
    .split('\n')
    .filter((line) => DATA_ROW.test(line));

  return rows.flatMap((line) => {
    const cell = line.split('|')[3] ?? '';

    return [cell.trim()];
  });
}

describe('testing topics', () => {
  it('gives a "Since" version to every row of the old-to-new tables', () => {
    for (const path of TABLES) {
      const cells = sinceCells(read(path));
      const headers = read(path)
        .split('\n')
        .filter((line) => line.startsWith('| Old'));

      assert.ok(headers.every((line) => line.startsWith('| Old | New | Since |')), path);
      assert.ok(cells.length >= 10, `${path} has its tables`);
      assert.deepEqual(cells.filter((cell) => !/\d/.test(cell)), [], path);
    }
  });
  it('gives a test command for C# and for Angular in AGENTS.md', () => {
    const row = read('code/AGENTS.md')
      .split('\n')
      .find((line) => line.startsWith('| Tests |')) ?? '';

    assert.match(row, /npx ng test --no-watch --no-progress/);
    assert.match(row, /dotnet test/);
    assert.match(read('code/AGENTS.md'), /load the skill `write-tests`/);
  });
  it('lists the Angular testing documents for a project in Angular 23', () => {
    const project = mkdtempSync(join(tmpdir(), 'testing-project-'));

    mkdirSync(project, { recursive: true });
    writeFileSync(join(project, 'package.json'), JSON.stringify({ dependencies: { '@angular/core': '^23.0.0' } }));
    const behind = checkVersions(join(ROOT, 'code'), project).map((item) => item.document);

    assert.ok(behind.includes('docs/angular-testing/run-tests.md'));
    assert.ok(behind.includes('docs/angular-testing/testbed-v22.md'));
    assert.ok(!behind.some((path) => path.startsWith('docs/dotnet-testing/')));
  });
});
