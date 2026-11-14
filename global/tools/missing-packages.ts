// The lint packages a project has not installed yet, and the one command that installs them at their
// latest version, from the table "Chosen" of packages.md: the "all" rows for every project, the
// "Angular" rows when package.json lists @angular/core. The AI runs the command; OpenCode asks the
// user to approve it. No package; Node 22.18 or later.
//   node /opt/local-ai-base/tools/missing-packages.ts [project-folder]
import {
  existsSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface LintPackage {
  name: string;
  // The version the base was tested with; the install takes the latest one.
  tested: string;
}

// The rows of the table "Chosen" of packages.md for a project: a cell may name several packages.
export function lintPackages(packagesMarkdown: string, angular: boolean): LintPackage[] {
  const lines = packagesMarkdown.split('\n');
  const start = lines.indexOf('## Chosen');
  const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));

  return lines
    .slice(start + 1, end < 0 ? undefined : end)
    .filter((line) => line.startsWith('| ') && !line.startsWith('| Package') && !line.startsWith('| ---'))
    .map((line) => line.split('|').map((cell) => cell.trim()))
    .filter((cells) => cells[4] === 'all' || (angular && cells[4] === 'Angular'))
    .flatMap((cells) => (cells[1] ?? '')
      .split(',')
      .map((name) => ({
        name: name.trim(),
        tested: cells[2] ?? '',
      })));
}

function dependsOnAngular(project: string): boolean {
  const path = join(project, 'package.json');

  if (!existsSync(path)) {
    return false;
  }
  const manifest = JSON.parse(readFileSync(path, 'utf8')) as Record<string, Record<string, string> | undefined>;

  return [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ].some((field) => manifest[field]?.['@angular/core'] !== undefined);
}

export function missingPackages(base: string, project: string): LintPackage[] {
  const path = join(base, 'packages.md');
  const table = existsSync(path) ? readFileSync(path, 'utf8') : '';

  return lintPackages(table, dependsOnAngular(project)).filter((item) => !existsSync(join(project, 'node_modules', item.name, 'package.json')));
}

// What to tell the user: nothing is missing, or the exact command to run once.
export function installAdvice(missing: readonly LintPackage[]): string {
  if (missing.length === 0) {
    return 'Every lint package is installed.';
  }
  return [
    `${missing.length} lint package(s) are not installed: the format and lint passes cannot run in full.`,
    'Run, from the project root (OpenCode asks the user to approve it):',
    `npm install --save-dev ${missing.map((item) => `${item.name}@latest`).join(' ')}`,
  ].join('\n');
}

function main(): void {
  const base = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const project = resolve(process.argv[2] ?? '.');
  const missing = missingPackages(base, project);

  console.log(installAdvice(missing));
  process.exitCode = missing.length === 0 ? 0 : 1;
}

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
