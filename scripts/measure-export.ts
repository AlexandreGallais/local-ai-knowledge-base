// Measures the export of folders: each compression, each encoding, sorted or not, against the
// method of version 0.1 (gzip level 9 of the files in name order, then base64).
// Run with Node 22.18 or later, from the root of the repository, no package:
//   node scripts/measure-export.ts <folder> [<folder>...]
import { basename } from 'node:path';
import {
  compress,
  type Compression,
  encode,
  type Encoding,
  type PackedFile,
  readFolder,
  toStream,
} from './lib/pack.ts';

interface Measure {
  label: string;
  bytes: number;
  seconds: number;
}

const METHODS: Compression[] = [
  'gzip',
  'brotli',
  'zstd',
];
const ENCODINGS: Encoding[] = [
  'base64',
  'z85',
];

function encodedBytes(data: Buffer, encoding: Encoding): number {
  return encode(data, encoding).reduce((sum, line) => sum + line.length + 1, 0);
}

function measure(label: string, stream: Buffer, method: Compression, encoding: Encoding): Measure {
  const start = performance.now();
  const bytes = encodedBytes(compress(stream, method), encoding);

  return {
    label,
    bytes,
    seconds: (performance.now() - start) / 1000,
  };
}

function megabytes(bytes: number): string {
  return (bytes / 1_000_000).toFixed(2);
}

function main(): void {
  const folders = process.argv.slice(2);

  if (folders.length === 0) {
    console.log('Usage: node scripts/measure-export.ts <folder> [<folder>...]');
    process.exitCode = 2;
    return;
  }
  const files: PackedFile[] = folders.flatMap((folder) => readFolder(folder).map((file) => ({
    path: `${basename(folder)}/${file.path}`,
    data: file.data,
  })));
  const sorted = toStream(files);
  const byName = toStream([...files].sort((a, b) => a.path.localeCompare(b.path, 'en')));
  const raw = files.reduce((sum, file) => sum + file.data.length, 0);
  const baseline = measure('0.1: gzip 9, base64, name order', byName, 'gzip', 'base64');
  const rows = [
    baseline,
    ...METHODS.flatMap((method) => ENCODINGS.map((encoding) => measure(`${method}, ${encoding}, similar files side by side`, sorted, method, encoding))),
  ];

  console.log(`Folders: ${folders.join(', ')}; ${files.length} files; ${megabytes(raw)} MB raw.`);
  console.log('');
  console.log('| Method | Text to paste (MB) | Ratio to raw | Gain on 0.1 | Seconds |');
  console.log('| --- | --- | --- | --- | --- |');
  for (const row of rows) {
    const gain = ((1 - (row.bytes / baseline.bytes)) * 100).toFixed(0);

    console.log(`| ${row.label} | ${megabytes(row.bytes)} | ${(row.bytes / raw).toFixed(3)} | ${gain} % | ${row.seconds.toFixed(1)} |`);
  }
}

main();
