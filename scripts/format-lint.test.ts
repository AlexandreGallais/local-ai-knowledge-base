import assert from 'node:assert/strict';
import {
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  installLint,
  PROFILES,
  runTool,
  SAMPLES,
  SKIP,
} from './lib/samples.ts';

const CASES = join(SAMPLES, 'cases', 'format');
const APP = join(SAMPLES, 'angular-app', 'src', 'app');
const PURE = join(SAMPLES, 'ts-pure-lib', 'src');
const written: string[] = [];

interface RuleMeta {
  type?: string;
  fixable?: string;
}

interface CalculatedConfig {
  rules: Record<string, unknown>;
  plugins: Record<string, { rules: Record<string, { meta?: RuleMeta }> }>;
}

interface EslintClass {
  new (options: object): { calculateConfigForFile: (file: string) => Promise<CalculatedConfig> };
}

function scratch(folder: string, name: string, text: string): string {
  const path = join(folder, name);

  writeFileSync(path, text);
  written.push(path);
  return path;
}

before(() => {
  if (SKIP === undefined) {
    PROFILES.forEach((profile) => installLint(profile));
  }
});
after(() => {
  written.forEach((path) => rmSync(path, { force: true }));
});

function ruleMeta(id: string, config: CalculatedConfig, builtinRules: Map<string, { meta?: RuleMeta }>): RuleMeta {
  const cut = id.lastIndexOf('/');
  const found = cut < 0 ? builtinRules.get(id)?.meta : config.plugins[id.slice(0, cut)]?.rules[id.slice(cut + 1)]?.meta;

  return found ?? {};
}

async function activeRules(profile: string, pass: string, file: string): Promise<{
  on: string[];
  meta: (id: string) => RuleMeta;
}> {
  const project = join(SAMPLES, profile);
  const { ESLint } = createRequire(join(project, 'package.json'))('eslint') as { ESLint: EslintClass };
  const { builtinRules } = createRequire(join(project, 'package.json'))('eslint/use-at-your-own-risk') as { builtinRules: Map<string, { meta?: RuleMeta }> };
  const eslint = new ESLint({
    cwd: project,
    overrideConfigFile: join(project, '.agents', 'lint', `${pass}.config.mjs`),
  });
  const config = await eslint.calculateConfigForFile(join(project, file));
  const level = (value: unknown): unknown => Array.isArray(value) ? value[0] : value;
  const meta = (id: string): RuleMeta => ruleMeta(id, config, builtinRules);

  return {
    on: Object
      .entries(config.rules)
      .filter(([, value]) => ![
        0,
        'off',
      ].includes(level(value) as number | string))
      .map(([id]) => id),
    meta,
  };
}

describe('the format pass', { skip: SKIP }, () => {
  for (const input of readdirSync(CASES).filter((name) => name.includes('.input.'))) {
    it(`formats ${input} as expected, and a second pass changes nothing`, () => {
      const path = scratch(APP, `zz-${input.replace('.input', '')}`, readFileSync(join(CASES, input), 'utf8'));
      const expected = readFileSync(join(CASES, input.replace('.input.', '.expected.')), 'utf8');

      runTool('format-file.ts', [path], SAMPLES);
      const once = readFileSync(path, 'utf8');

      runTool('format-file.ts', [path], SAMPLES);
      const twice = readFileSync(path, 'utf8');

      rmSync(path);
      assert.equal(once, expected);
      assert.equal(twice, once);
    });
  }
});
describe('the two passes', { skip: SKIP }, () => {
  for (const profile of [
    'angular-app',
    'ts-pure-lib',
  ]) {
    it(`never share a rule, and the lint pass has no layout rule (${profile})`, async () => {
      const file = profile === 'angular-app' ? 'src/app/user-list.ts' : 'src/clamp.ts';
      const format = await activeRules(profile, 'format', file);
      const lint = await activeRules(profile, 'lint', file);

      assert.deepEqual(lint.on.filter((id) => format.on.includes(id)), []);
      assert.deepEqual(lint.on.filter((id) => lint.meta(id).type === 'layout'), []);
      assert.deepEqual(format.on.filter((id) => format.meta(id).fixable === undefined), []);
    });
  }
});
describe('the four sample projects', { skip: SKIP }, () => {
  for (const profile of PROFILES) {
    it(`end at zero errors after format then lint (${profile})`, () => {
      const project = join(SAMPLES, profile);

      assert.equal(runTool('format-file.ts', ['--all'], project).status, 0);
      assert.deepEqual(runTool('lint-file.ts', ['--all'], project), {
        status: 0,
        output: '',
      });
    });
  }
});
describe('the pure functions profile', { skip: SKIP }, () => {
  it('refuses a class, a parameter mutation, two exported functions, a wrong file name, no JSDoc and no copyright', () => {
    const bad = scratch(PURE, 'zz-bad.ts', [
      'export function first(list: number[]): number {',
      '  list.push(1);',
      '',
      '  return list.length;',
      '}',
      '',
      'export function second(): number {',
      '  return 2;',
      '}',
      '',
      'class Holder {}',
      '',
    ].join('\n'));
    const named = scratch(PURE, 'zz-wrong-name.ts', [
      '/*',
      ' * Copyright (c) 2026 Example Corp.',
      ' */',
      '',
      '/**',
      ' * Gives the double of a number.',
      ' * @param value - Number to multiply by two.',
      ' * @returns Twice the value.',
      ' * @example',
      ' * twice(2); // 4',
      ' */',
      'export function twice(value: number): number {',
      '  return value * 2;',
      '}',
      '',
    ].join('\n'));
    const result = runTool('lint-file.ts', [bad], SAMPLES);
    const name = runTool('lint-file.ts', [named], SAMPLES);

    rmSync(bad);
    rmSync(named);
    for (const rule of [
      'local/no-class',
      'functional/immutable-data',
      'local/single-exported-function',
      'jsdoc/require-jsdoc',
      'local/copyright-header',
    ]) {
      assert.match(result.output, new RegExp(` ${rule} `), rule);
    }
    assert.match(name.output, /^src\/zz-wrong-name\.ts:\d+:\d+ local\/filename-matches-export Name this file "twice\.ts"/);
  });
});
describe('a write', { skip: SKIP }, () => {
  it('is formatted, then gives only the errors left, one line each', () => {
    const path = scratch(PURE, 'zz-half.ts', 'export function half(value:number):number{return value/2}\n');

    runTool('format-file.ts', [path], SAMPLES);
    const result = runTool('lint-file.ts', [path], SAMPLES);
    const lines = result.output
      .trim()
      .split('\n');
    const formatted = readFileSync(path, 'utf8');

    rmSync(path);
    assert.equal(formatted, [
      '/*',
      ' * Copyright (c) 2026 Example Corp.',
      ' */',
      '',
      'export function half(value: number): number {',
      '  return value / 2;',
      '}',
      '',
    ].join('\n'));
    assert.ok(
      lines
        .slice(0, -1)
        .every((line) => /^src\/zz-half\.ts:\d+:\d+ \S+ /.test(line)),
      result.output,
    );
    assert.doesNotMatch(result.output, /@stylistic|perfectionist/);
  });
});
describe('the lint configs', { skip: SKIP }, () => {
  it('copy the same files into every profile', () => {
    assert.deepEqual(readdirSync(join(SAMPLES, 'ts-lib', '.agents', 'lint')).sort(), readdirSync(join(SAMPLES, 'angular-app', '.agents', 'lint')).sort());
  });
});
