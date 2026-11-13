import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
  type AdapterContext,
  checkOpenCodeAdapter,
} from './check-base.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const AGENTS = readFileSync(join(ROOT, 'code', 'AGENTS.md'), 'utf8');
const HEAVY = AGENTS
  .slice(AGENTS.indexOf('Heavy files:'))
  .split('\n')[0]
  .match(/\.[a-z\d]+/g) ?? [];

function context(overrides: Partial<AdapterContext> = {}): AdapterContext {
  return {
    heavy: HEAVY,
    skillNames: [
      'architecture-review',
      'code-review',
      'explain-equipment',
    ],
    exists: () => true,
    ...overrides,
  };
}

function adapter(version: 'v1' | 'v2'): string {
  return readFileSync(join(ROOT, 'adapters', 'opencode', version, 'opencode.json'), 'utf8');
}

interface V1Agent {
  prompt: string;
  permission?: unknown;
}

interface V1Config {
  permission: { read: Record<string, string> };
  agent: Record<'code-review' | 'explain-equipment', V1Agent>;
}

interface V2Config {
  permissions: { resource: string }[];
  agents: Record<'code-review', { permissions: unknown[] }>;
}

function editedV1(change: (config: V1Config) => void): string {
  const config = JSON.parse(adapter('v1')) as V1Config;

  change(config);
  return JSON.stringify(config);
}

function editedV2(change: (config: V2Config) => void): string {
  const config = JSON.parse(adapter('v2')) as V2Config;

  change(config);
  return JSON.stringify(config);
}

describe('OpenCode adapters', () => {
  it('accepts the V1 and the V2 adapter of the base', () => {
    assert.deepEqual(checkOpenCodeAdapter(adapter('v1'), 'v1', context()), []);
    assert.deepEqual(checkOpenCodeAdapter(adapter('v2'), 'v2', context()), []);
  });
  it('refuses invalid JSON', () => {
    const findings = checkOpenCodeAdapter('{ "permission": ', 'v1', context());

    assert.match(findings[0]?.message ?? '', /invalid JSON/);
  });
  it('refuses denied reads that differ from the heavy files of AGENTS.md', () => {
    const v2 = editedV2((config) => {
      config.permissions = config.permissions.filter((rule) => rule.resource !== '*.xd');
    });
    const v1 = editedV1((config) => {
      config.permission.read['*.txt'] = 'deny';
    });

    assert.match(checkOpenCodeAdapter(v2, 'v2', context())[0]?.message ?? '', /only in AGENTS\.md: \.xd/);
    assert.match(checkOpenCodeAdapter(v1, 'v1', context())[0]?.message ?? '', /only here: \.txt/);
  });
  it('refuses an agent whose skill does not exist', () => {
    const findings = checkOpenCodeAdapter(adapter('v2'), 'v2', context({
      skillNames: [
        'architecture-review',
        'explain-equipment',
      ],
    }));

    assert.deepEqual(findings.map((item) => item.message), ['agent "code-review" has no skill .agents/skills/code-review/']);
  });
  it('refuses a code review agent that can write', () => {
    const v2 = editedV2((config) => {
      config.agents['code-review'].permissions = [];
    });
    const v1 = editedV1((config) => {
      config.agent['code-review'].permission = undefined;
    });

    assert.match(checkOpenCodeAdapter(v2, 'v2', context())[0]?.message ?? '', /"code-review" says it changes no file, but edit is not denied/);
    assert.match(checkOpenCodeAdapter(v1, 'v1', context())[0]?.message ?? '', /"code-review" says it changes no file, but edit is not denied/);
  });
  it('refuses an agent that does not load its skill', () => {
    const v1 = editedV1((config) => {
      config.agent['explain-equipment'].prompt = 'Explain the equipment.';
    });

    assert.match(checkOpenCodeAdapter(v1, 'v1', context())[0]?.message ?? '', /does not load its skill `explain-equipment`/);
  });
  it('refuses an MCP server whose script is missing', () => {
    const findings = checkOpenCodeAdapter(adapter('v2'), 'v2', context({ exists: (path) => path !== 'adapters/mcp/docs-server.ts' }));

    assert.deepEqual(findings.map((item) => item.message), ['MCP server "docs" runs a missing file: adapters/mcp/docs-server.ts']);
  });
});
