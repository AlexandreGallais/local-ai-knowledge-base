// The kit of pure functions (global/kit) is copied in the pure-functions sample, then formatted,
// linted with the strictest profile, compiled and tested there with the real packages.
import assert from 'node:assert/strict';
import {
  cpSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { join } from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  installLint,
  ROOT,
  runIn,
  runTool,
  SAMPLES,
  SKIP,
} from './lib/samples.ts';

const KIT = join(ROOT, 'global', 'kit');
const SAMPLE = join(SAMPLES, 'ts-pure-lib');
const COPY = join(SAMPLE, 'src', 'zz-kit');
const HEADER = /^\/\*\n \* Copyright \(c\) 2026 Example Corp\.\n \*\/\n\n/;

function kitFiles(): string[] {
  return [
    'math',
    'geometry',
  ].flatMap((folder) => readdirSync(join(KIT, folder)).map((name) => join(folder, name)));
}

before(() => {
  if (SKIP === undefined) {
    installLint('ts-pure-lib');
    rmSync(COPY, {
      recursive: true,
      force: true,
    });
    cpSync(KIT, COPY, { recursive: true });
  }
});
after(() => {
  rmSync(COPY, {
    recursive: true,
    force: true,
  });
});
describe('the kit of pure functions', { skip: SKIP }, () => {
  it('has one exported function per file, each with its test', () => {
    const files = kitFiles();
    const sources = files.filter((file) => !file.endsWith('.spec.ts') && !/(?:types|shapes|results|inputs)\.ts$/.test(file));

    assert.ok(sources.length >= 130, `${sources.length} functions`);
    for (const source of sources) {
      assert.ok(files.includes(source.replace(/\.ts$/, '.spec.ts')), `${source} has no test`);
    }
  });
  it('is already formatted: the format pass only adds the copyright header of the project', () => {
    const format = runTool('format-file.ts', ['--all'], SAMPLE);

    assert.equal(format.status, 0, format.output);
    for (const file of kitFiles()) {
      assert.equal(readFileSync(join(COPY, file), 'utf8').replace(HEADER, ''), readFileSync(join(KIT, file), 'utf8'), `${file} changed`);
    }
  });
  it('passes the lint of the pure-functions profile with 0 errors', () => {
    const lint = runTool('lint-file.ts', ['--all'], SAMPLE);

    assert.equal(lint.status, 0, lint.output);
  });
  it('compiles, and passes its tests on the values of the research reports', () => {
    const build = runIn(SAMPLE, 'typescript/bin/tsc', [
      '-p',
      'tsconfig.json',
    ]);
    const tests = runIn(SAMPLE, 'vitest/vitest.mjs', [
      'run',
      'src/zz-kit',
    ]);

    assert.equal(build.status, 0, build.output);
    assert.equal(tests.status, 0, tests.output.slice(-2000));
  });
});
