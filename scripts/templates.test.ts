// Every template of the base is copied in its sample project, then formatted, linted, compiled and
// tested there with the real packages: a template the AI copies must pass all the checks.
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

const TEMPLATES = join(ROOT, 'global', 'templates');
const FOLDER = 'zz-templates';

interface TemplateSet {
  template: string;
  sample: string;
  test: [string, string[]];
}

const SETS: TemplateSet[] = [
  {
    template: 'angular/composed-store',
    sample: 'angular-app',
    test: [
      '@angular/cli/bin/ng.js',
      ['test', '--watch=false'],
    ],
  },
  {
    template: 'angular/small-store',
    sample: 'angular-app',
    test: [
      '@angular/cli/bin/ng.js',
      ['test', '--watch=false'],
    ],
  },
  {
    template: 'angular/component',
    sample: 'angular-app',
    test: [
      '@angular/cli/bin/ng.js',
      ['test', '--watch=false'],
    ],
  },
  {
    template: 'typescript/pure-function',
    sample: 'ts-pure-lib',
    test: [
      'vitest/vitest.mjs',
      ['run', `src/${FOLDER}`],
    ],
  },
];

function target(set: TemplateSet): string {
  return join(SAMPLES, set.sample, 'src', FOLDER, set.template.split('/').at(-1) ?? '');
}

function files(folder: string): string[] {
  return readdirSync(folder)
    .filter((name) => /\.(?:ts|html|scss|css)$/.test(name))
    .map((name) => join(folder, name));
}

function cleanUp(): void {
  for (const sample of new Set(SETS.map((set) => set.sample))) {
    rmSync(join(SAMPLES, sample, 'src', FOLDER), {
      recursive: true,
      force: true,
    });
  }
}

function prepare(): void {
  cleanUp();
  for (const sample of new Set(SETS.map((set) => set.sample))) {
    installLint(sample);
  }
}

before(() => {
  if (SKIP === undefined) {
    prepare();
  }
});
after(() => {
  cleanUp();
});
describe('the templates of the base', { skip: SKIP }, () => {
  for (const set of SETS) {
    it(`${set.template}: formatted twice without change, 0 lint error, compiled and tested`, () => {
      const folder = target(set);

      cpSync(join(TEMPLATES, set.template), folder, { recursive: true });
      for (const file of files(folder)) {
        runTool('format-file.ts', [file], SAMPLES);
        const once = readFileSync(file, 'utf8');

        runTool('format-file.ts', [file], SAMPLES);
        assert.equal(readFileSync(file, 'utf8'), once, `${file}: a second format changed it`);
        const lint = runTool('lint-file.ts', [file], SAMPLES);

        assert.equal(lint.status, 0, lint.output);
      }
      const build = runIn(join(SAMPLES, set.sample), 'typescript/bin/tsc', [
        '-p',
        'tsconfig.json',
      ]);

      assert.equal(build.status, 0, build.output);
      const tests = runIn(join(SAMPLES, set.sample), ...set.test);

      assert.equal(tests.status, 0, tests.output.slice(-3000));
      rmSync(folder, { recursive: true });
    });
  }
});
