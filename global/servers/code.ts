// MCP server "code": read TypeScript without opening a whole file, through the compiler of the
// project (its node_modules/typescript): the outline of a file, one symbol, its references, the
// type errors of a file. It never writes a file.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/code.ts
import {
  existsSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import {
  join,
  relative,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  inside,
  projectRoot,
} from './lib/base.ts';
import {
  type Arguments,
  requiredText,
  serve,
  type Server,
  text,
  ToolError,
} from './lib/mcp.ts';

// The part of the TypeScript API this server uses, typed here so that no package is needed.
interface Node {
  kind: number;
  pos: number;
  end: number;
  name?: Node & { text?: string };
  body?: Node;
  members?: Node[];
  declarationList?: { declarations: Node[] };
  getStart: (file?: SourceFile) => number;
  getText: (file?: SourceFile) => string;
}

interface SourceFile extends Node {
  fileName: string;
  statements: Node[];
  text: string;
  getLineAndCharacterOfPosition: (position: number) => {
    line: number;
    character: number;
  };
}

interface Diagnostic {
  file?: SourceFile;
  start?: number;
  code: number;
  messageText: unknown;
}

interface Program {
  getSourceFile(file: string): SourceFile | undefined;
  getSyntacticDiagnostics: (file: SourceFile) => readonly Diagnostic[];
  getSemanticDiagnostics: (file: SourceFile) => readonly Diagnostic[];
}

interface Reference {
  fileName: string;
  textSpan: { start: number };
}

interface LanguageService {
  getProgram(): Program | undefined;
  getNavigateToItems: (search: string, max: number) => {
    name: string;
    fileName: string;
    textSpan: { start: number };
  }[];
  findReferences(file: string, position: number): { references: Reference[] }[] | undefined;
}

interface TypeScript {
  version: string;
  SyntaxKind: Record<string, number>;
  ScriptTarget: { Latest: number };
  sys: unknown;
  createSourceFile: (name: string, content: string, target: number, parents: boolean) => SourceFile;
  findConfigFile(folder: string, exists: (path: string) => boolean): string | undefined;
  getParsedCommandLineOfConfigFile(path: string, options: object, host: unknown): {
    options: object;
    fileNames: string[];
  } | undefined;
  ScriptSnapshot: { fromString: (content: string) => unknown };
  getDefaultLibFilePath: (options: object) => string;
  createLanguageService: (host: object) => LanguageService;
  flattenDiagnosticMessageText: (message: unknown, newLine: string) => string;
  isFunctionLike: (node: Node) => boolean;
  isClassDeclaration: (node: Node) => boolean;
  isInterfaceDeclaration: (node: Node) => boolean;
  isTypeAliasDeclaration: (node: Node) => boolean;
  isEnumDeclaration: (node: Node) => boolean;
  isVariableStatement: (node: Node) => boolean;
}

const MAX_LINES = 30;
const MAX_HEAD = 160;
let compiler: TypeScript | undefined;
let service: LanguageService | undefined;

// The TypeScript of the project; TYPESCRIPT_MODULE in the environment overrides it (tests).
function typescript(): TypeScript {
  if (compiler !== undefined) {
    return compiler;
  }
  const project = projectRoot();
  const fromProject = createRequire(join(project, 'package.json'));
  const path = process.env['TYPESCRIPT_MODULE'];

  try {
    compiler = (path === undefined ? fromProject('typescript') : createRequire(import.meta.url)(path)) as TypeScript;
  } catch {
    throw new ToolError('TypeScript is not installed in this project. Run npm install --save-dev typescript (the user approves it), then call again.');
  }
  return compiler;
}

function sourceFile(args: Arguments): {
  path: string;
  file: SourceFile;
} {
  const name = requiredText(args, 'file');
  const path = inside(projectRoot(), name);

  if (!existsSync(path) || !/\.[cm]?tsx?$/.test(path)) {
    throw new ToolError(`No TypeScript file "${name}" in the project.`);
  }
  const ts = typescript();

  return {
    path,
    file: ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true),
  };
}

function line(file: SourceFile, position: number): number {
  return file.getLineAndCharacterOfPosition(position).line + 1;
}

// The declaration without its body, on one line: "function add(a: number, b: number): number".
function head(node: Node, file: SourceFile): string {
  const start = node.getStart(file);
  const end = node.body === undefined ? node.end : node.body.pos;

  return file.text
    .slice(start, end)
    .replaceAll(/\s+/g, ' ')
    .replace(/[\s={]+$/, '')
    .slice(0, MAX_HEAD);
}

function lines(node: Node, file: SourceFile): string {
  return `lines ${line(file, node.getStart(file))}-${line(file, node.end)}`;
}

function describeNode(ts: TypeScript, node: Node, file: SourceFile): string[] {
  if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
    const members = (node.members ?? []).map((member) => `    ${head(member, file)}   (${lines(member, file)})`);
    const name = node.name?.text ?? '(default)';

    return [
      `${ts.isClassDeclaration(node) ? 'class' : 'interface'} ${name}   (${lines(node, file)})`,
      ...members,
    ];
  }
  if (ts.isFunctionLike(node) || ts.isTypeAliasDeclaration(node) || ts.isEnumDeclaration(node) || ts.isVariableStatement(node)) {
    return [`${head(node, file)}   (${lines(node, file)})`];
  }
  return [];
}

export function outline(args: Arguments): string {
  const ts = typescript();
  const {
    path,
    file,
  } = sourceFile(args);
  const items = file.statements.flatMap((node) => describeNode(ts, node, file));

  return [
    `${relative(projectRoot(), path)}: ${line(file, file.end)} lines`,
    ...items.length === 0 ? ['(no declaration)'] : items,
  ].join('\n');
}

function named(node: Node, name: string): boolean {
  return node.name?.text === name || (node.declarationList?.declarations.some((item) => item.name?.text === name) ?? false);
}

function numbered(file: SourceFile, node: Node): string {
  const first = line(file, node.getStart(file));
  const last = line(file, node.end);

  // Whole lines of the file, indentation kept, so that an edit by line range matches them.
  return file.text
    .split('\n')
    .slice(first - 1, last)
    .map((textLine, position) => `${first + position}: ${textLine}`)
    .join('\n');
}

export function readSymbol(args: Arguments): string {
  const { file } = sourceFile(args);
  const wanted = requiredText(args, 'name');
  const [
    outer = '',
    member,
  ] = wanted.split('.');
  const top = file.statements.find((node) => named(node, outer));

  if (top === undefined) {
    throw new ToolError(`No top-level "${outer}" in this file. Call outline to see its names.`);
  }
  if (member === undefined) {
    return numbered(file, top);
  }
  const found = (top.members ?? []).find((node) => node.name?.text === member);

  if (found === undefined) {
    throw new ToolError(`No member "${member}" in "${outer}". Call outline to see its members.`);
  }
  return numbered(file, found);
}

function languageService(): LanguageService {
  if (service !== undefined) {
    return service;
  }
  const ts = typescript();
  const project = projectRoot();
  const config = ts.findConfigFile(project, existsSync);
  const parsed = config === undefined ? undefined : ts.getParsedCommandLineOfConfigFile(config, {}, {
    ...ts.sys as object,
    onUnRecoverableConfigFileDiagnostic: () => undefined,
  });
  const options = parsed?.options ?? {};
  const fileNames = parsed?.fileNames ?? [];

  service = ts.createLanguageService({
    getCompilationSettings: () => options,
    getScriptFileNames: () => fileNames,
    getScriptVersion: (name: string) => existsSync(name) ? String(statSync(name).mtimeMs) : '0',
    getScriptSnapshot: (name: string) => existsSync(name) ? ts.ScriptSnapshot.fromString(readFileSync(name, 'utf8')) : undefined,
    getCurrentDirectory: () => project,
    getDefaultLibFileName: (settings: object) => ts.getDefaultLibFilePath(settings),
    fileExists: existsSync,
    readFile: (name: string) => existsSync(name) ? readFileSync(name, 'utf8') : undefined,
  });
  return service;
}

function shown(path: string): string {
  return relative(projectRoot(), path)
    .split(sep)
    .join('/');
}

export function findReferences(args: Arguments): string {
  const name = requiredText(args, 'name');
  const ls = languageService();
  const target = ls
    .getNavigateToItems(name, 50)
    .find((item) => item.name === name && !item.fileName.includes('node_modules'));

  if (target === undefined) {
    throw new ToolError(`No declaration named "${name}" in the project.`);
  }
  const program = ls.getProgram();
  const found = (ls.findReferences(target.fileName, target.textSpan.start) ?? []).flatMap((group) => group.references);
  const results = found
    .slice(0, MAX_LINES)
    .map((reference) => {
      const file = program?.getSourceFile(reference.fileName);
      const at = file === undefined ? 0 : line(file, reference.textSpan.start);
      const code = file?.text
        .split('\n')[at - 1]
        ?.trim() ?? '';

      return `${shown(reference.fileName)}:${at}: ${code}`;
    });

  return [
    `"${name}" is declared in ${shown(target.fileName)}; ${found.length} reference(s):`,
    ...results,
    ...found.length > MAX_LINES ? [`(${found.length - MAX_LINES} more)`] : [],
  ].join('\n');
}

export function typeErrors(args: Arguments): string {
  const ts = typescript();
  const path = inside(projectRoot(), requiredText(args, 'file'));
  const program = languageService().getProgram();
  const file = program?.getSourceFile(path);

  if (program === undefined || file === undefined) {
    throw new ToolError(`${text(args, 'file')} is not part of the project's tsconfig.`);
  }
  const diagnostics = [
    ...program.getSyntacticDiagnostics(file),
    ...program.getSemanticDiagnostics(file),
  ];
  const results = diagnostics
    .slice(0, MAX_LINES)
    .map((item) => `${line(file, item.start ?? 0)}: TS${item.code} ${ts.flattenDiagnosticMessageText(item.messageText, ' ')}`);

  return diagnostics.length === 0 ? `${shown(path)}: 0 type errors.` : [
    `${shown(path)}: ${diagnostics.length} type error(s)`,
    ...results,
  ].join('\n');
}

const FILE = {
  type: 'string' as const,
  description: 'Path of a TypeScript file, from the project root, as "src/app/user.ts".',
};

export const server: Server = {
  name: 'code',
  version: '0.2.0',
  instructions: 'Read TypeScript without opening whole files: outline first, then read_symbol for one function or member. find_references before you rename or change a signature.',
  tools: [
    {
      name: 'outline',
      description: 'The declarations of a TypeScript file, one line each, with their signature and lines.',
      properties: { file: FILE },
      required: ['file'],
      run: outline,
    },
    {
      name: 'read_symbol',
      description: 'The code of one declaration, with its line numbers: "name" or "Class.member".',
      properties: {
        file: FILE,
        name: {
          type: 'string',
          description: 'A top-level name, or "Class.member".',
        },
      },
      required: [
        'file',
        'name',
      ],
      run: readSymbol,
    },
    {
      name: 'find_references',
      description: 'Where a name is declared and every place that uses it, one line each, 30 at most.',
      properties: {
        name: {
          type: 'string',
          description: 'The exact name of a function, class, type or variable.',
        },
      },
      required: ['name'],
      run: findReferences,
    },
    {
      name: 'type_errors',
      description: 'The type errors of one file, one line each, 30 at most.',
      properties: { file: FILE },
      required: ['file'],
      run: typeErrors,
    },
  ],
};

// Run the server only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
