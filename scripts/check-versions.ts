// Lists the documents of the base whose tool version is behind the version a project uses, and the
// tools of the official documentation library (library/) that are behind it.
// Run with Node 22.18 or later, no build step, no package:
//   node scripts/check-versions.ts <project-folder> [base-folder]
// The project versions come from package.json (npm), and from *.csproj, global.json and
// Directory.Packages.props (.NET). A document is behind when its major version is lower than the
// project's. Exit code: 0 nothing behind, 1 documents behind, 2 usage error.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  relative,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Behind {
  document: string;
  tool: string;
  documentVersion: number;
  projectVersion: number;
}

// The name of a tool in a document header, lowercased, and where its version comes from.
const NPM_TOOLS: Record<string, string> = {
  'angular': '@angular/core',
  'angular-eslint': 'angular-eslint',
  'eslint': 'eslint',
  'prettier': 'prettier',
  'rxjs': 'rxjs',
  'typescript': 'typescript',
  'typescript-eslint': 'typescript-eslint',
};
const NODE_NAMES = new Set([
  'node',
  'node.js',
  'nodejs',
]);
const DOTNET_NAMES = new Set([
  'dotnet',
  '.net',
  'asp.net core',
  'aspnetcore',
]);
const CSHARP_NAMES = new Set([
  'c#',
  'csharp',
]);
const EF_NAMES = new Set([
  'ef core',
  'efcore',
  'entity framework core',
]);
// C# version of each .NET target framework: the language a project may use.
const CSHARP_OF_DOTNET: Record<number, number> = {
  6: 10,
  7: 11,
  8: 12,
  9: 13,
  10: 14,
  11: 15,
  12: 16,
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

function dependencies(manifest: Record<string, unknown>): Record<string, string> {
  const merged: Record<string, string> = {};

  for (const key of [
    'devDependencies',
    'peerDependencies',
    'dependencies',
  ]) {
    const value = manifest[key];

    if (typeof value === 'object' && value !== null) {
      Object.assign(merged, value);
    }
  }
  return merged;
}

function files(folder: string, pattern: RegExp, depth = 3): string[] {
  if (depth < 0 || !existsSync(folder)) {
    return [];
  }
  return readdirSync(folder)
    .filter((entry) => ![
      'node_modules',
      'bin',
      'obj',
      '.git',
    ].includes(entry))
    .flatMap((entry) => {
      const path = join(folder, entry);

      if (statSync(path).isDirectory()) {
        return files(path, pattern, depth - 1);
      }
      return pattern.test(entry) ? [path] : [];
    });
}

function npmVersions(project: string, versions: Map<string, number>): void {
  const manifestPath = join(project, 'package.json');

  if (!existsSync(manifestPath)) {
    return;
  }
  const manifest = readJson(manifestPath);
  const declared = dependencies(manifest);
  const engines = manifest['engines'];

  for (const [
    tool,
    name,
  ] of Object.entries(NPM_TOOLS)) {
    const value = major(declared[name]);

    if (value !== undefined) {
      versions.set(tool, value);
    }
  }
  const node = major(typeof engines === 'object' && engines !== null ? (engines as Record<string, string>)['node'] : declared['@types/node']);

  if (node !== undefined) {
    versions.set('node', node);
  }
}

function dotnetVersions(project: string, versions: Map<string, number>): void {
  const frameworks = files(project, /\.csproj$/)
    .flatMap((path) => [...readFileSync(path, 'utf8').matchAll(/<TargetFrameworks?>([^<]+)<\/TargetFrameworks?>/g)])
    .flatMap((match) => match[1].split(';'))
    .map((framework) => /^net(\d+)\.\d+/.exec(framework.trim())?.[1])
    .filter((value) => value !== undefined)
    .map(Number);
  const sdkField = readJson(join(project, 'global.json'))['sdk'];
  const sdk = major(typeof sdkField === 'object' && sdkField !== null ? String((sdkField as Record<string, unknown>)['version']) : undefined);
  const dotnet = frameworks.length > 0 ? Math.max(...frameworks) : sdk;
  const packages = existsSync(join(project, 'Directory.Packages.props')) ? readFileSync(join(project, 'Directory.Packages.props'), 'utf8') : files(project, /\.csproj$/)
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n');
  const efCore = major(/Include="Microsoft\.EntityFrameworkCore[^"]*"\s+Version="([^"]+)"/.exec(packages)?.[1]);

  if (dotnet !== undefined) {
    versions.set('dotnet', dotnet);
    versions.set('csharp', CSHARP_OF_DOTNET[dotnet] ?? dotnet + 4);
  }
  if (efCore !== undefined) {
    versions.set('efcore', efCore);
  }
}

export function projectVersions(project: string): Map<string, number> {
  const versions = new Map<string, number>();

  npmVersions(project, versions);
  dotnetVersions(project, versions);
  return versions;
}

function toolKey(name: string): string {
  const lower = name
    .trim()
    .toLowerCase();

  if (NODE_NAMES.has(lower)) {
    return 'node';
  }
  if (DOTNET_NAMES.has(lower)) {
    return 'dotnet';
  }
  if (CSHARP_NAMES.has(lower)) {
    return 'csharp';
  }
  return EF_NAMES.has(lower) ? 'efcore' : lower;
}

function header(text: string): Map<string, string> {
  const block = /^---\n([\s\S]*?)\n---/.exec(text.replaceAll('\r\n', '\n'))?.[1] ?? '';

  return new Map([...block.matchAll(/^(\w+):\s*(.*)$/gm)].map((match) => [
    match[1],
    match[2].replaceAll(/^["']|["']$/g, ''),
  ]));
}

// The tools of a document and their major versions: "typescript-eslint, TypeScript" with
// version "8.72, 6.0" gives two pairs.
export function documentTools(text: string): [string, number][] {
  const fields = header(text);
  const tools = (fields.get('tool') ?? '').split(',');
  const versions = (fields.get('version') ?? '').split(',');

  return tools
    .map((tool, index): [string, number | undefined] => [
      toolKey(tool),
      major(versions[index] ?? versions[0]),
    ])
    .filter((pair): pair is [string, number] => pair[0] !== '' && pair[1] !== undefined);
}

// The library tools named after a project tool: the .NET docs follow the .NET version.
const LIBRARY_TOOLS: Record<string, string> = {
  'dotnet-csharp': 'dotnet',
  'dotnet-core': 'dotnet',
  'dotnet-standard': 'dotnet',
  'aspnetcore': 'dotnet',
};

// The tools of library/ behind the project, one line per tool: library/sources.json gives the
// version of each. The library sits next to the base in a project, above code/ in this repository.
export function libraryBehind(base: string, versions: Map<string, number>): Behind[] {
  const folder = [
    join(base, 'library'),
    join(base, '..', 'library'),
  ].find((path) => existsSync(join(path, 'sources.json')));

  if (folder === undefined) {
    return [];
  }
  const parsed = readJson(join(folder, 'sources.json'))['sources'];
  const sources = Array.isArray(parsed) ? parsed as {
    tool?: string;
    version?: string;
  }[] : [];

  return sources.flatMap((source) => {
    const tool = toolKey(LIBRARY_TOOLS[source.tool ?? ''] ?? source.tool ?? '');
    const documentVersion = major(source.version);
    const projectVersion = versions.get(tool);
    const built = existsSync(join(folder, source.tool ?? '', 'index.md'));

    return built && documentVersion !== undefined && projectVersion !== undefined && projectVersion > documentVersion ? [
      {
        document: `library/${source.tool ?? ''}/`,
        tool,
        documentVersion,
        projectVersion,
      },
    ] : [];
  });
}

export function checkVersions(base: string, project: string): Behind[] {
  const versions = projectVersions(project);
  const documents = [
    ...files(join(base, 'docs'), /\.md$/, 4),
    ...files(join(base, '.agents', 'skills'), /\.md$/, 4),
  ].filter((path) => !path.endsWith('.fr.md') && basename(path) !== 'template.md');

  return [
    ...documents.flatMap((path) => documentTools(readFileSync(path, 'utf8')).flatMap(([
      tool,
      documentVersion,
    ]) => {
      const projectVersion = versions.get(tool);

      return projectVersion !== undefined && projectVersion > documentVersion ? [
        {
          document: relative(base, path)
            .split('\\')
            .join('/'),
          tool,
          documentVersion,
          projectVersion,
        },
      ] : [];
    })),
    ...libraryBehind(base, versions),
  ];
}

function defaultBase(): string {
  const scripts = dirname(fileURLToPath(import.meta.url));

  return existsSync(join(scripts, '..', 'code', 'AGENTS.md')) ? resolve(scripts, '..', 'code') : resolve(scripts, '..');
}

function main(): void {
  const project = process.argv[2];

  if (project === undefined) {
    console.log('Usage: node scripts/check-versions.ts <project-folder> [base-folder]');
    process.exitCode = 2;
    return;
  }
  const behind = checkVersions(resolve(process.argv[3] ?? defaultBase()), resolve(project));

  for (const item of behind) {
    console.log(`${item.document}: ${item.tool} ${item.documentVersion} in the document, ${item.projectVersion} in the project`);
  }
  console.log(behind.length === 0 ? 'Versions check passed: no document is behind the project.' : `Versions check: ${behind.length} document(s) behind the project. Update them with docs/maintenance/update-a-tool.md.`);
  process.exitCode = behind.length === 0 ? 0 : 1;
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
