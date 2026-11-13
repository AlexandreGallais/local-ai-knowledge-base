// The export format: every file of a folder in one solid stream, similar files side by side,
// compressed at the strongest setting, encoded as printable ASCII and cut into parts.
// import-base.ts and import-project.ts read it back; they repeat the decoding on purpose, to stay
// single files without imports. Run with Node 22.18 or later, no package.
import { createHash } from 'node:crypto';
import {
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  extname,
  join,
  relative,
  sep,
} from 'node:path';
import {
  brotliCompressSync,
  brotliDecompressSync,
  constants,
  gzipSync,
  gunzipSync,
  zstdCompressSync,
  zstdDecompressSync,
} from 'node:zlib';

export type Compression = 'brotli' | 'gzip' | 'zstd';
export type Encoding = 'base64' | 'z85';

export interface PackedFile {
  path: string;
  data: Buffer;
}

export const MAGIC = 'LOCAL-AI-BASE EXPORT';
export const END = 'END OF PART';
const STREAM_MAGIC = Buffer.from('LAB2\n');
const Z85 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';
const BASE64_LINE = 76;
const Z85_LINE = 80;

export function sha256(data: Buffer | string): string {
  return createHash('sha256')
    .update(data)
    .digest('hex');
}

function listFiles(root: string, folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);

    if (entry.isDirectory()) {
      return listFiles(root, path);
    }
    return entry.isFile() ? [
      relative(root, path)
        .split(sep)
        .join('/'),
    ] : [];
  });
}

// Similar files side by side: by extension, then by folder, then by name.
export function orderPaths(paths: string[]): string[] {
  const key = (path: string): string => {
    const slash = path.lastIndexOf('/');

    return [
      extname(path),
      path.slice(0, Math.max(slash, 0)),
      path.slice(slash + 1),
    ].join('\u0000');
  };

  return [...paths].sort((a, b) => key(a).localeCompare(key(b), 'en'));
}

export function readFolder(root: string, keep: (path: string) => boolean = () => true): PackedFile[] {
  return orderPaths(listFiles(root, root).filter((path) => keep(path))).map((path) => ({
    path,
    data: readFileSync(join(root, path)),
  }));
}

// One header line of JSON (paths and sizes), then every file's bytes in the same order.
export function toStream(files: PackedFile[]): Buffer {
  const manifest = JSON.stringify(files.map((file) => [
    file.path,
    file.data.length,
  ]));

  return Buffer.concat([
    STREAM_MAGIC,
    Buffer.from(`${manifest}\n`),
    ...files.map((file) => file.data),
  ]);
}

export function fromStream(stream: Buffer): PackedFile[] {
  if (!stream
    .subarray(0, STREAM_MAGIC.length)
    .equals(STREAM_MAGIC)) {
    throw new Error('not an export stream');
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
    const data = stream.subarray(offset, offset + size);

    offset += size;
    return {
      path,
      data,
    };
  });
}

export function compress(data: Buffer, method: Compression): Buffer {
  if (method === 'gzip') {
    return gzipSync(data, { level: 9 });
  }
  if (method === 'zstd') {
    return zstdCompressSync(data, {
      params: {
        [constants.ZSTD_c_compressionLevel]: 22,
        [constants.ZSTD_c_windowLog]: 30,
        [constants.ZSTD_c_enableLongDistanceMatching]: 1,
      },
    });
  }
  // The largest window (1 GiB) finds repeats far apart in the stream; the decoder must allow it.
  return brotliCompressSync(data, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_LGWIN]: 30,
      [constants.BROTLI_PARAM_LARGE_WINDOW]: 1,
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
      [constants.BROTLI_PARAM_SIZE_HINT]: data.length,
    },
  });
}

export function decompress(data: Buffer, method: Compression): Buffer {
  if (method === 'gzip') {
    return gunzipSync(data);
  }
  if (method === 'zstd') {
    return zstdDecompressSync(data, { params: { [constants.ZSTD_d_windowLogMax]: 30 } });
  }
  return brotliDecompressSync(data, { params: { [constants.BROTLI_DECODER_PARAM_LARGE_WINDOW]: 1 } });
}

export function z85Encode(data: Buffer): string {
  const padded = Buffer.concat([
    data,
    Buffer.alloc((4 - (data.length % 4)) % 4),
  ]);
  let text = '';

  for (let offset = 0; offset < padded.length; offset += 4) {
    let value = padded.readUInt32BE(offset);
    let chunk = '';

    for (let count = 0; count < 5; count += 1) {
      chunk = Z85[value % 85] + chunk;
      value = Math.floor(value / 85);
    }
    text += chunk;
  }
  return text;
}

const Z85_DIGITS = new Map([...Z85].map((character, digit) => [
  character.codePointAt(0) ?? 0,
  digit,
]));

export function z85Decode(text: string, length: number): Buffer {
  const output = Buffer.alloc((text.length / 5) * 4);

  for (let offset = 0; offset < text.length; offset += 5) {
    let value = 0;

    for (let count = 0; count < 5; count += 1) {
      const digit = Z85_DIGITS.get(text.codePointAt(offset + count) ?? -1) ?? -1;

      if (digit < 0) {
        throw new Error(`character outside Z85 at ${offset + count}`);
      }
      value = (value * 85) + digit;
    }
    output.writeUInt32BE(value, (offset / 5) * 4);
  }
  return output.subarray(0, length);
}

export function encode(data: Buffer, encoding: Encoding): string[] {
  const text = encoding === 'z85' ? z85Encode(data) : data.toString('base64');
  const width = encoding === 'z85' ? Z85_LINE : BASE64_LINE;
  const lines: string[] = [];

  for (let offset = 0; offset < text.length; offset += width) {
    lines.push(text.slice(offset, offset + width));
  }
  return lines;
}

export function decode(lines: string[], encoding: Encoding, length: number): Buffer {
  const text = lines.join('');

  return encoding === 'z85' ? z85Decode(text, length) : Buffer.from(text, 'base64');
}

export interface PartOptions {
  pack: string;
  compression: Compression;
  encoding: Encoding;
  maxBytes: number;
}

function header(options: PartOptions, total: Buffer, index: number, count: number, payload: string[]): string[] {
  return [
    MAGIC,
    `pack: ${options.pack}`,
    'format: 1',
    `part: ${index}/${count}`,
    `compression: ${options.compression}`,
    `encoding: ${options.encoding}`,
    `total-bytes: ${total.length}`,
    `total-sha256: ${sha256(total)}`,
    `part-sha256: ${sha256(payload.join('\n'))}`,
    '---',
  ];
}

function splitPayload(lines: string[], perPart: number): string[][] {
  const groups: string[][] = [];

  for (let start = 0; start < lines.length; start += perPart) {
    groups.push(lines.slice(start, start + perPart));
  }
  return groups.length === 0 ? [[]] : groups;
}

// Cuts the encoded payload into parts of maxBytes at most, header and end line included.
export function toParts(compressed: Buffer, options: PartOptions): string[] {
  const lines = encode(compressed, options.encoding);
  const lineBytes = (lines[0]?.length ?? 0) + 1;
  const overhead = 1024;
  const perPart = Math.max(1, Math.floor((options.maxBytes - overhead) / Math.max(lineBytes, 1)));
  const groups = splitPayload(lines, perPart);

  return groups.map((payload, position) => {
    const index = position + 1;

    return [
      ...header(options, compressed, index, groups.length, payload),
      ...payload,
      `${END} ${index}/${groups.length}`,
      '',
    ].join('\n');
  });
}
