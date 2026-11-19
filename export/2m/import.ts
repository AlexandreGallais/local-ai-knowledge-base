// The import script of the base, in Node; import.py is the same import in Python. It takes every
// part found in its folder (kit-001.txt, js-official-docs-001.txt...), whatever their packs, checks
// them all, then writes everything in the project at once: the kit (AGENTS.md, opencode.json and
// .agents/) and each pasted documentation brick of .agents/mcp/, with its line in opencode.json.
// One file, no package, no build step: Node 22.18 or later.
//   node import.ts [--from <folder of the parts>] [--target <project root>] [--runtime node|python]
// Default: the parts next to this file, the current folder as the project, the servers run by Node.
// --runtime python writes the commands of the Python servers in opencode.json instead.
// A damaged or missing part is named, and nothing is written. In a project that already exists,
// nothing the team wrote is replaced: AGENTS.md and the skills are written only when missing, and the
// import lists what it left. The bricks of .agents/mcp/ are replaced whole, and the settings the team
// added to opencode.json stay.
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
const INSTRUCTIONS = [
  '.agents/rules.md',
  '.agents/mcp/*/rules.md',
];

// How OpenCode starts the server of a brick: by Node or by Python, the same answers.
export type Runtime = 'node' | 'python';

export const RUNTIMES: Runtime[] = [
  'node',
  'python',
];

// The shared OpenCode configs of .agents/opencode/, one per runtime and per major version of OpenCode:
// the variable OPENCODE_CONFIG names one, and OpenCode loads it below the opencode.json of the project.
// OpenCode 2 lists the servers under mcp.servers; OpenCode 1 lists them directly under mcp.
export type Major = 1 | 2;

export const MAJORS: Major[] = [
  1,
  2,
];

export const SHARED_CONFIGS = '.agents/opencode';
// The formatters that earlier versions of the kit declared: removed from opencode.json, as the kit no
// longer brings the configs they run.
const OLD_FORMATTERS = [
  'agents-format',
  'eslint-format',
  'prettier-format',
  'stylelint-format',
];
// The built-in formatters earlier versions of the kit switched off: their entry is removed when it
// only says "disabled", so that the project finds them as OpenCode ships them.
const SWITCHED_OFF = [
  'prettier',
  'biome',
  'oxfmt',
];

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

// The bricks present in the project: each folder of .agents/mcp/ that holds a server, in Node or in
// Python.
export function presentBricks(target: string): string[] {
  const folder = join(target, BRICKS);

  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && (existsSync(join(folder, entry.name, 'server.ts')) || existsSync(join(folder, entry.name, 'server.py'))))
    .map((entry) => entry.name)
    .sort();
}

// The command that starts the server of a brick, by the runtime chosen.
export function serverCommand(brick: string, runtime: Runtime): string[] {
  return runtime === 'python' ? [
    'python3',
    `${BRICKS}/${brick}/server.py`,
  ] : [
    'node',
    `${BRICKS}/${brick}/server.ts`,
  ];
}

export function sharedConfigName(runtime: Runtime, major: Major): string {
  return `opencode.${runtime}.v${String(major)}.json`;
}

// A shared config: the instructions of the base and one local server per brick present, nothing else.
export function sharedConfig(bricks: string[], runtime: Runtime, major: Major): Json {
  const servers = Object.fromEntries(bricks.map((brick) => [
    brick,
    major === 2 ? {
      type: 'local',
      command: serverCommand(brick, runtime),
      codemode: false,
    } : {
      type: 'local',
      command: serverCommand(brick, runtime),
      enabled: true,
    },
  ]));

  return {
    instructions: [...INSTRUCTIONS],
    mcp: major === 2 ? { servers } : servers,
  };
}

// The four shared configs, rewritten after the bricks present, as opencode.json is.
function writeSharedConfigs(target: string, bricks: string[]): void {
  mkdirSync(join(target, SHARED_CONFIGS), { recursive: true });
  for (const runtime of RUNTIMES) {
    for (const major of MAJORS) {
      writeFileSync(join(target, SHARED_CONFIGS, sharedConfigName(runtime, major)), `${JSON.stringify(sharedConfig(bricks, runtime, major), null, 2)}\n`);
    }
  }
}

// The servers of the config without those of a brick that is gone, then one per brick present.
function syncServers(current: Json, bricks: string[], runtime: Runtime): Json {
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
        command: serverCommand(brick, runtime),
        codemode: false,
      },
    ])),
  };
}

// The formatters of the config without those of earlier versions of the kit.
function cleanFormatter(current: Json): Json {
  return Object.fromEntries(Object
    .entries(current)
    .filter(([
      name,
      value,
    ]) => !OLD_FORMATTERS.includes(name) && !(SWITCHED_OFF.includes(name) && JSON.stringify(value) === '{"disabled":true}')));
}

// opencode.json with the instructions of the base and one local MCP server per brick present; the
// other settings of the file are kept as they are, but the formatters of earlier versions of the kit.
export function syncConfig(config: Json, bricks: string[], runtime: Runtime = 'node'): Json {
  const instructions = Array.isArray(config['instructions']) ? config['instructions'].filter((item) => typeof item === 'string') : [];
  const formatter = cleanFormatter(record(config['formatter']));
  const mcp = record(config['mcp']);
  const synced: Json = {
    ...config,
    instructions: [
      ...INSTRUCTIONS,
      ...instructions.filter((item) => !INSTRUCTIONS.includes(item)),
    ],
    formatter,
    mcp: {
      ...mcp,
      servers: syncServers(record(mcp['servers']), bricks, runtime),
    },
  };

  // No formatter left: no "formatter" key at all, the other keys in their order.
  return Object.fromEntries(Object
    .entries(synced)
    .filter(([key]) => key !== 'formatter' || Object.keys(formatter).length > 0));
}

function write(target: string, file: UnpackedFile): void {
  mkdirSync(dirname(join(target, file.path)), { recursive: true });
  writeFileSync(join(target, file.path), file.data);
}

// Writes the packs into the project. The packs are already checked: nothing here can fail on them.
export function installPacks(packs: Pack[], target: string, runtime: Runtime = 'node'): ImportResult {
  const files = packs.flatMap((pack) => pack.files);
  const kept: string[] = [];
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
    if (ownedByTeam(file.path) && existsSync(join(target, file.path))) {
      kept.push(file.path);
      continue;
    }
    write(target, file);
    written += 1;
  }
  const fresh = Object.keys(config).length === 0;
  const original = fresh ? configFile?.data.toString('utf8') : readFileSync(join(target, 'opencode.json'), 'utf8');
  const servers = presentBricks(target);
  const synced = syncConfig(fresh && original !== undefined ? JSON.parse(original) as Json : config, servers, runtime);

  // The file keeps its own layout when its content does not change.
  writeFileSync(join(target, 'opencode.json'), original !== undefined && JSON.stringify(JSON.parse(original)) === JSON.stringify(synced) ? original : `${JSON.stringify(synced, null, 2)}\n`);
  writeSharedConfigs(target, servers);
  return {
    packs: packs.map((pack) => pack.name),
    written: written + 1,
    kept,
    servers,
  };
}

// The search index of each documentation brick is built on the machine: it never travels. Node and
// Python write the same index, so the import builds it with the runtime it runs on.
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

function report(result: ImportResult, target: string, runtime: Runtime): void {
  process.stdout.write(`Installed in ${target}: ${result.packs.join(', ')}. ${result.written} file(s) written, ${result.kept.length} left aside.\n`);
  process.stdout.write(`MCP servers in opencode.json, run by ${runtime}: ${result.servers.join(', ') || 'none'}.\n`);
  process.stdout.write(`Shared configs for OPENCODE_CONFIG: ${SHARED_CONFIGS}/opencode.<node|python>.v<1|2>.json.\n`);
  if (result.kept.length > 0) {
    process.stdout.write('Left aside, because the project already has them: merge them by hand from the kit if needed.\n');
  }
  for (const path of result.kept) {
    process.stdout.write(`left aside: ${path}\n`);
  }
  process.stdout.write('Then: open OpenCode in the project; /mcps lists the servers.\n');
}

function main(): void {
  const from = resolve(option('from') ?? dirname(fileURLToPath(import.meta.url)));
  const target = resolve(option('target') ?? '.');
  const runtime = option('runtime') ?? 'node';
  let packs: Pack[];

  if (!RUNTIMES.includes(runtime as Runtime)) {
    process.stderr.write(`Nothing was written. --runtime must be node or python, not "${runtime}".\n`);
    process.exitCode = 2;
    return;
  }
  try {
    packs = readPacks(from);
  } catch (error) {
    process.stderr.write(`Nothing was written. ${(error as Error).message}\n`);
    process.exitCode = 1;
    return;
  }
  const result = installPacks(packs, target, runtime as Runtime);

  report(result, target, runtime as Runtime);
  buildIndexes(target, bricksOf(packs.flatMap((pack) => pack.files)));
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
