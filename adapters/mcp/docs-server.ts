// Docs server of the knowledge base, for a coding assistant that speaks MCP over stdio.
// Run with Node 22.18 or later, no build step, no package:
//   node adapters/mcp/docs-server.ts [--root <folder>]
// The root holds docs/: the project root by default, or code/ of this repository.
// It speaks the protocol revision 2026-07-28 (request metadata, server/discover) and the
// revisions up to 2025-11-25 (initialize handshake). It never writes a file.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import {
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

type Json = Record<string, unknown>;

interface Request {
  id?: number | string | null;
  method?: string;
  params?: Json;
}

interface Entry {
  path: string;
  section?: string;
  text: string;
}

interface ToolResult {
  text: string;
  isError: boolean;
}

export const MODERN_VERSION = '2026-07-28';

export const LEGACY_VERSIONS = [
  '2025-11-25',
  '2025-06-18',
  '2025-03-26',
  '2024-11-05',
];

export const MAX_RESULTS = 10;
export const MAX_CHARS = 16_000;
const VERSION_KEY = 'io.modelcontextprotocol/protocolVersion';
const SERVER_INFO = {
  name: 'knowledge-base-docs',
  version: '0.1.0',
};
const INSTRUCTIONS = 'Find documents of the knowledge base with search_docs. Then read one section with read_doc. Read the table of contents of a document before a section.';
const INDEX_LINE = /^- \[([^\]]+)\]\(((?:docs|library)\/[^)]+)\):\s*(.*)$/;
const DOC_PATH = /^(?:docs|library)\/[\w-]+(?:\/[\w.-]+)*\.md$/;
const cachedEntries = new Map<string, Entry[]>();
const NEWLINE = '\n';
const TOOLS = [
  {
    name: 'search_docs',
    title: 'Search the knowledge base',
    description: 'Search the topic indexes and the section titles of the knowledge base, then the indexes of the official documentation in library/. Returns at most 10 lines, documents of the base first: a document path, or a path and a section title.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'English words, for example "valve flow coefficient".',
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'read_doc',
    title: 'Read one section of a document',
    description: 'Read one section of a document of the knowledge base. Without a section, returns the summary and the table of contents of the document.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path of the document, as search_docs gives it, for example "docs/simulation/principles.md".',
        },
        section: {
          type: 'string',
          description: 'Number or title of the section, as the table of contents gives it.',
        },
      },
      required: ['path'],
      additionalProperties: false,
    },
  },
];

export function resolveDocsRoot(root: string): string {
  if (!existsSync(join(root, 'docs')) && existsSync(join(root, 'code', 'docs'))) {
    return join(root, 'code');
  }
  return root;
}

function read(path: string): string {
  return readFileSync(path, 'utf8');
}

// The folder that holds library/: the root in a project, the folder above code/ in this repository.
export function libraryBase(root: string): string {
  return existsSync(join(root, 'library')) || !existsSync(join(root, '..', 'library')) ? root : join(root, '..');
}

function baseOf(root: string, path: string): string {
  return path.startsWith('library/') ? libraryBase(root) : root;
}

function topicIndexes(base: string, folder: 'docs' | 'library'): string[] {
  const top = join(base, folder);

  if (!existsSync(top)) {
    return [];
  }
  return readdirSync(top)
    .filter((topic) => statSync(join(top, topic)).isDirectory())
    .toSorted()
    .map((topic) => join(top, topic, 'index.md'))
    .filter((path) => existsSync(path));
}

function headings(text: string): string[] {
  return text
    .split(NEWLINE)
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3).trim());
}

// One entry per document, and one per section of a document of the base. The library is searched
// by its index lines only: it holds thousands of files.
function indexEntries(root: string, index: string): Entry[] {
  return read(index)
    .split(NEWLINE)
    .flatMap((line) => {
      const match = INDEX_LINE.exec(line.trim());

      if (match === null) {
        return [];
      }
      const [
        ,
        title = '',
        path = '',
        summary = '',
      ] = match;
      const file = join(baseOf(root, path), path);
      const sections = path.startsWith('docs/') && existsSync(file) ? headings(read(file)) : [];

      return [
        {
          path,
          text: `${title}: ${summary}`,
        },
        ...sections.map((section) => ({
          path,
          section,
          text: `${title} ${section}`,
        })),
      ];
    });
}

function entries(root: string): Entry[] {
  const cached = cachedEntries.get(root);

  if (cached !== undefined) {
    return cached;
  }
  const found = [
    ...topicIndexes(root, 'docs'),
    ...topicIndexes(libraryBase(root), 'library'),
  ].flatMap((index) => indexEntries(root, index));

  cachedEntries.set(root, found);
  return found;
}

function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z\d]+/)
    .filter((word) => word.length >= 2);
}

export function searchDocs(root: string, query: string): ToolResult {
  const asked = [...new Set(words(query))];

  if (asked.length === 0) {
    return {
      text: 'Give at least one English word to search.',
      isError: true,
    };
  }
  const found = entries(root)
    .map((entry) => {
      const known = new Set(words(entry.text));

      return {
        entry,
        score: asked.filter((word) => known.has(word)).length,
      };
    })
    .filter((item) => item.score > 0)
    .toSorted((first, second) => second.score - first.score || Number(first.entry.path.startsWith('library/')) - Number(second.entry.path.startsWith('library/')))
    .slice(0, MAX_RESULTS)
    .map(({ entry }) => entry.section === undefined ? `${entry.path} | ${entry.text}` : `${entry.path} | section: ${entry.section}`);

  return {
    text: found.length === 0 ? `No document matches "${query}". Try other English words.` : found.join(NEWLINE),
    isError: false,
  };
}

function safeDocument(root: string, path: string): string | undefined {
  if (!DOC_PATH.test(path) || path.endsWith('.fr.md') || path
    .split('/')
    .includes('..')) {
    return undefined;
  }
  const base = baseOf(root, path);
  const top = resolve(base, path.split('/')[0] ?? 'docs');
  const file = resolve(base, path);

  return relative(top, file).startsWith(`..${sep}`) || !existsSync(file) ? undefined : file;
}

function frontField(text: string, name: string): string {
  const match = new RegExp(`^${name}: (.+)$`, 'm').exec(text.split(/^---$/m)[1] ?? '');

  return match?.[1]?.trim() ?? '';
}

function tableOfContents(path: string, text: string): string {
  return [
    `${path}: ${frontField(text, 'title')}`,
    `Summary: ${frontField(text, 'summary')}`,
    'Sections:',
    ...headings(text).map((title, number) => /^\d+\. /.test(title) ? title : `${number + 1}. ${title}`),
    'Read one section with read_doc and its number or title.',
  ].join(NEWLINE);
}

function sectionBody(text: string, title: string): string {
  const lines = text.split(NEWLINE);
  const start = lines.indexOf(`## ${title}`);
  const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));

  return lines
    .slice(start, end === -1 ? undefined : end)
    .join(NEWLINE)
    .trim();
}

function findSection(titles: string[], asked: string): string | undefined {
  const wanted = asked
    .trim()
    .toLowerCase();
  const number = Number.parseInt(wanted, 10);

  if (String(number) === wanted) {
    return titles[number - 1];
  }
  return titles.find((title) => title.toLowerCase() === wanted) ?? titles.find((title) => title.toLowerCase().includes(wanted));
}

// The sources a section cites, taken from the Sources section of its document.
function citedSources(text: string, body: string): string[] {
  const cited = new Set(body.match(/\[S\d+\]/g) ?? []);

  return sectionBody(text, 'Sources')
    .split(NEWLINE)
    .filter((line) => [...cited].some((tag) => line.includes(tag)));
}

function capped(text: string): string {
  return text.length <= MAX_CHARS ? text : `${text.slice(0, MAX_CHARS)}${NEWLINE}[truncated: the section is longer than ${MAX_CHARS} characters]`;
}

export function readDoc(root: string, path: string, section?: string): ToolResult {
  const file = safeDocument(root, path);

  if (file === undefined) {
    return {
      text: `No document "${path}" in docs/. Use a path that search_docs gives.`,
      isError: true,
    };
  }
  const text = read(file);

  if (section === undefined || section.trim() === '') {
    return {
      text: tableOfContents(path, text),
      isError: false,
    };
  }
  const title = findSection(headings(text), section);

  if (title === undefined) {
    return {
      text: `No section "${section}" in ${path}.${NEWLINE}${tableOfContents(path, text)}`,
      isError: true,
    };
  }
  const body = sectionBody(text, title);
  const sources = title === 'Sources' ? [] : citedSources(text, body);

  return {
    text: capped([
      body,
      ...sources.length === 0 ? [] : [
        '',
        'Sources:',
        ...sources,
      ],
    ].join(NEWLINE)),
    isError: false,
  };
}

function callTool(root: string, params: Json): ToolResult | undefined {
  const args = typeof params.arguments === 'object' && params.arguments !== null ? params.arguments as Json : {};
  const text = (name: string): string | undefined => typeof args[name] === 'string' ? args[name] : undefined;

  if (params.name === 'search_docs') {
    return searchDocs(root, text('query') ?? '');
  }
  if (params.name === 'read_doc') {
    return readDoc(root, text('path') ?? '', text('section'));
  }
  return undefined;
}

function requestVersion(params: Json | undefined): string | undefined {
  const meta = params?._meta;

  if (typeof meta !== 'object' || meta === null) {
    return undefined;
  }
  const version = (meta as Json)[VERSION_KEY];

  return typeof version === 'string' ? version : undefined;
}

function reply(id: Request['id'], result: Json): Json {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

function failure(id: Request['id'], code: number, message: string, data?: Json): Json {
  return {
    jsonrpc: '2.0',
    id,
    error: data === undefined ? {
      code,
      message,
    } : {
      code,
      message,
      data,
    },
  };
}

function initialize(request: Request): Json {
  const requested = request.params?.protocolVersion;
  const version = typeof requested === 'string' && LEGACY_VERSIONS.includes(requested) ? requested : LEGACY_VERSIONS[0];

  return reply(request.id, {
    protocolVersion: version,
    capabilities: { tools: {} },
    serverInfo: SERVER_INFO,
    instructions: INSTRUCTIONS,
  });
}

function discover(request: Request): Json {
  return reply(request.id, {
    resultType: 'complete',
    supportedVersions: [
      MODERN_VERSION,
      ...LEGACY_VERSIONS,
    ],
    capabilities: { tools: {} },
    _meta: { 'io.modelcontextprotocol/serverInfo': SERVER_INFO },
    instructions: INSTRUCTIONS,
  });
}

function toolCall(root: string, request: Request, modern: boolean): Json {
  const result = callTool(root, request.params ?? {});

  if (result === undefined) {
    return failure(request.id, -32602, `Unknown tool: ${String(request.params?.name)}`);
  }
  return reply(request.id, {
    ...modern ? { resultType: 'complete' } : {},
    content: [
      {
        type: 'text',
        text: result.text,
      },
    ],
    isError: result.isError,
  });
}

function operation(root: string, request: Request, modern: boolean): Json {
  switch (request.method) {
    case 'ping': {
      return reply(request.id, {});
    }
    case 'tools/list': {
      return reply(request.id, {
        ...modern ? { resultType: 'complete' } : {},
        tools: TOOLS,
      });
    }
    case 'tools/call': {
      return toolCall(root, request, modern);
    }
    default: {
      return failure(request.id, -32601, `Method not found: ${String(request.method)}`);
    }
  }
}

// Answers one request, or returns undefined for a notification.
export function handle(root: string, request: Request): Json | undefined {
  if (request.id === undefined || request.id === null) {
    return undefined;
  }
  if (request.method === 'initialize') {
    return initialize(request);
  }
  const version = requestVersion(request.params);

  if (version !== undefined && version !== MODERN_VERSION) {
    return failure(request.id, -32022, 'Unsupported protocol version', {
      supported: [
        MODERN_VERSION,
        ...LEGACY_VERSIONS,
      ],
      requested: version,
    });
  }
  if (request.method === 'server/discover') {
    return discover(request);
  }
  return operation(root, request, version !== undefined);
}

export function handleLine(root: string, line: string): Json | undefined {
  if (line.trim() === '') {
    return undefined;
  }
  try {
    const request = JSON.parse(line) as unknown;

    if (typeof request !== 'object' || request === null || Array.isArray(request)) {
      return failure(null, -32600, 'Invalid request');
    }
    return handle(root, request as Request);
  } catch {
    return failure(null, -32700, 'Parse error');
  }
}

function main(): void {
  const { values } = parseArgs({ options: { root: { type: 'string' } } });
  const root = resolveDocsRoot(resolve(values.root ?? process.cwd()));
  const lines = createInterface({ input: process.stdin });

  process.stderr.write(`docs server: reading ${join(root, 'docs')}${NEWLINE}`);
  lines.on('line', (line) => {
    const answer = handleLine(root, line);

    if (answer !== undefined) {
      process.stdout.write(`${JSON.stringify(answer)}${NEWLINE}`);
    }
  });
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
