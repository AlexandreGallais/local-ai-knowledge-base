// Lists the tools of this brick's documentation (library/) whose major version is behind the version
// a project uses. Versions come from the project's package.json.
// Run from the project root, with Node 22.18 or later, no package:
//   node .agents/mcp/js-official-docs/check-versions.ts [project-folder] [brick-folder]
// Exit code: 0 nothing behind, 1 something behind.
import {
  existsSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
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
  'angular-api': '@angular/core',
  'angular-cli': '@angular/cli',
  'angular-eslint': 'angular-eslint',
  'eslint': 'eslint',
  'eslint-config-prettier': 'eslint-config-prettier',
  'eslint-headers': 'eslint-plugin-headers',
  'eslint-jsdoc': 'eslint-plugin-jsdoc',
  'eslint-regexp': 'eslint-plugin-regexp',
  'eslint-stylistic': '@stylistic/eslint-plugin',
  'eslint-vitest': '@vitest/eslint-plugin',
  'import-x': 'eslint-plugin-import-x',
  'ngrx-signals': '@ngrx/signals',
  'ngrx-signals-api': '@ngrx/signals',
  'perfectionist': 'eslint-plugin-perfectionist',
  'playwright': '@playwright/test',
  'prettier': 'prettier',
  'rxjs': 'rxjs',
  'rxjs-api': 'rxjs',
  'rxjs-x': 'eslint-plugin-rxjs-x',
  'sass': 'sass',
  'storybook': 'storybook',
  'stylelint': 'stylelint',
  'stylelint-order': 'stylelint-order',
  'stylelint-recess-order': 'stylelint-config-recess-order',
  'tsconfig': 'typescript',
  'typescript': 'typescript',
  'typescript-eslint': 'typescript-eslint',
  'typescript-eslint-guides': 'typescript-eslint',
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

// The tools of library/ whose major version is behind the project's.
export function checkVersions(brick: string, project: string): Behind[] {
  const versions = projectVersions(project);
  const sources = readJson(join(brick, 'library', 'sources.json'))['sources'];

  return (Array.isArray(sources) ? sources as {
    tool?: string;
    version?: string;
  }[] : []).flatMap((source) => {
    const version = major(source.version);
    const built = existsSync(join(brick, 'library', `${source.tool ?? ''}.index.md`));

    return built && version !== undefined ? behindOf(`library/${source.tool ?? ''}/`, toolKey(source.tool ?? ''), version, versions) : [];
  });
}

function main(): void {
  const project = resolve(process.argv[2] ?? '.');
  const brick = resolve(process.argv[3] ?? dirname(fileURLToPath(import.meta.url)));
  const behind = checkVersions(brick, project);

  for (const item of behind) {
    process.stdout.write(`${item.document}: ${item.tool} ${item.documentVersion} in the documentation, ${item.projectVersion} in the project\n`);
  }
  process.stdout.write(behind.length === 0 ? 'No documentation of this brick is behind this project.\n' : `${behind.length} tool(s) behind this project: trust package.json and the installed packages for these tools.\n`);
  process.exitCode = behind.length === 0 ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
