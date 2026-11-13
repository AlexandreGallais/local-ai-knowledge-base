import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import {
  checkVersions,
  documentTools,
  projectVersions,
} from '../global/tools/check-versions.ts';

const folders: string[] = [];

function folder(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'versions-'));

  folders.push(root);
  Object
    .entries(files)
    .forEach(([
      path,
      text,
    ]) => {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), text);
    });
  return root;
}

const BASE = {
  'docs/angular/old-to-new.md': '---\nid: old-to-new\ntool: Angular\nversion: "22.2"\n---\n# Old to new\n',
  'docs/typescript/changes.md': '---\nid: changes\ntool: TypeScript\nversion: "6.0"\n---\n# Changes\n',
  'library/sources.json': JSON.stringify({
    sources: [
      {
        tool: 'angular',
        version: '22.2',
      },
      {
        tool: 'vitest',
        version: '5.1',
      },
    ],
  }),
  'library/angular/index.md': '# angular library index\n',
  'library/vitest/index.md': '# vitest library index\n',
};

function project(dependencies: Record<string, string>): string {
  return folder({ 'package.json': JSON.stringify({ devDependencies: dependencies }) });
}

after(() => {
  for (const root of folders) {
    rmSync(root, {
      recursive: true,
      force: true,
    });
  }
});
describe('checkVersions', () => {
  it('reads the major versions of the project in package.json', () => {
    const versions = projectVersions(project({
      '@angular/core': '^23.0.1',
      'vitest': '~5.1.0',
    }));

    assert.equal(versions.get('angular'), 23);
    assert.equal(versions.get('vitest'), 5);
  });
  it('lists the Angular documents and the Angular library behind a project in Angular 23, and them only', () => {
    const behind = checkVersions(folder(BASE), project({
      '@angular/core': '^23.0.0',
      'typescript': '~6.0.2',
      'vitest': '^5.1.0',
    }));

    assert.deepEqual(
      behind
        .map((item) => item.document)
        .sort(),
      [
        'docs/angular/old-to-new.md',
        'library/angular/',
      ],
    );
  });
  it('lists nothing for a project at the versions of the base', () => {
    assert.deepEqual(checkVersions(folder(BASE), project({
      '@angular/core': '^22.2.0',
      'typescript': '~6.0.2',
    })), []);
  });
  it('reads several tools from one document header', () => {
    assert.deepEqual(documentTools('---\ntool: typescript-eslint, TypeScript\nversion: "8.72, 6.0"\n---\n'), [
      ['typescript-eslint', 8],
      ['typescript', 6],
    ]);
  });
});
