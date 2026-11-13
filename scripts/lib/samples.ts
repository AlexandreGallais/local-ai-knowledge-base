// Helpers for the tests that run the format and lint passes on the sample projects for real.
// They need the packages of samples/package.json installed once: npm install --prefix samples.
import {
  execFileSync,
  spawnSync,
} from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SAMPLES = join(ROOT, 'samples');
export const TOOLS = join(ROOT, 'global', 'tools');

export const PROFILES = [
  'angular-app',
  'angular-lib',
  'ts-lib',
  'ts-pure-lib',
];

// Undefined when the packages are there, else the reason to skip the tests that need them.
export const SKIP = existsSync(join(SAMPLES, 'node_modules', 'eslint')) ? undefined : 'the sample packages are not installed: npm install --prefix samples';

export interface Run {
  status: number;
  output: string;
}

export function runTool(tool: string, args: string[], cwd: string): Run {
  try {
    return {
      status: 0,
      output: execFileSync(
        process.execPath,
        [
          join(TOOLS, tool),
          ...args,
        ],
        {
          cwd,
          encoding: 'utf8',
          stdio: [
            'pipe',
            'pipe',
            'pipe',
          ],
        },
      ),
    };
  } catch (error) {
    const failed = error as {
      status: number;
      stdout: string;
      stderr: string;
    };

    return {
      status: failed.status,
      output: `${failed.stdout}${failed.stderr}`,
    };
  }
}

// Runs a script of the sample packages (as "ng" or "tsc") in a folder.
export function runIn(cwd: string, script: string, args: string[]): Run {
  const result = spawnSync(
    process.execPath,
    [
      join(SAMPLES, 'node_modules', script),
      ...args,
    ],
    {
      cwd,
      encoding: 'utf8',
      env: {
        ...process.env,
        NG_CLI_ANALYTICS: 'false',
      },
    },
  );

  return {
    status: result.status ?? 1,
    output: `${result.stdout}${result.stderr}`,
  };
}

export function installLint(profile: string): void {
  runTool('install-lint.ts', [join(SAMPLES, profile)], SAMPLES);
}
