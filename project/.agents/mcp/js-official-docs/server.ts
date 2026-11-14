// MCP server "js-official-docs": search the official documentation of the JavaScript and
// TypeScript tools held in this brick (library/), then read one section. It never writes a file,
// but its index, built once in index/ when missing.
// Run by OpenCode in the project folder: node .agents/mcp/js-official-docs/server.ts
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildIndexes } from './build-index.ts';
import {
  type Arguments,
  inside,
  requiredText,
  serve,
  type Server,
  text,
  ToolError,
} from './mcp.ts';
import {
  type IndexEntry,
  parseIndex,
  search,
  sections,
} from './search.ts';

const cache = new Map<string, IndexEntry[]>();
const DOCUMENT = /^library\/[\w./-]+\.md$/;

// The folder of this brick. BRICK_ROOT in the environment overrides it (tests).
export function brickRoot(): string {
  return process.env['BRICK_ROOT'] ?? import.meta.dirname;
}

// Every index entry of the brick. Built once when the index is missing.
function entries(brick: string): IndexEntry[] {
  const cached = cache.get(brick);

  if (cached !== undefined) {
    return cached;
  }
  const folder = join(brick, 'index');

  if (!existsSync(folder) || readdirSync(folder).length === 0) {
    buildIndexes(brick);
  }
  const found = readdirSync(folder)
    .filter((name) => name.endsWith('.idx'))
    .sort((a, b) => a.localeCompare(b, 'en'))
    .flatMap((name) => parseIndex(readFileSync(join(folder, name), 'utf8')));

  cache.set(brick, found);
  return found;
}

export function searchDocs(args: Arguments): string {
  const query = requiredText(args, 'query');
  const tool = text(args, 'tool');
  const all = entries(brickRoot());
  const scope = tool === '' ? all : all.filter((entry) => entry.id.startsWith(`library/${tool}/`));
  const hits = search(scope, query);

  if (hits.length === 0) {
    return `No section matches "${query}". Try other English words, or the name of the API.`;
  }
  return [
    ...hits.map((hit) => `${hit.id} | ${hit.title}`),
    'Read one of them with read_doc and its id.',
  ].join('\n');
}

function tableOfContents(id: string, document: string): string {
  const parts = sections(id, document);

  return [
    `${id}: ${parts[0]?.title ?? id}`,
    'Sections:',
    ...parts
      .filter((part) => part.id.includes('#'))
      .map((part) => `- ${part.id}`),
  ].join('\n');
}

export function readDoc(args: Arguments): string {
  const id = requiredText(args, 'id');
  const [
    path = '',
    anchor,
  ] = id.split('#');

  if (!DOCUMENT.test(path)) {
    throw new ToolError(`"${id}" is not a document id. Use an id that search_docs gives, as "library/mdn-api/dommatrix.md#syntax".`);
  }
  const file = inside(brickRoot(), path);

  if (!existsSync(file)) {
    throw new ToolError(`No document "${path}". Use an id that search_docs gives.`);
  }
  const document = readFileSync(file, 'utf8');
  const parts = sections(path, document);

  if (anchor === undefined) {
    const whole = parts[0];

    return parts.length === 1 && whole !== undefined ? `${whole.title}\n\n${whole.text.trim()}` : `${(whole?.text ?? '').trim().slice(0, 1500)}\n\n${tableOfContents(path, document)}`;
  }
  const part = parts.find((item) => item.id === id);

  if (part === undefined) {
    throw new ToolError(`No section "${anchor}" in ${path}.\n${tableOfContents(path, document)}`);
  }
  return `${part.title}\n\n${part.text.trim()}`;
}

export const server: Server = {
  name: 'js-official-docs',
  version: '0.3.0',
  instructions: 'The official documentation of the JavaScript and TypeScript tools, kept locally. Search with search_docs, then read one section with read_doc. Look an API up rather than guess it.',
  tools: [
    {
      name: 'search_docs',
      description: 'Search the official documentation: MDN, Angular, TypeScript, NgRx Signals, RxJS, Node.js, npm, Vite, Vitest, Playwright, ESLint and its plugins, Stylelint. Returns 10 section ids at most.',
      properties: {
        query: {
          type: 'string',
          description: 'English words or an API name, as "DOMMatrix multiply" or "signalStoreFeature".',
        },
        tool: {
          type: 'string',
          description: 'Optional: search one tool only, as "angular" or "mdn-api".',
        },
      },
      required: ['query'],
      run: searchDocs,
    },
    {
      name: 'read_doc',
      description: 'Read one section of the documentation by its id. Without "#section", returns the start of the page and its sections.',
      properties: {
        id: {
          type: 'string',
          description: 'A section id from search_docs, as "library/mdn-api/dommatrix.md#syntax".',
        },
      },
      required: ['id'],
      run: readDoc,
    },
  ],
};

// Run the server only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
