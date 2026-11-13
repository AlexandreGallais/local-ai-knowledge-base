// Checks the official documentation library: every source of library/sources.json is complete and
// has a license; every file of library/<tool>/ has its header (title, tool, version, source, commit,
// license), is listed in the index of its tool and is 16 KB at most; every tool has its notice in
// THIRD_PARTY_NOTICES.md, with its copyright, and its license files in licenses/<tool>/. Run with
// Node 22.18 or later, no package:
//   node scripts/check-library.ts [repository-root]
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import {
  dirname,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { LICENSE_FILE } from './library-licenses.ts';
import {
  type Source,
  sourceProblems,
} from './library-sources.ts';

export interface LibraryFinding {
  file: string;
  message: string;
}

export const MAX_FILE_BYTES = 16 * 1024;
const HEADER_FIELDS = [
  'title',
  'tool',
  'version',
  'source',
  'commit',
  'license',
];
const INDEX_LINK = /^- \[[^\]]*\]\(library\/([^/)]+)\/([^)]+)\)/;

function walk(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);

    return entry.isDirectory() ? walk(path) : [path];
  });
}

export function headerFields(text: string): Map<string, string> {
  const block = /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1] ?? '';
  const fields = new Map<string, string>();

  for (const line of block.split('\n')) {
    const match = /^([\w-]+):\s*(.*)$/.exec(line);

    if (match !== null) {
      fields.set(match[1] ?? '', (match[2] ?? '').replace(/^"(.*)"$/, '$1'));
    }
  }
  return fields;
}

// The problems of one file of the library of `tool`.
export function fileProblems(text: string, tool: string, size: number): string[] {
  const fields = headerFields(text);
  const missing = HEADER_FIELDS
    .filter((field) => (fields.get(field) ?? '') === '')
    .map((field) => `missing header field ${field}`);
  const wrongTool = fields.has('tool') && fields.get('tool') !== tool ? [`header tool is ${fields.get('tool') ?? ''}, not ${tool}`] : [];
  const tooBig = size > MAX_FILE_BYTES ? [`${size} bytes, more than ${MAX_FILE_BYTES}`] : [];

  return [
    ...missing,
    ...wrongTool,
    ...tooBig,
  ];
}

// The paths, relative to library/<tool>/, that the index of the tool lists.
export function indexedPaths(indexText: string, tool: string): Set<string> {
  const paths = new Set<string>();

  for (const line of indexText.split('\n')) {
    const match = INDEX_LINK.exec(line);

    if (match?.[1] === tool) {
      paths.add(match[2] ?? '');
    }
  }
  return paths;
}

function finding(file: string, message: string): LibraryFinding {
  return {
    file,
    message,
  };
}

function checkFiles(folder: string, tool: string, shown: (path: string) => string): LibraryFinding[] {
  const indexPath = join(folder, 'index.md');
  const listed = indexedPaths(readFileSync(indexPath, 'utf8'), tool);
  const files = walk(folder)
    .map((path) => relative(folder, path).split(sep).join('/'))
    .filter((path) => path !== 'index.md');
  const present = new Set(files);
  const fileFindings = files.flatMap((path) => {
    const full = join(folder, path);
    const problems = path.endsWith('.md') ? fileProblems(readFileSync(full, 'utf8'), tool, statSync(full).size) : ['not a Markdown file'];
    const unlisted = listed.has(path) ? [] : [`not listed in library/${tool}/index.md`];

    return [
      ...problems,
      ...unlisted,
    ].map((message) => finding(shown(full), message));
  });
  const deadLinks = [...listed]
    .filter((path) => !present.has(path))
    .map((path) => finding(shown(indexPath), `lists a missing file: ${path}`));

  return [
    ...fileFindings,
    ...deadLinks,
  ];
}

// The license files of the tool, kept in licenses/<tool>/, each named by its notice.
function checkLicenseFiles(root: string, section: string, source: Source): LibraryFinding[] {
  const folder = join(root, 'licenses', source.tool);
  const files = existsSync(folder) ? readdirSync(folder).filter((name) => LICENSE_FILE.test(name)) : [];

  if (files.length === 0) {
    return [finding(`licenses/${source.tool}`, 'no license file; run node scripts/fetch-licenses.ts')];
  }
  return files
    .filter((name) => statSync(join(folder, name)).size === 0 || !section.includes(`(licenses/${source.tool}/${name})`))
    .map((name) => finding(`licenses/${source.tool}/${name}`, 'empty, or not named by its notice in THIRD_PARTY_NOTICES.md'));
}

function checkNotice(root: string, notices: string, source: Source): LibraryFinding[] {
  const section = notices
    .split(/^## /m)
    .find((part) => part.startsWith(`${source.tool}\n`));

  if (section === undefined) {
    return [finding('THIRD_PARTY_NOTICES.md', `no notice for ${source.tool}`)];
  }
  const license = section.includes(`- License: ${source.license}`) ? [] : [finding('THIRD_PARTY_NOTICES.md', `the notice of ${source.tool} does not give its license ${source.license}`)];
  const copyright = section.includes('- Copyright: ') ? [] : [finding('THIRD_PARTY_NOTICES.md', `the notice of ${source.tool} gives no copyright`)];

  return [
    ...license,
    ...copyright,
    ...checkLicenseFiles(root, section, source),
  ];
}

function checkSource(root: string, source: Source, notices: string): LibraryFinding[] {
  const folder = join(root, 'library', source.tool);
  const shown = (path: string): string => relative(root, path)
    .split(sep)
    .join('/');

  if (!existsSync(join(folder, 'index.md'))) {
    return [finding(`library/${source.tool}`, 'not built: no index.md; run node scripts/fetch-library.ts')];
  }
  return [
    ...checkFiles(folder, source.tool, shown),
    ...checkNotice(root, notices, source),
  ];
}

export function checkLibrary(root: string): LibraryFinding[] {
  const parsed = JSON.parse(readFileSync(join(root, 'library', 'sources.json'), 'utf8')) as { sources?: Partial<Source>[] };
  const sources = parsed.sources ?? [];
  const problems = sources
    .flatMap((source) => sourceProblems(source))
    .map((message) => finding('library/sources.json', message));

  if (problems.length > 0) {
    return problems;
  }
  const complete = sources as Source[];
  const noticesPath = join(root, 'THIRD_PARTY_NOTICES.md');
  const notices = existsSync(noticesPath) ? readFileSync(noticesPath, 'utf8') : '';
  const tools = new Set(complete.map((source) => source.tool));
  const strays = readdirSync(join(root, 'library'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !tools.has(entry.name))
    .map((entry) => finding(`library/${entry.name}`, 'folder of a tool missing from library/sources.json'));

  return [
    ...strays,
    ...complete.flatMap((source) => checkSource(root, source, notices)),
  ];
}

function main(): void {
  const root = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'global'));
  const findings = checkLibrary(root);

  for (const item of findings.slice(0, 50)) {
    console.log(`${item.file}: ${item.message}`);
  }
  if (findings.length > 0) {
    console.log(`Library check failed: ${findings.length} finding(s).`);
    process.exitCode = 1;
    return;
  }
  console.log('Library check passed: every file has its header, is indexed and is 16 KB at most; every tool has its copyright and its license text.');
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
