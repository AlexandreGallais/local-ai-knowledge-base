// The lint plugins a project may lack: a missing one leaves out its rules, and both passes still run.
import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import {
  optional,
  prune,
} from '../global/lint/optional.mjs';
import { runPass } from '../global/tools/lint-run.ts';
import { installLint } from '../global/tools/install-lint.ts';
import {
  SAMPLES,
  SKIP,
} from './lib/samples.ts';

const folders: string[] = [];

after(() => {
  for (const folder of folders) {
    rmSync(folder, {
      recursive: true,
      force: true,
    });
  }
});
describe('an optional lint plugin', () => {
  it('is undefined when it is not installed, and its prefixes are noted', async () => {
    const missing = await optional('eslint-plugin-not-installed-here', ['not-here']) as unknown;

    assert.equal(missing, undefined);
  });
  it('leaves out the rules, the plugin entry and the config of a missing plugin, and keeps the rest', () => {
    const [config] = prune(
      [
        {
          extends: [
            undefined,
            { name: 'kept' },
          ],
          plugins: {
            'gone': undefined,
            'here': {},
          },
          rules: {
            'gone/a-rule': 'error',
            'here/b-rule': 'error',
            'no-console': 'error',
          },
        },
      ],
      new Set(['gone']),
    ) as {
      extends: unknown[];
      plugins: Record<string, unknown>;
      rules: Record<string, unknown>;
    }[];

    assert.deepEqual(config?.extends, [{ name: 'kept' }]);
    assert.deepEqual(Object.keys(config?.plugins ?? {}), ['here']);
    assert.deepEqual(Object.keys(config?.rules ?? {}), [
      'here/b-rule',
      'no-console',
    ]);
  });
});
describe('a TypeScript project with only eslint, typescript-eslint and typescript', { skip: SKIP }, () => {
  it('runs the format and the lint passes, without Angular nor the other plugins', async () => {
    const project = mkdtempSync(join(tmpdir(), 'lint-optional-'));

    folders.push(project);
    mkdirSync(join(project, 'node_modules'));
    mkdirSync(join(project, 'src'));
    mkdirSync(join(project, '.agents'));
    for (const name of [
      'eslint',
      'typescript-eslint',
      'typescript',
    ]) {
      symlinkSync(join(SAMPLES, 'node_modules', name), join(project, 'node_modules', name), 'dir');
    }
    writeFileSync(join(project, 'package.json'), '{ "type": "module", "private": true }\n');
    writeFileSync(join(project, 'tsconfig.json'), '{ "compilerOptions": { "strict": true, "noEmit": true, "module": "preserve", "moduleResolution": "bundler", "target": "es2022" }, "include": ["src/**/*.ts"] }\n');
    writeFileSync(join(project, '.agents', 'profile.json'), '{ "profile": "ts-lib" }\n');
    writeFileSync(join(project, 'src', 'half.ts'), 'export function half(value:number):number{return value/2}\n');
    installLint(project);
    const formatted = await runPass(project, 'format', 'all');
    const lint = await runPass(project, 'lint', 'all');

    assert.deepEqual(formatted, []);
    assert.doesNotMatch(lint.join('\n'), /not installed|Could not find plugin|Cannot find/);
    assert.match(readFileSync(join(project, 'src', 'half.ts'), 'utf8'), /export function half/);
  });
});
