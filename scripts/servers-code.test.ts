import assert from 'node:assert/strict';
import {
  existsSync,
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
  before,
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// A TypeScript installed beside this repository; TYPESCRIPT_MODULE overrides it.
const TYPESCRIPT = process.env['TYPESCRIPT_MODULE'] ?? join(ROOT, 'archive', 'v0.1', 'samples', 'typescript-angular', 'node_modules', 'typescript', 'lib', 'typescript.js');
const FILES: Record<string, string> = {
  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      strict: true,
      target: 'ES2022',
      module: 'ES2022',
      noEmit: true,
    },
    include: ['src'],
  }),
  'src/geometry.ts': [
    'export interface Point {',
    '  readonly x: number;',
    '  readonly y: number;',
    '}',
    '',
    'export function distance(a: Point, b: Point): number {',
    '  return Math.hypot(b.x - a.x, b.y - a.y);',
    '}',
    '',
    'export class Ring {',
    '  constructor(private readonly radius: number) {}',
    '',
    '  pointAt(angle: number): Point {',
    '    return { x: this.radius * Math.cos(angle), y: this.radius * Math.sin(angle) };',
    '  }',
    '}',
    '',
  ].join('\n'),
  'src/use.ts': [
    "import { distance } from './geometry';",
    '',
    'export const far = distance({ x: 0, y: 0 }, { x: 3, y: 4 });',
    'export const wrong: string = distance({ x: 0, y: 0 }, { x: 1, y: 1 });',
    '',
  ].join('\n'),
};
const folders: string[] = [];
let client: Client;

before(() => {
  const project = mkdtempSync(join(tmpdir(), 'code-'));

  folders.push(project);
  for (const [
    path,
    content,
  ] of Object.entries(FILES)) {
    mkdirSync(dirname(join(project, path)), { recursive: true });
    writeFileSync(join(project, path), content);
  }
  client = startServer(join(ROOT, 'global', 'servers', 'code.ts'), {
    PROJECT_ROOT: project,
    TYPESCRIPT_MODULE: TYPESCRIPT,
  });
});
after(() => {
  client.close();
  for (const path of folders) {
    rmSync(path, {
      recursive: true,
      force: true,
    });
  }
});
describe('the code server', { skip: existsSync(TYPESCRIPT) ? false : 'no TypeScript installed beside the repository' }, () => {
  it('gives the outline of a file, one line per declaration', async () => {
    const result = await client.call('outline', { file: 'src/geometry.ts' });

    assert.match(result.text, /export function distance\(a: Point, b: Point\): number {3}\(lines 6-8\)/);
    assert.match(result.text, /class Ring {3}\(lines 10-16\)\n.*\n {4}pointAt\(angle: number\): Point {3}\(lines 13-15\)/);
    assert.doesNotMatch(result.text, /Math\.hypot/);
  });
  it('gives the body of one member only', async () => {
    const result = await client.call('read_symbol', {
      file: 'src/geometry.ts',
      name: 'Ring.pointAt',
    });

    assert.match(result.text, /^13: {3}pointAt/);
    assert.doesNotMatch(result.text, /distance/);
  });
  it('finds where a name is declared and used', async () => {
    const result = await client.call('find_references', { name: 'distance' });

    assert.match(result.text, /declared in src\/geometry\.ts/);
    assert.match(result.text, /src\/use\.ts:3: export const far/);
  });
  it('gives the type errors of a file', async () => {
    const result = await client.call('type_errors', { file: 'src/use.ts' });

    assert.match(result.text, /^src\/use\.ts: 1 type error\(s\)\n4: TS2322 /);
  });
});
