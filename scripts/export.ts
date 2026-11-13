// Builds the two export packs, the global base and the project kit, in five part sizes:
//   export/<size>/global-001.txt ... , project-001.txt ..., import-base.ts, import-project.ts
// Run with Node 22.18 or later, from the root of the repository, no package:
//   node scripts/export.ts [--out export] [--sizes 500k,1m,2m,5m,10m]
//                          [--compression brotli|zstd|gzip] [--encoding z85|base64]
import {
  copyFileSync,
  mkdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  compress,
  type Compression,
  type Encoding,
  readFolder,
  toParts,
  toStream,
} from './lib/pack.ts';

export interface ExportOptions {
  root: string;
  out: string;
  sizes: string[];
  compression: Compression;
  encoding: Encoding;
}

export interface PackSummary {
  pack: string;
  size: string;
  parts: number;
  bytes: number;
}

export const DEFAULT_SIZES = [
  '500k',
  '1m',
  '2m',
  '5m',
  '10m',
];

const PACKS = [
  {
    name: 'global',
    folder: 'global',
  },
  {
    name: 'project',
    folder: 'project',
  },
];
// Never exported: dependencies, system files, and the search index, built on each machine.
const IGNORED = /(?:^|\/)(?:node_modules|\.DS_Store)(?:\/|$)|^index\//;

// "500k" is 500,000 bytes and "1m" 1,000,000: decimal units, so a part never exceeds its label.
export function sizeInBytes(size: string): number {
  const match = /^(\d+)([km])$/i.exec(size.trim());

  if (match === null) {
    throw new Error(`size must look like 500k or 2m, not "${size}"`);
  }
  return Number(match[1]) * ((match[2] ?? '').toLowerCase() === 'k' ? 1000 : 1_000_000);
}

function writeSizeFolder(folder: string, files: Record<string, string>, root: string): void {
  mkdirSync(folder, { recursive: true });
  for (const [
    name,
    text,
  ] of Object.entries(files)) {
    writeFileSync(join(folder, name), text);
  }
  for (const script of [
    'import-base.ts',
    'import-project.ts',
  ]) {
    copyFileSync(join(root, 'scripts', script), join(folder, script));
  }
}

export function exportPacks(options: ExportOptions): PackSummary[] {
  const summaries: PackSummary[] = [];
  const compressed = PACKS.map((pack) => ({
    name: pack.name,
    data: compress(toStream(readFolder(join(options.root, pack.folder), (path) => !IGNORED.test(path))), options.compression),
  }));

  rmSync(options.out, {
    recursive: true,
    force: true,
  });
  for (const size of options.sizes) {
    const files: Record<string, string> = {};

    for (const pack of compressed) {
      const parts = toParts(pack.data, {
        pack: pack.name,
        compression: options.compression,
        encoding: options.encoding,
        maxBytes: sizeInBytes(size),
      });

      parts.forEach((text, position) => {
        files[`${pack.name}-${String(position + 1).padStart(3, '0')}.txt`] = text;
      });
      summaries.push({
        pack: pack.name,
        size,
        parts: parts.length,
        bytes: parts.reduce((sum, text) => sum + Buffer.byteLength(text), 0),
      });
    }
    writeSizeFolder(join(options.out, size), files, options.root);
  }
  return summaries;
}

function option(name: string, fallback: string): string {
  const position = process.argv.indexOf(`--${name}`);

  return position > 0 ? process.argv[position + 1] ?? fallback : fallback;
}

function main(): void {
  const root = resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
  const summaries = exportPacks({
    root,
    out: resolve(root, option('out', 'export')),
    sizes: option('sizes', DEFAULT_SIZES.join(',')).split(','),
    compression: option('compression', 'brotli') as Compression,
    encoding: option('encoding', 'z85') as Encoding,
  });

  console.log('| Size | Pack | Parts | Bytes |');
  console.log('| --- | --- | --- | --- |');
  for (const item of summaries) {
    console.log(`| ${item.size} | ${item.pack} | ${item.parts} | ${item.bytes} |`);
  }
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
