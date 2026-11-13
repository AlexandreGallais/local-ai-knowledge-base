// The TypeScript types of the symbol properties (global/kit/symbols) are generated from the catalog
// cards. Here they are generated again and compared, then copied in the TypeScript library sample,
// formatted, linted, compiled and tested there with the real packages.
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
  formatTypeFiles,
  generateSymbolTypes,
  kebabCase,
  pascalCase,
  propertyType,
  readProperties,
  readSynoptics,
} from './generate-symbol-types.ts';
import { readCards } from './lib/catalog.ts';
import {
  installLint,
  ROOT,
  runIn,
  runTool,
  SAMPLES,
  SKIP,
} from './lib/samples.ts';

const KIT = join(ROOT, 'global', 'kit', 'symbols');
const SAMPLE = join(SAMPLES, 'ts-lib');
const COPY = join(SAMPLE, 'src', 'zz-symbols');

describe('the generator of the symbol types', () => {
  it('names a type in PascalCase and its file in kebab case, never with a leading digit', () => {
    assert.equal(pascalCase('Push-pull button'), 'PushPullButton');
    assert.equal(pascalCase('4 to 20 mA current loop'), 'MaCurrentLoop4To20');
    assert.equal(kebabCase('CO2 fixed gas system'), 'co2-fixed-gas-system');
  });
  it('reads the type of a property from its card', () => {
    assert.equal(propertyType('speedRpm', 'number, rpm, M'), 'number');
    assert.equal(propertyType('toothCount', 'integer, P'), 'number');
    assert.equal(propertyType('isOpen', 'boolean, M'), 'boolean');
    assert.equal(propertyType('labels', 'string[], P'), 'readonly string[]');
    assert.equal(propertyType('runState', 'enum of the set `drive`; X'), 'RunState');
    assert.equal(propertyType('lineType', 'enum `main`, `pilot`; P'), '\'main\' | \'pilot\'');
    assert.equal(propertyType('measurement', 'object `value` and `unit`, M'), 'Measurement');
  });
  it('reads each group of names of a properties line', () => {
    const read = readProperties('set `drive`; `inputSpeedRpm`, `outputSpeedRpm` (number, rpm, M); `isEngaged` (boolean, M).');

    assert.deepEqual(read.properties.map((property) => property.name), [
      'inputSpeedRpm',
      'outputSpeedRpm',
      'isEngaged',
    ]);
    assert.deepEqual(read.unknown, []);
  });
  it('gives every card of the catalog its file, without warning', () => {
    const documents = readSynoptics();
    const generation = generateSymbolTypes(documents);
    const cards = documents
      .filter((document) => document.name.startsWith('catalog-'))
      .flatMap((document) => readCards(document.text));

    assert.deepEqual(generation.warnings, []);
    assert.equal(generation.files.length, cards.length + 1);
  });
});
before(() => {
  if (SKIP === undefined) {
    installLint('ts-lib');
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
describe('the symbol types of the kit', { skip: SKIP }, () => {
  it('are the generator output, formatted', () => {
    const files = formatTypeFiles(generateSymbolTypes(readSynoptics()).files);
    const kept = readdirSync(KIT).filter((name) => !name.endsWith('.spec.ts'));
    const names = files.map((file) => file.name);

    assert.deepEqual(names.filter((name) => !kept.includes(name)), [], 'generated, not in the kit');
    assert.deepEqual(kept.filter((name) => !names.includes(name)), [], 'in the kit, not generated');
    for (const file of files) {
      assert.equal(readFileSync(join(KIT, file.name), 'utf8'), file.text, `${file.name} is not up to date: node scripts/generate-symbol-types.ts`);
    }
  });
  it('pass the format pass, then the lint of the TypeScript library profile with 0 errors', () => {
    const format = runTool('format-file.ts', ['--all'], SAMPLE);
    const lint = runTool('lint-file.ts', ['--all'], SAMPLE);

    assert.equal(format.status, 0, format.output);
    assert.equal(lint.status, 0, lint.output);
    assert.match(readFileSync(join(COPY, 'push-pull-button.ts'), 'utf8'), /export interface PushPullButtonProperties extends/);
  });
  it('compile, and the push-pull button has the properties of its card', () => {
    const build = runIn(SAMPLE, 'typescript/bin/tsc', [
      '-p',
      'tsconfig.json',
    ]);
    const tests = runIn(SAMPLE, 'vitest/vitest.mjs', [
      'run',
      'src/zz-symbols',
    ]);

    assert.equal(build.status, 0, build.output);
    assert.equal(tests.status, 0, tests.output.slice(-2000));
  });
});
