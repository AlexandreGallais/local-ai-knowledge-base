// MCP server "practices": the sheet of a lint rule by its id, and the good practices of the base.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/practices.ts
// A sheet of the base (docs/practices/) comes first: rule, why, wrong, right. Without one, the
// official page of the rule, from library/. It never writes a file.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  basename,
  join,
  relative,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseIndex,
  search,
} from '../tools/search.ts';
import { baseRoot } from './lib/base.ts';
import {
  type Arguments,
  requiredText,
  serve,
  type Server,
  ToolError,
} from './lib/mcp.ts';

// The prefix of a rule id, and the library folders that hold the official pages of its plugin.
const PLUGINS: [string, string[]][] = [
  ['@angular-eslint/template/', ['angular-eslint/eslint-plugin-template']],
  ['@angular-eslint/', ['angular-eslint/eslint-plugin']],
  ['@typescript-eslint/', ['typescript-eslint']],
  ['@stylistic/', ['eslint-stylistic', 'stylelint-stylistic']],
  ['@ngrx/', ['ngrx-signals/eslint-plugin/rules']],
  ['@vitest/', ['eslint-vitest']],
  ['vitest/', ['eslint-vitest']],
  ['perfectionist/', ['perfectionist']],
  ['unicorn/', ['unicorn']],
  ['regexp/', ['eslint-regexp']],
  ['import-lite/', ['import-lite']],
  ['jsdoc/', ['eslint-jsdoc']],
  ['functional/', ['eslint-functional']],
  ['rxjs-x/', ['rxjs-x']],
  ['jsonc/', ['eslint-jsonc']],
  ['order/', ['stylelint-order']],
];
const CORE = [
  'eslint/rules',
  'stylelint/lib/rules',
];
const OFFICIAL_MAX = 8000;

// "@typescript-eslint/no-floating-promises" gives "typescript-eslint--no-floating-promises".
export function sheetName(rule: string): string {
  return rule
    .replace(/^@/, '')
    .replaceAll('/', '--');
}

function markdownFiles(folder: string): string[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);

    if (entry.isDirectory()) {
      return markdownFiles(path);
    }
    return entry.name.endsWith('.md') ? [path] : [];
  });
}

export function officialPage(base: string, rule: string): string | undefined {
  const plugin = PLUGINS.find(([prefix]) => rule.startsWith(prefix));
  const name = plugin === undefined ? rule : rule.slice(plugin[0].length);
  const folders = plugin === undefined ? (rule.includes('/') ? [] : CORE) : plugin[1];

  for (const folder of folders) {
    const found = markdownFiles(join(base, 'library', folder)).find((path) => basename(path) === `${name}.md`);

    if (found !== undefined) {
      return relative(base, found)
        .split(sep)
        .join('/');
    }
  }
  return undefined;
}

export function ruleSheet(args: Arguments): string {
  const rule = requiredText(args, 'rule');
  const base = baseRoot();
  const sheet = join(base, 'docs', 'practices', `${sheetName(rule)}.md`);
  const official = officialPage(base, rule);

  if (existsSync(sheet)) {
    const body = readFileSync(sheet, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');

    return official === undefined ? body.trim() : `${body.trim()}\n\nOfficial page: ${official} (read it with the docs tools).`;
  }
  if (official === undefined) {
    throw new ToolError(`No sheet and no official page for the rule "${rule}". Give the id exactly as the lint prints it.`);
  }
  const text = readFileSync(join(base, official), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
  const more = existsSync(join(base, official.replace(/\.md$/, '-p2.md'))) ? '\n\nThe page goes on in the next part of the same name with "-p2".' : '';

  return `${text.trim().slice(0, OFFICIAL_MAX)}${more}`;
}

export function searchPractices(args: Arguments): string {
  const query = requiredText(args, 'query');
  const folder = join(baseRoot(), 'index');
  const entries = [
    'docs-practices.idx',
    'docs-typescript-lint.idx',
  ]
    .filter((name) => existsSync(join(folder, name)))
    .flatMap((name) => parseIndex(readFileSync(join(folder, name), 'utf8')));
  const hits = search(entries, query);

  if (hits.length === 0) {
    return `No practice matches "${query}". For a lint error, call rule with its id.`;
  }
  return [
    ...hits.map((hit) => `${hit.id} | ${hit.title}`),
    'Read one with the read_doc tool of the docs server.',
  ].join('\n');
}

export const server: Server = {
  name: 'practices',
  version: '0.2.0',
  instructions: 'Rules and good practices of the base. For a lint error, call rule with the id the lint prints. To learn how to write something, call search_practices.',
  tools: [
    {
      name: 'rule',
      description: 'The sheet of one lint rule: what it asks, why, a wrong and a right example. Without a sheet, the official page of the rule.',
      properties: {
        rule: {
          type: 'string',
          description: 'The rule id as the lint prints it, as "@typescript-eslint/no-floating-promises".',
        },
      },
      required: ['rule'],
      run: ruleSheet,
    },
    {
      name: 'search_practices',
      description: 'Search the practices and lint documents of the base. Returns 10 ids at most.',
      properties: {
        query: {
          type: 'string',
          description: 'English words, as "unsubscribe observable component".',
        },
      },
      required: ['query'],
      run: searchPractices,
    },
  ],
};

// Run the server only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
