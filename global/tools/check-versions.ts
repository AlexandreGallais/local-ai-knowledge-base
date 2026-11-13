// Lists the documents of the global base, and the tools of its documentation library, whose major
// version is behind the version a project uses. Versions come from the project's package.json.
// Run from the project root, with Node 22.18 or later, no package:
//   node /opt/local-ai-base/tools/check-versions.ts [project-folder] [base-folder]
// Exit code: 0 nothing behind, 1 something behind.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  dirname,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Behind {
  document: string;
  tool: string;
  documentVersion: number;
  projectVersion: number;
}

// The tool names of the documents and of the library, and the npm package that gives the version.
const PACKAGES: Record<string, string> = {
  'angular': '@angular/core',
  'angular-eslint': 'angular-eslint',
  'eslint': 'eslint',
  'eslint-functional': 'eslint-plugin-functional',
  'eslint-jsdoc': 'eslint-plugin-jsdoc',
  'eslint-jsonc': 'eslint-plugin-jsonc',
  'eslint-regexp': 'eslint-plugin-regexp',
  'eslint-stylistic': '@stylistic/eslint-plugin',
  'eslint-vitest': '@vitest/eslint-plugin',
  'import-lite': 'eslint-plugin-import-lite',
  'ngrx-signals': '@ngrx/signals',
  'perfectionist': 'eslint-plugin-perfectionist',
  'playwright': '@playwright/test',
  'rxjs': 'rxjs',
  'rxjs-x': 'eslint-plugin-rxjs-x',
  'stylelint': 'stylelint',
  'stylelint-order': 'stylelint-order',
  'stylelint-stylistic': '@stylistic/stylelint-plugin',
  'typescript': 'typescript',
  'typescript-eslint': 'typescript-eslint',
  'unicorn': 'eslint-plugin-unicorn',
  'vite': 'vite',
  'vitest': 'vitest',
};
const ALIASES: Record<string, string> = {
  'node.js': 'node',
  'nodejs': 'node',
  'ngrx': 'ngrx-signals',
};

export function major(version: string | undefined): number | undefined {
  const found = /(\d+)/.exec(version ?? '');

  return found === null ? undefined : Number(found[1]);
}

function readJson(path: string): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(readFileSync(path, 'utf8'));

    return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

// The major version of each known tool that the project declares.
export function projectVersions(project: string): Map<string, number> {
  const manifest = readJson(join(project, 'package.json'));
  const declared: Record<string, string> = {};
  const versions = new Map<string, number>();

  for (const key of [
    'devDependencies',
    'peerDependencies',
    'dependencies',
  ]) {
    Object.assign(declared, manifest[key] ?? {});
  }
  for (const [
    tool,
    name,
  ] of Object.entries(PACKAGES)) {
    const value = major(declared[name]);

    if (value !== undefined) {
      versions.set(tool, value);
    }
  }
  const engines = manifest['engines'] as Record<string, string> | undefined;
  const node = major(engines?.['node'] ?? declared['@types/node']);

  if (node !== undefined) {
    versions.set('node', node);
  }
  return versions;
}

function toolKey(name: string): string {
  const lower = name
    .trim()
    .toLowerCase();

  return ALIASES[lower] ?? lower;
}

function headerFields(text: string): Map<string, string> {
  const block = /^---\n([\s\S]*?)\n---/.exec(text.replaceAll('\r\n', '\n'))?.[1] ?? '';

  return new Map([...block.matchAll(/^(\w+):\s*(.*)$/gm)].map((match) => [
    match[1] ?? '',
    (match[2] ?? '').replaceAll(/^["']|["']$/g, ''),
  ]));
}

// "tool: typescript-eslint, TypeScript" with "version: 8.72, 6.0" gives two pairs.
export function documentTools(text: string): [string, number][] {
  const fields = headerFields(text);
  const tools = (fields.get('tool') ?? '').split(',');
  const versions = (fields.get('version') ?? '').split(',');

  return tools
    .map((tool, position): [string, number | undefined] => [
      toolKey(tool),
      major(versions[position] ?? versions[0]),
    ])
    .filter((pair): pair is [string, number] => pair[0] !== '' && pair[1] !== undefined);
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

function behindOf(document: string, tool: string, documentVersion: number, versions: Map<string, number>): Behind[] {
  const projectVersion = versions.get(tool);

  return projectVersion !== undefined && projectVersion > documentVersion ? [
    {
      document,
      tool,
      documentVersion,
      projectVersion,
    },
  ] : [];
}

function libraryBehind(base: string, versions: Map<string, number>): Behind[] {
  const sources = readJson(join(base, 'library', 'sources.json'))['sources'];

  return (Array.isArray(sources) ? sources as {
    tool?: string;
    version?: string;
  }[] : []).flatMap((source) => {
    const version = major(source.version);
    const built = existsSync(join(base, 'library', source.tool ?? '', 'index.md'));

    return built && version !== undefined ? behindOf(`library/${source.tool ?? ''}/`, toolKey(source.tool ?? ''), version, versions) : [];
  });
}

export function checkVersions(base: string, project: string): Behind[] {
  const versions = projectVersions(project);
  const documents = markdownFiles(join(base, 'docs')).flatMap((path) => {
    const name = relative(base, path)
      .split(sep)
      .join('/');

    return documentTools(readFileSync(path, 'utf8')).flatMap(([
      tool,
      version,
    ]) => behindOf(name, tool, version, versions));
  });

  return [
    ...documents,
    ...libraryBehind(base, versions),
  ];
}

function main(): void {
  const project = resolve(process.argv[2] ?? '.');
  const base = resolve(process.argv[3] ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
  const behind = checkVersions(base, project);

  for (const item of behind) {
    console.log(`${item.document}: ${item.tool} ${item.documentVersion} in the base, ${item.projectVersion} in the project`);
  }
  console.log(behind.length === 0 ? 'No document of the base is behind this project.' : `${behind.length} document(s) behind this project: trust package.json and the installed packages for these tools.`);
  process.exitCode = behind.length === 0 ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
