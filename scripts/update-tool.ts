// Lists the newer release tags of the documentation sources, and moves one source to a new tag.
// Needs git and network access; no package. Run from the root of the repository:
//   node scripts/update-tool.ts                      list every source with a newer tag
//   node scripts/update-tool.ts <tool> <tag>         set the tag and version of one source
// Then run node scripts/fetch-library.ts --tool <tool>, and follow guides/update-a-tool.md.
import { spawnSync } from 'node:child_process';
import {
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

interface SourceEntry {
  tool: string;
  repository: string;
  ref: string;
  version: string;
}

const SOURCES = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'library', 'sources.json');
const SEMVER = /^v?(\d+)\.(\d+)\.(\d+)$/;

function numbers(tag: string): number[] | undefined {
  const match = SEMVER.exec(tag);

  return match === null ? undefined : match
    .slice(1)
    .map(Number);
}

export function compareTags(a: string, b: string): number {
  const left = numbers(a) ?? [];
  const right = numbers(b) ?? [];

  for (let position = 0; position < 3; position += 1) {
    const difference = (left[position] ?? 0) - (right[position] ?? 0);

    if (difference !== 0) {
      return difference;
    }
  }
  return 0;
}

// The release tags newer than the current one, oldest first. Pre-releases are left out.
export function newerTags(current: string, tags: string[]): string[] {
  if (numbers(current) === undefined) {
    return [];
  }
  return tags
    .filter((tag) => numbers(tag) !== undefined && compareTags(tag, current) > 0)
    .sort(compareTags);
}

// "v22.3.1" gives "22.3": the version a document header keeps.
export function versionOf(tag: string): string {
  const [
    major = 0,
    minor = 0,
  ] = numbers(tag) ?? [];

  return `${major}.${minor}`;
}

function remoteTags(repository: string): string[] {
  const result = spawnSync(
    'git',
    [
      'ls-remote',
      '--tags',
      '--refs',
      repository,
    ],
    {
      encoding: 'utf8',
      maxBuffer: 256 * 1024 * 1024,
    },
  );

  return result.status === 0 ? result.stdout
    .split('\n')
    .map((line) => line.split('refs/tags/')[1] ?? '')
    .filter((tag) => tag !== '') : [];
}

function readSources(): { sources: SourceEntry[] } {
  return JSON.parse(readFileSync(SOURCES, 'utf8')) as { sources: SourceEntry[] };
}

function list(): void {
  const seen = new Set<string>();

  for (const source of readSources().sources) {
    const key = `${source.repository} ${source.ref}`;

    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    const newer = newerTags(source.ref, remoteTags(source.repository));

    if (newer.length > 0) {
      console.log(`${source.tool}: ${source.ref} -> ${newer.at(-1) ?? ''} (${newer.length} newer tag(s))`);
    }
  }
}

function update(tool: string, tag: string): void {
  const file = readSources();
  const source = file.sources.find((item) => item.tool === tool);

  if (source === undefined) {
    console.log(`Unknown tool: ${tool}.`);
    process.exitCode = 2;
    return;
  }
  source.ref = tag;
  source.version = versionOf(tag);
  writeFileSync(SOURCES, `${JSON.stringify(file, null, 2)}\n`);
  console.log(`${tool}: now at ${tag}, version ${source.version}. Run node scripts/fetch-library.ts --tool ${tool}.`);
}

function main(): void {
  const [
    tool,
    tag,
  ] = process.argv.slice(2);

  if (tool === undefined) {
    list();
    return;
  }
  if (tag === undefined) {
    console.log('Usage: node scripts/update-tool.ts [<tool> <tag>]');
    process.exitCode = 2;
    return;
  }
  update(tool, tag);
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
