// The one import script of the base. It takes every part found in its folder (kit-001.txt,
// js-official-docs-001.txt...), whatever their packs, checks them all, then writes everything in the
// project at once: the kit (a project of its own: package.json, the format and lint configs,
// AGENTS.md, opencode.json, .agents/ and example code) and each pasted brick of .agents/mcp/, with
// its line in opencode.json. One file, no package, no build step: Node 22.18 or later.
//   node import.ts [--from <folder of the parts>] [--target <project root>]
// Default: the parts next to this file, the current folder as the project.
// A damaged or missing part is named, and nothing is written. In an empty folder, the kit is written
// whole: `npm install` then `npm run check` work at once. In a project that already exists, nothing
// the team wrote is replaced: every file outside .agents/ (package.json, configs, AGENTS.md, skills)
// is written only when missing, the example code of the kit (src/) is left aside, and the import
// lists what it left, to be merged by hand. The bricks of .agents/mcp/ are replaced whole, and the
// settings the team added to opencode.json stay.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
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

export interface UnpackedFile {
  path: string;
  data: Buffer;
}

export interface Pack {
  name: string;
  files: UnpackedFile[];
}

export interface ImportResult {
  packs: string[];
  written: number;
  kept: string[];
  servers: string[];
}

type Json = Record<string, unknown>;
const MAGIC = 'LOCAL-AI-BASE EXPORT';
const END = 'END OF PART';
const Z85 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';
const STREAM_MAGIC = 'LAB2\n';
const PART_NAME = /^(.+)-(\d{3})\.txt$/;
const BRICKS = '.agents/mcp';
// The example code of the kit: written in an empty folder, left aside in a project that exists.
const EXAMPLE = 'src/';
const INSTRUCTIONS = [
  '.agents/rules.md',
  '.agents/mcp/*/rules.md',
];
// OpenCode formatters that would run before the format configs of the project on the same files.
const BUILT_IN_FORMATTERS = [
  'prettier',
  'biome',
  'oxfmt',
];
const ALL_EXTENSIONS = [
  '.ts',
  '.mts',
  '.js',
  '.mjs',
  '.html',
  '.json',
  '.css',
  '.scss',
];
// The formatters OpenCode runs after each write, in this order: ESLint with the format config on
// scripts and templates, Prettier on every file, then Stylelint with the format config on styles,
// whose fixes keep the layout of Prettier. Each one is declared when the file it needs is in the
// project.
const FORMATTERS = [
  {
    name: 'eslint-format',
    config: 'eslint.format.config.mjs',
    command: [
      'npx',
      '--no',
      '--',
      'eslint',
      '--config',
      'eslint.format.config.mjs',
      '--fix',
      '$FILE',
    ],
    extensions: ALL_EXTENSIONS.filter((extension) => ![
      '.json',
      '.css',
      '.scss',
    ].includes(extension)),
  },
  {
    name: 'prettier-format',
    config: '.prettierrc.json',
    command: [
      'npx',
      '--no',
      '--',
      'prettier',
      '--write',
      '$FILE',
    ],
    extensions: ALL_EXTENSIONS,
  },
  {
    name: 'stylelint-format',
    config: 'stylelint.format.config.mjs',
    command: [
      'npx',
      '--no',
      '--',
      'stylelint',
      '--config',
      'stylelint.format.config.mjs',
      '--fix',
      '--allow-empty-input',
      '$FILE',
    ],
    extensions: [
      '.css',
      '.scss',
    ],
  },
];
// Formatters of earlier versions of the kit.
const OLD_FORMATTERS = ['agents-format'];

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
    throw new Error(`no part of the pack "${pack}" found`);
  }
  for (const part of parts.filter((item) => item.totalSha !== first.totalSha || item.count !== first.count)) {
    throw new Error(`${part.name}: comes from another export than ${first.name}; paste the parts of one export only`);
  }
  for (let index = 1; index <= first.count; index += 1) {
    if (!parts.some((part) => part.index === index)) {
      throw new Error(`part ${index}/${first.count} of "${pack}" is missing: paste ${pack}-${String(index).padStart(3, '0')}.txt`);
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

function decodePack(parts: Part[], pack: string): Pack {
  checkComplete(parts, pack);
  const ordered = [...parts].sort((a, b) => a.index - b.index);
  const first = ordered[0] as Part;
  const text = ordered
    .flatMap((part) => part.payload)
    .join('');
  const compressed = first.encoding === 'z85' ? z85Decode(text, first.totalBytes) : Buffer.from(text, 'base64');

  if (sha256(compressed) !== first.totalSha) {
    throw new Error(`the parts of "${pack}" do not form the same export; paste them again`);
  }
  return {
    name: pack,
    files: unpack(decompress(compressed, first.compression)),
  };
}

// Reads and checks every part found in the folder, grouped by pack. Writes nothing.
export function readPacks(from: string): Pack[] {
  const parts = readdirSync(from)
    .filter((name) => PART_NAME.test(name))
    .sort()
    .map((name) => parsePart(readFileSync(join(from, name), 'utf8'), name));
  const names = [...new Set(parts.map((part) => part.pack))].sort();

  if (names.length === 0) {
    throw new Error(`no part found in ${from}: paste the parts (kit-001.txt...) beside import.ts`);
  }
  return names.map((pack) => decodePack(parts.filter((part) => part.pack === pack), pack));
}

// Files the team owns: written when missing, never replaced by an update of the kit.
function ownedByTeam(path: string): boolean {
  return path !== 'opencode.json' && (!path.startsWith('.agents/') || path.startsWith('.agents/skills/'));
}

// The bricks a pack brings: .agents/mcp/<brick>/..., replaced whole so that no old file stays.
function bricksOf(files: UnpackedFile[]): string[] {
  return [
    ...new Set(files
      .map((file) => /^\.agents\/mcp\/([^/]+)\//.exec(file.path)?.[1])
      .filter((brick) => brick !== undefined)),
  ];
}

function readJson(path: string): Json {
  if (!existsSync(path)) {
    return {};
  }
  const value: unknown = JSON.parse(readFileSync(path, 'utf8'));

  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as Json : {};
}

function record(value: unknown): Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? { ...value as Json } : {};
}

// The bricks present in the project: each folder of .agents/mcp/ that holds a server.ts.
export function presentBricks(target: string): string[] {
  const folder = join(target, BRICKS);

  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(folder, entry.name, 'server.ts')))
    .map((entry) => entry.name)
    .sort();
}

// The servers of the config without those of a brick that is gone, then one per brick present.
function syncServers(current: Json, bricks: string[]): Json {
  const kept = Object
    .entries(current)
    .filter(([, entry]) => {
      const command = record(entry)['command'];
      const brick = Array.isArray(command) ? /^\.agents\/mcp\/([^/]+)\//.exec(String(command[1]))?.[1] : undefined;

      return brick === undefined || bricks.includes(brick);
    });

  return {
    ...Object.fromEntries(kept),
    ...Object.fromEntries(bricks.map((brick) => [
      brick,
      {
        type: 'local',
        command: [
          'node',
          `${BRICKS}/${brick}/server.ts`,
        ],
        codemode: false,
      },
    ])),
  };
}

// The formatters of the config: one per format config the project holds, and the built-in ones off.
function syncFormatter(current: Json, configs: string[]): Json {
  const ours = FORMATTERS.filter((item) => configs.includes(item.config));
  const kept = Object.fromEntries(Object
    .entries(current)
    .filter(([name]) => !OLD_FORMATTERS.includes(name) && !FORMATTERS.some((item) => item.name === name)));

  if (ours.length === 0) {
    return kept;
  }
  return {
    ...kept,
    ...Object.fromEntries(BUILT_IN_FORMATTERS.map((name) => [
      name,
      { disabled: true },
    ])),
    ...Object.fromEntries(ours.map((item) => [
      item.name,
      {
        command: item.command,
        extensions: item.extensions,
      },
    ])),
  };
}

// The format configs present in the project.
export function presentFormatConfigs(target: string): string[] {
  return FORMATTERS
    .map((item) => item.config)
    .filter((config) => existsSync(join(target, config)));
}

// opencode.json with the instructions of the base, a formatter per format config of the project and
// one local MCP server per brick present; the other settings of the file are kept as they are.
export function syncConfig(config: Json, bricks: string[], formatConfigs: string[] = []): Json {
  const instructions = Array.isArray(config['instructions']) ? config['instructions'].filter((item) => typeof item === 'string') : [];
  const formatter = syncFormatter(record(config['formatter']), formatConfigs);
  const mcp = record(config['mcp']);
  const servers = syncServers(record(mcp['servers']), bricks);

  return {
    ...config,
    instructions: [
      ...INSTRUCTIONS,
      ...instructions.filter((item) => !INSTRUCTIONS.includes(item)),
    ],
    formatter,
    mcp: {
      ...mcp,
      servers,
    },
  };
}

function write(target: string, file: UnpackedFile): void {
  mkdirSync(dirname(join(target, file.path)), { recursive: true });
  writeFileSync(join(target, file.path), file.data);
}

// Writes the packs into the project. The packs are already checked: nothing here can fail on them.
export function installPacks(packs: Pack[], target: string): ImportResult {
  const files = packs.flatMap((pack) => pack.files);
  const kept: string[] = [];
  // A project that exists already has its own package.json: the example code of the kit stays out.
  const existing = existsSync(join(target, 'package.json'));
  let written = 0;

  for (const brick of bricksOf(files)) {
    rmSync(join(target, BRICKS, brick), {
      recursive: true,
      force: true,
    });
  }
  const configFile = files.find((file) => file.path === 'opencode.json');
  const config = readJson(join(target, 'opencode.json'));

  for (const file of files.filter((item) => item.path !== 'opencode.json')) {
    if ((ownedByTeam(file.path) && existsSync(join(target, file.path))) || (existing && file.path.startsWith(EXAMPLE))) {
      kept.push(file.path);
      continue;
    }
    write(target, file);
    written += 1;
  }
  const fresh = Object.keys(config).length === 0;
  const original = fresh ? configFile?.data.toString('utf8') : readFileSync(join(target, 'opencode.json'), 'utf8');
  const servers = presentBricks(target);
  const synced = syncConfig(fresh && original !== undefined ? JSON.parse(original) as Json : config, servers, presentFormatConfigs(target));

  // The file keeps its own layout when its content does not change.
  writeFileSync(join(target, 'opencode.json'), original !== undefined && JSON.stringify(JSON.parse(original)) === JSON.stringify(synced) ? original : `${JSON.stringify(synced, null, 2)}\n`);
  return {
    packs: packs.map((pack) => pack.name),
    written: written + 1,
    kept,
    servers,
  };
}

// The search index of each documentation brick is built on the machine: it never travels.
function buildIndexes(target: string, bricks: string[]): void {
  for (const brick of bricks) {
    const script = join(target, BRICKS, brick, 'build-index.ts');

    if (!existsSync(script)) {
      continue;
    }
    try {
      process.stdout.write(execFileSync(process.execPath, [script], { encoding: 'utf8' }));
    } catch (error) {
      process.stderr.write(`${brick} is installed, but its search index was not built: ${(error as Error).message}\n`);
    }
  }
}

function option(name: string): string | undefined {
  const position = process.argv.indexOf(`--${name}`);

  return position > 0 ? process.argv[position + 1] : undefined;
}

function main(): void {
  const from = resolve(option('from') ?? dirname(fileURLToPath(import.meta.url)));
  const target = resolve(option('target') ?? '.');
  let packs: Pack[];

  try {
    packs = readPacks(from);
  } catch (error) {
    process.stderr.write(`Nothing was written. ${(error as Error).message}\n`);
    process.exitCode = 1;
    return;
  }
  const result = installPacks(packs, target);

  process.stdout.write(`Installed in ${target}: ${result.packs.join(', ')}. ${result.written} file(s) written, ${result.kept.length} left aside.\n`);
  process.stdout.write(`MCP servers in opencode.json: ${result.servers.join(', ') || 'none'}.\n`);
  if (result.kept.length > 0) {
    process.stdout.write('Left aside, because the project already has them or its own code: merge them by hand from the kit if needed.\n');
  }
  for (const path of result.kept) {
    process.stdout.write(`left aside: ${path}\n`);
  }
  process.stdout.write('Then: npm install, and npm run check.\n');
  buildIndexes(target, bricksOf(packs.flatMap((pack) => pack.files)));
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
