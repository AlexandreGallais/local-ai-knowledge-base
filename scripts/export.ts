// Builds the export of the knowledge base: a few text files `base-<n>.txt` of 500 KB at most each,
// to paste by hand on a workstation, where `node import.ts` rebuilds the base. It also generates
// the chat profile from `code/`: the chat variant of each skill and the knowledge of each subject.
// Run with Node 22.18 or later, from the root of the repository, no build step, no package:
//   node scripts/export.ts                   writes export/base-<n>.txt and export/import.ts
//   node scripts/export.ts --max-kb 100      parts of 100 KB at most
//   node scripts/export.ts --chat <folder>   writes only the generated chat profile into <folder>
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  relative,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  type ExportedFile,
  FORMAT,
  type Part,
  PART_PATTERN,
  sha256,
} from '../import.ts';

export const DEFAULT_MAX_KB = 500;
const KB = 1000;
const NEWLINE = '\n';
const ROOT_FILES = [
  'scripts/check-base.ts',
  'import.ts',
  'README.md',
  'LICENSE',
];
const TREE_FOLDERS = [
  'code',
  'chat/models',
  'adapters',
];
const SKIPPED = new Set([
  '.DS_Store',
  '.extract',
  'node_modules',
  'state.local.json',
]);
const FILES_BEGIN = /^<!--\s*files:begin(?:\s+id=([\w-]+))?\s*-->$/;
const FILES_END = /^<!--\s*files:end\s*-->$/;
const CHAT_BLOCK = /^<!--\s*chat:begin\s+id=([\w-]+)\s*-->\n([\s\S]*?)\n<!--\s*chat:end\s*-->$/gm;
const FENCE = /^\s*(`{3,}|~{3,})/;
const LIMITS = [
  '## Limits',
  '',
  '- You cannot read or write files. You cannot run commands.',
  '- When a step needs a command, give the command to the user and ask for its output.',
  '- Never say that you read a file, wrote a file or ran a command.',
  '',
].join(NEWLINE);
// Room kept for the part header (about 125 bytes) and for the header and end lines of a file
// block (about 160 bytes plus the path), so that no part goes over the limit.
const PART_HEADER_RESERVE = 200;
const CHUNK_HEADER_RESERVE = 220;

function posix(path: string): string {
  return path
    .split('\\')
    .join('/');
}

function walk(root: string, folder: string): string[] {
  const absolute = join(root, folder);

  if (!existsSync(absolute)) {
    return [];
  }
  return readdirSync(absolute)
    .filter((entry) => !SKIPPED.has(entry))
    .flatMap((entry) => {
      const path = posix(join(folder, entry));

      return statSync(join(root, path)).isDirectory() ? walk(root, path) : [path];
    })
    .toSorted();
}

function read(root: string, path: string): string {
  return readFileSync(join(root, path), 'utf8');
}

function chatBlocks(chatText: string): Map<string, string> {
  return new Map([
    ...chatText
      .replaceAll('\r\n', NEWLINE)
      .matchAll(CHAT_BLOCK),
  ].map((match) => [
    match[1],
    match[2].trim(),
  ]));
}

function nextFence(line: string, fence: string): string {
  const opening = FENCE.exec(line)?.[1];

  if (opening === undefined) {
    return fence;
  }
  if (fence === '') {
    return opening;
  }
  return line
    .trim()
    .startsWith(fence) ? '' : fence;
}

function tidy(text: string): string {
  return `${text
    .replaceAll(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`;
}

// Replaces each files block by the chat block with the same id, or drops it. Markers inside code
// blocks are examples: they stay as they are.
export function replaceFilesBlocks(text: string, chatText = ''): string {
  const chatTexts = chatBlocks(chatText);
  const output: string[] = [];
  let fence = '';
  let skipping = false;

  for (const line of text
    .replaceAll('\r\n', NEWLINE)
    .split(NEWLINE)) {
    const begin = fence === '' ? FILES_BEGIN.exec(line.trim()) : null;

    if (begin !== null) {
      skipping = true;
      output.push(chatTexts.get(begin[1] ?? '') ?? '');
    } else if (skipping && FILES_END.test(line.trim())) {
      skipping = false;
    } else if (!skipping) {
      output.push(line);
      fence = nextFence(line, fence);
    }
  }
  return output.join(NEWLINE);
}

// Numbers the steps again from 1, once blocks were dropped or replaced.
function renumberSteps(text: string): string {
  const lines = text.split(NEWLINE);
  let section = '';
  let fence = '';
  let step = 0;

  return lines
    .map((line) => {
      const heading = fence === '' ? /^##\s+(.+)$/.exec(line)?.[1] : undefined;

      section = heading ?? section;
      fence = nextFence(line, fence);
      if (section !== 'Steps' || fence !== '' || !/^\d+\.\s/.test(line)) {
        return line;
      }
      step += 1;
      return line.replace(/^\d+/, String(step));
    })
    .join(NEWLINE);
}

export function chatSkill(skillText: string, chatText = ''): string {
  const text = renumberSteps(replaceFilesBlocks(skillText, chatText)).replace(/^(\s+variant:\s*)files$/m, '$1chat');
  // The last "## Final check" is the skill's own: a template in a code block may hold another one.
  const finalCheck = text.lastIndexOf('\n## Final check');

  if (finalCheck >= 0) {
    return tidy(`${text.slice(0, finalCheck)}\n${LIMITS}${text.slice(finalCheck)}`);
  }
  return tidy(`${text.trimEnd()}\n\n${LIMITS}`);
}

export function chatDocument(text: string): string {
  return tidy(replaceFilesBlocks(text).replace(/^variant:\s*files$/m, 'variant: chat'));
}

function headerList(text: string, field: string): string[] {
  const value = new RegExp(`^${field}:\\s*(.*)$`, 'm')
    .exec(text)?.[1]
    .trim() ?? 'none';

  return value === 'none' ? [] : value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

// The chat profile: chat/skills/<name>/SKILL.md and chat/knowledge/<topic>/<document>.md.
export function chatProfile(root: string): ExportedFile[] {
  const skills = walk(root, 'code/.agents/skills')
    .filter((path) => path.endsWith('/SKILL.md'))
    .map((path) => {
      const folder = dirname(path);
      const chat = existsSync(join(root, folder, 'chat.md')) ? read(root, `${folder}/chat.md`) : '';

      return {
        path: `chat/skills/${folder.split('/').at(-1)}/SKILL.md`,
        content: chatSkill(read(root, path), chat),
      };
    });
  const topics = new Set(walk(root, 'chat/models')
    .filter((path) => path.endsWith('.md'))
    .flatMap((path) => headerList(read(root, path), 'knowledge')));
  const knowledge = [...topics].flatMap((topic) => walk(root, `code/docs/${topic}`)
    .filter((path) => path.endsWith('.md') && !path.endsWith('.fr.md'))
    .map((path) => {
      return {
        path: `chat/knowledge/${topic}/${path.split('/').at(-1)}`,
        content: chatDocument(read(root, path)),
      };
    }));

  return [
    ...skills,
    ...knowledge,
  ];
}

export function baseFiles(root: string): ExportedFile[] {
  const tree = TREE_FOLDERS.flatMap((folder) => walk(root, folder));
  const single = ROOT_FILES.filter((path) => existsSync(join(root, path)));

  return [
    ...tree,
    ...single,
  ].map((path) => {
    return {
      path,
      content: read(root, path),
    };
  });
}

function splitText(text: string, maxBytes: number): string[] {
  const pieces: string[] = [];
  let current: string[] = [];
  let size = 0;

  for (const line of text.match(/[^\n]*\n|[^\n]+$/g) ?? []) {
    for (const unit of line.length > maxBytes / 4 ? [...line] : [line]) {
      const bytes = Buffer.byteLength(unit);

      if (size > 0 && size + bytes > maxBytes) {
        pieces.push(current.join(''));
        current = [];
        size = 0;
      }
      current.push(unit);
      size += bytes;
    }
  }
  return [
    ...pieces,
    ...(size === 0 ? [] : [current.join('')]),
  ];
}

function marker(files: ExportedFile[]): string {
  const token = sha256(files.map((file) => file.path + NEWLINE + file.content).join(NEWLINE)).slice(0, 12);
  const value = `=====${FORMAT}-${token}=====`;
  const clash = files.find((file) => file.content.split(NEWLINE).some((line) => line.startsWith(value)));

  if (clash !== undefined) {
    throw new Error(`${clash.path} holds the export marker; change one character of it and export again.`);
  }
  return value;
}

function blocks(file: ExportedFile, mark: string, capacity: number): string[] {
  if (file.content.includes('\r')) {
    throw new Error(`${file.path} has Windows line ends (CRLF); convert it to LF first.`);
  }
  const pieces = file.content === '' ? [''] : splitText(file.content, capacity - CHUNK_HEADER_RESERVE - Buffer.byteLength(file.path));
  const hash = sha256(file.content);

  return pieces.map((piece, index) => {
    const added = !piece.endsWith(NEWLINE);

    return `${mark} FILE ${index + 1}/${pieces.length} ${hash} ${added ? 'NL' : 'RAW'} ${file.path}\n${piece}${added ? NEWLINE : ''}${mark} END\n`;
  });
}

export function buildExport(files: ExportedFile[], maxKb = DEFAULT_MAX_KB): Part[] {
  const mark = marker(files);
  const capacity = maxKb * KB - PART_HEADER_RESERVE;
  const bodies: string[] = [];
  let current: string[] = [];
  let size = 0;

  for (const block of files.flatMap((file) => blocks(file, mark, capacity))) {
    const bytes = Buffer.byteLength(block);

    if (size > 0 && size + bytes > capacity) {
      bodies.push(current.join(''));
      current = [];
      size = 0;
    }
    current.push(block);
    size += bytes;
  }
  bodies.push(current.join(''));
  return bodies.map((body, index) => {
    return {
      name: `base-${index + 1}.txt`,
      text: `${mark} PART ${index + 1} OF ${bodies.length} SHA256 ${sha256(body)}\n${body}`,
    };
  });
}

export function exportBase(root: string, maxKb = DEFAULT_MAX_KB): Part[] {
  return buildExport(
    [
      ...baseFiles(root),
      ...chatProfile(root),
    ],
    maxKb,
  );
}

function writeChat(root: string, target: string): void {
  for (const file of chatProfile(root)) {
    mkdirSync(dirname(join(target, file.path)), { recursive: true });
    writeFileSync(join(target, file.path), file.content);
  }
  console.log(`Chat profile written to ${target}.`);
}

function writeExport(root: string, out: string, maxKb: number): void {
  const parts = exportBase(root, maxKb);

  mkdirSync(out, { recursive: true });
  for (const name of readdirSync(out).filter((entry) => PART_PATTERN.test(entry))) {
    rmSync(join(out, name));
  }
  for (const part of parts) {
    writeFileSync(join(out, part.name), part.text);
  }
  copyFileSync(join(root, 'import.ts'), join(out, 'import.ts'));
  console.log(`Export written to ${relative(process.cwd(), out) || '.'}: import.ts and ${parts.length} part(s) of ${maxKb} KB at most.`);
}

function main(): void {
  const { values } = parseArgs({
    options: {
      'max-kb': { type: 'string' },
      'out': { type: 'string' },
      'chat': { type: 'string' },
    },
  });
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const maxKb = Number(values['max-kb'] ?? DEFAULT_MAX_KB);

  if (!Number.isInteger(maxKb) || maxKb < 10) {
    console.log('--max-kb must be a whole number of 10 or more.');
    process.exitCode = 1;
    return;
  }
  if (values.chat !== undefined) {
    writeChat(root, resolve(values.chat));
    return;
  }
  writeExport(root, resolve(values.out ?? join(root, 'export')), maxKb);
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
