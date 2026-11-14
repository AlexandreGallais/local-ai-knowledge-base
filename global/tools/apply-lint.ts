// Applies the strict format and lint of the base to a project, only when the user asks for them:
// .agents/profile.json (the lint profile, the copyright comment, the selector prefix and the check
// commands), then the format and lint configs in .agents/lint/. Running it again keeps the check
// commands the team changed. No package; Node 22.18 or later.
//   node /opt/local-ai-base/tools/apply-lint.ts --profile <p> [--copyright "<c>"] [--prefix <p>] [project-folder]
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  installLint,
  PROFILES,
} from './install-lint.ts';

export interface LintAnswers {
  profile: string;
  copyright?: string;
  prefix?: string;
}

interface ProfileFile {
  profile?: string;
  baseVersion?: string;
  copyright?: string;
  prefix?: string;
  checks?: Record<string, string>;
}

const BASE = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_MOUNT = '/opt/local-ai-base';

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) as T : fallback;
}

// The test runner the project already has: Angular's "ng test", Jest, or Vitest by default.
function testCommand(project: string, profile: string): string {
  const manifest = readJson<{
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  }>(join(project, 'package.json'), {});
  const packages = {
    ...manifest.dependencies,
    ...manifest.devDependencies,
  };

  if (profile.startsWith('angular-') || '@angular/core' in packages) {
    return 'npx --no -- ng test --watch=false';
  }
  return 'jest' in packages && !('vitest' in packages) ? 'npx --no -- jest' : 'npx --no -- vitest run';
}

export function defaultChecks(project: string, profile: string): Record<string, string> {
  return {
    format: `node ${BASE_MOUNT}/tools/format-file.ts --all`,
    lint: `node ${BASE_MOUNT}/tools/lint-file.ts --all`,
    build: 'npx --no -- tsc -p tsconfig.json',
    test: testCommand(project, profile),
  };
}

function writeProfile(project: string, answers: LintAnswers): void {
  const path = join(project, '.agents', 'profile.json');
  const before = readJson<ProfileFile>(path, {});
  const version = existsSync(join(BASE, 'VERSION')) ? readFileSync(join(BASE, 'VERSION'), 'utf8').trim() : undefined;
  const profile: ProfileFile = {
    ...before,
    profile: answers.profile,
    ...version === undefined ? {} : { baseVersion: version },
    ...answers.copyright === undefined ? {} : { copyright: answers.copyright },
    ...answers.prefix === undefined ? {} : { prefix: answers.prefix },
    checks: before.checks ?? defaultChecks(project, answers.profile),
  };

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(profile, undefined, 2)}\n`);
}

export function applyLint(folder: string, answers: LintAnswers): string[] {
  const project = resolve(folder);

  if (!PROFILES.includes(answers.profile)) {
    throw new Error(`Unknown lint profile "${answers.profile}". Profiles: ${PROFILES.join(', ')}.`);
  }
  writeProfile(project, answers);
  installLint(project);
  return [
    '.agents/profile.json',
    '.agents/lint/',
  ];
}

function option(args: readonly string[], name: string): string | undefined {
  const index = args.indexOf(name);

  return index === -1 ? undefined : args[index + 1];
}

function main(): void {
  const args = process.argv.slice(2);
  const values = new Set(args.flatMap((arg, index) => (arg.startsWith('--') ? [index + 1] : [])));
  const folder = args.find((arg, index) => !arg.startsWith('--') && !values.has(index)) ?? '.';
  const profile = option(args, '--profile');
  const copyright = option(args, '--copyright');
  const prefix = option(args, '--prefix');

  if (profile === undefined) {
    console.log(`Usage: node apply-lint.ts --profile <${PROFILES.join('|')}> [--copyright "<line>"] [--prefix <prefix>] [project-folder]`);
    process.exitCode = 2;
    return;
  }
  try {
    const written = applyLint(folder, {
      profile,
      ...copyright === undefined ? {} : { copyright },
      ...prefix === undefined ? {} : { prefix },
    });

    console.log(`Strict format and lint "${profile}" applied: ${written.join(', ')}.`);
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
