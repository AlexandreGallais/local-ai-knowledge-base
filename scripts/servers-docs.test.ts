import assert from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
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
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const SERVERS = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'servers');
const folders: string[] = [];
let client: Client;
let project = '';
// An invented base: two tools of the library, one of them for Angular projects only.
const BASE: Record<string, string> = {
  'library/sources.json': JSON.stringify({
    sources: [
      { tool: 'mdn-api' },
      {
        tool: 'angular',
        profiles: ['angular-app'],
      },
    ],
  }),
  'library/mdn-api/dommatrix.md': '# DOMMatrix\n\nA 2D or 3D matrix.\n\n## Multiply\n\nmultiply() returns the product.\n\n## Invert\n\ninvertSelf() inverts in place.\n',
  'library/angular/signals.md': '# Signals\n\nA signal holds a value.\n\n## Computed\n\ncomputed() derives a value.\n',
  'docs/typescript/changes.md': '---\nid: changes\n---\n# TypeScript changes\n\n## Matrix types\n\nA note on matrix tuples.\n',
};

function folder(prefix: string): string {
  const path = mkdtempSync(join(tmpdir(), prefix));

  folders.push(path);
  return path;
}

before(() => {
  const base = folder('docs-base-');

  project = folder('docs-project-');
  for (const [
    path,
    content,
  ] of Object.entries(BASE)) {
    mkdirSync(dirname(join(base, path)), { recursive: true });
    writeFileSync(join(base, path), content);
  }
  mkdirSync(join(project, '.agents'));
  writeFileSync(join(project, '.agents', 'profile.json'), JSON.stringify({ profile: 'ts-lib' }));
  client = startServer(join(SERVERS, 'docs.ts'), {
    BASE_ROOT: base,
    PROJECT_ROOT: project,
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
describe('the docs server', () => {
  it('answers the handshake and lists its tools', async () => {
    const init = await client.request('initialize', { protocolVersion: '2025-11-25' });
    const list = await client.request('tools/list');
    const tools = (list['result'] as { tools: { name: string }[] }).tools.map((tool) => tool.name);

    assert.equal((init['result'] as { protocolVersion: string }).protocolVersion, '2025-11-25');
    assert.deepEqual(tools, [
      'search_docs',
      'read_doc',
    ]);
  });
  it('returns 10 lines at most, and only the tools of the profile', async () => {
    const result = await client.call('search_docs', { query: 'matrix multiply signal computed' });
    const lines = result.text.split('\n');

    assert.equal(result.isError, false);
    assert.ok(lines.length <= 11);
    assert.match(result.text, /library\/mdn-api\/dommatrix\.md#multiply/);
    assert.doesNotMatch(result.text, /library\/angular\//);
  });
  it('reads one section only', async () => {
    const result = await client.call('read_doc', { id: 'library/mdn-api/dommatrix.md#multiply' });

    assert.match(result.text, /multiply\(\) returns the product/);
    assert.doesNotMatch(result.text, /invertSelf/);
  });
  it('refuses a path outside the base', async () => {
    const result = await client.call('read_doc', { id: 'library/../../etc/passwd.md' });

    assert.equal(result.isError, true);
    assert.match(result.text, /outside/);
  });
  it('writes each call to the journal of the project', () => {
    const log = join(project, '.agents', 'work', 'mcp-calls.log');

    assert.ok(existsSync(log));
    assert.match(readFileSync(log, 'utf8'), /\tdocs\tread_doc\t\d+ chars\t~\d+ tokens/);
  });
});
