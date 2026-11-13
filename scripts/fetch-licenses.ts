// Copies the license files of every documentation source, unchanged and at the commit of its library,
// into <base>/licenses/<tool>/, then rewrites <base>/THIRD_PARTY_NOTICES.md with their copyright lines.
// Takes the clone of .library-cache/ when it holds the commit, else fetches only the root files of the
// repository at that commit. Needs git and network access; no package. From the root of this repository:
//   node scripts/fetch-licenses.ts                       the global base
//   node scripts/fetch-licenses.ts --base archive/v0.1   the archived version 0.1
import { spawnSync } from 'node:child_process';
import {
  existsSync,
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
import { parseArgs } from 'node:util';
import {
  type Lock,
  renderNotices,
} from './library-build.ts';
import {
  licenseFiles,
  readLicenses,
  remoteLicenseFiles,
  writeLicenses,
} from './library-licenses.ts';
import {
  readSources,
  type Source,
} from './library-sources.ts';

const REPOSITORY = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function hasCommit(folder: string, commit: string): boolean {
  return existsSync(join(folder, '.git')) && spawnSync(
    'git',
    [
      'cat-file',
      '-e',
      `${commit}^{commit}`,
    ],
    { cwd: folder },
  ).status === 0;
}

// The license files of one source, from its clone when the cache has it, else from its repository.
function filesOf(source: Source, commit: string, cache: string, fetched: Map<string, Record<string, string>>): Record<string, string> {
  const key = `${source.repository} ${commit}`;
  const known = fetched.get(key);

  if (known !== undefined) {
    return known;
  }
  const clone = join(cache, source.tool);
  const files = hasCommit(clone, commit) ? licenseFiles(clone, commit) : remoteLicenseFiles(source.repository, commit);

  fetched.set(key, files);
  return files;
}

function main(): void {
  const { values } = parseArgs({
    options: {
      base: { type: 'string' },
      cache: { type: 'string' },
    },
  });
  const base = resolve(REPOSITORY, values.base ?? 'global');
  const cache = resolve(values.cache ?? join(REPOSITORY, '.library-cache'));
  const sources = readSources(join(base, 'library', 'sources.json'));
  const lock = JSON.parse(readFileSync(join(base, 'library', 'lock.json'), 'utf8')) as Lock;
  const fetched = new Map<string, Record<string, string>>();
  const licensesRoot = join(base, 'licenses');

  for (const source of sources) {
    const entry = lock[source.tool];

    if (entry === undefined) {
      continue;
    }
    const files = filesOf(source, entry.commit, cache, fetched);

    if (Object.keys(files).length === 0) {
      console.log(`${source.tool}: no license file at the root of ${source.repository} at ${entry.commit}`);
      process.exitCode = 1;
    }
    writeLicenses(licensesRoot, source.tool, files);
    console.log(`${source.tool}: ${Object.keys(files).join(', ')}`);
  }
  writeFileSync(join(base, 'THIRD_PARTY_NOTICES.md'), renderNotices(sources, lock, readLicenses(licensesRoot)));
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
