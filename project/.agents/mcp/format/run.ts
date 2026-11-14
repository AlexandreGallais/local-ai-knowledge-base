// Runs the format pass of a project (decision 0017) through ESLint and Stylelint, with the configs of
// this brick: format.config.mjs and stylelint-format.mjs. It fixes all it can and says nothing.
// The packages come from .agents/node_modules (npm install --prefix .agents), else from the
// project's own node_modules. No package of its own; Node 22.18 or later.
import {
  existsSync,
  readdirSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import {
  dirname,
  extname,
  join,
  resolve,
} from 'node:path';
import { pathToFileURL } from 'node:url';

interface LintResult {
  filePath: string;
  output?: string;
}

interface EslintInstance {
  lintFiles: (patterns: string[]) => Promise<LintResult[]>;
}

interface EslintModule {
  ESLint: (new (options: object) => EslintInstance) & { outputFixes: (results: LintResult[]) => Promise<void> };
}

interface StylelintModule {
  lint: (options: object) => Promise<unknown>;
}

// The configs are those of the project's own copy of this brick.
function brick(project: string): string {
  return join(project, '.agents', 'mcp', 'format');
}

export const SCRIPT_FILES = new Set([
  '.ts',
  '.mts',
  '.html',
  '.json',
]);

export const STYLE_FILES = new Set([
  '.css',
  '.scss',
]);

const SKIPPED_FOLDERS = new Set([
  'node_modules',
  '.git',
  '.agents',
  '.angular',
  'dist',
  'coverage',
  'storybook-static',
]);

export class MissingPackage extends Error {}

// The project of a file: the nearest folder above it that holds .agents/mcp/format/.
export function projectOf(path: string): string | undefined {
  let folder = resolve(dirname(path));

  while (!existsSync(join(folder, '.agents', 'mcp', 'format'))) {
    const parent = dirname(folder);

    if (parent === folder) {
      return undefined;
    }
    folder = parent;
  }
  return folder;
}

// A package of .agents/node_modules first, then of the project.
async function load<T>(project: string, name: string): Promise<T> {
  for (const manifest of [
    join(project, '.agents', 'package.json'),
    join(project, 'package.json'),
  ]) {
    try {
      return await import(pathToFileURL(createRequire(manifest).resolve(name)).href) as T;
    } catch (error) {
      if ((error as { code?: string }).code !== 'MODULE_NOT_FOUND') {
        throw error;
      }
    }
  }
  throw new MissingPackage(`${name} is not installed: run npm install --prefix .agents (the user approves it).`);
}

// Whether the project holds a CSS or SCSS file of its own: a project without styles needs no Stylelint.
export function hasStyleFiles(folder: string): boolean {
  return readdirSync(folder, { withFileTypes: true }).some((entry) => {
    if (entry.isDirectory()) {
      return !SKIPPED_FOLDERS.has(entry.name) && hasStyleFiles(join(folder, entry.name));
    }
    return STYLE_FILES.has(extname(entry.name));
  });
}

async function eslintFix(project: string, patterns: string[]): Promise<void> {
  const { ESLint } = await load<EslintModule>(project, 'eslint');
  const eslint = new ESLint({
    cwd: project,
    overrideConfigFile: join(brick(project), 'format.config.mjs'),
    fix: true,
    errorOnUnmatchedPattern: false,
  });

  await ESLint.outputFixes(await eslint.lintFiles(patterns));
}

async function stylelintFix(project: string, patterns: string[]): Promise<void> {
  const loaded = await load<StylelintModule & { default?: StylelintModule }>(project, 'stylelint');
  const stylelint = loaded.default ?? loaded;

  await stylelint.lint({
    cwd: project,
    files: patterns,
    configFile: join(brick(project), 'stylelint-format.mjs'),
    configBasedir: brick(project),
    fix: true,
    allowEmptyInput: true,
  });
}

// The style files to pass to Stylelint: those given, or all those of a project that has some.
function stylesOf(project: string, files: string[] | 'all'): string[] {
  if (files !== 'all') {
    return files.filter((file) => STYLE_FILES.has(extname(file)));
  }
  return hasStyleFiles(project) ? ['**/*.{css,scss}'] : [];
}

// Formats some files of the project, or all of it. Throws MissingPackage when a needed package is
// not installed.
export async function formatFiles(project: string, files: string[] | 'all'): Promise<void> {
  const scripts = files === 'all' ? ['.'] : files.filter((file) => SCRIPT_FILES.has(extname(file)));
  const styles = stylesOf(project, files);

  if (scripts.length > 0) {
    await eslintFix(project, scripts);
  }
  if (styles.length > 0) {
    await stylelintFix(project, styles);
  }
}
