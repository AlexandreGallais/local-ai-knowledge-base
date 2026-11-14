// The npm packages of a profile that a project has not installed yet, and the one command that installs
// them, from the table "Chosen" of packages.md. The AI runs it; OpenCode asks the user to approve.
// No package; Node 22.18 or later.
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

export interface ProfilePackage {
  name: string;
  version: string;
}

// The rows of the table "Chosen" of packages.md: a cell may name several packages of one version.
export function profilePackages(packagesMarkdown: string, profile: string): ProfilePackage[] {
  const lines = packagesMarkdown.split('\n');
  const start = lines.indexOf('## Chosen');
  const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));

  return lines
    .slice(start + 1, end < 0 ? undefined : end)
    .filter((line) => line.startsWith('| ') && !line.startsWith('| Package') && !line.startsWith('| ---'))
    .map((line) => line.split('|').map((cell) => cell.trim()))
    .filter((cells) => {
      const profiles = cells[4] ?? '';

      return profiles === 'all' || profiles
        .split(',')
        .map((item) => item.trim())
        .includes(profile);
    })
    .flatMap((cells) => (cells[1] ?? '')
      .split(',')
      .map((name) => ({
        name: name.trim(),
        version: cells[2] ?? '',
      })));
}

export function missingPackages(base: string, project: string): ProfilePackage[] {
  const profile = (JSON.parse(readFileSync(join(project, '.agents', 'profile.json'), 'utf8')) as { profile?: string }).profile ?? '';
  const path = join(base, 'packages.md');
  const table = existsSync(path) ? readFileSync(path, 'utf8') : '';

  return profilePackages(table, profile).filter((item) => !existsSync(join(project, 'node_modules', item.name, 'package.json')));
}

// What to tell the user: nothing is missing, or the exact command to run once.
export function installAdvice(missing: readonly ProfilePackage[]): string {
  if (missing.length === 0) {
    return 'Every package of the profile is installed.';
  }
  return [
    `${missing.length} package(s) of the profile are not installed: format, lint, build and tests cannot run.`,
    'Run, from the project root (OpenCode asks the user to approve it):',
    `npm install --save-dev ${missing.map((item) => `${item.name}@${item.version}`).join(' ')}`,
  ].join('\n');
}

function main(): void {
  const base = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const project = resolve(process.argv[2] ?? '.');

  if (!existsSync(join(project, '.agents', 'profile.json'))) {
    console.log('No .agents/profile.json: the project has no profile yet.');
    process.exitCode = 2;
    return;
  }
  const missing = missingPackages(base, project);

  console.log(installAdvice(missing));
  process.exitCode = missing.length === 0 ? 0 : 1;
}

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
