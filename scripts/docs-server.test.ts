import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import { createInterface } from 'node:readline';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  MAX_RESULTS,
  readDoc,
  resolveDocsRoot,
  searchDocs,
} from '../adapters/mcp/docs-server.ts';

const SERVER = join(dirname(fileURLToPath(import.meta.url)), '..', 'adapters', 'mcp', 'docs-server.ts');
const REPOSITORY = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALVE_DOC = [
  '---',
  'id: valves',
  'title: Valves',
  'topic: fluids',
  'summary: How a valve works and how to model its flow.',
  '---',
  '',
  '# Valves',
  '',
  '## 1. Gate valve',
  '',
  'A gate valve opens fully or closes fully. [S1]',
  '',
  '## 2. Flow coefficient',
  '',
  'The flow is Q = Kv × √(Δp). [S2]',
  '',
  '## Sources',
  '',
  '- [S1] Manual one.',
  '- [S2] Manual two.',
  '',
].join('\n');

function fixture(): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-server-'));

  mkdirSync(join(root, 'docs', 'fluids'), { recursive: true });
  writeFileSync(join(root, 'docs', 'fluids', 'index.md'), '# fluids index\n\n- [Valves](docs/fluids/valves.md): How a valve works and how to model its flow.\n');
  writeFileSync(join(root, 'docs', 'fluids', 'valves.md'), VALVE_DOC);
  writeFileSync(join(root, 'docs', 'fluids', 'README.fr.md'), '# Fluides\n');
  mkdirSync(join(root, 'library', 'demo', 'api'), { recursive: true });
  writeFileSync(join(root, 'library', 'demo', 'index.md'), '# demo library index\n\n- [Valve API](library/demo/api/valve.md): The valve object and its flow methods. (2 KB)\n');
  writeFileSync(join(root, 'library', 'demo', 'api', 'valve.md'), '---\ntitle: "Valve API"\ntool: "demo"\n---\n\n# Valve API\n\n## open()\n\nOpens the valve.\n\n## setFlow()\n\nSets the flow.\n');
  return root;
}

// Sends each message on one line, closes the input, then reads every answer line.
async function exchange(root: string, messages: object[]): Promise<Record<string, unknown>[]> {
  const child = spawn(
    process.execPath,
    [
      SERVER,
      '--root',
      root,
    ],
    {
      stdio: [
        'pipe',
        'pipe',
        'ignore',
      ],
    },
  );
  const received: Record<string, unknown>[] = [];

  child.stdin.end(messages
    .map((message) => `${JSON.stringify(message)}\n`)
    .join(''));
  for await (const line of createInterface({ input: child.stdout })) {
    received.push(JSON.parse(line) as Record<string, unknown>);
  }
  return received;
}

const MODERN_META = {
  _meta: {
    'io.modelcontextprotocol/protocolVersion': '2026-07-28',
    'io.modelcontextprotocol/clientInfo': {
      name: 'test',
      version: '1',
    },
    'io.modelcontextprotocol/clientCapabilities': {},
  },
};

describe('docs server', () => {
  it('answers the legacy handshake, lists its two tools and reads one section', async () => {
    const answers = await exchange(fixture(), [
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-11-25',
          capabilities: {},
          clientInfo: {
            name: 'test',
            version: '1',
          },
        },
      },
      {
        jsonrpc: '2.0',
        method: 'notifications/initialized',
      },
      {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/list',
      },
      {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'read_doc',
          arguments: {
            path: 'docs/fluids/valves.md',
            section: '2',
          },
        },
      },
    ]);
    const [
      init,
      list,
      call,
    ] = answers as [{ result: { protocolVersion: string } }, { result: { tools: { name: string }[] } }, { result: { content: { text: string }[] } }];

    assert.equal(init.result.protocolVersion, '2025-11-25');
    assert.deepEqual(list.result.tools.map((tool) => tool.name), [
      'search_docs',
      'read_doc',
    ]);
    const text = call.result.content[0]?.text ?? '';

    assert.match(text, /^## 2\. Flow coefficient/);
    assert.match(text, /\[S2\] Manual two\./);
    assert.doesNotMatch(text, /Gate valve|\[S1\]/);
  });
  it('answers server/discover and a modern tools/list, and refuses an unknown version', async () => {
    const answers = await exchange(fixture(), [
      {
        jsonrpc: '2.0',
        id: 'd',
        method: 'server/discover',
        params: MODERN_META,
      },
      {
        jsonrpc: '2.0',
        id: 'l',
        method: 'tools/list',
        params: MODERN_META,
      },
      {
        jsonrpc: '2.0',
        id: 'v',
        method: 'tools/list',
        params: { _meta: { 'io.modelcontextprotocol/protocolVersion': '1900-01-01' } },
      },
    ]);
    const [
      discover,
      list,
      unknown,
    ] = answers as [{ result: { supportedVersions: string[] } }, { result: { resultType: string } }, { error: { code: number } }];

    assert.ok(discover.result.supportedVersions.includes('2026-07-28'));
    assert.equal(list.result.resultType, 'complete');
    assert.equal(unknown.error.code, -32022);
  });
  it('returns the table of contents of a document without a section', () => {
    const result = readDoc(fixture(), 'docs/fluids/valves.md');

    assert.equal(result.isError, false);
    assert.match(result.text, /Sections:\n1\. Gate valve\n2\. Flow coefficient\n3\. Sources\n/);
  });
  it('refuses a path outside docs/, a French summary and a missing document', () => {
    const root = fixture();

    for (const path of [
      '../secret.md',
      'docs/../AGENTS.md',
      'docs/fluids/README.fr.md',
      'docs/fluids/missing.md',
    ]) {
      assert.equal(readDoc(root, path).isError, true, path);
    }
  });
  it('finds a page of library/ after the documents of the base, and reads one section of it', () => {
    const root = fixture();
    const lines = searchDocs(root, 'valve flow').text.split('\n');
    const section = readDoc(root, 'library/demo/api/valve.md', 'setFlow()');

    assert.match(lines[0] ?? '', /^docs\/fluids\/valves\.md/);
    assert.ok(lines.some((line) => line.startsWith('library/demo/api/valve.md | Valve API')));
    assert.equal(section.isError, false);
    assert.equal(section.text, '## setFlow()\n\nSets the flow.');
    assert.equal(readDoc(root, 'library/../docs/fluids/valves.md').isError, true);
  });
  it('finds a section by its words and returns at most 10 lines', () => {
    const found = searchDocs(fixture(), 'flow coefficient');

    assert.match(found.text.split('\n')[0] ?? '', /docs\/fluids\/valves\.md \| section: 2\. Flow coefficient/);
    const many = searchDocs(resolveDocsRoot(REPOSITORY), 'valve pump pressure flow model state');

    assert.equal(many.text.split('\n').length, MAX_RESULTS);
  });
});
