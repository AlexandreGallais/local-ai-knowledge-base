// Reads library/sources.json and fetches one source of the official documentation library: a
// shallow, sparse clone at its pinned reference, with only the paths it lists. Used by
// scripts/fetch-library.ts; needs git and network access, no package.
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { join } from 'node:path';

export type Flavor = 'angular' | 'docfx' | 'eslint' | 'hugo' | 'markdown' | 'mdbook' | 'mdn' | 'mdx' | 'node' | 'podman' | 'typescript';

export interface Source {
  tool: string;
  title: string;
  repository: string;
  ref: string;
  version: string;
  license: string;
  attribution: string;
  flavor: Flavor;
  core: boolean;
  // The chat model that receives this documentation as a knowledge base, if any.
  chat?: string;
  // Sparse checkout patterns: what git fetches, includes and code samples too.
  paths: string[];
  // Folders whose Markdown files become the library of the tool.
  docs: string[];
  exclude?: string[];
}

export interface Fetched {
  source: Source;
  folder: string;
  commit: string;
}

const TOOL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED: (keyof Source)[] = [
  'tool',
  'title',
  'repository',
  'ref',
  'version',
  'license',
  'attribution',
  'flavor',
  'paths',
  'docs',
];

export function git(cwd: string, args: string[]): string {
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed in ${cwd}: ${result.stderr.trim()}`);
  }
  return result.stdout;
}

// The problems of one source of sources.json: a missing field, a bad tool name, no license.
export function sourceProblems(source: Partial<Source>): string[] {
  const missing = REQUIRED
    .filter((field) => source[field] === undefined || source[field] === '' || (Array.isArray(source[field]) && source[field].length === 0))
    .map((field) => `${source.tool ?? '?'}: missing ${field}`);
  const name = source.tool !== undefined && !TOOL_NAME.test(source.tool) ? [`${source.tool}: tool name must be lower-case words joined by hyphens`] : [];

  return [
    ...missing,
    ...name,
  ];
}

export function readSources(file: string): Source[] {
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as { sources?: Partial<Source>[] };
  const sources = parsed.sources ?? [];
  const problems = sources.flatMap((source) => sourceProblems(source));

  if (problems.length > 0) {
    throw new Error(`library/sources.json:\n${problems.join('\n')}`);
  }
  return sources as Source[];
}

// A shallow, sparse clone of the source at its reference, in <cache>/<tool>/.
export function fetchSource(source: Source, cache: string): Fetched {
  const folder = join(cache, source.tool);

  rmSync(folder, {
    recursive: true,
    force: true,
  });
  mkdirSync(cache, { recursive: true });
  git(cache, [
    'clone',
    '--quiet',
    '--depth',
    '1',
    '--filter=blob:none',
    '--sparse',
    '--branch',
    source.ref,
    source.repository,
    source.tool,
  ]);
  git(folder, [
    'sparse-checkout',
    'set',
    '--no-cone',
    ...source.paths.map((path) => `/${path.replace(/^\/+/, '')}`),
  ]);
  return {
    source,
    folder,
    commit: git(folder, [
      'rev-parse',
      'HEAD',
    ]).trim(),
  };
}

// The clone already in the cache, for a rebuild without network.
export function cachedSource(source: Source, cache: string): Fetched {
  const folder = join(cache, source.tool);

  if (!existsSync(join(folder, '.git'))) {
    throw new Error(`${source.tool}: no clone in ${cache}; run without --offline first.`);
  }
  return {
    source,
    folder,
    commit: git(folder, [
      'rev-parse',
      'HEAD',
    ]).trim(),
  };
}
