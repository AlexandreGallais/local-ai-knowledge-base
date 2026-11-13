// Measures, tool by tool, what the official documentation adds to the export of the global base:
// raw size, compressed size as the export compresses it, and parts at 500k and 10m.
// Run with Node 22.18 or later, from the root of the repository, no package:
//   node scripts/measure-library.ts
import { readdirSync } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  compress,
  encode,
  readFolder,
  toStream,
} from './lib/pack.ts';

const LIBRARY = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'library');
const HEADER_BYTES = 1024;

function parts(textBytes: number, size: number): number {
  return Math.ceil(textBytes / (size - HEADER_BYTES));
}

function megabytes(bytes: number): string {
  return (bytes / 1_000_000).toFixed(2);
}

function main(): void {
  const tools = readdirSync(LIBRARY, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  let rawTotal = 0;
  let textTotal = 0;

  console.log('| Tool | Raw (MB) | Text to paste (MB) | Parts at 500k | Parts at 10m |');
  console.log('| --- | --- | --- | --- | --- |');
  for (const tool of tools) {
    const files = readFolder(join(LIBRARY, tool));
    const raw = files.reduce((sum, file) => sum + file.data.length, 0);
    const text = encode(compress(toStream(files), 'brotli'), 'z85').reduce((sum, line) => sum + line.length + 1, 0);

    rawTotal += raw;
    textTotal += text;
    console.log(`| ${tool} | ${megabytes(raw)} | ${megabytes(text)} | ${parts(text, 500_000)} | ${parts(text, 10_000_000)} |`);
  }
  console.log(`| **Total, tool by tool** | ${megabytes(rawTotal)} | ${megabytes(textTotal)} | ${parts(textTotal, 500_000)} | ${parts(textTotal, 10_000_000)} |`);
}

main();
