// Prepares a copy of the example Angular project with the lint configuration of the base, for
// the tests. The packages are installed once in samples/typescript-angular/node_modules, from the
// npm registry; the copy links to them.
import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Result {
  status: number | null;
  output: string;
}

const WORK = join(dirname(fileURLToPath(import.meta.url)), '..');

export const SAMPLE = join(WORK, 'samples', 'typescript-angular');
export const TEMPLATE = join(WORK, 'code', 'templates', 'typescript-angular');

export const CONFIG_FILES = [
  'eslint.config.mjs',
  'eslint.strict-format.mjs',
  '.prettierrc.json',
  'tsconfig.json',
];

const WINDOWS = process.platform === 'win32';

function install(): void {
  if (existsSync(join(SAMPLE, 'node_modules', '.bin', 'eslint'))) {
    return;
  }
  const result = spawnSync(
    'npm',
    [
      'ci',
      '--no-audit',
      '--no-fund',
      '--loglevel',
      'error',
    ],
    {
      cwd: SAMPLE,
      encoding: 'utf8',
      shell: WINDOWS,
    },
  );

  if (result.status !== 0) {
    throw new Error(`npm ci failed in the example project: ${result.stderr}`);
  }
}

export function run(project: string, script: string, env: Record<string, string> = {}): Result {
  const result = spawnSync(
    'npm',
    [
      'run',
      '--silent',
      script,
    ],
    {
      cwd: project,
      encoding: 'utf8',
      shell: WINDOWS,
      env: {
        ...process.env,
        ...env,
      },
    },
  );

  return {
    status: result.status,
    output: result.stdout + result.stderr,
  };
}

// A fresh copy of the example project, with the template configuration, formatted by Prettier
// and fixed by "npm run fix" so that it starts from clean code.
export function prepareProject(): string {
  install();
  // The real path: tools report real paths, and the temp folder is a link on some systems.
  const project = realpathSync(mkdtempSync(join(tmpdir(), 'lint-sample-')));

  copyFileSync(join(SAMPLE, 'package.json'), join(project, 'package.json'));
  cpSync(join(SAMPLE, 'src', 'app'), join(project, 'src', 'app'), { recursive: true });
  for (const file of CONFIG_FILES) {
    copyFileSync(join(TEMPLATE, file), join(project, file));
  }
  symlinkSync(join(SAMPLE, 'node_modules'), join(project, 'node_modules'), WINDOWS ? 'junction' : 'dir');
  run(project, 'fix');
  return project;
}

export function writeSource(project: string, path: string, content: string): void {
  mkdirSync(dirname(join(project, path)), { recursive: true });
  writeFileSync(join(project, path), content);
}
