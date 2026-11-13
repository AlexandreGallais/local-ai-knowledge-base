import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  checkVersions,
  documentTools,
  projectVersions,
} from './check-versions.ts';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'check-versions.ts');

function document(tool: string, version: string): string {
  return `---\nid: test\ntool: ${tool}\nversion: "${version}"\n---\n\n# Test\n`;
}

function writeTree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'versions-'));

  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

function testBase(): string {
  return writeTree({
    'docs/angular/old-to-new.md': document('angular', '22'),
    'docs/angular/v22-changes.md': document('angular', '22'),
    'docs/angular/README.fr.md': document('angular', '1'),
    'docs/typescript/ts-6.md': document('typescript', '6.0'),
    'docs/typescript-lint/ts-types.md': document('typescript-eslint, TypeScript', '8.72, 6.0'),
    'docs/dotnet/csharp-changes.md': document('C#', '15'),
    'docs/dotnet/dotnet-changes.md': document('dotnet', '11'),
  });
}

function npmProject(angular: string, typescript = '~6.0.3'): string {
  return writeTree({
    'package.json': JSON.stringify({
      dependencies: { '@angular/core': angular },
      devDependencies: {
        'typescript': typescript,
        'typescript-eslint': '8.72.2',
      },
    }),
  });
}

describe('versions of a project', () => {
  it('reads the major versions of package.json', () => {
    const versions = projectVersions(npmProject('^22.2.0'));

    assert.equal(versions.get('angular'), 22);
    assert.equal(versions.get('typescript'), 6);
    assert.equal(versions.get('typescript-eslint'), 8);
  });
  it('reads the tools of a document header, one version per tool', () => {
    assert.deepEqual(documentTools(document('typescript-eslint, TypeScript', '8.72, 6.0')), [
      ['typescript-eslint', 8],
      ['typescript', 6],
    ]);
  });
});
describe('versions of a .NET project', () => {
  it('reads the target framework, the C# version it allows, and EF Core from Directory.Packages.props', () => {
    const project = writeTree({
      'src/Api/Api.csproj': '<Project Sdk="Microsoft.NET.Sdk.Web"><PropertyGroup><TargetFramework>net8.0</TargetFramework></PropertyGroup></Project>',
      'Directory.Packages.props': '<Project><ItemGroup><PackageVersion Include="Microsoft.EntityFrameworkCore" Version="9.0.4" /></ItemGroup></Project>',
    });
    const versions = projectVersions(project);

    assert.equal(versions.get('dotnet'), 8);
    assert.equal(versions.get('csharp'), 12);
    assert.equal(versions.get('efcore'), 9);
  });
  it('reads the SDK of global.json when no project file is there', () => {
    const project = writeTree({ 'global.json': JSON.stringify({ sdk: { version: '11.0.100' } }) });

    assert.equal(projectVersions(project).get('dotnet'), 11);
  });
  it('lists the .NET documents, and only them, for a project in net12.0', () => {
    const project = writeTree({ 'App.csproj': '<Project><PropertyGroup><TargetFramework>net12.0</TargetFramework></PropertyGroup></Project>' });
    const behind = checkVersions(testBase(), project);

    assert.deepEqual(
      behind
        .map((item) => item.document)
        .toSorted(),
      [
        'docs/dotnet/csharp-changes.md',
        'docs/dotnet/dotnet-changes.md',
      ],
    );
  });
  it('lists nothing for a project in net11.0', () => {
    const project = writeTree({ 'App.csproj': '<Project><PropertyGroup><TargetFramework>net11.0</TargetFramework></PropertyGroup></Project>' });

    assert.deepEqual(checkVersions(testBase(), project), []);
  });
});
describe('update procedure played on Angular 21 to 22', () => {
  const docs = join(dirname(fileURLToPath(import.meta.url)), '..', 'code', 'docs', 'angular');
  const real = [
    'old-to-new.md',
    'v22-changes.md',
  ].map((name) => readFileSync(join(docs, name), 'utf8'));

  it('lists the Angular documents of version 21 for a project in Angular 22', () => {
    const before = writeTree(Object.fromEntries(real.map((text, index) => [
      `docs/angular/${index}.md`,
      text.replace(/^version: "22"$/m, 'version: "21"'),
    ])));

    assert.equal(checkVersions(before, npmProject('22.2.6')).length, 2);
  });
  it('lists nothing once the documents carry version 22, as in the base', () => {
    const after = writeTree(Object.fromEntries(real.map((text, index) => [
      `docs/angular/${index}.md`,
      text,
    ])));

    assert.deepEqual(checkVersions(after, npmProject('22.2.6')), []);
    assert.ok(real.every((text) => /^version: "22"$/m.test(text) && /^checked: \d{4}-\d{2}-\d{2}$/m.test(text)));
  });
});
describe('documents behind a project', () => {
  it('lists the Angular documents, and only them, for a project in Angular 23', () => {
    const behind = checkVersions(testBase(), npmProject('^23.0.0'));

    assert.deepEqual(
      behind
        .map((item) => item.document)
        .toSorted(),
      [
        'docs/angular/old-to-new.md',
        'docs/angular/v22-changes.md',
      ],
    );
  });
  it('lists nothing for a project in Angular 22', () => {
    assert.deepEqual(checkVersions(testBase(), npmProject('22.2.6')), []);
  });
  it('lists the TypeScript documents for a project in TypeScript 7', () => {
    const behind = checkVersions(testBase(), npmProject('22.2.6', '7.0.2'));

    assert.deepEqual(
      behind
        .map((item) => item.document)
        .toSorted(),
      [
        'docs/typescript-lint/ts-types.md',
        'docs/typescript/ts-6.md',
      ],
    );
  });
  it('lists the tool of library/ behind the project, once, and not the tools that are not built', () => {
    const base = writeTree({
      'library/sources.json': JSON.stringify({
        sources: [
          {
            tool: 'angular',
            version: '22.2',
          },
          {
            tool: 'dotnet-csharp',
            version: '11',
          },
          {
            tool: 'typescript',
            version: '6.0',
          },
        ],
      }),
      'library/angular/index.md': '# angular library index\n',
      'library/dotnet-csharp/index.md': '# dotnet-csharp library index\n',
    });
    const behind = checkVersions(base, npmProject('^23.0.0', '7.0.2'));
    const dotnet = checkVersions(base, writeTree({ 'App.csproj': '<Project><PropertyGroup><TargetFramework>net12.0</TargetFramework></PropertyGroup></Project>' }));

    assert.deepEqual(behind.map((item) => `${item.document} ${item.tool} ${item.documentVersion} ${item.projectVersion}`), ['library/angular/ angular 22 23']);
    assert.deepEqual(dotnet.map((item) => item.document), ['library/dotnet-csharp/']);
  });
  it('exits with 1 and names the documents from the command line', () => {
    const result = spawnSync(
      process.execPath,
      [
        SCRIPT,
        npmProject('^23.0.0'),
        testBase(),
      ],
      { encoding: 'utf8' },
    );

    assert.equal(result.status, 1);
    assert.match(result.stdout, /docs\/angular\/v22-changes\.md: angular 22 in the document, 23 in the project/);
  });
});
