// Plays the commands of the look-up-api skill on the example Angular project: the signature of
// an API is found by a narrow search, then read in a range of lines, never by reading the file.
// Needs the packages of the example project (npm registry once).
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { prepareProject } from './lint-sample.ts';

const MAX_RANGE = 80;

function run(cwd: string, command: string, args: string[]): string {
  return spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
  }).stdout;
}

describe('commands of the look-up-api skill', () => {
  const project = prepareProject();

  it('reads the installed version of a package', () => {
    const line = run(project, 'grep', [
      '-m1',
      '"version"',
      'node_modules/@angular/core/package.json',
    ]);

    assert.match(line, /"version": "22\.\d+\.\d+"/);
  });
  it('finds the signature of signal() by a narrow search, then reads a range of the file only', () => {
    const found = run(project, 'grep', [
      '-rn',
      '--include=*.d.ts',
      'declare function signal<',
      'node_modules/@angular/core/',
    ]);
    const match = /^([^:]+):(\d+):(.*)$/m.exec(found);

    assert.ok(match !== null, found);
    const [
      ,
      file,
      line,
      signature,
    ] = match;
    const from = Math.max(1, Number(line) - 30);
    const range = run(project, 'sed', [
      '-n',
      `${from},${Number(line) + 40}p`,
      file,
    ]);

    assert.match(signature, /signal<T>\(initialValue: T/);
    assert.ok(range.split('\n').length <= MAX_RANGE + 2);
    assert.ok(readFileSync(join(project, file), 'utf8').split('\n').length > MAX_RANGE, 'the file is larger than the range read');
  });
  it('finds the description of a typescript-eslint rule', () => {
    const description = run(project, 'grep', [
      '-n',
      '-m2',
      'description',
      'node_modules/@typescript-eslint/eslint-plugin/dist/rules/no-floating-promises.js',
    ]);

    assert.match(description, /Promise-like statements/i);
  });
  it('finds the rules for models of Angular', () => {
    const lines = run(project, 'wc', [
      '-l',
      'node_modules/@angular/core/resources/best-practices.md',
    ]);

    assert.match(lines, /^\s*\d+ /);
  });
});
