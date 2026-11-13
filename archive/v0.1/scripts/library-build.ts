// Builds library/<tool>/ from a fetched source: each page cleaned, cut into files of 16 KB at most,
// each with its header; then the index of the tool, library/lock.json, library/README.md and
// THIRD_PARTY_NOTICES.md. Used by scripts/fetch-library.ts.
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  posix,
  relative,
  resolve,
  sep,
} from 'node:path';
import { cleanDocument } from './library-clean.ts';
import {
  bytes,
  splitMarkdown,
} from './library-markdown.ts';
import type {
  Fetched,
  Source,
} from './library-sources.ts';

export const MAX_FILE_BYTES = 16 * 1024;
const BODY_BUDGET = 15_000;
const NEWLINE = '\n';
const DOC_FILE = /\.(?:mdx?|md\.in)$/;
const SUMMARY_WORDS = 24;

export interface LockEntry {
  commit: string;
  files: number;
  bytes: number;
  built: string;
}

export type Lock = Record<string, LockEntry>;

export interface LibraryFile {
  path: string;
  title: string;
  summary: string;
  content: string;
}

function toPosix(path: string): string {
  return path
    .split(sep)
    .join('/');
}

function walk(folder: string): string[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);

    return entry.isDirectory() ? walk(path) : [path];
  });
}

// The folder the library paths start from: the docs folder itself, or the parent several share.
function commonFolder(folders: string[]): string {
  if (folders.length === 1) {
    return folders[0] ?? '';
  }
  const split = folders.map((folder) => folder.split('/'));
  const first = split[0] ?? [];
  let length = 0;

  while (length < first.length && split.every((parts) => parts[length] === first[length])) {
    length += 1;
  }
  return first
    .slice(0, length)
    .join('/');
}

// The path of a page in the library of its tool: index pages named after their folder.
export function libraryPath(source: Source, repositoryPath: string): string {
  const root = commonFolder(source.docs);
  const inside = root === '' ? repositoryPath : posix.relative(root, repositoryPath);
  const withoutExtension = inside
    .replace(DOC_FILE, '')
    .replaceAll(/\s+/g, '-');
  const folder = posix.dirname(withoutExtension);
  const name = posix.basename(withoutExtension);
  const collapsed = /^(?:_?index|README)$/i.test(name) ? folder : withoutExtension;

  return `${collapsed === '.' || collapsed === '' || collapsed === 'index' ? 'overview' : collapsed}.md`;
}

function excluded(source: Source, repositoryPath: string): boolean {
  return (source.exclude ?? []).some((prefix) => repositoryPath === prefix || repositoryPath.startsWith(`${prefix}/`));
}

export function pagesOf(fetched: Fetched): string[] {
  return fetched.source.docs
    .flatMap((folder) => walk(join(fetched.folder, folder)))
    .map((path) => toPosix(relative(fetched.folder, path)))
    .filter((path) => DOC_FILE.test(path) && !excluded(fetched.source, path))
    .toSorted();
}

function reader(folder: string): (path: string) => string | undefined {
  const root = resolve(folder);

  return (path) => {
    const file = resolve(root, path);

    if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) {
      return undefined;
    }
    return readFileSync(file, 'utf8');
  };
}

function header(fields: Record<string, string>): string {
  const lines = Object
    .entries(fields)
    .map(([
      key,
      value,
    ]) => `${key}: ${JSON.stringify(value)}`);

  return [
    '---',
    ...lines,
    '---',
    '',
  ].join(NEWLINE);
}

// The first sentence of prose of a page, at most 24 words, for its index line.
export function summaryOf(body: string): string {
  const prose = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block !== '' && !/^(?:#|```|~~~|\||>|-|\*|\d+\.|<|:)/.test(block)) ?? '';
  const sentence = prose
    .replaceAll(/[`*_]/g, '')
    .replaceAll(/\s+/g, ' ')
    .split(/(?<=[.!?])\s/)[0] ?? '';
  const words = sentence
    .split(' ')
    .filter((word) => word !== '');

  return words.length > SUMMARY_WORDS ? `${words.slice(0, SUMMARY_WORDS).join(' ')}…` : words.join(' ');
}

function sourceUrl(source: Source, commit: string, repositoryPath: string): string {
  return `${source.repository.replace(/\.git$/, '')}/blob/${commit}/${repositoryPath}`;
}

function partPath(path: string, index: number): string {
  return index === 0 ? path : path.replace(/\.md$/, `-p${index + 1}.md`);
}

function pageFiles(fetched: Fetched, repositoryPath: string, path: string): LibraryFile[] {
  const {
    source,
    commit,
  } = fetched;
  const cleaned = cleanDocument(readFileSync(join(fetched.folder, repositoryPath), 'utf8'), {
    flavor: source.flavor,
    path: repositoryPath,
    read: reader(fetched.folder),
    currentVersion: Number.parseFloat(source.version),
  });
  const title = cleaned.title.length > 150 ? `${cleaned.title.slice(0, 149)}…` : cleaned.title;
  const parts = splitMarkdown(cleaned.body, BODY_BUDGET);

  return parts.map((part, index) => {
    const fields: Record<string, string> = {
      title: parts.length === 1 ? title : `${title} (part ${index + 1} of ${parts.length})`,
      tool: source.tool,
      version: source.version,
      source: sourceUrl(source, commit, repositoryPath),
      commit,
      license: source.license,
    };
    const body = index === 0 ? part : `# ${fields.title ?? title}${NEWLINE}${NEWLINE}${part}`;

    return {
      path: partPath(path, index),
      title: fields.title ?? title,
      summary: summaryOf(index === 0 ? cleaned.body : part),
      content: `${header(fields)}${NEWLINE}${body}${NEWLINE}`,
    };
  });
}

// Every file of the library of one tool, the paths unique.
export function toolFiles(fetched: Fetched): LibraryFile[] {
  const taken = new Set<string>(['index.md']);

  return pagesOf(fetched).flatMap((repositoryPath) => {
    let path = libraryPath(fetched.source, repositoryPath);

    while (taken.has(path)) {
      path = path.replace(/\.md$/, '-page.md');
    }
    const files = pageFiles(fetched, repositoryPath, path);

    for (const file of files) {
      taken.add(file.path);
    }
    return files;
  });
}

export function renderIndex(source: Source, commit: string, files: LibraryFile[]): string {
  const lines = files.map((file) => {
    const size = Math.max(1, Math.round(bytes(file.content) / 1024));
    const summary = file.summary === '' ? '' : ` ${file.summary}`;

    return `- [${file.title.replaceAll(/[[\]]/g, '')}](library/${source.tool}/${file.path}):${summary} (${size} KB)`;
  });

  return [
    `# ${source.tool} library index`,
    '',
    `${source.title}. Version ${source.version}, from <${source.repository.replace(/\.git$/, '')}> at ${source.ref}, commit ${commit}.`,
    `License: ${source.license}, by ${source.attribution}; see THIRD_PARTY_NOTICES.md. The text was converted to plain Markdown and cut into files of 16 KB at most.`,
    '',
    'This index is long: search it with grep for your words, never read it whole. Then open one file and read only the section you need.',
    '',
    ...lines,
    '',
  ].join(NEWLINE);
}

export function writeTool(fetched: Fetched, libraryRoot: string): LockEntry {
  const folder = join(libraryRoot, fetched.source.tool);
  const files = toolFiles(fetched);

  rmSync(folder, {
    recursive: true,
    force: true,
  });
  for (const file of files) {
    mkdirSync(dirname(join(folder, file.path)), { recursive: true });
    writeFileSync(join(folder, file.path), file.content);
  }
  writeFileSync(join(folder, 'index.md'), renderIndex(fetched.source, fetched.commit, files));
  return {
    commit: fetched.commit,
    files: files.length,
    bytes: files.reduce((total, file) => total + bytes(file.content), 0),
    built: new Date()
      .toISOString()
      .slice(0, 10),
  };
}

function megabytes(count: number): string {
  return `${(count / 1_000_000).toFixed(1)} MB`;
}

export function renderNotices(sources: Source[], lock: Lock): string {
  const sections = sources.flatMap((source) => {
    const entry = lock[source.tool];

    return entry === undefined ? [] : [
      `## ${source.tool}`,
      '',
      `- Work: ${source.title}`,
      `- Authors: ${source.attribution}`,
      `- Source: <${source.repository.replace(/\.git$/, '')}>, ${source.ref}, commit ${entry.commit}`,
      `- License: ${source.license}`,
      '- Changes: converted to plain Markdown, site markup removed, code samples inlined, pages cut into files of 16 KB at most.',
      '',
    ];
  });

  return [
    '# Third-party notices',
    '',
    'Everything written for this base is under the MIT License (`LICENSE`). The folder `library/` holds',
    'official documentation of other projects, each under its own license, listed below. Each file of',
    '`library/` names its source, commit and license in its header.',
    '',
    ...sections,
  ].join(NEWLINE);
}

export function renderLibraryReadme(sources: Source[], lock: Lock): string {
  const rows = sources.map((source) => {
    const entry = lock[source.tool];
    const built = entry === undefined ? 'not built' : `${entry.files} files, ${megabytes(entry.bytes)}`;

    return `| [${source.tool}](${source.tool}/index.md) | ${source.title} | ${source.version} | ${source.license} | ${source.core ? 'yes' : 'no'} | ${built} |`;
  });

  return [
    '# Official documentation library',
    '',
    'The official documentation of the tools, converted to plain Markdown, at a pinned version, cut into',
    'files of 16 KB at most, with one index per tool. The AI opens it only when the documents of the base',
    'do not answer. The core set goes into the export by default.',
    '',
    '## Usage',
    '',
    'From the root of the repository, with git and network access:',
    '',
    '```sh',
    'node scripts/fetch-library.ts                 # every tool',
    'node scripts/fetch-library.ts --tool angular  # one tool, or a comma list',
    'node scripts/check-library.ts                 # headers, index, 16 KB at most, notices',
    '```',
    '',
    '## Tools',
    '',
    '| Tool | Documentation | Version | License | Core | Size |',
    '| --- | --- | --- | --- | --- | --- |',
    ...rows,
    '',
  ].join(NEWLINE);
}
