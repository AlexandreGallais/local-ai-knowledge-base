// Guesses what a project is before the welcome questions: its kind (one of the four profiles, an
// empty project, or not a front-end project), its versions, its package manager, its test runner,
// the copyright header of its files and its file naming. It reads files only; it writes nothing.
// No package; Node 22.18 or later.
//   node /opt/local-ai-base/tools/detect-project.ts [project-folder]
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  basename,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export type Kind = 'angular-app' | 'angular-lib' | 'empty' | 'not-front' | 'ts-lib' | 'ts-pure-lib';

export interface Detection {
  kind: Kind;
  reason: string;
  versions: Record<string, string>;
  packageManager: string;
  testRunner: string;
  copyright?: string;
  fileNaming: string;
  sourceFolder: string;
}

interface Manifest {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  sideEffects?: boolean | string[];
}

const VERSION_PACKAGES = [
  '@angular/core',
  '@ngrx/signals',
  'typescript',
  'rxjs',
  'vitest',
];
const OTHER_STACKS = [
  'Cargo.toml',
  'pom.xml',
  'build.gradle',
  'go.mod',
  'pyproject.toml',
  'CMakeLists.txt',
];
const IGNORED = new Set([
  '.git',
  '.agents',
  '.opencode',
  '.vscode',
  '.devcontainer',
  '.idea',
  'node_modules',
  'AGENTS.md',
  'README.md',
  'LICENSE',
  '.gitignore',
]);
const MAX_FILES = 200;
const COPYRIGHT = /^\/\*\n((?: \*[^\n]*\n)+?) \*\/\n/;

function readJson<T>(path: string): T | undefined {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) as T : undefined;
}

function allDependencies(manifest: Manifest | undefined): Record<string, string> {
  return {
    ...manifest?.devDependencies,
    ...manifest?.peerDependencies,
    ...manifest?.dependencies,
  };
}

// The TypeScript sources of the project, tests left out, at most MAX_FILES.
export function sourceFiles(project: string): string[] {
  const found: string[] = [];
  const walk = (folder: string): void => {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);

      if (found.length >= MAX_FILES || IGNORED.has(entry.name) || entry.name.startsWith('.')) {
        continue;
      }
      if (entry.isDirectory()) {
        walk(path);
      } else if (entry.name.endsWith('.ts') && !/\.(?:spec|test|d)\.ts$/.test(entry.name)) {
        found.push(path);
      }
    }
  };

  walk(project);
  return found.sort();
}

function versionsOf(manifest: Manifest | undefined): Record<string, string> {
  const all = allDependencies(manifest);
  const node = manifest?.engines?.['node'];

  return Object.fromEntries([
    ...VERSION_PACKAGES
      .filter((name) => all[name] !== undefined)
      .map((name) => [
        name,
        all[name] ?? '',
      ]),
    ...node === undefined ? [] : [['node', node]],
  ]);
}

function packageManager(project: string): string {
  if (existsSync(join(project, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (existsSync(join(project, 'yarn.lock'))) {
    return 'yarn';
  }
  return existsSync(join(project, 'package.json')) ? 'npm' : 'none';
}

function testRunner(project: string, manifest: Manifest | undefined): string {
  const all = allDependencies(manifest);
  const angular = existsSync(join(project, 'angular.json')) ? readFileSync(join(project, 'angular.json'), 'utf8') : '';

  if (angular.includes('@angular/build:unit-test')) {
    return 'ng test (vitest)';
  }
  if (angular.includes(':karma') || all['karma'] !== undefined) {
    return 'ng test (karma)';
  }
  if (all['vitest'] !== undefined) {
    return 'vitest';
  }
  return all['jest'] === undefined ? 'none' : 'jest';
}

// The comment block that opens every source file, when it holds "Copyright": its single line.
export function commonCopyright(files: readonly string[]): string | undefined {
  const headers = files.map((path) => COPYRIGHT.exec(readFileSync(path, 'utf8').replaceAll('\r\n', '\n'))?.[1] ?? '');
  const first = headers[0] ?? '';

  if (first === '' || !/copyright/i.test(first) || headers.some((header) => header !== first)) {
    return undefined;
  }
  return first
    .split('\n')
    .map((line) => line.replace(/^ \* ?/, '').trim())
    .filter((line) => line !== '')
    .join(' ');
}

function fileNaming(files: readonly string[]): string {
  const names = files.map((path) => basename(path, '.ts').split('.')[0] ?? '');
  const kebab = names.filter((name) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)).length;

  if (names.length === 0) {
    return 'none yet';
  }
  return kebab === names.length ? 'kebab-case' : `mixed: ${kebab} of ${names.length} in kebab-case`;
}

function angularKind(project: string): Kind {
  const workspace = readJson<{ projects?: Record<string, { projectType?: string }> }>(join(project, 'angular.json'));
  const types = Object
    .values(workspace?.projects ?? {})
    .map((item) => item.projectType);

  return types.includes('application') ? 'angular-app' : 'angular-lib';
}

// A TypeScript library is pure when it declares no side effect and its sources have no class and
// no module-level variable.
function isPureLibrary(manifest: Manifest | undefined, files: readonly string[]): boolean {
  return manifest?.sideEffects === false && files.every((path) => !/^(?:export )?(?:abstract )?class |^(?:export )?let /m.test(readFileSync(path, 'utf8')));
}

function isEmpty(project: string): boolean {
  return readdirSync(project).every((name) => IGNORED.has(name) || name.startsWith('.'));
}

function kindOf(project: string, manifest: Manifest | undefined, files: readonly string[]): {
  kind: Kind;
  reason: string;
} {
  const all = allDependencies(manifest);
  const other = OTHER_STACKS.find((name) => existsSync(join(project, name)));

  if (isEmpty(project)) {
    return {
      kind: 'empty',
      reason: 'no file besides AGENTS.md, .agents/ and hidden files',
    };
  }
  if (all['@angular/core'] !== undefined) {
    return {
      kind: angularKind(project),
      reason: existsSync(join(project, 'angular.json')) ? '@angular/core and angular.json' : '@angular/core without an application in angular.json',
    };
  }
  if (all['typescript'] !== undefined || existsSync(join(project, 'tsconfig.json'))) {
    const pure = isPureLibrary(manifest, files);

    return {
      kind: pure ? 'ts-pure-lib' : 'ts-lib',
      reason: pure ? 'TypeScript, "sideEffects": false, no class and no module variable' : 'TypeScript without Angular',
    };
  }
  return {
    kind: 'not-front',
    reason: other === undefined ? 'no Angular and no TypeScript in this folder' : `${other}: not a front-end project`,
  };
}

export function detectProject(folder: string): Detection {
  const project = resolve(folder);
  const manifest = readJson<Manifest>(join(project, 'package.json'));
  const files = sourceFiles(project);
  const {
    kind,
    reason,
  } = kindOf(project, manifest, files);
  const copyright = commonCopyright(files);

  return {
    kind,
    reason,
    versions: versionsOf(manifest),
    packageManager: packageManager(project),
    testRunner: testRunner(project, manifest),
    ...copyright === undefined ? {} : { copyright },
    fileNaming: fileNaming(files),
    sourceFolder: existsSync(join(project, 'src')) ? 'src' : '.',
  };
}

function main(): void {
  const detection = detectProject(process.argv[2] ?? '.');
  const versions = Object
    .entries(detection.versions)
    .map(([
      name,
      version,
    ]) => `${name} ${version}`);

  console.log([
    `Kind: ${detection.kind} (${detection.reason})`,
    `Versions: ${versions.length === 0 ? 'none' : versions.join(', ')}`,
    `Package manager: ${detection.packageManager}`,
    `Test runner: ${detection.testRunner}`,
    `Copyright header: ${detection.copyright ?? 'none found'}`,
    `File naming: ${detection.fileNaming}`,
    `Source folder: ${detection.sourceFolder}`,
    ...detection.kind === 'not-front' ? ['This base serves Angular and TypeScript front-end projects only. Stop the welcome here.'] : [],
  ].join('\n'));
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
