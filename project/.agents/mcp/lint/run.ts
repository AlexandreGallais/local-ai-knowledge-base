// Runs the lint pass of a project (decision 0017) through ESLint and Stylelint, with the configs of
// this brick: lint.config.mjs and stylelint-lint.mjs. It fixes nothing and returns one line per
// error left, with the id of its rule. The packages come from .agents/node_modules
// (npm install --prefix .agents), else from the project's own node_modules. No package of its own;
// Node 22.18 or later.
import {
  existsSync,
  readdirSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import {
  dirname,
  extname,
  join,
  relative,
  resolve,
} from 'node:path';
import { pathToFileURL } from 'node:url';

interface LintMessage {
  ruleId: string | null;
  line: number;
  column: number;
  message: string;
}

interface LintResult {
  filePath: string;
  messages: LintMessage[];
}

interface EslintInstance {
  lintFiles: (patterns: string[]) => Promise<LintResult[]>;
}

interface EslintModule {
  ESLint: new (options: object) => EslintInstance;
}

interface StylelintWarning {
  line: number;
  column: number;
  rule: string;
  text: string;
}

interface StylelintModule {
  lint: (options: object) => Promise<{
    results: {
      source?: string;
      warnings: StylelintWarning[];
    }[];
  }>;
}

// The configs are those of the project's own copy of this brick.
function brick(project: string): string {
  return join(project, '.agents', 'mcp', 'lint');
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

export const MAX_LINES = 20;
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

// The project of a file: the nearest folder above it that holds .agents/mcp/lint/.
export function projectOf(path: string): string | undefined {
  let folder = resolve(dirname(path));

  while (!existsSync(join(folder, '.agents', 'mcp', 'lint'))) {
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

async function eslintErrors(project: string, patterns: string[]): Promise<string[]> {
  const { ESLint } = await load<EslintModule>(project, 'eslint');
  const eslint = new ESLint({
    cwd: project,
    overrideConfigFile: join(brick(project), 'lint.config.mjs'),
    errorOnUnmatchedPattern: false,
  });
  const results = await eslint.lintFiles(patterns);

  return results.flatMap((result) => result.messages.map((message) => `${relative(project, result.filePath)}:${message.line}:${message.column} ${message.ruleId ?? 'parse-error'} ${message.message.replaceAll('\n', ' ')}`));
}

async function stylelintErrors(project: string, patterns: string[]): Promise<string[]> {
  const loaded = await load<StylelintModule & { default?: StylelintModule }>(project, 'stylelint');
  const stylelint = loaded.default ?? loaded;
  const result = await stylelint.lint({
    cwd: project,
    files: patterns,
    configFile: join(brick(project), 'stylelint-lint.mjs'),
    configBasedir: brick(project),
    allowEmptyInput: true,
  });

  return result.results.flatMap((item) => item.warnings.map((warning) => `${relative(project, item.source ?? '')}:${warning.line}:${warning.column} ${warning.rule} ${warning.text}`));
}

// The style files to pass to Stylelint: those given, or all those of a project that has some.
function stylesOf(project: string, files: string[] | 'all'): string[] {
  if (files !== 'all') {
    return files.filter((file) => STYLE_FILES.has(extname(file)));
  }
  return hasStyleFiles(project) ? ['**/*.{css,scss}'] : [];
}

// Lints some files of the project, or all of it: one line per error left. Throws MissingPackage
// when a needed package is not installed.
export async function lintFiles(project: string, files: string[] | 'all'): Promise<string[]> {
  const scripts = files === 'all' ? ['.'] : files.filter((file) => SCRIPT_FILES.has(extname(file)));
  const styles = stylesOf(project, files);

  return [
    ...scripts.length === 0 ? [] : await eslintErrors(project, scripts),
    ...styles.length === 0 ? [] : await stylelintErrors(project, styles),
  ];
}

// At most MAX_LINES errors, then their count.
export function report(lines: string[]): string {
  if (lines.length === 0) {
    return '';
  }
  return [
    ...lines.slice(0, MAX_LINES),
    ...lines.length > MAX_LINES ? [`(${lines.length - MAX_LINES} more)`] : [],
    `${lines.length} error(s). Fix them, then lint again.`,
  ].join('\n');
}
