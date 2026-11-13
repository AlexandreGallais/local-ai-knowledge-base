// Extracts the text or the structure of a heavy file, so that the AI reads a short extract and
// never the file itself. Run with Node 22.18 or later, no build step, no package:
//   node extract.ts <file> [--list] [--part <entry>] [--outline] [--sheet <name>] [--rows <n>] [--max-chars <n>]
// It writes Markdown to the standard output. Exit code: 0 extract written, 1 error, 2 this
// format needs another tool, and the output gives the command to run instead.
// Safe by design: it reads ZIP entries in memory with a size limit, writes nothing from the
// archive, refuses encrypted entries and never runs anything found in a file.
import {
  closeSync,
  fstatSync,
  openSync,
  readSync,
  realpathSync,
  statSync,
} from 'node:fs';
import {
  basename,
  extname,
  posix,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  crc32,
  inflateRawSync,
} from 'node:zlib';

export interface Options {
  list: boolean;
  part?: string;
  outline: boolean;
  sheet?: string;
  rows: number;
  maxChars: number;
}

export interface Extract {
  text: string;
  code: number;
}

interface Source {
  size: number;
  read: (offset: number, length: number) => Buffer;
}

interface ZipEntry {
  name: string;
  flags: number;
  method: number;
  crc: number;
  compressedSize: number;
  size: number;
  offset: number;
}

interface Zip {
  entries: ZipEntry[];
  has: (name: string) => boolean;
  bytes: (name: string) => Buffer;
  text: (name: string) => string;
}

interface Relationship {
  type: string;
  target: string;
}

interface Sheet {
  name: string;
  path: string;
  hidden: boolean;
}

interface WordState {
  xml: string;
  pattern: RegExp;
  lines: string[];
  stack: {
    text: string;
    style: string;
  }[];
  depth: number;
  row: string[];
  cell: string[];
  rowIndex: number;
}

interface DrawioCell {
  id: string;
  label: string;
  vertex: boolean;
  edge: boolean;
  source?: string;
  target?: string;
}

type ZipFormat = (zip: Zip, options: Options) => string[];
type TextFormat = (text: string) => string[];

export const DEFAULT_OPTIONS: Options = {
  list: false,
  outline: false,
  rows: 50,
  maxChars: 20_000,
};

const NEWLINE = '\n';
const SCRIPT = '.agents/skills/read-heavy-file/scripts/extract.ts';
const MAX_ENTRY_BYTES = 64 * 1024 * 1024;
const MAX_TEXT_FILE_BYTES = 256 * 1024 * 1024;
const MAX_LISTED_ENTRIES = 500;
const MAX_ITEMS = 300;
const MAX_VALUE_CHARS = 200;
const MAX_OUTLINE_DEPTH = 12;
const MAX_OUTLINE_KINDS = 5;
const MAX_OUTLINE_KEYS = 50;
const MAX_LISTED_PARTS = 100;
const MAX_MERGED = 20;
const MAX_ENTRY_SHOWN = 4000;
const ZIP_LOCAL = 0x04_03_4b_50;
const ZIP_CENTRAL = 0x02_01_4b_50;
const ZIP_END = 0x06_05_4b_50;
const ZIP_END_SIZE = 22;
const ZIP_LOCAL_SIZE = 30;
const ZIP_CENTRAL_SIZE = 46;
const ENCRYPTED_FLAGS = 0x41;
const OLE_MAGIC = 'd0cf11e0a1b11ae1';
const BINARY_PROBE = 8000;
const IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.tif',
  '.tiff',
  '.bmp',
  '.heic',
]);
const TEXT_EXTENSIONS = new Set([
  '.xml',
  '.csv',
  '.tsv',
  '.log',
  '.txt',
  '.yaml',
  '.yml',
  '.svg',
  '.bpmn',
  '.md',
  '.html',
  '.eml',
]);
const ENCRYPTED_OFFICE = new Set([
  '.docx',
  '.docm',
  '.xlsx',
  '.xlsm',
  '.pptx',
  '.pptm',
]);
const OLE_TARGETS: Record<string, string> = {
  '.doc': 'docx',
  '.dot': 'docx',
  '.xls': 'xlsx',
  '.xlt': 'xlsx',
  '.ppt': 'pptx',
  '.pps': 'pptx',
};
const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: '\'',
  nbsp: ' ',
};
const EMBEDDED_MARKS = [
  '/media/',
  '/embeddings/',
  '/pivotTables/',
  '/pivotCache/',
  '/externalLinks/',
  '/activeX/',
  '/Pictures/',
  '/Object ',
  'vbaProject.bin',
];
const WORD_CONTAINERS = new Set([
  't',
  'p',
  'tbl',
  'tr',
  'tc',
]);
const WORD_TOKEN = /<w:(tbl|tr|tc|p|t|tab|br|cr|pStyle)\b([^>]*?)(\/?)>|<\/w:(tbl|tr|tc|p)>/g;
const ODF_PARAGRAPH = /<text:(h|p)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/text:\1>)/g;
const ODF_ROW = /<table:table-row(?=[\s>/])([^>]*?)(?:\/>|>([\s\S]*?)<\/table:table-row>)/g;
const ODF_CELL = /<table:(table-cell|covered-table-cell)(?=[\s>/])([^>]*?)(?:\/>|>([\s\S]*?)<\/table:\1>)/g;
const ODF_TABLE = /<table:table(?=[\s>])([^>]*)>([\s\S]*?)<\/table:table>/g;
const CLI_OPTIONS = {
  'list': { type: 'boolean' },
  'part': { type: 'string' },
  'outline': { type: 'boolean' },
  'sheet': { type: 'string' },
  'rows': { type: 'string' },
  'max-chars': { type: 'string' },
  'help': {
    type: 'boolean',
    short: 'h',
  },
} as const;
const USAGE = 'Usage: node extract.ts <file> [--list] [--part <entry>] [--outline] [--sheet <name>] [--rows <n>] [--max-chars <n>]';

class ExtractError extends Error {
  code: number;

  constructor(message: string, code = 1) {
    super(message);
    this.code = code;
  }
}

// ---------- Text helpers ----------
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stripBom(text: string): string {
  return text.startsWith('﻿') ? text.slice(1) : text;
}

function decodeXml(text: string): string {
  return text.replaceAll(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (whole, name: string) => {
    if (name.startsWith('#')) {
      const code = /^#x/i.test(name) ? Number.parseInt(name.slice(2), 16) : Number(name.slice(1));

      return code > 0 && code <= 0x10_FF_FF ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[name] ?? whole;
  });
}

function collapse(text: string): string {
  return text
    .replaceAll(/\s+/g, ' ')
    .trim();
}

function oneLine(text: string, limit = MAX_VALUE_CHARS): string {
  const flat = collapse(text);

  return flat.length > limit ? `${flat.slice(0, limit)}…` : flat;
}

function wrap(text: string, before: string, after: string): string {
  return text === '' ? '' : before + text + after;
}

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

function attribute(tag: string, name: string): string | undefined {
  const match = new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`).exec(tag);

  return match === null ? undefined : decodeXml(match[1] ?? match[2]);
}

function texts(xml: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([^<]*)</${tag}>`, 'g');

  return [...xml.matchAll(pattern)].map((match) => decodeXml(match[1]));
}

function paragraphs(xml: string, paragraphTag: string, textTag: string): string[] {
  return xml
    .split(`</${paragraphTag}>`)
    .map((chunk) => collapse(texts(chunk, textTag).join('')))
    .filter((text) => text !== '');
}

function partNumber(name: string): number {
  return Number(/(\d+)\.xml$/.exec(name)?.[1] ?? 0);
}

function byNumber(first: string, second: string): number {
  return partNumber(first) - partNumber(second);
}

function columnName(index: number): string {
  let name = '';

  for (let rest = index + 1; rest > 0; rest = Math.floor((rest - 1) / 26)) {
    name = String.fromCodePoint(65 + ((rest - 1) % 26)) + name;
  }
  return name;
}

function parseJson(text: string, name: string): unknown {
  try {
    return JSON.parse(stripBom(text)) as unknown;
  } catch (error) {
    throw new ExtractError(`${name} is not valid JSON: ${(error as Error).message}`);
  }
}

function walk(node: unknown, visit: (record: Record<string, unknown>) => void): void {
  if (Array.isArray(node)) {
    for (const item of node) {
      walk(item, visit);
    }
    return;
  }
  if (!isRecord(node)) {
    return;
  }
  visit(node);
  for (const value of Object.values(node)) {
    walk(value, visit);
  }
}

function fenceFor(text: string): string {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map((ticks) => ticks.length));

  return '`'.repeat(Math.max(3, longest + 1));
}

// ---------- ZIP reading with node:zlib ----------
function bufferSource(buffer: Buffer): Source {
  return {
    size: buffer.length,
    read: (offset, length) => buffer.subarray(offset, offset + length),
  };
}

function fileSource(descriptor: number): Source {
  return {
    size: fstatSync(descriptor).size,
    read: (offset, length) => {
      const chunk = Buffer.alloc(length);
      const count = readSync(descriptor, chunk, 0, length, offset);

      return chunk.subarray(0, count);
    },
  };
}

function damaged(): ExtractError {
  return new ExtractError('Damaged ZIP archive: its directory cannot be read.');
}

function findEnd(source: Source): Buffer {
  const length = Math.min(source.size, ZIP_END_SIZE + 0xFF_FF);
  const tail = source.read(source.size - length, length);

  for (let index = tail.length - ZIP_END_SIZE; index >= 0; index -= 1) {
    if (tail.readUInt32LE(index) === ZIP_END) {
      return tail.subarray(index);
    }
  }
  throw new ExtractError('Not a ZIP archive, or a damaged one.');
}

function readDirectory(source: Source): ZipEntry[] {
  const end = findEnd(source);
  const count = end.readUInt16LE(10);
  const size = end.readUInt32LE(12);
  const offset = end.readUInt32LE(16);

  if (count === 0xFF_FF || size === 0xFF_FF_FF_FF || offset === 0xFF_FF_FF_FF) {
    throw new ExtractError('ZIP64 archive (over 4 GB or 65,535 entries): this script does not read it.');
  }
  if (offset + size > source.size) {
    throw damaged();
  }
  const directory = source.read(offset, size);
  const entries: ZipEntry[] = [];
  let position = 0;

  for (let index = 0; index < count; index += 1) {
    if (position + ZIP_CENTRAL_SIZE > directory.length || directory.readUInt32LE(position) !== ZIP_CENTRAL) {
      throw damaged();
    }
    const nameLength = directory.readUInt16LE(position + 28);

    entries.push({
      name: directory.toString('utf8', position + ZIP_CENTRAL_SIZE, position + ZIP_CENTRAL_SIZE + nameLength),
      flags: directory.readUInt16LE(position + 8),
      method: directory.readUInt16LE(position + 10),
      crc: directory.readUInt32LE(position + 16),
      compressedSize: directory.readUInt32LE(position + 20),
      size: directory.readUInt32LE(position + 24),
      offset: directory.readUInt32LE(position + 42),
    });
    position += ZIP_CENTRAL_SIZE + nameLength + directory.readUInt16LE(position + 30) + directory.readUInt16LE(position + 32);
  }
  return entries;
}

function inflate(entry: ZipEntry, data: Buffer): Buffer {
  if (entry.method === 0) {
    return data;
  }
  if (entry.method !== 8) {
    throw new ExtractError(`Compression method ${entry.method} of ${entry.name} is not supported.`);
  }
  try {
    return inflateRawSync(data, { maxOutputLength: MAX_ENTRY_BYTES });
  } catch {
    throw new ExtractError(`Cannot decompress ${entry.name}: damaged, or larger than 64 MB.`);
  }
}

function openZip(source: Source): Zip {
  const entries = readDirectory(source);
  const encrypted = entries.find((entry) => (entry.flags & ENCRYPTED_FLAGS) !== 0);

  if (encrypted !== undefined) {
    throw new ExtractError(`Encrypted entry: ${encrypted.name}. Nothing was extracted. Ask the user for a copy without a password.`);
  }
  const byName = new Map(entries.map((entry) => [
    entry.name,
    entry,
  ]));
  const bytes = (name: string): Buffer => {
    const entry = byName.get(name);

    if (entry === undefined) {
      throw new ExtractError(`Entry not found: ${name}. List the entries with --list.`);
    }
    if (entry.size > MAX_ENTRY_BYTES) {
      throw new ExtractError(`Entry too large: ${name} (${entry.size} bytes). Read a smaller entry with --part.`);
    }
    const header = source.read(entry.offset, ZIP_LOCAL_SIZE);

    if (header.length < ZIP_LOCAL_SIZE || header.readUInt32LE(0) !== ZIP_LOCAL) {
      throw damaged();
    }
    const start = entry.offset + ZIP_LOCAL_SIZE + header.readUInt16LE(26) + header.readUInt16LE(28);
    const content = inflate(entry, source.read(start, entry.compressedSize));

    if (crc32(content) !== entry.crc) {
      throw new ExtractError(`Damaged entry: ${name} (checksum mismatch).`);
    }
    return content;
  };

  return {
    entries,
    has: (name) => byName.has(name),
    bytes,
    text: (name) => stripBom(bytes(name).toString('utf8')),
  };
}

function resolvePart(folder: string, target: string): string {
  return target.startsWith('/') ? target.slice(1) : posix.normalize(posix.join(folder, target));
}

function relationships(zip: Zip, part: string): Map<string, Relationship> {
  const folder = posix.dirname(part);
  const path = posix.join(folder, '_rels', `${posix.basename(part)}.rels`);
  const result = new Map<string, Relationship>();

  if (!zip.has(path)) {
    return result;
  }
  for (const match of zip
    .text(path)
    .matchAll(/<Relationship\b[^>]*>/g)) {
    const id = attribute(match[0], 'Id');
    const target = attribute(match[0], 'Target') ?? '';
    const external = attribute(match[0], 'TargetMode') === 'External';

    if (id !== undefined) {
      result.set(id, {
        type: attribute(match[0], 'Type') ?? '',
        target: external ? target : resolvePart(folder, target),
      });
    }
  }
  return result;
}

function relationshipOfType(zip: Zip, part: string, type: string): string | undefined {
  return [...relationships(zip, part).values()].find((item) => item.type.endsWith(`/${type}`))?.target;
}

function names(zip: Zip, pattern: RegExp): string[] {
  return zip.entries
    .map((entry) => entry.name)
    .filter((name) => pattern.test(name));
}

function isUnsafePath(name: string): boolean {
  return name.startsWith('/') || /^[a-z]:/i.test(name) || name
    .split(/[\\/]/)
    .includes('..');
}

// ---------- Sections shared by several formats ----------
function listing(zip: Zip, type: string): string[] {
  const total = zip.entries.reduce((sum, entry) => sum + entry.size, 0);
  const lines = [
    `Type: ${type} · ${zip.entries.length} entries · ${total} bytes uncompressed`,
    '',
  ];

  for (const entry of zip.entries.slice(0, MAX_LISTED_ENTRIES)) {
    lines.push(`- ${entry.name} (${entry.size} bytes)${isUnsafePath(entry.name) ? ' (unsafe path: never extract it)' : ''}`);
  }
  if (zip.entries.length > MAX_LISTED_ENTRIES) {
    lines.push(`[${zip.entries.length - MAX_LISTED_ENTRIES} more entries not shown; read one with --part <entry>]`);
  }
  return lines;
}

function chartSection(zip: Zip): string[] {
  const charts = names(zip, /\/charts\/chart\d+\.xml$/).toSorted(byNumber);

  if (charts.length === 0) {
    return [];
  }
  const lines = [
    '',
    '## Charts',
    '',
  ];

  for (const name of charts) {
    const xml = zip.text(name);
    const title = collapse(texts(/<c:title>[\s\S]*?<\/c:title>/.exec(xml)?.[0] ?? '', 'a:t').join(' '));
    const data = texts(xml, 'c:f');
    const shownData = data.length > 0 ? ' · data: ' + data
      .slice(0, 10)
      .join(', ') : '';

    lines.push(`- ${name}: ${title === '' ? 'no title' : title}${shownData}`);
  }
  return lines;
}

function embeddedSection(zip: Zip): string[] {
  const parts = zip.entries.filter((entry) => {
    return !entry.name.endsWith('/') && !entry.name.includes('_rels/') && EMBEDDED_MARKS.some((mark) => `/${entry.name}`.includes(mark));
  });

  if (parts.length === 0) {
    return [];
  }
  const lines = [
    '',
    '## Embedded parts (not read)',
    '',
    ...parts
      .slice(0, MAX_LISTED_PARTS)
      .map((entry) => `- ${entry.name} (${entry.size} bytes)`),
  ];

  if (parts.length > MAX_LISTED_PARTS) {
    lines.push(`[${parts.length - MAX_LISTED_PARTS} more parts not shown; use --list]`);
  }
  if (parts.some((entry) => entry.name.endsWith('vbaProject.bin'))) {
    lines.push('', 'This file contains macros. They were not read. Never run them.');
  }
  return lines;
}

// ---------- Word ----------
function headingLevel(style: string): number {
  const numbered = /^(?:heading|titre)(\d)$/i.exec(style);

  if (numbered !== null) {
    return Math.min(Number(numbered[1]), 5);
  }
  return /^(?:title|titre)$/i.test(style) ? 1 : 0;
}

function heading(level: number, text: string): string[] {
  return [
    '',
    `${'#'.repeat(level + 1)} ${text}`,
    '',
  ];
}

function tableRow(cells: string[], first: boolean): string[] {
  const line = `| ${cells.join(' | ')} |`;

  return first ? [
    line,
    `|${' --- |'.repeat(cells.length)}`,
  ] : [line];
}

function appendWordText(state: WordState, text: string): void {
  const current = state.stack.at(-1);

  if (current !== undefined) {
    current.text += text;
  }
}

function wordText(state: WordState): void {
  const end = state.xml.indexOf('</w:t>', state.pattern.lastIndex);

  if (end < 0) {
    state.pattern.lastIndex = state.xml.length;
    return;
  }
  appendWordText(state, decodeXml(state.xml.slice(state.pattern.lastIndex, end)));
  state.pattern.lastIndex = end + '</w:t>'.length;
}

function wordParagraphEnd(state: WordState): void {
  const paragraph = state.stack.pop();
  const text = collapse(paragraph?.text ?? '');
  const level = headingLevel(paragraph?.style ?? '');

  if (text !== '' && state.depth > 0) {
    state.cell.push(text);
  } else if (text !== '') {
    state.lines.push(...(level > 0 ? heading(level, text) : [text]));
  }
}

const WORD_OPEN: Record<string, (state: WordState, tag: string) => void> = {
  t: wordText,
  tab: (state) => {
    appendWordText(state, ' ');
  },
  br: (state) => {
    appendWordText(state, ' ');
  },
  cr: (state) => {
    appendWordText(state, ' ');
  },
  pStyle: (state, tag) => {
    const current = state.stack.at(-1);

    if (current !== undefined) {
      current.style = attribute(tag, 'w:val') ?? '';
    }
  },
  p: (state) => {
    state.stack.push({
      text: '',
      style: '',
    });
  },
  tbl: (state) => {
    state.depth += 1;
    if (state.depth === 1) {
      state.rowIndex = 0;
      state.lines.push('');
    }
  },
  tr: (state) => {
    state.row = state.depth === 1 ? [] : state.row;
  },
  tc: (state) => {
    state.cell = state.depth === 1 ? [] : state.cell;
  },
};
const WORD_CLOSE: Record<string, (state: WordState) => void> = {
  p: wordParagraphEnd,
  tbl: (state) => {
    state.depth = Math.max(0, state.depth - 1);
    if (state.depth === 0) {
      state.lines.push('');
    }
  },
  tr: (state) => {
    if (state.depth === 1) {
      state.lines.push(...tableRow(state.row, state.rowIndex === 0));
      state.rowIndex += 1;
    }
  },
  tc: (state) => {
    if (state.depth === 1) {
      state.row.push(state.cell
        .join(' ')
        .replaceAll('|', '\\|'));
    }
  },
};

function wordBody(source: string): string[] {
  const state: WordState = {
    xml: source.replaceAll(/<mc:Fallback>[\s\S]*?<\/mc:Fallback>/g, ''),
    pattern: new RegExp(WORD_TOKEN.source, 'g'),
    lines: [],
    stack: [],
    depth: 0,
    row: [],
    cell: [],
    rowIndex: 0,
  };

  for (let match = state.pattern.exec(state.xml); match !== null; match = state.pattern.exec(state.xml)) {
    const open = match[1];
    const close = match[4];

    if (close !== undefined) {
      WORD_CLOSE[close](state);
    } else if (match[3] === '' || !WORD_CONTAINERS.has(open)) {
      WORD_OPEN[open](state, match[0]);
    }
  }
  return state.lines;
}

function wordComments(zip: Zip): string[] {
  if (!zip.has('word/comments.xml')) {
    return [];
  }
  const comments = [
    ...zip
      .text('word/comments.xml')
      .matchAll(/<w:comment\b([^>]*)>([\s\S]*?)<\/w:comment>/g),
  ];

  return [
    '',
    '## Comments',
    '',
    ...comments.map((match) => `- ${attribute(match[1], 'w:author') ?? 'unknown'}: ${paragraphs(match[2], 'w:p', 'w:t').join(' ')}`),
  ];
}

function word(zip: Zip): string[] {
  if (!zip.has('word/document.xml')) {
    throw new ExtractError('word/document.xml not found: this is not a Word document. List the entries with --list.');
  }
  return [
    'Type: Word document',
    '',
    ...wordBody(zip.text('word/document.xml')),
    ...wordComments(zip),
    ...chartSection(zip),
    ...embeddedSection(zip),
  ];
}

// ---------- Excel ----------
function sharedStrings(xml: string): string[] {
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((match) => {
    return texts(match[1].replaceAll(/<rPh\b[\s\S]*?<\/rPh>/g, ''), 't').join('');
  });
}

function cellValue(type: string, body: string, shared: string[]): string {
  const raw = /<v>([^<]*)<\/v>/.exec(body)?.[1];

  if (type === 's') {
    return shared[Number(raw)] ?? '';
  }
  if (type === 'inlineStr') {
    return texts(body, 't').join('');
  }
  if (type === 'b' && raw !== undefined) {
    return raw === '1' ? 'TRUE' : 'FALSE';
  }
  return decodeXml(raw ?? '');
}

function cellFormula(body: string): string {
  const match = /<f\b[^>]*?(?:\/>|>([^<]*)<\/f>)/.exec(body);

  if (match === null) {
    return '';
  }
  return match[1] === undefined || match[1] === '' ? '=(shared formula)' : `=${decodeXml(match[1])}`;
}

function cellText(attributes: string, body: string, shared: string[]): string {
  const value = cellValue(attribute(attributes, 't') ?? 'n', body, shared);
  const formula = cellFormula(body);

  if (value === '' && formula === '') {
    return '';
  }
  return `${attribute(attributes, 'r') ?? '?'}=${oneLine(value)}${wrap(formula, ' [', ']')}`;
}

function sheetComments(zip: Zip, path: string): string[] {
  const target = relationshipOfType(zip, path, 'comments');

  if (target === undefined || !zip.has(target)) {
    return [];
  }
  const comments = [
    ...zip
      .text(target)
      .matchAll(/<comment\b([^>]*)>([\s\S]*?)<\/comment>/g),
  ];

  return [
    '',
    'Comments:',
    '',
    ...comments.map((match) => `- ${attribute(match[1], 'ref') ?? '?'}: ${oneLine(texts(match[2], 't').join(''))}`),
  ];
}

function worksheet(zip: Zip, sheet: Sheet, shared: string[], limit: number): string[] {
  const xml = zip.text(sheet.path);
  const merged = [...xml.matchAll(/<mergeCell ref="([^"]+)"/g)].map((match) => match[1]);
  const lines = [
    '',
    `## Sheet: ${sheet.name}`,
    '',
    `Range: ${/<dimension ref="([^"]+)"/.exec(xml)?.[1] ?? 'unknown'} · Rows: ${(xml.match(/<row\b/g) ?? []).length} · Formulas: ${(xml.match(/<f[\s>/]/g) ?? []).length}`,
  ];

  if (merged.length > 0) {
    const more = merged.length > MAX_MERGED ? ', …' : '';

    lines.push(`Merged cells: ${merged
      .slice(0, MAX_MERGED)
      .join(', ')}${more}`);
  }
  return [
    ...lines,
    '',
    ...sheetRows(xml, shared, limit),
    ...sheetComments(zip, sheet.path),
  ];
}

function sheetRows(xml: string, shared: string[], limit: number): string[] {
  const lines: string[] = [];
  let skipped = 0;

  for (const row of xml.matchAll(/<row\b[^>]*?(?:\/>|>([\s\S]*?)<\/row>)/g)) {
    const cells = [...(row[1] ?? '').matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)]
      .map((match) => cellText(match[1], match[2] ?? '', shared))
      .filter((text) => text !== '');

    if (cells.length > 0 && lines.length < limit) {
      lines.push(cells.join(' | '));
    } else if (cells.length > 0) {
      skipped += 1;
    }
  }
  if (skipped > 0) {
    lines.push(`[${skipped} more rows not shown; use --rows <n> or --sheet <name>]`);
  }
  return lines;
}

function namedRanges(workbook: string): string[] {
  const ranges = [...workbook.matchAll(/<definedName\b([^>]*)>([^<]*)<\/definedName>/g)].filter((match) => {
    return attribute(match[1], 'hidden') !== '1' && !(attribute(match[1], 'name') ?? '').startsWith('_xlnm.');
  });

  if (ranges.length === 0) {
    return [];
  }
  return [
    '',
    '## Named ranges',
    '',
    ...ranges
      .slice(0, MAX_ITEMS)
      .map((match) => `- ${attribute(match[1], 'name') ?? '?'}: ${decodeXml(match[2])}`),
  ];
}

function workbookSheets(zip: Zip, workbookPath: string, workbook: string): Sheet[] {
  const rels = relationships(zip, workbookPath);

  return [...workbook.matchAll(/<sheet\b[^>]*>/g)].map((match) => {
    return {
      name: attribute(match[0], 'name') ?? 'Sheet',
      path: rels.get(attribute(match[0], 'r:id') ?? '')?.target ?? '',
      hidden: (attribute(match[0], 'state') ?? 'visible') !== 'visible',
    };
  });
}

function requireSheet(sheets: { name: string }[], wanted: string | undefined): void {
  if (wanted !== undefined && !sheets.some((sheet) => sheet.name === wanted)) {
    const known = sheets
      .map((sheet) => sheet.name)
      .join(', ');

    throw new ExtractError(`Sheet not found: ${wanted}. Sheets: ${known}`);
  }
}

function excel(zip: Zip, options: Options): string[] {
  const workbookPath = 'xl/workbook.xml';

  if (!zip.has(workbookPath)) {
    throw new ExtractError('xl/workbook.xml not found: this is not an Excel workbook. List the entries with --list.');
  }
  const workbook = zip.text(workbookPath);
  const sharedPath = relationshipOfType(zip, workbookPath, 'sharedStrings') ?? 'xl/sharedStrings.xml';
  const shared = zip.has(sharedPath) ? sharedStrings(zip.text(sharedPath)) : [];
  const sheets = workbookSheets(zip, workbookPath, workbook);

  requireSheet(sheets, options.sheet);
  const lines = [
    `Type: Excel workbook · ${sheets.length} sheets`,
    '',
    '## Sheets',
    '',
    ...sheets.map((sheet) => `- ${sheet.name}${sheet.hidden ? ' (hidden)' : ''}`),
    ...namedRanges(workbook),
  ];

  for (const sheet of sheets.filter((item) => options.sheet === undefined || item.name === options.sheet)) {
    lines.push(...(zip.has(sheet.path) ? worksheet(zip, sheet, shared, options.rows) : [
      '',
      `## Sheet: ${sheet.name}`,
      '',
      'Not a worksheet: a chart sheet or a missing part.',
    ]));
  }
  return [
    ...lines,
    ...chartSection(zip),
    ...embeddedSection(zip),
  ];
}

// ---------- PowerPoint ----------
function slideText(xml: string): string[] {
  const clean = xml
    .replaceAll(/<a:fld\b[\s\S]*?<\/a:fld>/g, '')
    .replaceAll(/<a:br\b[^>]*\/>/g, '<a:t> </a:t>');

  return paragraphs(clean, 'a:p', 'a:t');
}

function slidePaths(zip: Zip): string[] {
  const presentation = 'ppt/presentation.xml';

  if (zip.has(presentation)) {
    const rels = relationships(zip, presentation);
    const ordered = [
      ...zip
        .text(presentation)
        .matchAll(/<p:sldId\b[^>]*>/g),
    ]
      .map((match) => rels.get(attribute(match[0], 'r:id') ?? '')?.target ?? '')
      .filter((path) => zip.has(path));

    if (ordered.length > 0) {
      return ordered;
    }
  }
  return names(zip, /^ppt\/slides\/slide\d+\.xml$/).toSorted(byNumber);
}

function powerPoint(zip: Zip): string[] {
  const slides = slidePaths(zip);
  const lines = [`Type: PowerPoint presentation · ${slides.length} slides`];

  for (const [
    index,
    path,
  ] of slides.entries()) {
    const xml = zip.text(path);
    const notes = relationshipOfType(zip, path, 'notesSlide');
    const noteLines = notes !== undefined && zip.has(notes) ? slideText(zip.text(notes)) : [];

    lines.push('', `## Slide ${index + 1}${/<p:sld\b[^>]*\sshow="0"/.test(xml) ? ' (hidden)' : ''}`, '', ...slideText(xml));
    if (noteLines.length > 0) {
      lines.push('', 'Notes:', '', ...noteLines);
    }
  }
  return [
    ...lines,
    ...chartSection(zip),
    ...embeddedSection(zip),
  ];
}

// ---------- OpenDocument ----------
function odfInline(xml: string): string {
  const spaced = xml
    .replaceAll(/<text:note\b[\s\S]*?<\/text:note>/g, '')
    .replaceAll(/<text:s\b([^>]*)\/>/g, (_whole, attributes: string) => {
      return ' '.repeat(Math.min(Number(attribute(attributes, 'text:c') ?? 1), 100));
    })
    .replaceAll(/<text:(?:tab|line-break)\b[^>]*\/>/g, ' ')
    .replaceAll(/<[^>]+>/g, '');

  return collapse(decodeXml(spaced));
}

function odfParagraphs(xml: string): string[] {
  const lines: string[] = [];

  for (const match of xml.matchAll(ODF_PARAGRAPH)) {
    const text = odfInline(match[3] ?? '');
    const level = Math.min(Number(attribute(match[2], 'text:outline-level') ?? 1), 5);

    if (text !== '' && match[1] === 'h') {
      lines.push('', `${'#'.repeat(level + 1)} ${text}`, '');
    } else if (text !== '') {
      lines.push(text);
    }
  }
  return lines;
}

function odfCellText(xml: string): string {
  return [...xml.matchAll(ODF_PARAGRAPH)]
    .map((match) => odfInline(match[3] ?? ''))
    .filter((text) => text !== '')
    .join(' ');
}

function odfTableRows(xml: string): string[] {
  const lines: string[] = [];

  for (const row of xml.matchAll(ODF_ROW)) {
    const cells = [...(row[2] ?? '').matchAll(ODF_CELL)].map((cell) => odfCellText(cell[3] ?? '').replaceAll('|', '\\|'));

    lines.push(`| ${cells.join(' | ')} |`, ...(lines.length === 0 ? [`|${' --- |'.repeat(cells.length)}`] : []));
  }
  return lines;
}

function odfText(body: string): string[] {
  const lines: string[] = [];
  let last = 0;

  for (const table of body.matchAll(/<table:table(?=[\s>])[^>]*>[\s\S]*?<\/table:table>/g)) {
    lines.push(...odfParagraphs(body.slice(last, table.index)), '', ...odfTableRows(table[0]), '');
    last = table.index + table[0].length;
  }
  return [
    ...lines,
    ...odfParagraphs(body.slice(last)),
  ];
}

function odfCellValue(attributes: string, body: string): string {
  const text = odfCellText(body);

  if (text !== '') {
    return text;
  }
  return attribute(attributes, 'office:value') ?? attribute(attributes, 'office:date-value') ?? attribute(attributes, 'office:boolean-value') ?? attribute(attributes, 'office:string-value') ?? '';
}

function odfRowCells(xml: string, rowIndex: number): string[] {
  const cells: string[] = [];
  let column = 0;

  for (const cell of xml.matchAll(ODF_CELL)) {
    const repeat = Number(attribute(cell[2], 'table:number-columns-repeated') ?? 1);
    const value = odfCellValue(cell[2], cell[3] ?? '');
    const formula = (attribute(cell[2], 'table:formula') ?? '').replace(/^of:/, '');

    if (value !== '' || formula !== '') {
      const repeated = repeat > 1 ? ' (x' + String(repeat) + ')' : '';

      cells.push(`${columnName(column)}${rowIndex + 1}=${oneLine(value)}${wrap(formula, ' [', ']')}${repeated}`);
    }
    column += repeat;
  }
  return cells;
}

function odfSheet(name: string, xml: string, limit: number): string[] {
  const lines = [
    '',
    `## Sheet: ${name}`,
    '',
  ];
  let rowIndex = 0;
  let shown = 0;
  let skipped = 0;

  for (const row of xml.matchAll(ODF_ROW)) {
    const repeat = Number(attribute(row[1], 'table:number-rows-repeated') ?? 1);
    const cells = odfRowCells(row[2] ?? '', rowIndex);

    if (cells.length > 0 && shown < limit) {
      const repeated = repeat > 1 ? ' (row repeated ' + String(repeat) + ' times)' : '';

      lines.push(cells.join(' | ') + repeated);
      shown += 1;
    } else if (cells.length > 0) {
      skipped += 1;
    }
    rowIndex += repeat;
  }
  if (skipped > 0) {
    lines.push(`[${skipped} more rows not shown; use --rows <n> or --sheet <name>]`);
  }
  return lines;
}

function odfSpreadsheet(body: string, options: Options): string[] {
  const sheets = [...body.matchAll(ODF_TABLE)].map((match) => {
    return {
      name: attribute(match[1], 'table:name') ?? 'Sheet',
      xml: match[2],
    };
  });

  requireSheet(sheets, options.sheet);
  return [
    `Type: OpenDocument spreadsheet · ${sheets.length} sheets`,
    '',
    '## Sheets',
    '',
    ...sheets.map((sheet) => `- ${sheet.name}`),
    ...sheets
      .filter((sheet) => options.sheet === undefined || sheet.name === options.sheet)
      .flatMap((sheet) => odfSheet(sheet.name, sheet.xml, options.rows)),
  ];
}

function odfPresentation(body: string): string[] {
  const pages = [...body.matchAll(/<draw:page(?=[\s>])([^>]*)>([\s\S]*?)<\/draw:page>/g)];
  const lines = [`Type: OpenDocument presentation · ${pages.length} slides`];

  for (const [
    index,
    page,
  ] of pages.entries()) {
    const notes = /<presentation:notes(?=[\s>])[\s\S]*?<\/presentation:notes>/.exec(page[2])?.[0] ?? '';
    const noteLines = odfParagraphs(notes);
    const name = attribute(page[1], 'draw:name');

    lines.push('', `## Slide ${index + 1}${wrap(name ?? '', ': ', '')}`, '', ...odfParagraphs(page[2].replace(notes, '')));
    if (noteLines.length > 0) {
      lines.push('', 'Notes:', '', ...noteLines);
    }
  }
  return lines;
}

function openDocument(zip: Zip, options: Options): string[] {
  if (!zip.has('content.xml')) {
    throw new ExtractError('content.xml not found: this is not an OpenDocument file. List the entries with --list.');
  }
  const body = /<office:(text|spreadsheet|presentation|drawing)(?=[\s>])[^>]*>([\s\S]*)<\/office:\1>/.exec(zip.text('content.xml'));

  if (body === null) {
    return [
      'Type: OpenDocument file',
      '',
      'No text body found.',
    ];
  }
  const content: Record<string, () => string[]> = {
    text: () => [
      'Type: OpenDocument text',
      '',
      ...odfText(body[2]),
    ],
    spreadsheet: () => odfSpreadsheet(body[2], options),
    presentation: () => odfPresentation(body[2]),
    drawing: () => [
      'Type: OpenDocument drawing',
      '',
      ...odfParagraphs(body[2]),
    ],
  };

  return [
    ...content[body[1]](),
    ...embeddedSection(zip),
  ];
}

// ---------- Design files: Adobe XD, Sketch, Visio ----------
function xdScreenNames(zip: Zip): Map<string, string> {
  const screens = new Map<string, string>();

  if (zip.has('manifest')) {
    walk(parseJson(zip.text('manifest'), 'manifest'), (node) => {
      if (typeof node.path === 'string' && typeof node.name === 'string') {
        screens.set(node.path, node.name);
      }
    });
  }
  return screens;
}

function xdTexts(zip: Zip, path: string): string[] {
  const found: string[] = [];

  walk(parseJson(zip.text(path), path), (node) => {
    if (typeof node.rawText === 'string' && node.rawText.trim() !== '') {
      found.push(oneLine(node.rawText, MAX_ITEMS));
    }
  });
  return unique(found).slice(0, MAX_ITEMS);
}

function adobeXd(zip: Zip): string[] {
  const screenNames = xdScreenNames(zip);
  const artboards = zip.entries
    .map((entry) => /^artwork\/([^/]+)\/graphics\/graphicContent\.agc$/.exec(entry.name))
    .filter((match) => match !== null)
    .map((match) => {
      return {
        path: match[0],
        name: match[1] === 'pasteboard' ? 'Pasteboard (outside the screens)' : screenNames.get(match[1]) ?? match[1],
      };
    });
  const lines = [
    `Type: Adobe XD document · ${artboards.length} artboards`,
    '',
    '## Screens',
    '',
    ...artboards.map((artboard) => `- ${artboard.name}`),
  ];
  let found = 0;

  for (const artboard of artboards) {
    const items = xdTexts(zip, artboard.path);

    found += items.length;
    lines.push('', `## Screen: ${artboard.name}`, '', ...items.map((item) => `- ${item}`));
  }
  if (found === 0) {
    lines.push('', 'No text found under the key "rawText". Look at the keys of one artboard with: --part "<entry>" --outline');
  }
  if (zip.has('preview.png')) {
    lines.push('', 'preview.png exists: an image, not read.');
  }
  return lines;
}

function sketchLayers(node: unknown, lines: string[]): void {
  if (Array.isArray(node)) {
    for (const item of node) {
      sketchLayers(item, lines);
    }
    return;
  }
  if (!isRecord(node)) {
    return;
  }
  const kind = node._class;

  if ((kind === 'artboard' || kind === 'symbolMaster') && typeof node.name === 'string') {
    lines.push('', `### ${kind === 'artboard' ? 'Artboard' : 'Symbol'}: ${node.name}`, '');
  }
  if (kind === 'text' && isRecord(node.attributedString) && typeof node.attributedString.string === 'string') {
    lines.push(`- ${oneLine(node.attributedString.string, MAX_ITEMS)}`);
  }
  sketchLayers(node.layers, lines);
}

function sketch(zip: Zip): string[] {
  const pages = names(zip, /^pages\/[^/]+\.json$/);
  const lines = [`Type: Sketch document · ${pages.length} pages`];

  for (const path of pages) {
    const page = parseJson(zip.text(path), path);
    const title = isRecord(page) && typeof page.name === 'string' ? page.name : path;

    lines.push('', `## Page: ${title}`, '');
    sketchLayers(isRecord(page) ? page.layers : [], lines);
  }
  return lines;
}

function visioPages(zip: Zip): {
  name: string;
  path: string;
}[] {
  const index = 'visio/pages/pages.xml';
  const rels = relationships(zip, index);
  const pages = zip.has(index) ? [
    ...zip
      .text(index)
      .matchAll(/<Page\b([^>]*)>([\s\S]*?)<\/Page>/g),
  ].map((match) => {
    const background = attribute(match[1], 'Background') === '1' ? ' (background)' : '';

    return {
      name: (attribute(match[1], 'Name') ?? attribute(match[1], 'NameU') ?? 'Page') + background,
      path: rels.get(attribute(match[2], 'r:id') ?? '')?.target ?? '',
    };
  }) : [];

  if (pages.some((page) => zip.has(page.path))) {
    return pages.filter((page) => zip.has(page.path));
  }
  return names(zip, /^visio\/pages\/page\d+\.xml$/)
    .toSorted(byNumber)
    .map((path) => {
      return {
        name: path,
        path,
      };
    });
}

function visio(zip: Zip): string[] {
  const pages = visioPages(zip);
  const lines = [`Type: Visio drawing · ${pages.length} pages`];

  for (const page of pages) {
    const shapes = [
      ...zip
        .text(page.path)
        .matchAll(/<Text\b[^>]*>([\s\S]*?)<\/Text>/g),
    ]
      .map((match) => oneLine(decodeXml(match[1].replaceAll(/<[^>]+>/g, ' ')), MAX_ITEMS))
      .filter((text) => text !== '');

    lines.push('', `## Page: ${page.name}`, '', ...shapes.map((text) => `- ${text}`));
  }
  return [
    ...lines,
    ...embeddedSection(zip),
  ];
}

// ---------- Archives: .zip, .jar, .nupkg ----------
function archiveWith(entry: (zip: Zip) => string | undefined, type: string): ZipFormat {
  return (zip) => {
    const name = entry(zip);
    const lines = listing(zip, type);

    if (name === undefined || !zip.has(name)) {
      return lines;
    }
    return [
      ...lines,
      '',
      `## ${name}`,
      '',
      zip
        .text(name)
        .slice(0, MAX_ENTRY_SHOWN)
        .trim(),
    ];
  };
}

const nuget = archiveWith((zip) => names(zip, /^[^/]+\.nuspec$/)[0], 'NuGet package');
const jar = archiveWith(() => 'META-INF/MANIFEST.MF', 'Java archive');

// ---------- Text formats: draw.io, notebooks, JSON ----------
function diagramBody(content: string): string {
  const trimmed = content.trim();

  if (trimmed === '' || trimmed.startsWith('<')) {
    return trimmed;
  }
  let inflated: string;

  try {
    inflated = inflateRawSync(Buffer.from(trimmed, 'base64'), { maxOutputLength: MAX_ENTRY_BYTES }).toString('utf8');
  } catch {
    throw new ExtractError('Cannot decompress a draw.io page: damaged, or larger than 64 MB.');
  }
  try {
    return decodeURIComponent(inflated);
  } catch {
    return inflated;
  }
}

function drawioLabel(value: string): string {
  return oneLine(
    decodeXml(value
      .replaceAll(/<br\s*\/?>/gi, ' ')
      .replaceAll(/<[^>]+>/g, ' ')),
    MAX_ITEMS,
  );
}

function drawioCells(xml: string): DrawioCell[] {
  const cells: DrawioCell[] = [];
  let wrapper: {
    id?: string;
    label?: string;
  } | undefined;

  for (const match of xml.matchAll(/<(mxCell|UserObject|object)\b([^>]*?)\/?>/g)) {
    const own = attribute(match[2], 'id');

    if (match[1] !== 'mxCell') {
      wrapper = {
        id: own,
        label: attribute(match[2], 'label'),
      };
      continue;
    }
    cells.push({
      id: own ?? wrapper?.id ?? '',
      label: drawioLabel(attribute(match[2], 'value') ?? (own === undefined ? wrapper?.label : undefined) ?? ''),
      vertex: attribute(match[2], 'vertex') === '1',
      edge: attribute(match[2], 'edge') === '1',
      source: attribute(match[2], 'source'),
      target: attribute(match[2], 'target'),
    });
    wrapper = own === undefined ? undefined : wrapper;
  }
  return cells;
}

function drawioPage(xml: string): string[] {
  const cells = drawioCells(xml);
  const labels = new Map(cells.map((cell) => [
    cell.id,
    cell.label === '' ? cell.id : cell.label,
  ]));
  const shapes = cells
    .filter((cell) => cell.vertex && cell.label !== '')
    .map((cell) => `- ${cell.label}`);
  const links = cells
    .filter((cell) => cell.edge && cell.source !== undefined && cell.target !== undefined)
    .map((cell) => {
      const from = labels.get(cell.source ?? '') ?? cell.source;
      const to = labels.get(cell.target ?? '') ?? cell.target;

      return `- ${from} → ${to}${wrap(cell.label, ' (', ')')}`;
    });

  return [
    'Shapes:',
    '',
    ...(shapes.length > 0 ? shapes : ['- none']),
    '',
    'Connections:',
    '',
    ...(links.length > 0 ? links : ['- none']),
  ];
}

function drawio(text: string): string[] {
  const diagrams = [...text.matchAll(/<diagram\b([^>]*)>([\s\S]*?)<\/diagram>/g)];
  const pages = diagrams.length > 0 ? diagrams.map((match) => {
    return {
      name: attribute(match[1], 'name') ?? 'Page',
      xml: diagramBody(match[2]),
    };
  }) : [
    {
      name: 'Page',
      xml: text,
    },
  ];
  const lines = [`Type: draw.io diagram · ${pages.length} pages`];

  for (const page of pages) {
    lines.push('', `## Page: ${page.name}`, '', ...drawioPage(page.xml));
  }
  return lines;
}

function notebookLanguage(book: Record<string, unknown>): string {
  const metadata = isRecord(book.metadata) ? book.metadata : {};
  const kernel = isRecord(metadata.kernelspec) ? metadata.kernelspec.language : undefined;
  const info = isRecord(metadata.language_info) ? metadata.language_info.name : undefined;

  if (typeof kernel === 'string') {
    return kernel;
  }
  return typeof info === 'string' ? info : '';
}

function notebookCell(cell: unknown, index: number, language: string): string[] {
  if (!isRecord(cell)) {
    return [];
  }
  const kind = typeof cell.cell_type === 'string' ? cell.cell_type : 'unknown';
  const source = Array.isArray(cell.source) ? cell.source.join('') : String(cell.source ?? '');
  const outputs = Array.isArray(cell.outputs) ? cell.outputs : [];
  const types = unique(outputs.map((output) => (isRecord(output) && typeof output.output_type === 'string' ? output.output_type : 'output')));
  const fence = fenceFor(source);
  const lines = [
    '',
    `## Cell ${index + 1} (${kind})`,
    '',
    ...(kind === 'code' ? [
      fence + language,
      source,
      fence,
    ] : [source]),
  ];

  if (outputs.length > 0) {
    lines.push('', `[${outputs.length} outputs omitted: ${types.join(', ')}]`);
  }
  return lines;
}

function notebook(text: string): string[] {
  const book = parseJson(text, 'notebook');

  if (!isRecord(book) || !Array.isArray(book.cells)) {
    throw new ExtractError('Not a Jupyter notebook: no "cells" list.');
  }
  const language = notebookLanguage(book);
  const cells = book.cells as unknown[];

  return [
    `Type: Jupyter notebook · ${cells.length} cells${wrap(language, ' · ', '')}`,
    ...cells.flatMap((cell, index) => notebookCell(cell, index, language)),
  ];
}

function json(text: string): string[] {
  return [
    'Type: JSON · outline: keys, types and sizes; the first item of each array',
    '',
    ...jsonOutline(parseJson(text, 'file')),
  ];
}

// ---------- Main ----------
function finish(lines: string[], maxChars: number): string {
  const text = `${lines
    .join(NEWLINE)
    .replaceAll(/\n{3,}/g, '\n\n')
    .trim()}\n`;

  if (text.length <= maxChars) {
    return text;
  }
  const cut = text.lastIndexOf(NEWLINE, maxChars);
  const kept = text.slice(0, cut > maxChars / 2 ? cut : maxChars);

  return `${kept}\n\n[truncated: ${text.length - kept.length} more characters; use --part, --sheet, --rows or --max-chars]\n`;
}

function needsTool(name: string, lines: string[]): Extract {
  return {
    text: finish(
      [
        `# ${name}`,
        '',
        ...lines,
      ],
      Number.POSITIVE_INFINITY,
    ),
    code: 2,
  };
}

function pdfCommands(path: string, name: string): string[] {
  return [
    'PDF file: this script does not read it. Run instead:',
    '',
    `1. pdfinfo "${path}"`,
    `2. pdftotext -layout -f 1 -l 10 "${path}" ".extract/${name}.txt"`,
    '',
    'An empty text means a scanned PDF: use OCR, as references/pdf-images.md says.',
  ];
}

function oleCommands(path: string, name: string, extension: string): string[] {
  if (ENCRYPTED_OFFICE.has(extension)) {
    throw new ExtractError(`${name} is an encrypted Office file (password protected). Nothing was extracted. Ask the user for a copy without a password.`);
  }
  if (extension === '.msg') {
    return [
      'Outlook message (binary): this script does not read it.',
      'Ask the user to save the mail as .eml, or to paste its text.',
    ];
  }
  const target = OLE_TARGETS[extension];

  if (target === undefined) {
    return [
      'Legacy compound file (binary): this script does not read it.',
      'Give its type and size only. Never read it raw.',
    ];
  }
  return [
    'Old Office file (binary): convert it first, then run this script on the result:',
    '',
    `1. soffice --headless --convert-to ${target} --outdir .extract "${path}"`,
    `2. node ${SCRIPT} ".extract/${basename(name, extname(name))}.${target}"`,
  ];
}

function otherCommands(path: string, name: string, extension: string): string[] {
  if (extension === '.rtf') {
    return [
      'RTF document: convert it first, then run this script on the result:',
      '',
      `1. soffice --headless --convert-to docx --outdir .extract "${path}"`,
      `2. node ${SCRIPT} ".extract/${basename(name, extname(name))}.docx"`,
    ];
  }
  if (IMAGE_EXTENSIONS.has(extension)) {
    return [
      'Image: this script does not read images.',
      '',
      `1. file -b "${path}"`,
      `2. For text in the image: tesseract "${path}" ".extract/${name}" -l eng+fra`,
      '',
      'Never guess what the image shows.',
    ];
  }
  if (TEXT_EXTENSIONS.has(extension)) {
    return [
      'Text file: read it in parts, never whole:',
      '',
      `1. wc -c -l "${path}"`,
      `2. head -n 100 "${path}"`,
      `3. grep -n "<term>" "${path}" | head -n 50`,
    ];
  }
  return [
    `Unknown format (${extension === '' ? 'no extension' : extension}): this script does not read it.`,
    '',
    `1. file -b "${path}"`,
    '2. Give its type and size. Never read it raw.',
  ];
}

const ZIP_FORMATS: Record<string, ZipFormat> = {
  '.docx': word,
  '.docm': word,
  '.dotx': word,
  '.xlsx': excel,
  '.xlsm': excel,
  '.xltx': excel,
  '.pptx': powerPoint,
  '.pptm': powerPoint,
  '.ppsx': powerPoint,
  '.odt': openDocument,
  '.ods': openDocument,
  '.odp': openDocument,
  '.odg': openDocument,
  '.xd': adobeXd,
  '.sketch': sketch,
  '.vsdx': visio,
  '.vsdm': visio,
  '.nupkg': nuget,
  '.jar': jar,
  '.war': jar,
};
const TEXT_FORMATS: Record<string, TextFormat> = {
  '.drawio': drawio,
  '.dio': drawio,
  '.ipynb': notebook,
  '.json': json,
};

function zipExtract(zip: Zip, extension: string, options: Options): string[] {
  if (options.list) {
    return listing(zip, 'ZIP-based file');
  }
  if (options.part !== undefined) {
    const content = zip.bytes(options.part);

    if (options.outline) {
      return [
        `## ${options.part}: outline`,
        '',
        ...jsonOutline(parseJson(content.toString('utf8'), options.part)),
      ];
    }
    if (content
      .subarray(0, BINARY_PROBE)
      .includes(0)) {
      throw new ExtractError(`Binary entry: ${options.part}. It is not text: give its name and size only.`, 2);
    }
    return [
      `## ${options.part}`,
      '',
      stripBom(content.toString('utf8')),
    ];
  }
  if (options.outline) {
    throw new ExtractError('Use --outline with --part <entry>, or on a .json file.');
  }
  const format = ZIP_FORMATS[extension];

  return format === undefined ? listing(zip, 'ZIP archive') : format(zip, options);
}

function jsonScalar(value: unknown): string {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `string "${oneLine(value, 40)}"`;
  }
  return `${typeof value} ${String(value)}`;
}

// The first item of an array, and the first item of each other kind ("type" or "_class"), so that
// the outline shows every kind of node of a design file without listing all of them.
function sampleIndexes(items: unknown[]): number[] {
  const seen = new Set<unknown>();
  const indexes: number[] = [];

  for (const [
    index,
    item,
  ] of items.entries()) {
    const kind = isRecord(item) ? item.type ?? item._class : undefined;

    if (indexes.length === 0 || (kind !== undefined && !seen.has(kind))) {
      indexes.push(index);
    }
    seen.add(kind);
    if (indexes.length >= MAX_OUTLINE_KINDS) {
      break;
    }
  }
  return indexes;
}

function describeJson(key: string, value: unknown, depth: number, lines: string[]): void {
  const indent = '  '.repeat(depth);

  if (Array.isArray(value)) {
    lines.push(`${indent}- ${key}: array (${value.length} items)`);
    for (const index of depth < MAX_OUTLINE_DEPTH ? sampleIndexes(value) : []) {
      describeJson(`[${index}]`, value[index], depth + 1, lines);
    }
    return;
  }
  if (!isRecord(value)) {
    lines.push(`${indent}- ${key}: ${jsonScalar(value)}`);
    return;
  }
  const keys = Object.keys(value);

  lines.push(`${indent}- ${key}: object (${keys.length} keys)`);
  if (depth >= MAX_OUTLINE_DEPTH) {
    return;
  }
  for (const child of keys.slice(0, MAX_OUTLINE_KEYS)) {
    describeJson(child, value[child], depth + 1, lines);
  }
  if (keys.length > MAX_OUTLINE_KEYS) {
    lines.push(`${indent}  - … ${keys.length - MAX_OUTLINE_KEYS} more keys`);
  }
}

function jsonOutline(value: unknown): string[] {
  const lines: string[] = [];

  describeJson('(root)', value, 0, lines);
  return lines;
}

function extracted(name: string, lines: string[], maxChars: number): Extract {
  return {
    text: finish(
      [
        `# ${name}`,
        '',
        ...lines,
      ],
      maxChars,
    ),
    code: 0,
  };
}

function readText(source: Source, path: string): string {
  if (source.size > MAX_TEXT_FILE_BYTES) {
    throw new ExtractError(`${basename(path)} is larger than 256 MB. Read it in parts: head -n 100 "${path}"`);
  }
  return stripBom(source
    .read(0, source.size)
    .toString('utf8'));
}

function isZip(head: Buffer): boolean {
  return head.length >= 4 && (head.readUInt32LE(0) === ZIP_LOCAL || head.readUInt32LE(0) === ZIP_END);
}

function extractSource(path: string, source: Source, options: Options): Extract {
  const name = basename(path);
  const extension = extname(path).toLowerCase();
  const head = source.read(0, 8);
  const format = TEXT_FORMATS[extension];

  if (head.length === 0) {
    return extracted(name, ['Empty file: nothing to extract.'], options.maxChars);
  }
  if (head
    .toString('latin1')
    .startsWith('%PDF-')) {
    return needsTool(name, pdfCommands(path, name));
  }
  if (head.toString('hex') === OLE_MAGIC) {
    return needsTool(name, oleCommands(path, name, extension));
  }
  if (isZip(head)) {
    return extracted(name, zipExtract(openZip(source), extension, options), options.maxChars);
  }
  if (format === undefined) {
    return needsTool(name, otherCommands(path, name, extension));
  }
  return extracted(name, format(readText(source, path)), options.maxChars);
}

function failure(error: unknown): Extract {
  if (error instanceof ExtractError) {
    return {
      text: error.code === 2 ? `${error.message}\n` : `Error: ${error.message}\n`,
      code: error.code,
    };
  }
  const code = (error as NodeJS.ErrnoException).code;

  if (code === 'ENOENT') {
    return {
      text: 'Error: file not found.\n',
      code: 1,
    };
  }
  return {
    text: `Error: ${(error as Error).message}\n`,
    code: 1,
  };
}

export function extractBuffer(path: string, buffer: Buffer, options: Options = DEFAULT_OPTIONS): Extract {
  try {
    return extractSource(path, bufferSource(buffer), options);
  } catch (error) {
    return failure(error);
  }
}

export function extractFile(path: string, options: Options = DEFAULT_OPTIONS): Extract {
  let descriptor: number | undefined;

  try {
    if (statSync(path).isDirectory()) {
      throw new ExtractError(`${path} is a folder. Run this script on one file.`);
    }
    descriptor = openSync(path, 'r');
    return extractSource(path, fileSource(descriptor), options);
  } catch (error) {
    return failure(error);
  } finally {
    if (descriptor !== undefined) {
      closeSync(descriptor);
    }
  }
}

function positive(value: string | undefined, fallback: number, name: string): number {
  if (value === undefined) {
    return fallback;
  }
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    throw new ExtractError(`${name} must be a whole number above 0: ${value}`);
  }
  return number;
}

function command(argv: string[]): ReturnType<typeof parseArgs<{
  args: string[];
  allowPositionals: true;
  options: typeof CLI_OPTIONS;
}>> {
  return parseArgs({
    args: argv,
    allowPositionals: true,
    options: CLI_OPTIONS,
  });
}

export function run(argv: string[]): Extract {
  try {
    const {
      values,
      positionals,
    } = command(argv);

    if (values.help === true) {
      return {
        text: `${USAGE}\n`,
        code: 0,
      };
    }
    if (positionals.length !== 1) {
      throw new ExtractError(`Give one file.\n${USAGE}`);
    }
    return extractFile(positionals[0], {
      list: values.list === true,
      part: values.part,
      outline: values.outline === true,
      sheet: values.sheet,
      rows: positive(values.rows, DEFAULT_OPTIONS.rows, '--rows'),
      maxChars: positive(values['max-chars'], DEFAULT_OPTIONS.maxChars, '--max-chars'),
    });
  } catch (error) {
    if (error instanceof ExtractError) {
      return failure(error);
    }
    return failure(new ExtractError(`${(error as Error).message}\n${USAGE}`));
  }
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  const result = run(process.argv.slice(2));

  process.stdout.write(result.text);
  process.exitCode = result.code;
}
