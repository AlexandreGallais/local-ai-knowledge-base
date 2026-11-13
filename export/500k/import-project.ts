// Installs or updates the project kit (AGENTS.md and .agents/) from the pasted parts
// project-001.txt, project-002.txt... One file, no package, no build step: Node 22.18 or later.
//   node import-project.ts [--from <folder of the parts>] [--target <project root>]
// Default: the parts next to this file, the current folder as the project. Every part is checked
// before anything is written. What the team wrote is kept: AGENTS.md, .agents/profile.json, the
// project skills and rules are written only when they do not exist yet.
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
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

// Files the team owns: written when missing, never replaced by an update of the kit.
function ownedByTeam(path: string): boolean {
  return path === 'AGENTS.md' || path === '.agents/profile.json' || path.startsWith('.agents/skills/') || path.startsWith('.agents/rules/');
}

export function installKit(files: UnpackedFile[], target: string): {
  written: string[];
  kept: string[];
} {
  const written: string[] = [];
  const kept: string[] = [];

  for (const file of files) {
    const path = join(target, file.path);

    if (ownedByTeam(file.path) && existsSync(path)) {
      kept.push(file.path);
      continue;
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, file.data);
    written.push(file.path);
  }
  return {
    written,
    kept,
  };
}

function option(name: string): string | undefined {
  const position = process.argv.indexOf(`--${name}`);

  return position > 0 ? process.argv[position + 1] : undefined;
}

function main(): void {
  const from = resolve(option('from') ?? dirname(fileURLToPath(import.meta.url)));
  const target = resolve(option('target') ?? '.');

  try {
    const result = installKit(readPack(from, 'project'), target);

    console.log(`Project kit installed in ${target}: ${result.written.length} file(s) written, ${result.kept.length} kept as the team wrote them.`);
    for (const path of result.kept) {
      console.log(`kept: ${path}`);
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
