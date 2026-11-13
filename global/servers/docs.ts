// MCP server "docs": search the documentation of the global base, then read one section.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/docs.ts
// It searches the documents written for the AI (docs/) and the official documentation (library/),
// only the tools the project's profile uses, and never writes a file.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildIndexes } from '../tools/build-index.ts';
import {
  type IndexEntry,
  parseIndex,
  search,
  sections,
} from '../tools/search.ts';
import {
  allowedForProfile,
  baseRoot,
  inside,
  projectRoot,
  readProfile,
} from './lib/base.ts';
import {
  type Arguments,
  requiredText,
  serve,
  type Server,
  text,
  ToolError,
} from './lib/mcp.ts';

const cache = new Map<string, IndexEntry[]>();
const DOCUMENT = /^(?:docs|library)\/[\w./-]+\.md$/;

// The index entries the profile may search, docs/ first. Built once when the index is missing.
function entries(base: string, project: string): IndexEntry[] {
  const key = `${base}\n${project}`;
  const cached = cache.get(key);

  if (cached !== undefined) {
    return cached;
  }
  const folder = join(base, 'index');

  if (!existsSync(folder)) {
    buildIndexes(base);
  }
  const allowed = allowedForProfile(base, readProfile(project).profile);
  const found = readdirSync(folder)
    .filter((name) => {
      const match = /^(docs|library)-(.+)\.idx$/.exec(name);

      return match !== null && allowed(match[1] ?? '', match[2] ?? '');
    })
    .sort((a, b) => Number(a.startsWith('library-')) - Number(b.startsWith('library-')) || a.localeCompare(b, 'en'))
    .flatMap((name) => parseIndex(readFileSync(join(folder, name), 'utf8')));

  cache.set(key, found);
  return found;
}

export function searchDocs(args: Arguments): string {
  const query = requiredText(args, 'query');
  const tool = text(args, 'tool');
  const base = baseRoot();
  const all = entries(base, projectRoot());
  const scope = tool === '' ? all : all.filter((entry) => entry.id.startsWith(`library/${tool}/`) || entry.id.startsWith(`docs/${tool}/`));
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
  const file = inside(baseRoot(), path);

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
  name: 'docs',
  version: '0.2.0',
  instructions: 'Documentation of the web and of the tools, at the versions of the base. Search with search_docs, then read one section with read_doc. Never guess an API: look it up.',
  tools: [
    {
      name: 'search_docs',
      description: 'Search the documentation: MDN, Angular, TypeScript, NgRx Signals, RxJS, Node.js, npm, Vite, Vitest, Playwright, ESLint and Stylelint rules. Returns 10 section ids at most.',
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
