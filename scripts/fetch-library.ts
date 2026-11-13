// Fetches the official documentation listed in global/library/sources.json, each source at its
// pinned reference, and rebuilds global/library/: cleaned Markdown cut into files of 16 KB at most,
// an index per tool, lock.json, README.md and global/THIRD_PARTY_NOTICES.md. Needs git and network
// access; no package. Run from the root of this repository:
//   node scripts/fetch-library.ts                    every source
//   node scripts/fetch-library.ts --tool angular,mdn-svg
//   node scripts/fetch-library.ts --offline          rebuild from the clones of .library-cache/
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
  renderLibraryReadme,
  renderNotices,
  writeTool,
} from './library-build.ts';
import {
  cachedSource,
  fetchSource,
  readSources,
} from './library-sources.ts';

export {
  fetchSource,
  readSources,
  type Source,
  sourceProblems,
} from './library-sources.ts';

// The global base: the library lives in global/library/, the clones in .library-cache/ beside it.
const REPOSITORY = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = join(REPOSITORY, 'global');

export function readLock(libraryRoot: string): Lock {
  const path = join(libraryRoot, 'lock.json');

  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) as Lock : {};
}

function main(): void {
  const { values } = parseArgs({
    options: {
      tool: { type: 'string' },
      offline: { type: 'boolean' },
      cache: { type: 'string' },
    },
  });
  const libraryRoot = join(ROOT, 'library');
  const cache = resolve(values.cache ?? join(REPOSITORY, '.library-cache'));
  const sources = readSources(join(libraryRoot, 'sources.json'));
  const wanted = values.tool
    ?.split(',')
    .map((tool) => tool.trim());
  const unknown = (wanted ?? []).filter((tool) => !sources.some((source) => source.tool === tool));

  if (unknown.length > 0) {
    console.log(`Unknown tool: ${unknown.join(', ')}. Tools: ${sources.map((source) => source.tool).join(', ')}.`);
    process.exitCode = 2;
    return;
  }
  const lock = readLock(libraryRoot);

  for (const source of sources.filter((item) => wanted === undefined || wanted.includes(item.tool))) {
    const fetched = values.offline === true ? cachedSource(source, cache) : fetchSource(source, cache);
    const entry = writeTool(fetched, libraryRoot);

    lock[source.tool] = entry;
    console.log(`${source.tool}: ${entry.files} files, ${(entry.bytes / 1_000_000).toFixed(1)} MB, commit ${entry.commit.slice(0, 12)}`);
  }
  writeFileSync(join(libraryRoot, 'lock.json'), `${JSON.stringify(lock, null, 2)}\n`);
  writeFileSync(join(libraryRoot, 'README.md'), renderLibraryReadme(sources, lock));
  writeFileSync(join(ROOT, 'THIRD_PARTY_NOTICES.md'), renderNotices(sources, lock));
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
