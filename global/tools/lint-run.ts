// Runs the two passes of a project (decision 0017) through the ESLint and Stylelint of its
// node_modules, with the configs of .agents/lint/. Used by format-file.ts, lint-file.ts and the
// OpenCode plugin of the base. No package of its own; Node 22.18 or later.
import {
  existsSync,
  readdirSync,
  realpathSync,
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

export type Pass = 'format' | 'lint';

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
  loadFormatter: (name: string) => Promise<{ format: (results: LintResult[]) => Promise<string> | string }>;
}

interface EslintModule {
  ESLint: (new (options: object) => EslintInstance) & { outputFixes: (results: LintResult[]) => Promise<void> };
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

const ESLINT_FILES = new Set([
  '.ts',
  '.mts',
  '.html',
  '.json',
]);
const STYLE_FILES = new Set([
  '.css',
  '.scss',
]);
const MAX_LINES = 20;

// The project of a file: the nearest folder above it that holds .agents/lint/.
export function projectOf(path: string): string | undefined {
  let folder = resolve(dirname(path));

  while (!existsSync(join(folder, '.agents', 'lint'))) {
    const parent = dirname(folder);

    if (parent === folder) {
      return undefined;
    }
    folder = parent;
  }
  return folder;
}

async function load<T>(project: string, name: string): Promise<T> {
  const fromProject = createRequire(join(project, 'package.json'));

  return await import(pathToFileURL(fromProject.resolve(name)).href) as T;
}

async function eslintPass(project: string, pass: Pass, patterns: string[]): Promise<string[]> {
  const { ESLint } = await load<EslintModule>(project, 'eslint');
  const eslint = new ESLint({
    cwd: project,
    overrideConfigFile: join(project, '.agents', 'lint', `${pass}.config.mjs`),
    fix: pass === 'format',
    errorOnUnmatchedPattern: false,
  });
  const results = await eslint.lintFiles(patterns);

  if (pass === 'format') {
    await ESLint.outputFixes(results);
    return [];
  }
  return results.flatMap((result) => result.messages.map((message) => `${relative(project, result.filePath)}:${message.line}:${message.column} ${message.ruleId ?? 'parse-error'} ${message.message.replaceAll('\n', ' ')}`));
}

async function stylelintPass(project: string, pass: Pass, patterns: string[]): Promise<string[]> {
  const loaded = await load<StylelintModule & { default?: StylelintModule }>(project, 'stylelint');
  const stylelint = loaded.default ?? loaded;
  const result = await stylelint.lint({
    cwd: project,
    files: patterns,
    configFile: join(project, '.agents', 'lint', `stylelint-${pass}.mjs`),
    configBasedir: join(project, '.agents', 'lint'),
    fix: pass === 'format',
    allowEmptyInput: true,
  });

  return pass === 'format' ? [] : result.results.flatMap((item) => item.warnings.map((warning) => `${relative(project, item.source ?? '')}:${warning.line}:${warning.column} ${warning.rule} ${warning.text}`));
}

const SKIPPED_FOLDERS = new Set([
  'node_modules',
  '.git',
  '.agents',
  '.angular',
  'dist',
  'coverage',
  'storybook-static',
]);

// Whether the project holds a CSS or SCSS file of its own: a project without styles needs no Stylelint.
export function hasStyleFiles(folder: string): boolean {
  return readdirSync(folder, { withFileTypes: true }).some((entry) => {
    if (entry.isDirectory()) {
      return !SKIPPED_FOLDERS.has(entry.name) && hasStyleFiles(join(folder, entry.name));
    }
    return STYLE_FILES.has(extname(entry.name));
  });
}

// A package of the profile is not installed: one clear line, never a stack trace.
async function orMissing(name: string, pass: () => Promise<string[]>): Promise<string[]> {
  try {
    return await pass();
  } catch (error) {
    if ((error as { code?: string }).code !== 'MODULE_NOT_FOUND') {
      throw error;
    }
    return [`${name} is not installed in this project. Run node /opt/local-ai-base/tools/missing-packages.ts, then ask the user to run the install command it gives.`];
  }
}

// Runs one pass on some files of the project, or on all of it. Returns one line per error left.
export async function runPass(project: string, pass: Pass, files: string[] | 'all'): Promise<string[]> {
  const scripts = files === 'all' ? ['.'] : files.filter((file) => ESLINT_FILES.has(extname(file)));
  const allStyles = hasStyleFiles(project) ? ['**/*.{css,scss}'] : [];
  const styles = files === 'all' ? allStyles : files.filter((file) => STYLE_FILES.has(extname(file)));

  return [
    ...scripts.length === 0 ? [] : await orMissing('eslint', async () => await eslintPass(project, pass, scripts)),
    ...styles.length === 0 ? [] : await orMissing('stylelint', async () => await stylelintPass(project, pass, styles)),
  ];
}

export function report(lines: string[]): string {
  if (lines.length === 0) {
    return '';
  }
  return [
    ...lines.slice(0, MAX_LINES),
    ...lines.length > MAX_LINES ? [`(${lines.length - MAX_LINES} more)`] : [],
    `${lines.length} error(s). For a rule you do not know, call the rule tool of the practices server with its id.`,
  ].join('\n');
}

// The command line of format-file.ts and lint-file.ts: one file, or --all for the project.
export async function command(pass: Pass, argument: string | undefined): Promise<number> {
  if (argument === undefined) {
    console.log(`Usage: node ${pass}-file.ts <file> | --all`);
    return 2;
  }
  const project = argument === '--all' ? projectOf(join(resolve('.'), 'x')) : projectOf(argument);

  if (project === undefined) {
    // Not a project of the base: nothing to do, and never an error for the formatter.
    return pass === 'format' ? 0 : 2;
  }
  const lines = await runPass(realpathSync(project), pass, argument === '--all' ? 'all' : [realpathSync(resolve(argument))]);
  const text = report(lines);

  if (text !== '') {
    console.log(text);
  }
  return lines.length === 0 ? 0 : 1;
}
