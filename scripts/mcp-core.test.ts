import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import {
  callTool,
  type Server,
  ToolError,
} from '../global/servers/lib/mcp.ts';

const project = mkdtempSync(join(tmpdir(), 'mcp-core-'));

mkdirSync(join(project, '.agents'));
const server: Server = {
  name: 'demo',
  version: '0.0.0',
  instructions: 'Invented server for the tests.',
  maxChars: 1000,
  projectRoot: project,
  tools: [
    {
      name: 'long',
      description: 'Returns 50 lines of 100 characters.',
      properties: {},
      required: [],
      run: () => Array
        .from({ length: 50 }, (_, position) => `${String(position).padStart(3, '0')} ${'x'.repeat(96)}`)
        .join('\n'),
    },
    {
      name: 'fails',
      description: 'Throws an error for the model.',
      properties: {},
      required: [],
      run: () => {
        throw new ToolError('Give "query".');
      },
    },
  ],
};

after(() => {
  rmSync(project, {
    recursive: true,
    force: true,
  });
});
describe('the common core of the servers', () => {
  it('cuts an answer at its cap, on a line end, and says so', async () => {
    const result = await callTool(server, 'long', {});
    const [
      last = '',
      ...kept
    ] = result.text
      .split('\n')
      .reverse();

    assert.ok(result.text.length <= 1000 + 120);
    assert.match(last, /^\[truncated: the answer is longer than 1000 characters/);
    assert.ok(kept.every((line) => line.length === 100));
  });
  it('gives an error as one line', async () => {
    const result = await callTool(server, 'fails', {});

    assert.deepEqual(result, {
      text: 'Give "query".',
      isError: true,
    });
  });
  it('writes the size of every answer to the journal', () => {
    const lines = readFileSync(join(project, '.agents', 'work', 'mcp-calls.log'), 'utf8')
      .trim()
      .split('\n');

    assert.equal(lines.length, 2);
    assert.match(lines[0] ?? '', /\tdemo\tlong\t\d+ chars\t~\d+ tokens$/);
  });
});
