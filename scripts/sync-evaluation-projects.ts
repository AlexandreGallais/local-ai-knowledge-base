// Copies the starting projects of the evaluation from the samples: the files Git keeps of the three
// samples the tasks use, and the package list of the samples. Run it after a change of a sample.
//   node scripts/sync-evaluation-projects.ts
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  mkdirSync,
  realpathSync,
  rmSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const PROJECTS = join(ROOT, 'global', 'evaluation', 'projects');
const SAMPLES = [
  'angular-app',
  'ts-lib',
  'ts-pure-lib',
];

// The files of the evaluation projects: path in the projects folder -> path of the sample file.
export function projectFiles(root: string = ROOT): Map<string, string> {
  const listed = spawnSync(
    'git',
    [
      '-C',
      root,
      'ls-files',
      ...SAMPLES.map((sample) => `samples/${sample}`),
    ],
    { encoding: 'utf8' },
  ).stdout
    .split('\n')
    .filter((path) => path !== '');

  return new Map([
    ['package.json', join(root, 'samples', 'package.json')],
    ...listed.map((path): [string, string] => [
      path.slice('samples/'.length),
      join(root, path),
    ]),
  ]);
}

function main(): void {
  rmSync(PROJECTS, {
    recursive: true,
    force: true,
  });
  for (const [
    target,
    source,
  ] of projectFiles()) {
    mkdirSync(dirname(join(PROJECTS, target)), { recursive: true });
    cpSync(source, join(PROJECTS, target));
  }
  process.stdout.write(`Evaluation projects copied in ${PROJECTS}.\n`);
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
