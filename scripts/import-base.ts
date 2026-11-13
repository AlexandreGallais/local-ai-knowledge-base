// Recreates the global base from the pasted parts global-001.txt, global-002.txt...
// One file, no package, no build step: run with Node 22.18 or later.
//   node import-base.ts [--from <folder of the parts>] [--target <folder>] [--machine]
// Default: the parts next to this file, the base in ~/.local/share/local-ai-base.
// Every part is checked before anything is written. A damaged or missing part is named, and
// nothing is written. The previous base is replaced as a whole.
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  brotliDecompressSync,
  constants,
  gunzipSync,
  zstdDecompressSync,
} from 'node:zlib';

interface Part {
  name: string;
  pack: string;
  index: number;
  count: number;
  compression: string;
  encoding: string;
  totalBytes: number;
  totalSha: string;
  payload: string[];
}

interface UnpackedFile {
  path: string;
  data: Buffer;
}

const MAGIC = 'LOCAL-AI-BASE EXPORT';
const END = 'END OF PART';
const Z85 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';
const STREAM_MAGIC = 'LAB2\n';

function sha256(data: Buffer | string): string {
  return createHash('sha256')
    .update(data)
    .digest('hex');
}

function field(lines: string[], key: string, name: string): string {
  const line = lines.find((item) => item.startsWith(`${key}: `));

  if (line === undefined) {
    throw new Error(`${name}: missing "${key}" in the header; paste the part again`);
  }
  return line
    .slice(key.length + 2)
    .trim();
}

export function parsePart(text: string, name: string): Part {
  const lines = text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map((line) => line.trimEnd());
  const separator = lines.indexOf('---');
  const end = lines.findIndex((line) => line.startsWith(END));

  if (lines[0] !== MAGIC || separator < 0) {
    throw new Error(`${name}: not a part of the export; its first lines are missing`);
  }
  if (end < 0) {
    throw new Error(`${name}: the end of the part is missing; paste the part again`);
  }
  const header = lines.slice(0, separator);
  const [
    index = 0,
    count = 0,
  ] = field(header, 'part', name)
    .split('/')
    .map(Number);
  const payload = lines.slice(separator + 1, end);

  if (sha256(payload.join('\n')) !== field(header, 'part-sha256', name)) {
    throw new Error(`${name}: the content was damaged by the paste; paste the part again`);
  }
  return {
    name,
    pack: field(header, 'pack', name),
    index,
    count,
    compression: field(header, 'compression', name),
    encoding: field(header, 'encoding', name),
    totalBytes: Number(field(header, 'total-bytes', name)),
    totalSha: field(header, 'total-sha256', name),
    payload,
  };
}

function z85Decode(text: string, length: number): Buffer {
  const digits = new Map([...Z85].map((character, digit) => [
    character.codePointAt(0) ?? 0,
    digit,
  ]));
  const output = Buffer.alloc((text.length / 5) * 4);

  for (let offset = 0; offset < text.length; offset += 5) {
    let value = 0;

    for (let count = 0; count < 5; count += 1) {
      value = (value * 85) + (digits.get(text.codePointAt(offset + count) ?? -1) ?? 0);
    }
    output.writeUInt32BE(value, (offset / 5) * 4);
  }
  return output.subarray(0, length);
}

function decompress(data: Buffer, method: string): Buffer {
  if (method === 'gzip') {
    return gunzipSync(data);
  }
  if (method === 'zstd') {
    return zstdDecompressSync(data, { params: { [constants.ZSTD_d_windowLogMax]: 30 } });
  }
  return brotliDecompressSync(data, { params: { [constants.BROTLI_DECODER_PARAM_LARGE_WINDOW]: 1 } });
}

function checkComplete(parts: Part[], pack: string): void {
  const first = parts[0];

  if (first === undefined) {
    throw new Error(`no part of the pack "${pack}" found: paste ${pack}-001.txt and the others first`);
  }
  for (const part of parts.filter((item) => item.totalSha !== first.totalSha || item.count !== first.count)) {
    throw new Error(`${part.name}: comes from another export than ${first.name}; paste the parts of one export only`);
  }
  for (let index = 1; index <= first.count; index += 1) {
    if (!parts.some((part) => part.index === index)) {
      throw new Error(`part ${index}/${first.count} is missing: paste ${pack}-${String(index).padStart(3, '0')}.txt`);
    }
  }
}

function unpack(stream: Buffer): UnpackedFile[] {
  if (stream
    .subarray(0, STREAM_MAGIC.length)
    .toString() !== STREAM_MAGIC) {
    throw new Error('the decoded export is not readable');
  }
  const lineEnd = stream.indexOf(10, STREAM_MAGIC.length);
  const manifest = JSON.parse(stream
    .subarray(STREAM_MAGIC.length, lineEnd)
    .toString('utf8')) as [string, number][];
  let offset = lineEnd + 1;

  return manifest.map(([
    path,
    size,
  ]) => {
    if (path.startsWith('/') || path
      .split('/')
      .includes('..')) {
      throw new Error(`unsafe path in the export: ${path}`);
    }
    const data = stream.subarray(offset, offset + size);

    offset += size;
    return {
      path,
      data,
    };
  });
}

// Reads and checks every part of a pack, then returns its files. Writes nothing.
export function readPack(from: string, pack: string): UnpackedFile[] {
  const names = readdirSync(from)
    .filter((name) => new RegExp(`^${pack}-\\d{3}\\.txt$`).test(name))
    .sort();
  const parts = names.map((name) => parsePart(readFileSync(join(from, name), 'utf8'), name));

  checkComplete(parts, pack);
  const ordered = [...parts].sort((a, b) => a.index - b.index);
  const first = ordered[0] as Part;
  const text = ordered
    .flatMap((part) => part.payload)
    .join('');
  const compressed = first.encoding === 'z85' ? z85Decode(text, first.totalBytes) : Buffer.from(text, 'base64');

  if (sha256(compressed) !== first.totalSha) {
    throw new Error('the parts do not form the same export; paste them again');
  }
  return unpack(decompress(compressed, first.compression));
}

function writeFiles(folder: string, files: UnpackedFile[]): void {
  for (const file of files) {
    mkdirSync(dirname(join(folder, file.path)), { recursive: true });
    writeFileSync(join(folder, file.path), file.data);
  }
}

// Writes the new base beside the old one, then swaps them: a failure never leaves half a base.
export function installBase(files: UnpackedFile[], target: string): void {
  const fresh = `${target}.new`;
  const old = `${target}.old`;

  rmSync(fresh, {
    recursive: true,
    force: true,
  });
  writeFiles(fresh, files);
  rmSync(old, {
    recursive: true,
    force: true,
  });
  if (existsSync(target)) {
    renameSync(target, old);
  }
  renameSync(fresh, target);
  rmSync(old, {
    recursive: true,
    force: true,
  });
}

function writeMachineConfig(target: string): string {
  const path = join(homedir(), '.config', 'containers', 'containers.conf.d', '50-local-ai-base.conf');
  const text = [
    '# Written by import-base.ts: the global base, read-only, in every container.',
    '[containers]',
    'volumes = [',
    `  "${target}:/opt/local-ai-base:ro",`,
    `  "${join(target, 'opencode')}:/etc/opencode:ro",`,
    ']',
    '',
  ].join('\n');

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  return path;
}

function option(name: string): string | undefined {
  const position = process.argv.indexOf(`--${name}`);

  return position > 0 ? process.argv[position + 1] : undefined;
}

function main(): void {
  const from = resolve(option('from') ?? dirname(fileURLToPath(import.meta.url)));
  const target = resolve(option('target') ?? join(homedir(), '.local', 'share', 'local-ai-base'));

  try {
    const files = readPack(from, 'global');

    installBase(files, target);
    console.log(`Global base installed: ${files.length} files in ${target}.`);
    if (process.argv.includes('--machine')) {
      console.log(`Mount written: ${writeMachineConfig(target)}. Recreate your dev containers.`);
    }
  } catch (error) {
    console.error(`Nothing was written. ${(error as Error).message}`);
    process.exitCode = 1;
  }
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
