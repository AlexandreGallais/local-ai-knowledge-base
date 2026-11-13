// Runs the lint configuration of code/templates/typescript-angular/ on the example Angular
// project. Needs the npm registry once, to install the packages of the example project.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import {
  prepareProject,
  run,
  SAMPLE,
  TEMPLATE,
  writeSource,
} from './lint-sample.ts';

const UNORDERED = [
  'import { signal } from \'@angular/core\';',
  'import type { Valve } from \'./valves/valve\';',
  'import { firstValueFrom } from \'rxjs\';',
  '',
  'export const selectedValve = signal<Valve | undefined>(undefined);',
  'export const firstValue = firstValueFrom;',
  '',
].join('\n');

describe('lint configuration of TypeScript and Angular', () => {
  const project = prepareProject();

  it('runs npm run check without a configuration error, and ends with zero errors on right code', () => {
    const result = run(project, 'check');

    assert.equal(result.status, 0, result.output);
  });
  it('type-checks the example project', () => {
    const result = run(project, 'build');

    assert.equal(result.status, 0, result.output);
  });
  it('fails on imports out of order, and passes with STRICT_FORMAT=0', () => {
    writeSource(project, 'src/app/selection.ts', UNORDERED);
    const strict = run(project, 'check');
    const loose = run(project, 'check', { STRICT_FORMAT: '0' });

    assert.notEqual(strict.status, 0);
    assert.match(strict.output, /simple-import-sort\/imports/);
    assert.equal(loose.status, 0, loose.output);
  });
  it('keeps the scripts of the example project equal to the template', () => {
    const sample = JSON.parse(readFileSync(join(SAMPLE, 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    const template = JSON.parse(readFileSync(join(TEMPLATE, 'package.fragment.json'), 'utf8')) as { scripts: Record<string, string> };

    assert.equal(sample.scripts['fix'], template.scripts['fix']);
    assert.equal(sample.scripts['check'], template.scripts['check']);
  });
});
