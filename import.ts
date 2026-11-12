// Rebuilds the knowledge base from its export: a few text files `base-<n>.txt`, pasted by hand.
// Run with Node 22.18 or later, on Linux, macOS or Windows, no build step, no package:
//   node import.ts                    reads ./base-*.txt, rebuilds the base in the current folder
//   node import.ts --from <folder>    reads the export files from <folder>
//   node import.ts --to <folder>      writes the base into <folder>
//   node import.ts --project          writes only what a project needs: AGENTS.md, .agents/, docs/,
//                                     templates/ at the root, and scripts/check-base.ts and
//                                     scripts/check-versions.ts
//   node import.ts --force            replaces files that already exist and differ
// It checks every part and every file with its SHA-256 checksum, and writes nothing if one fails.
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  isAbsolute,
  join,
  normalize,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

export interface ExportedFile {
  path: string;
  content: string;
}

export interface Part {
  name: string;
  text: string;
}

interface Chunk {
  path: string;
  index: number;
  count: number;
  hash: string;
  content: string;
}

interface ParsedPart {
  number: number;
  total: number;
  chunks: Chunk[];
}

export const FORMAT = 'BASE-EXPORT-1';
export const PART_PATTERN = /^base-\d+\.txt$/;
const PROJECT_FOLDERS = [
  'code/',
  'scripts/check-base.ts',
  'scripts/check-versions.ts',
];
const NEWLINE = '\n';

export class ImportError extends Error {}

export function sha256(text: string): string {
  return createHash('sha256')
    .update(text, 'utf8')
    .digest('hex');
}

function headerOf(text: string, name: string): {
  marker: string;
  number: number;
  total: number;
  hash: string;
} {
  const match = new RegExp(`^(=+${FORMAT}-[\\da-f]+=+) PART (\\d+) OF (\\d+) SHA256 ([\\da-f]{64})$`).exec(text.slice(0, text.indexOf(NEWLINE)));

  if (match === null) {
    throw new ImportError(`${name}: the first line is not the header of an export part. Paste the whole file again.`);
  }
  return {
    marker: match[1],
    number: Number(match[2]),
    total: Number(match[3]),
    hash: match[4],
  };
}

function chunkHeader(line: string, marker: string, name: string): Omit<Chunk, 'content'> & { addedNewline: boolean } {
  const match = /^FILE (\d+)\/(\d+) ([\da-f]{64}) (NL|RAW) (.+)$/.exec(line.slice(marker.length + 1));

  if (match === null || !line.startsWith(`${marker} `)) {
    throw new ImportError(`${name}: a file header is damaged: ${line}`);
  }
  return {
    index: Number(match[1]),
    count: Number(match[2]),
    hash: match[3],
    addedNewline: match[4] === 'NL',
    path: match[5],
  };
}

export function parsePart(raw: string, name: string): ParsedPart {
  const text = raw
    .replaceAll('\r\n', NEWLINE)
    .replace(/\n*$/, NEWLINE);
  const header = headerOf(text, name);
  const body = text.slice(text.indexOf(NEWLINE) + 1);

  if (sha256(body) !== header.hash) {
    throw new ImportError(`${name}: part ${header.number} of ${header.total} was damaged by the copy. Paste it again, whole.`);
  }
  const lines = body.split(NEWLINE);
  const chunks: Chunk[] = [];

  for (let index = 0; index < lines.length - 1; index += 1) {
    const chunk = chunkHeader(lines[index], header.marker, name);
    const end = lines.indexOf(`${header.marker} END`, index + 1);

    if (end < 0) {
      throw new ImportError(`${name}: the end of ${chunk.path} is missing.`);
    }
    const content = lines
      .slice(index + 1, end)
      .map((line) => line + NEWLINE)
      .join('');

    chunks.push({
      ...chunk,
      content: chunk.addedNewline ? content.slice(0, -1) : content,
    });
    index = end;
  }
  return {
    number: header.number,
    total: header.total,
    chunks,
  };
}

function checkParts(parts: ParsedPart[]): void {
  const total = parts[0]?.total ?? 0;
  const numbers = new Set(parts.map((part) => part.number));
  const missing = Array
    .from({ length: total }, (_, index) => index + 1)
    .filter((number) => !numbers.has(number));

  if (parts.length === 0) {
    throw new ImportError('No export part found: paste the files base-1.txt, base-2.txt… next to import.ts.');
  }
  if (parts.some((part) => part.total !== total)) {
    throw new ImportError('The parts come from two different exports. Delete them all and paste the parts of one export.');
  }
  if (missing.length > 0) {
    throw new ImportError(`Missing parts: ${missing.map((number) => `base-${number}.txt`).join(', ')}.`);
  }
  if (numbers.size !== parts.length) {
    throw new ImportError('A part is there twice. Keep one copy of each part.');
  }
}

function safePath(path: string): string {
  const clean = normalize(path);

  if (isAbsolute(path) || clean
    .split(/[\\/]/)
    .includes('..')) {
    throw new ImportError(`Unsafe path in the export, refused: ${path}`);
  }
  return clean;
}

export function assemble(parts: ParsedPart[]): ExportedFile[] {
  checkParts(parts);
  const byPath = new Map<string, Chunk[]>();

  for (const chunk of parts
    .toSorted((first, second) => first.number - second.number)
    .flatMap((part) => part.chunks)) {
    byPath.set(chunk.path, [
      ...(byPath.get(chunk.path) ?? []),
      chunk,
    ]);
  }
  return [...byPath].map(([
    path,
    chunks,
  ]) => {
    const content = chunks
      .toSorted((first, second) => first.index - second.index)
      .map((chunk) => chunk.content)
      .join('');

    if (chunks.length !== chunks[0].count || sha256(content) !== chunks[0].hash) {
      throw new ImportError(`${path}: incomplete or damaged. Paste its parts again.`);
    }
    return {
      path: safePath(path),
      content,
    };
  });
}

export function forProject(files: ExportedFile[]): ExportedFile[] {
  return files
    .filter((file) => PROJECT_FOLDERS.some((prefix) => file.path.split(sep).join('/').startsWith(prefix)))
    .map((file) => {
      const path = file.path
        .split(sep)
        .join('/');

      return {
        path: path.startsWith('code/') ? path.slice('code/'.length) : path,
        content: file.content,
      };
    });
}

export function writeFiles(files: ExportedFile[], target: string, force: boolean): string[] {
  const conflicts = files.filter((file) => {
    const path = join(target, file.path);

    return existsSync(path) && readFileSync(path, 'utf8') !== file.content;
  });

  if (conflicts.length > 0 && !force) {
    throw new ImportError(`These files exist and differ; nothing was written. Use --force to replace them:\n${conflicts
      .map((file) => `- ${file.path}`)
      .join(NEWLINE)}`);
  }
  for (const file of files) {
    mkdirSync(dirname(join(target, file.path)), { recursive: true });
    writeFileSync(join(target, file.path), file.content);
  }
  return files.map((file) => file.path);
}

export function readParts(folder: string): Part[] {
  return readdirSync(folder)
    .filter((name) => PART_PATTERN.test(name))
    .map((name) => {
      return {
        name,
        text: readFileSync(join(folder, name), 'utf8'),
      };
    });
}

export function importBase(
  parts: Part[],
  target: string,
  options: {
    project: boolean;
    force: boolean;
  },
): string[] {
  const files = assemble(parts.map((part) => parsePart(part.text, part.name)));

  return writeFiles(options.project ? forProject(files) : files, target, options.force);
}

function main(): void {
  const { values } = parseArgs({
    options: {
      from: { type: 'string' },
      to: { type: 'string' },
      project: { type: 'boolean' },
      force: { type: 'boolean' },
    },
  });

  try {
    const written = importBase(readParts(resolve(values.from ?? '.')), resolve(values.to ?? '.'), {
      project: values.project === true,
      force: values.force === true,
    });

    process.stdout.write(`Import done: ${written.length} files written.\n`);
  } catch (error) {
    process.stdout.write(`Import failed: ${(error as Error).message}\n`);
    process.exitCode = 1;
  }
}

// realpathSync: on some systems the temp folder is a link, and the two paths differ without it.
if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
