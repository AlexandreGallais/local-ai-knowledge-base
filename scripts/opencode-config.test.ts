import assert from 'node:assert/strict';
import {
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseJsonc } from './lib/jsonc.ts';
import {
  evaluate,
  type RuleConfig,
} from './lib/opencode-rules.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

interface Config extends RuleConfig {
  instructions?: string[];
  formatter?: Record<string, { disabled?: boolean }>;
  agents?: Record<string, { disabled?: boolean }>;
  mcp?: {
    servers?: Record<
      string,
      {
        type: string;
        command: string[];
        codemode?: boolean;
      }
    >;
  };
}

const config = parseJsonc(readFileSync(join(ROOT, 'global', 'opencode', 'opencode.jsonc'), 'utf8')) as Config;

function shell(command: string): string {
  return evaluate(config, 'shell', command);
}

describe('the OpenCode configuration of the global base', () => {
  it('loads the common rules from the global base', () => {
    assert.deepEqual(config.instructions, ['/opt/local-ai-base/rules/*.md']);
    assert.ok(readdirSync(join(ROOT, 'global', 'rules')).includes('common.md'));
  });
  it('switches off the built-in formatters and the agents that invite parallel work', () => {
    assert.equal(config.formatter?.prettier?.disabled, true);
    assert.equal(config.formatter?.biome?.disabled, true);
    assert.equal(config.formatter?.oxfmt?.disabled, true);
    assert.equal(config.agents?.general?.disabled, true);
    assert.equal(config.agents?.explore?.disabled, true);
  });
  it('runs every MCP server of the base with stdio, tools exposed directly', () => {
    const servers = Object.entries(config.mcp?.servers ?? {});

    assert.deepEqual(servers.map(([name]) => name), [
      'docs',
      'practices',
      'skills',
      'project',
      'work',
      'code',
      'parse',
    ]);
    for (const [
      name,
      server,
    ] of servers) {
      const script = (server.command[1] ?? '').replace('/opt/local-ai-base/', '');

      assert.equal(server.type, 'local', name);
      assert.equal(server.codemode, false, name);
      assert.ok(existsSync(join(ROOT, 'global', script)), `${name}: ${script} is missing`);
    }
  });
  it('opens the read-only servers to every agent and keeps work for the agents that open it', () => {
    assert.equal(evaluate(config, 'docs_search_docs', '*'), 'allow');
    assert.equal(evaluate(config, 'code_outline', '*'), 'allow');
    assert.equal(evaluate(config, 'parse_outline', '*'), 'allow');
    assert.equal(evaluate(config, 'work_next_task', '*'), 'deny');
  });
});
describe('the project kit', () => {
  it('holds only AGENTS.md and .agents/', () => {
    assert.deepEqual(readdirSync(join(ROOT, 'project')).sort(), [
      '.agents',
      'AGENTS.md',
    ]);
  });
  it('keeps work files and caches out of Git', () => {
    const ignored = readFileSync(join(ROOT, 'project', '.agents', '.gitignore'), 'utf8');

    assert.match(ignored, /^work\/$/m);
    assert.match(ignored, /^cache\/$/m);
  });
});
describe('the guards of the closed environment', () => {
  it('asks before a package changes', () => {
    assert.equal(shell('npm install lodash'), 'ask');
    assert.equal(shell('npm install'), 'ask');
    assert.equal(shell('npm update'), 'ask');
    assert.equal(shell('npx cowsay hello'), 'ask');
  });
  it('allows the checks and the read-only commands', () => {
    assert.equal(shell('npm run lint'), 'allow');
    assert.equal(shell('npx --no eslint src'), 'allow');
    assert.equal(shell('git status --short'), 'allow');
    assert.equal(shell('node /opt/local-ai-base/tools/base-version.ts'), 'allow');
  });
  it('refuses network commands', () => {
    assert.equal(shell('curl https://example.org'), 'deny');
    assert.equal(shell('wget https://example.org'), 'deny');
    assert.equal(shell('git push origin main'), 'deny');
    assert.equal(shell('git clone https://example.org/a.git'), 'deny');
    assert.equal(evaluate(config, 'webfetch', 'https://example.org'), 'deny');
    assert.equal(evaluate(config, 'websearch', 'angular signals'), 'deny');
  });
  it('refuses branches and worktrees', () => {
    assert.equal(shell('git checkout -b feature/x'), 'deny');
    assert.equal(shell('git switch -c feature/x'), 'deny');
    assert.equal(shell('git branch feature/x'), 'deny');
    assert.equal(shell('git worktree add ../x'), 'deny');
    assert.equal(evaluate(config, 'opencode_worktree_create', '*'), 'deny');
  });
  it('refuses destructive commands', () => {
    assert.equal(shell('rm -rf src'), 'deny');
    assert.equal(shell('git reset --hard HEAD'), 'deny');
    assert.equal(shell('git clean -fd'), 'deny');
  });
  it('refuses to read a heavy file raw and to write in the global base', () => {
    assert.equal(evaluate(config, 'read', 'design/screens.xd'), 'deny');
    assert.equal(evaluate(config, 'read', 'specs/manual.pdf'), 'deny');
    assert.equal(evaluate(config, 'edit', '/opt/local-ai-base/rules/common.md'), 'deny');
  });
});
