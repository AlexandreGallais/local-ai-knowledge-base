// The official documentation library in the export: the files of the chosen tools, exported as one
// ordinary export part, then gzip, then base64 in lines of 76 characters, cut into parts
// `library-<n>.txt`. Base64 holds ASCII only, which a copy and paste does not change. Each part
// carries the SHA-256 of its own base64 and of the whole gzip; import.ts checks both.
import { createHash } from 'node:crypto';
import {
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  join,
  relative,
  sep,
} from 'node:path';
import { gzipSync } from 'node:zlib';
import type {
  ExportedFile,
  Part,
} from '../import.ts';
import { LIBRARY_FORMAT } from '../import.ts';

interface LibrarySource {
  tool: string;
  core: boolean;
}

// The ordinary export of export.ts, passed in to avoid a circular import.
type Builder = (exported: ExportedFile[], kilobytes: number) => Part[];
const KB = 1000;
const LINE = 76;
const HEADER_RESERVE = 300;
const ONE_PART_KB = 1_000_000;

function sources(root: string): LibrarySource[] {
  const path = join(root, 'library', 'sources.json');

  return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as { sources: LibrarySource[] }).sources : [];
}

// The tools of a selection: "core", "all", or a comma list of tool names.
export function libraryTools(root: string, selection: string): string[] {
  const known = sources(root);
  const names = known.map((source) => source.tool);

  if (selection === 'all') {
    return names;
  }
  if (selection === 'core') {
    return known
      .filter((source) => source.core)
      .map((source) => source.tool);
  }
  const asked = selection
    .split(',')
    .map((tool) => tool.trim())
    .filter((tool) => tool !== '');
  const unknown = asked.filter((tool) => !names.includes(tool));

  if (unknown.length > 0) {
    throw new Error(`--library: unknown tool ${unknown.join(', ')}. Use core, all, or some of: ${names.join(', ')}.`);
  }
  return asked;
}

function walk(folder: string): string[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);

    return entry.isDirectory() ? walk(path) : [path];
  });
}

export function libraryFiles(root: string, tools: string[]): ExportedFile[] {
  if (tools.length === 0) {
    return [];
  }
  const shared = [
    'library/README.md',
    'library/sources.json',
  ].filter((path) => existsSync(join(root, path)));
  const paths = [
    ...shared.map((path) => join(root, path)),
    ...tools.flatMap((tool) => walk(join(root, 'library', tool))),
  ];

  return paths.map((path) => {
    return {
      path: relative(root, path)
        .split(sep)
        .join('/'),
      content: readFileSync(path, 'utf8'),
    };
  });
}

function sha256(data: Buffer | string): string {
  return createHash('sha256')
    .update(data)
    .digest('hex');
}

function compressed(files: ExportedFile[], buildExport: Builder): string {
  const inner = buildExport(files, ONE_PART_KB);

  if (inner.length !== 1) {
    throw new Error('The library export must hold one inner part.');
  }
  return gzipSync(Buffer.from(inner[0]?.text ?? '', 'utf8'), { level: 9 }).toString('base64');
}

// Cuts the base64 text into parts of at most `maxKb` kilobytes, each with its header line.
export function libraryParts(files: ExportedFile[], maxKb: number, buildExport: Builder): Part[] {
  if (files.length === 0) {
    return [];
  }
  const base64 = compressed(files, buildExport);
  const whole = sha256(Buffer.from(base64, 'base64'));
  const lines = base64.match(new RegExp(`.{1,${LINE}}`, 'g')) ?? [];
  const perPart = Math.floor((maxKb * KB - HEADER_RESERVE) / (LINE + 1));
  const bodies = Array.from({ length: Math.ceil(lines.length / perPart) }, (_, index) => lines.slice(index * perPart, (index + 1) * perPart));

  return bodies.map((body, index) => {
    return {
      name: `library-${index + 1}.txt`,
      text: `=====${LIBRARY_FORMAT} PART ${index + 1} OF ${bodies.length} SHA256 ${sha256(body.join(''))} TOTAL ${whole}=====\n${body.join('\n')}\n`,
    };
  });
}

// For each tool, the number of library parts it would add on its own.
export function libraryReport(root: string, tools: string[], maxKb: number, buildExport: Builder): string[] {
  return tools.map((tool) => {
    const parts = libraryParts(libraryFiles(root, [tool]), maxKb, buildExport).length;

    return `  ${tool}: about ${parts} part(s)`;
  });
}
