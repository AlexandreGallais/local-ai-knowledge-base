import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
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
  before,
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_SIZES,
  exportPacks,
  sizeInBytes,
} from './export.ts';
import { readPack } from './import-base.ts';
import { installKit } from './import-project.ts';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
// Node binaries to run the imports with, beside the current one: NODE_BINARIES="a:b", or one path
// per line in scripts/node-binaries.local.txt, a file of this machine that Git ignores.
const LOCAL_LIST = join(dirname(fileURLToPath(import.meta.url)), 'node-binaries.local.txt');
const BINARIES = (process.env.NODE_BINARIES ?? (existsSync(LOCAL_LIST) ? readFileSync(LOCAL_LIST, 'utf8') : ''))
  .split(/[:\n]/)
  .map((path) => path.trim())
  .filter((path) => path !== '' && existsSync(path));
const folders: string[] = [];
let root = '';
let out = '';
// Invented content: text, and 1.3 MB of random bytes that no compression shrinks.
const FILES: Record<string, Buffer | string> = {
  'global/VERSION': '0.2.0\n',
  'global/rules/common.md': '# Common rules\n\n1. Answer in the language of the question.\n',
  'global/docs/angular/signals.md': '# Signals\n\nCall the signal as a function.\n'.repeat(200),
  'global/data/noise.bin': randomBytes(1_300_000),
  'project/AGENTS.md': '# AGENTS.md\n\nKit version.\n',
  'project/.agents/.gitignore': 'work/\ncache/\n',
  'project/.agents/skills/README.md': '# Project skills\n',
};

function temporary(prefix: string): string {
  const path = mkdtempSync(join(tmpdir(), prefix));

  folders.push(path);
  return path;
}

function write(base: string, path: string, data: Buffer | string): void {
  mkdirSync(dirname(join(base, path)), { recursive: true });
  writeFileSync(join(base, path), data);
}

before(() => {
  root = temporary('export-root-');
  out = join(root, 'export');
  Object
    .entries(FILES)
    .forEach(([
      path,
      data,
    ]) => write(root, path, data));
  for (const script of [
    'import-base.ts',
    'import-project.ts',
  ]) {
    mkdirSync(join(root, 'scripts'), { recursive: true });
    copyFileSync(join(SCRIPTS, script), join(root, 'scripts', script));
  }
  exportPacks({
    root,
    out,
    sizes: DEFAULT_SIZES,
    compression: 'brotli',
    encoding: 'z85',
  });
});
after(() => {
  for (const path of folders) {
    rmSync(path, {
      recursive: true,
      force: true,
    });
  }
});

function parts(size: string): string[] {
  return readdirSync(join(out, size)).filter((name) => name.endsWith('.txt'));
}

function copySize(size: string): string {
  const folder = temporary('paste-');

  for (const name of readdirSync(join(out, size))) {
    copyFileSync(join(out, size, name), join(folder, name));
  }
  return folder;
}

interface ImportRun {
  binary: string;
  folder: string;
  script: string;
  target: string;
}

function runImport(run: ImportRun): string {
  try {
    return execFileSync(
      run.binary,
      [
        join(run.folder, run.script),
        '--target',
        run.target,
      ],
      { encoding: 'utf8' },
    );
  } catch (error) {
    return String((error as { stderr?: string }).stderr);
  }
}

function assertSameBase(size: string): void {
  const files = readPack(join(out, size), 'global');
  const expected = Object
    .keys(FILES)
    .filter((path) => path.startsWith('global/'))
    .map((path) => path.slice('global/'.length));

  assert.deepEqual(
    files
      .map((file) => file.path)
      .sort(),
    expected.sort(),
  );
  files.forEach((file) => assert.deepEqual(file.data, Buffer.from(FILES[`global/${file.path}`] ?? ''), `${size}: ${file.path}`));
}

function assertPartLimits(size: string): void {
  parts(size).forEach((name) => {
    const data = readFileSync(join(out, size, name));

    assert.ok(data.length <= sizeInBytes(size), `${size}/${name}: ${data.length} bytes`);
    assert.ok(data.every((byte) => byte === 10 || (byte >= 32 && byte <= 126)), `${size}/${name}: not printable ASCII`);
  });
}

function assertImportsRunWith(binary: string): void {
  const folder = copySize('2m');
  const base = join(folder, 'base');
  const project = join(folder, 'project');

  mkdirSync(project);
  assert.match(
    runImport({
      binary,
      folder,
      script: 'import-base.ts',
      target: base,
    }),
    /Global base installed/,
    binary,
  );
  assert.match(
    runImport({
      binary,
      folder,
      script: 'import-project.ts',
      target: project,
    }),
    /Project kit installed/,
    binary,
  );
  assert.equal(readFileSync(join(base, 'VERSION'), 'utf8'), '0.2.0\n');
  assert.deepEqual(readFileSync(join(base, 'data/noise.bin')), FILES['global/data/noise.bin']);
}

describe('the export in five sizes', () => {
  it('recreates the global base file by file at every size', () => {
    DEFAULT_SIZES.forEach((size) => assertSameBase(size));
  });
  it('keeps every part within its size, in printable ASCII only', () => {
    DEFAULT_SIZES.forEach((size) => assertPartLimits(size));
  });
  it('cuts more parts when the size is smaller', () => {
    const globalParts = (size: string): number => parts(size).filter((name) => name.startsWith('global-')).length;

    assert.ok(globalParts('500k') > globalParts('1m'));
    assert.ok(globalParts('1m') > globalParts('10m'));
    assert.equal(globalParts('10m'), 1);
  });
});
describe('a damaged or missing part', () => {
  it('names the damaged part and writes nothing', () => {
    const folder = copySize('500k');
    const path = join(folder, 'global-002.txt');
    const lines = readFileSync(path, 'utf8').split('\n');

    lines[15] = `${lines[15]?.slice(0, -1) ?? ''}#`;
    writeFileSync(path, lines.join('\n'));
    const target = join(folder, 'base');
    const output = runImport({
      binary: process.execPath,
      folder,
      script: 'import-base.ts',
      target,
    });

    assert.match(output, /global-002\.txt: the content was damaged by the paste/);
    assert.equal(existsSync(target), false);
  });
  it('names the missing part and writes nothing', () => {
    const folder = copySize('500k');

    rmSync(join(folder, 'global-002.txt'));
    const target = join(folder, 'base');
    const output = runImport({
      binary: process.execPath,
      folder,
      script: 'import-base.ts',
      target,
    });

    assert.match(output, /part 2\/\d+ is missing: paste global-002\.txt/);
    assert.equal(existsSync(target), false);
  });
});
describe('where the global base goes', () => {
  it('lands in ./local-ai-base of the folder the command runs from', () => {
    const folder = copySize('10m');
    const here = temporary('here-');
    const output = execFileSync(process.execPath, [join(folder, 'import-base.ts')], {
      cwd: here,
      encoding: 'utf8',
    });

    assert.match(output, /Global base installed/);
    assert.equal(readFileSync(join(here, 'local-ai-base', 'VERSION'), 'utf8'), '0.2.0\n');
  });
  it('refuses the folder of the pasted parts, and keeps every part', () => {
    const folder = copySize('10m');
    const pasted = readdirSync(folder).sort();

    assert.match(runImport({
      binary: process.execPath,
      folder,
      script: 'import-base.ts',
      target: folder,
    }), /holds the pasted parts/);
    assert.deepEqual(readdirSync(folder).sort(), pasted);
  });
  it('refuses a folder that is not empty and holds no base, and leaves it as it was', () => {
    const folder = copySize('10m');
    const other = temporary('other-');

    write(other, 'notes.txt', 'mine\n');
    assert.match(runImport({
      binary: process.execPath,
      folder,
      script: 'import-base.ts',
      target: other,
    }), /not empty and holds no base/);
    assert.deepEqual(readdirSync(other), ['notes.txt']);
  });
  it('replaces a previous base', () => {
    const folder = copySize('10m');
    const base = temporary('previous-');

    write(base, 'VERSION', '0.1.0\n');
    write(base, 'old.md', 'old\n');
    assert.match(runImport({
      binary: process.execPath,
      folder,
      script: 'import-base.ts',
      target: base,
    }), /Global base installed/);
    assert.equal(existsSync(join(base, 'old.md')), false);
    assert.equal(readFileSync(join(base, 'VERSION'), 'utf8'), '0.2.0\n');
  });
});
describe('the project import', () => {
  it('updates .agents/ and keeps what the team wrote', () => {
    const project = temporary('project-');

    write(project, 'AGENTS.md', '# AGENTS.md\n\nTeam version.\n');
    write(project, '.agents/profile.json', '{"profile":"ts-lib"}\n');
    write(project, '.agents/skills/README.md', '# Our skills\n');
    write(project, '.agents/.gitignore', 'old\n');
    const result = installKit(readPack(join(out, '1m'), 'project'), project);

    assert.deepEqual(result.kept.sort(), [
      '.agents/skills/README.md',
      'AGENTS.md',
    ]);
    assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), '# AGENTS.md\n\nTeam version.\n');
    assert.equal(readFileSync(join(project, '.agents/profile.json'), 'utf8'), '{"profile":"ts-lib"}\n');
    assert.equal(readFileSync(join(project, '.agents/.gitignore'), 'utf8'), 'work/\ncache/\n');
  });
});
describe('the imports on other Node versions', () => {
  it('run without package nor build on every listed binary', (context) => {
    if (BINARIES.length === 0) {
      context.skip('NODE_BINARIES lists no binary');
      return;
    }
    BINARIES.forEach((binary) => assertImportsRunWith(binary));
  });
});
